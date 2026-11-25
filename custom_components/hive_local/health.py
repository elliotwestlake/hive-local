"""Repairs issues for common problems (issue #13).

ReceiverHealth (per receiver) checks every minute: the receiver has gone quiet, or on
Zigbee2MQTT never reported at all (a wrong friendly name or base topic); on ZHA, that we
still hold ZHA's current device (re-resolved after a ZHA reload) and that the Hive
thermostats we look after are still reporting. ValveHealth (house-wide) checks the Hive
radiator valves' batteries and whether they respond. The rules are in problems.py.

Every issue clears itself when its problem goes away, and the issues aren't persistent,
so a restart starts from a clean slate.
"""

from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import TYPE_CHECKING, Any

from homeassistant.const import EVENT_HOMEASSISTANT_STOP
from homeassistant.core import CALLBACK_TYPE, Event, HomeAssistant, callback
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.util import dt as dt_util

from .const import CONF_BASE_TOPIC, CONF_DEVICE, CONF_TRANSPORT, DOMAIN, TRANSPORT_Z2M
from .problems import (
    RECEIVER_SILENT,
    THERMOSTAT_QUIET,
    VALVE_BATTERY_LOW,
    VALVE_UNAVAILABLE,
    Z2M_NO_STATE,
    ZHA_DEVICE_LOST,
    lost_for,
    receiver_problem,
    should_ping,
    valve_problems,
)
from .room_manager import RoomManager
from .rooms import LOW_BATTERY

if TYPE_CHECKING:
    from .data import HiveConfigEntry

_LOGGER = logging.getLogger(__name__)

RECEIVER_CHECK_INTERVAL = timedelta(minutes=1)
VALVE_CHECK_INTERVAL = timedelta(minutes=5)
TROUBLESHOOTING_URL = "https://github.com/elliotwestlake/hive-local/wiki/Troubleshooting"

SEVERITY = {
    RECEIVER_SILENT: ir.IssueSeverity.ERROR,
    Z2M_NO_STATE: ir.IssueSeverity.ERROR,
    ZHA_DEVICE_LOST: ir.IssueSeverity.ERROR,
    THERMOSTAT_QUIET: ir.IssueSeverity.WARNING,
    VALVE_BATTERY_LOW: ir.IssueSeverity.WARNING,
    VALVE_UNAVAILABLE: ir.IssueSeverity.WARNING,
}
FIXABLE = {ZHA_DEVICE_LOST}
LEARN_MORE = {RECEIVER_SILENT, Z2M_NO_STATE, ZHA_DEVICE_LOST, THERMOSTAT_QUIET}

# issue id → (translation key, placeholders, data for a fix flow)
Wanted = dict[str, tuple[str, dict[str, str], dict[str, Any] | None]]


class _Issues:
    """The issues one checker has raised: raise what's wanted, clear the rest."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._raised: dict[str, tuple[str, dict[str, str]]] = {}

    @callback
    def sync(self, wanted: Wanted) -> None:
        for issue_id in [i for i in self._raised if i not in wanted]:
            del self._raised[issue_id]
            ir.async_delete_issue(self.hass, DOMAIN, issue_id)
        for issue_id, (key, placeholders, data) in wanted.items():
            if self._raised.get(issue_id) == (key, placeholders):
                continue
            self._raised[issue_id] = (key, placeholders)
            ir.async_create_issue(
                self.hass,
                DOMAIN,
                issue_id,
                is_fixable=key in FIXABLE,
                is_persistent=False,
                severity=SEVERITY[key],
                translation_key=key,
                translation_placeholders=placeholders,
                learn_more_url=TROUBLESHOOTING_URL if key in LEARN_MORE else None,
                data=data,
            )

    @property
    def raised(self) -> list[str]:
        """The kinds of issue raised (not their ids, which can hold an IEEE address)."""
        return sorted(key for key, _placeholders in self._raised.values())

    @callback
    def clear(self) -> None:
        self.sync({})


class ReceiverHealth:
    """One receiver's issues."""

    def __init__(self, hass: HomeAssistant, entry: HiveConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self._issues = _Issues(hass)
        self._unsub: CALLBACK_TYPE | None = None
        self._last_ping: datetime | None = None
        self._lost_since: datetime | None = None
        # When ZHA last gave us the device back: silence counts from then.
        self._found_at: datetime | None = None

    @callback
    def start(self) -> None:
        self._unsub = async_track_time_interval(self.hass, self._check, RECEIVER_CHECK_INTERVAL)

    @callback
    def stop(self) -> None:
        if self._unsub:
            self._unsub()
            self._unsub = None
        self._issues.clear()

    def diagnostics(self) -> dict[str, Any]:
        return {
            "issues": self._issues.raised,
            "last_ping": self._last_ping.isoformat() if self._last_ping else None,
            "zha_lost_since": self._lost_since.isoformat() if self._lost_since else None,
        }

    @callback
    def _check(self, _now: datetime | None = None) -> None:
        now = dt_util.utcnow()
        transport = self.entry.runtime_data.transport
        entry_id = self.entry.entry_id
        name = {"name": self.entry.title}
        wanted: Wanted = {}

        if (check_device := getattr(transport, "check_device", None)) is not None:
            if check_device():
                if self._lost_since is not None:
                    self._found_at = now
                self._lost_since = None
            elif self._lost_since is None:
                self._lost_since = now
            if lost_for(now, self._lost_since):
                wanted[f"{ZHA_DEVICE_LOST}_{entry_id}"] = (
                    ZHA_DEVICE_LOST,
                    name,
                    {"entry_id": entry_id},
                )

        if self._lost_since is None:
            z2m = self.entry.data.get(CONF_TRANSPORT, TRANSPORT_Z2M) == TRANSPORT_Z2M
            started = max(transport.started, self._found_at or transport.started)
            problem = receiver_problem(now, started, transport.last_seen, z2m=z2m)
            if problem == Z2M_NO_STATE:
                topic = f"{self.entry.data[CONF_BASE_TOPIC]}/{self.entry.data[CONF_DEVICE]}"
                wanted[f"{problem}_{entry_id}"] = (problem, name | {"topic": topic}, None)
            elif problem is not None:
                wanted[f"{problem}_{entry_id}"] = (problem, name, None)
            if should_ping(now, started, transport.last_seen, self._last_ping):
                self._last_ping = now
                self.hass.async_create_background_task(
                    self._ping(), f"hive_local ping {entry_id}"
                )

        if (thermostats := getattr(transport, "thermostats", None)) is not None:
            for ieee in thermostats.quiet(now):
                wanted[f"{THERMOSTAT_QUIET}_{ieee}"] = (
                    THERMOSTAT_QUIET,
                    {"name": self._device_name(ieee)},
                    None,
                )

        self._issues.sync(wanted)

    async def _ping(self) -> None:
        try:
            await self.entry.runtime_data.transport.async_ping()
        except Exception as err:  # noqa: BLE001 - a failed ping is just another quiet minute
            _LOGGER.debug("Asking %s for its state failed: %s", self.entry.title, err)

    def _device_name(self, ieee: str) -> str:
        device = dr.async_get(self.hass).async_get_device(
            connections={(dr.CONNECTION_ZIGBEE, ieee)}
        )
        if device is None:
            return f"Hive thermostat {ieee}"
        return device.name_by_user or device.name or ieee


DATA_VALVE_HEALTH = f"{DOMAIN}_valve_health"


class ValveHealth:
    """Every Hive radiator valve's battery and whether it responds (house-wide)."""

    def __init__(self, hass: HomeAssistant, rooms: RoomManager) -> None:
        self.hass = hass
        self.rooms = rooms
        self._issues = _Issues(hass)
        self._down_since: dict[str, datetime] = {}
        self._unsub: CALLBACK_TYPE | None = None

    @callback
    def start(self) -> None:
        self._unsub = async_track_time_interval(self.hass, self.check, VALVE_CHECK_INTERVAL)

        @callback
        def _stop(_event: Event) -> None:
            if self._unsub:
                self._unsub()
                self._unsub = None

        # House-wide, so nothing unloads it: stop the timer when HA stops.
        self.hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, _stop)

    @callback
    def check(self, _now: datetime | None = None) -> None:
        problems = valve_problems(
            self.rooms.valves(), self._down_since, dt_util.utcnow(), LOW_BATTERY
        )
        self._issues.sync(
            {
                f"{key}_{entity_id}": (key, placeholders, None)
                for (key, entity_id), placeholders in problems.items()
            }
        )
