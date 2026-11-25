"""A Hive radiator valve on ZHA: its weekly schedule, clock and schedule mode (#5).

Endpoint 1 has the Thermostat cluster (the same weekly schedule commands as the
receiver) and the Time cluster. Imported only when a room's valve is on ZHA.
"""

from __future__ import annotations

import logging
from typing import Any

from zigpy.exceptions import ZigbeeException
from zigpy.zcl import Cluster
from zigpy.zcl.clusters.general import Time
from zigpy.zcl.clusters.hvac import Thermostat
from zigpy.zcl.foundation import Status

from homeassistant.components.zha.helpers import async_get_zha_device_proxy
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.util import dt as dt_util

from ..const import VALVE_READ_TIMEOUT
from ..trv import VALVE_ENDPOINT, clamp_schedule, clock_offset, clock_ok, time_attributes
from .base import Schedule
from .zha import read_weekly_schedule, write_weekly_schedule

_LOGGER = logging.getLogger(__name__)

TIME_ATTRS = ("time", "time_status", "time_zone", "dst_start", "dst_end", "dst_shift", "local_time")
SCHEDULE_MODE = "programing_oper_mode"  # zigpy's spelling; bit 0 = follow the weekly schedule


def find_valve(hass: HomeAssistant, device_id: str) -> tuple[Cluster, Cluster | None]:
    """(Thermostat cluster, Time cluster or None) on the valve's endpoint 1."""
    try:
        device = async_get_zha_device_proxy(hass, device_id).device
    except (KeyError, ValueError, StopIteration, AttributeError, HomeAssistantError) as err:
        raise LookupError("ZHA doesn't have this valve right now") from err
    endpoint = device.device.endpoints.get(VALVE_ENDPOINT)
    if endpoint is None or Thermostat.cluster_id not in endpoint.in_clusters:
        raise LookupError("This valve has no Thermostat cluster on endpoint 1")
    return endpoint.in_clusters[Thermostat.cluster_id], endpoint.in_clusters.get(Time.cluster_id)


def _plain(values: dict[Any, Any]) -> dict[str, Any]:
    out = {}
    for key, value in values.items():
        name = key if isinstance(key, str) else getattr(key, "name", str(key))
        try:
            out[name] = int(value)
        except (TypeError, ValueError):
            out[name] = value
    return out


class ZHAValve:
    """One valve, looked up afresh for each use (ZHA can rebuild its devices)."""

    transport = "zha"

    def __init__(self, hass: HomeAssistant, device_id: str, label: str) -> None:
        self.hass = hass
        self.device_id = device_id
        self.label = label

    def _clusters(self) -> tuple[Cluster, Cluster | None]:
        try:
            return find_valve(self.hass, self.device_id)
        except LookupError as err:
            raise HomeAssistantError(str(err)) from err

    async def async_read(self) -> Schedule:
        thermostat, _time = self._clusters()
        schedule, raw = await read_weekly_schedule(thermostat, VALVE_READ_TIMEOUT)
        _LOGGER.debug("%s weekly schedule: %s", self.label, raw)
        return clamp_schedule(schedule)

    async def async_write(self, schedule: Schedule) -> int:
        thermostat, _time = self._clusters()
        # The valve isn't a Hive receiver: Z2M doesn't disable its default response, so
        # wait for it and find out at once if a day was refused.
        return await write_weekly_schedule(thermostat, schedule, label=self.label, confirm=True)

    async def _read_clock(self, cluster: Cluster) -> dict[str, Any]:
        try:
            values, _failed = await cluster.read_attributes(list(TIME_ATTRS), allow_cache=False)
        except (TimeoutError, ZigbeeException) as err:
            raise HomeAssistantError(f"Couldn't read its clock: {err}") from err
        return _plain(values)

    async def async_clock(self, *, fix: bool) -> dict[str, Any]:
        """{"offset": seconds the valve is out (None: unknown), "ok", "set": we set it}.

        With fix, a clock more than CLOCK_TOLERANCE out (or unknown) is set, as
        Zigbee2MQTT does for the Ally, and read back; still wrong raises.
        """
        _thermostat, cluster = self._clusters()
        if cluster is None:
            return {"offset": None, "ok": False, "set": False, "error": "It has no clock (Time cluster)"}
        tz = dt_util.get_default_time_zone()
        offset = clock_offset(await self._read_clock(cluster), dt_util.utcnow(), tz)
        if clock_ok(offset) or not fix:
            return {"offset": offset, "ok": clock_ok(offset), "set": False}
        attrs = time_attributes(dt_util.utcnow(), tz)
        _LOGGER.info("Setting the clock on %s (it was %s s out): %s", self.label, offset, attrs)
        try:
            result = await cluster.write_attributes(attrs)
        except (TimeoutError, ZigbeeException) as err:
            raise HomeAssistantError(f"Couldn't set its clock: {err}") from err
        if failed := [r for r in result[0] if r.status != Status.SUCCESS]:
            raise HomeAssistantError(f"It refused the time: {failed}")
        after = clock_offset(await self._read_clock(cluster), dt_util.utcnow(), tz)
        if not clock_ok(after):
            raise HomeAssistantError("Its clock is still wrong after setting it")
        return {"offset": after, "ok": True, "set": True, "was": offset}

    async def async_schedule_mode(self) -> bool | None:
        """Whether the valve follows its weekly schedule (None: couldn't tell)."""
        thermostat, _time = self._clusters()
        try:
            values, _failed = await thermostat.read_attributes([SCHEDULE_MODE], allow_cache=False)
        except (TimeoutError, ZigbeeException):
            return None
        value = _plain(values).get(SCHEDULE_MODE)
        return None if value is None else bool(int(value) & 0x01)

    async def async_set_schedule_mode(self, enabled: bool) -> None:
        thermostat, _time = self._clusters()
        try:
            result = await thermostat.write_attributes({SCHEDULE_MODE: 0x01 if enabled else 0x00})
        except (TimeoutError, ZigbeeException) as err:
            raise HomeAssistantError(f"It didn't respond: {err}") from err
        if failed := [r for r in result[0] if r.status != Status.SUCCESS]:
            raise HomeAssistantError(f"It refused: {failed}")
