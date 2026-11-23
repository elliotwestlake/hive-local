"""ZHA transport: talks to the receiver's Thermostat clusters through zigpy.

Imported only for ZHA entries, so Z2M-only installs don't need ZHA's requirements.
"""

from __future__ import annotations

import asyncio
import logging
from datetime import datetime
from functools import partial
from typing import Any

from zigpy.exceptions import ZigbeeException
from zigpy.zcl import (
    AttributeReadEvent,
    AttributeReportedEvent,
    AttributeUpdatedEvent,
    AttributeWrittenEvent,
    Cluster,
)
from zigpy.zcl.clusters.hvac import Thermostat
from zigpy.zcl.foundation import Status

from homeassistant.components.zha.helpers import async_get_zha_device_proxy, get_zha_gateway
from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import async_call_later, async_track_time_interval
from homeassistant.util import dt as dt_util

from ..const import (
    BOOST_POLL_INTERVAL,
    DOMAIN,
    READ_TIMEOUT,
    THERMOSTAT_REPORTING_REFRESH,
    ZHA_REFRESH_DELAY,
    ZHA_REFRESH_INTERVAL,
)
from ..schedule import DAYS
from ..z2m import MODE_BOOST
from ..zcl import (
    ALL_DAYS,
    HOLD_ATTRS,
    SEQ_MODE_HEAT,
    STATE_ATTRS,
    TEMPERATURE_REPORTING,
    boost_attributes,
    channel_status,
    is_hive_thermostat,
    mode_attributes,
    parse_schedule_response,
    receiver_endpoints,
    reporting_accepted,
    schedule_commands,
    setpoint_attributes,
)
from .base import Schedule, Transport

_LOGGER = logging.getLogger(__name__)

SCHEDULE_RESPONSE = Thermostat.ClientCommandDefs.get_weekly_schedule_response.schema
CACHE_EVENTS = (
    AttributeReadEvent,
    AttributeReportedEvent,
    AttributeUpdatedEvent,
    AttributeWrittenEvent,
)
# Only reports come from the receiver unasked (our own reads don't emit them, so
# re-reading on one can't loop). A reported mode/setpoint change may mean the hold changed.
REPORT_REFRESH_ATTRS = {"system_mode", "occupied_heating_setpoint"}


def find_receiver(hass: HomeAssistant, device_id: str) -> tuple[Any, dict[str, Cluster]]:
    """Return (zha device, {channel: Thermostat cluster}). LookupError if ZHA doesn't have it."""
    try:
        device = async_get_zha_device_proxy(hass, device_id).device
    except (KeyError, ValueError, StopIteration) as err:
        raise LookupError(f"ZHA doesn't know device {device_id}") from err
    thermostats = {
        ep_id: ep.in_clusters[Thermostat.cluster_id]
        for ep_id, ep in device.device.endpoints.items()
        if ep_id != 0 and Thermostat.cluster_id in ep.in_clusters
    }
    channels = receiver_endpoints(device.model, list(thermostats))
    if not channels:
        raise LookupError("Device has no Thermostat cluster")
    return device, {channel: thermostats[ep] for channel, ep in channels.items()}


class _ScheduleListener:
    """Legacy zigpy cluster listener: catches get_weekly_schedule_response commands."""

    def __init__(self) -> None:
        self.collected: Schedule = {}
        self.raw: list[dict[str, Any]] = []
        self.all_days = asyncio.Event()

    def cluster_command(self, tsn: int, command_id: int, args: Any) -> None:
        if not isinstance(args, SCHEDULE_RESPONSE):
            return
        _LOGGER.debug("get_weekly_schedule_response: %s", args)
        self.raw.append(
            {
                "day_of_week_for_sequence": int(args.day_of_week_for_sequence),
                "mode_for_sequence": int(args.mode_for_sequence),
                "values": [int(v) for v in args.values],
            }
        )
        self.collected.update(
            parse_schedule_response(
                args.day_of_week_for_sequence, args.mode_for_sequence, list(args.values)
            )
        )
        if all(day in self.collected for day in DAYS):
            self.all_days.set()


def _plain(value: Any) -> Any:
    """A zigpy attribute value as JSON (enums and bitmaps become ints)."""
    if value is None or isinstance(value, (bool, str)):
        return value
    try:
        return int(value)
    except (TypeError, ValueError):
        return str(value)


def _versions() -> dict[str, str | None]:
    from importlib.metadata import PackageNotFoundError, version  # noqa: PLC0415

    out: dict[str, str | None] = {}
    for package in ("zigpy", "zha", "zha-quirks"):
        try:
            out[package] = version(package)
        except PackageNotFoundError:
            out[package] = None
    return out


TEMPERATURE_CLUSTER = 0x0402
# ieees of Hive thermostats some transport is already looking after (one per HA).
THERMOSTATS_WATCHED = f"{DOMAIN}_thermostats_watched"


class _ThermostatReporting:
    """Keep Hive SLT thermostats on ZHA reporting temperature often enough (see zcl.py).

    The thermostat sleeps, so we configure it right after it sends a report, when
    it's awake. Once it has accepted, we leave it alone for a day, then do it again in
    case ZHA reconfigured it.
    """

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._unsubs: list[CALLBACK_TYPE] = []
        self._watched: set[str] = hass.data.setdefault(THERMOSTATS_WATCHED, set())
        self._mine: set[str] = set()
        self._done: dict[str, datetime] = {}
        self._busy: set[str] = set()

    @callback
    def start(self) -> None:
        try:
            devices = list(get_zha_gateway(self.hass).devices.values())
        except ValueError:
            return
        for device in devices:
            ieee = str(device.ieee)
            if ieee in self._watched or not is_hive_thermostat(device.manufacturer, device.model):
                continue
            cluster = next(
                (
                    ep.in_clusters[TEMPERATURE_CLUSTER]
                    for ep_id, ep in device.device.endpoints.items()
                    if ep_id != 0 and TEMPERATURE_CLUSTER in ep.in_clusters
                ),
                None,
            )
            if cluster is None:
                continue
            self._watched.add(ieee)
            self._mine.add(ieee)
            for event in (AttributeReportedEvent, AttributeUpdatedEvent):
                self._unsubs.append(
                    cluster.on_event(event.event_type, partial(self._on_report, ieee, cluster))
                )
            # It might be awake now (e.g. just paired); otherwise its next report will do.
            self._apply_soon(ieee, cluster)

    def diagnostics(self) -> dict[str, Any]:
        return {
            # Only the end of each IEEE address, enough to tell thermostats apart.
            "watching": sorted(f"…{ieee[-5:]}" for ieee in self._mine),
            "reporting_configured": {f"…{ieee[-5:]}": at.isoformat() for ieee, at in self._done.items()},
        }

    @callback
    def stop(self) -> None:
        while self._unsubs:
            self._unsubs.pop()()
        self._watched.difference_update(self._mine)
        self._mine.clear()

    @callback
    def _on_report(self, ieee: str, cluster: Cluster, event: Any) -> None:
        done = self._done.get(ieee)
        if done is None or dt_util.utcnow() - done >= THERMOSTAT_REPORTING_REFRESH:
            self._apply_soon(ieee, cluster)

    @callback
    def _apply_soon(self, ieee: str, cluster: Cluster) -> None:
        if ieee not in self._busy:
            self._busy.add(ieee)
            self.hass.async_create_background_task(
                self._apply(ieee, cluster), f"hive_local thermostat reporting {ieee}"
            )

    async def _apply(self, ieee: str, cluster: Cluster) -> None:
        min_s, max_s, change = TEMPERATURE_REPORTING
        try:
            result = await cluster.configure_reporting("measured_value", min_s, max_s, change)
        except (TimeoutError, ZigbeeException) as err:
            _LOGGER.debug("Thermostat %s asleep, will retry on its next report: %s", ieee, err)
            return
        finally:
            self._busy.discard(ieee)
        if reporting_accepted(result):
            if ieee not in self._done:
                _LOGGER.info(
                    "Hive thermostat %s now reports temperature at least every %s s", ieee, max_s
                )
            self._done[ieee] = dt_util.utcnow()
        else:
            _LOGGER.warning("Hive thermostat %s refused the reporting change: %s", ieee, result)


class ZHATransport(Transport):
    def __init__(
        self, hass: HomeAssistant, entry_id: str, clusters: dict[str, Cluster]
    ) -> None:
        super().__init__(hass, entry_id, tuple(clusters))
        self._clusters = clusters
        self._unsubs: list[CALLBACK_TYPE] = []
        self._pending_refresh: dict[str, CALLBACK_TYPE] = {}
        self._thermostats = _ThermostatReporting(hass)

    def _cluster(self, channel: str) -> Cluster:
        self.check_channel(channel)
        return self._clusters[channel]

    async def async_start(self) -> None:
        for channel, cluster in self._clusters.items():
            for event in CACHE_EVENTS:
                self._unsubs.append(
                    cluster.on_event(event.event_type, partial(self._on_attribute, channel))
                )
            # ZHA may already have the reported attributes cached.
            self._publish(channel)
        self._unsubs.append(
            async_track_time_interval(self.hass, self._poll_boost, BOOST_POLL_INTERVAL)
        )
        self._unsubs.append(
            async_track_time_interval(self.hass, self._refresh_all, ZHA_REFRESH_INTERVAL)
        )
        # Don't hold up setup on the radio.
        self.hass.async_create_background_task(
            self._refresh_all(), f"hive_local refresh {self.entry_id}"
        )
        self._thermostats.start()

    async def async_stop(self) -> None:
        self._thermostats.stop()
        self._clear_deadlines()
        while self._unsubs:
            self._unsubs.pop()()
        while self._pending_refresh:
            self._pending_refresh.popitem()[1]()

    @callback
    def _publish(self, channel: str) -> None:
        cluster = self._clusters[channel]
        status = channel_status({name: cluster.get(name) for name in STATE_ATTRS})
        if status is not None:
            self._update_status(channel, status)

    @callback
    def _on_attribute(self, channel: str, event: Any) -> None:
        if event.attribute_name not in STATE_ATTRS:
            return
        self._publish(channel)
        if isinstance(event, AttributeReportedEvent) and event.attribute_name in REPORT_REFRESH_ATTRS:
            self._schedule_refresh(channel, HOLD_ATTRS)

    @callback
    def _schedule_refresh(self, channel: str, attrs: tuple[str, ...] = STATE_ATTRS) -> None:
        """Read attrs shortly; repeated calls within the delay collapse into one read."""
        if cancel := self._pending_refresh.pop(channel, None):
            cancel()

        @callback
        def _run(_now: datetime) -> None:
            self._pending_refresh.pop(channel, None)
            self.hass.async_create_background_task(
                self._refresh(channel, attrs), f"hive_local refresh {self.entry_id}"
            )

        self._pending_refresh[channel] = async_call_later(self.hass, ZHA_REFRESH_DELAY, _run)

    async def _refresh(self, channel: str, attrs: tuple[str, ...] = STATE_ATTRS) -> None:
        try:
            await self._clusters[channel].read_attributes(list(attrs), allow_cache=False)
        except (TimeoutError, ZigbeeException) as err:
            _LOGGER.debug("Reading %s state failed: %s", channel, err)
            return
        self._publish(channel)

    async def _refresh_all(self, _now: datetime | None = None) -> None:
        for channel in self.channels:
            await self._refresh(channel)

    async def _poll_boost(self, _now: datetime) -> None:
        for channel in self.channels:
            if (self.status(channel) or {}).get("mode") == MODE_BOOST:
                await self._refresh(channel, HOLD_ATTRS)

    async def _write(self, channel: str, attrs: dict[str, int]) -> None:
        """One Write Attributes command; Hive wants all of a mode change at once."""
        _LOGGER.debug("%s write_attributes: %s", channel, attrs)
        try:
            result = await self._cluster(channel).write_attributes(attrs)
        except (TimeoutError, ZigbeeException) as err:
            raise HomeAssistantError(f"Receiver didn't respond: {err}") from err
        failed = [r for r in result[0] if r.status != Status.SUCCESS]
        if failed:
            raise HomeAssistantError(f"Receiver rejected the change: {failed}")
        # Check what the receiver actually did with it.
        self._schedule_refresh(channel)

    async def _async_set_mode(self, channel: str, mode: str, setpoint: float | None) -> None:
        await self._write(channel, mode_attributes(mode, setpoint))

    async def _async_set_setpoint(self, channel: str, setpoint: float) -> None:
        await self._write(channel, setpoint_attributes(setpoint))

    async def _async_boost(self, channel: str, minutes: int, setpoint: float | None) -> None:
        await self._write(channel, boost_attributes(minutes, setpoint))

    async def async_read(self, channel: str) -> tuple[Schedule, bool]:
        cluster = self._cluster(channel)
        listener = _ScheduleListener()
        cluster.add_listener(listener)
        try:
            # The receiver answers with one response per day, all with our TSN. With
            # expect_reply zigpy would swallow the first as the request's reply, so
            # don't wait for one and collect them all through the listener instead.
            await cluster.get_weekly_schedule(
                days_to_return=ALL_DAYS, mode_to_return=SEQ_MODE_HEAT, expect_reply=False
            )
            try:
                await asyncio.wait_for(listener.all_days.wait(), READ_TIMEOUT)
            except TimeoutError:
                pass
        except ZigbeeException as err:
            raise HomeAssistantError(f"Couldn't send the request: {err}") from err
        finally:
            cluster.remove_listener(listener)

        schedule = {d: listener.collected[d] for d in DAYS if d in listener.collected}
        complete = len(schedule) == len(DAYS)
        self._record_read(channel, listener.raw, schedule, complete)
        return schedule, complete

    def diagnostics(self) -> dict[str, Any]:
        device = next(iter(self._clusters.values())).endpoint.device
        return super().diagnostics() | {
            "endpoints": {
                str(ep_id): {
                    "profile_id": getattr(ep, "profile_id", None),
                    "device_type": getattr(ep, "device_type", None),
                    "in_clusters": [f"0x{c:04x}" for c in ep.in_clusters],
                    "out_clusters": [f"0x{c:04x}" for c in ep.out_clusters],
                }
                for ep_id, ep in device.endpoints.items()
                if ep_id != 0
            },
            "thermostat_endpoints": {
                channel: cluster.endpoint.endpoint_id for channel, cluster in self._clusters.items()
            },
            "attributes": {
                channel: {name: _plain(cluster.get(name)) for name in STATE_ATTRS}
                for channel, cluster in self._clusters.items()
            },
            "thermostats": self._thermostats.diagnostics(),
            "versions": _versions(),
        }

    async def async_write(self, channel: str, schedule: Schedule) -> int:
        cluster = self._cluster(channel)
        commands = schedule_commands(schedule)
        for command in commands:
            _LOGGER.debug("%s set_weekly_schedule: %s", channel, command)
            try:
                # Z2M sends every command to Hive receivers with "disable default
                # response" (meta.disableDefaultResponse), so don't wait for one either.
                # Read the schedule back to check it.
                await cluster.set_weekly_schedule(
                    **command, disable_default_response=True, expect_reply=False
                )
            except (TimeoutError, ZigbeeException) as err:
                raise HomeAssistantError(f"Couldn't send the schedule: {err}") from err
            # Same pacing as Z2M writes.
            await asyncio.sleep(0.5)
        return len(commands)
