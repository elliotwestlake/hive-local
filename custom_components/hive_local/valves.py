"""Talking to a Hive radiator valve directly: its schedule, schedule mode and clock.

Rooms use the valves' HA entities for everyday state, but schedules need Zigbee
commands, so this works out from the entity registry how a valve is paired (ZHA or
Zigbee2MQTT) and talks to it the same way the receiver transports do. The Hive
valve is a Danfoss Ally: Thermostat cluster on endpoint 1, schedule commands as on
the receiver, setpoints 5-35 °C.
"""

from __future__ import annotations

import json
import logging
from abc import ABC, abstractmethod
from typing import Any

from homeassistant.components import mqtt
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.util import dt as dt_util

from .const import CONF_BASE_TOPIC, CONF_TRANSPORT, DEFAULT_BASE_TOPIC, DOMAIN, TRANSPORT_Z2M
from .transports.base import Schedule
from .zcl import SCHEDULE_MODE, time_attributes

_LOGGER = logging.getLogger(__name__)

# Valves sleep between check-ins, so their replies take far longer than a receiver's.
VALVE_READ_TIMEOUT = 45.0
THERMOSTAT_CLUSTER = 0x0201
TIME_CLUSTER = 0x000A


class Valve(ABC):
    def __init__(self, entity_id: str, name: str) -> None:
        self.entity_id = entity_id
        self.name = name

    @abstractmethod
    async def async_read_schedule(self) -> tuple[Schedule, bool]:
        """The valve's weekly schedule, and whether all seven days came back."""

    @abstractmethod
    async def async_write_schedule(self, schedule: Schedule) -> int:
        """Write a validated schedule (only the days given). Returns commands sent."""

    @abstractmethod
    async def async_follow_schedule(self) -> None:
        """Make the valve run its weekly schedule rather than a fixed setpoint."""

    async def async_set_clock(self) -> None:
        """Give the valve the time; it runs its schedule on its own clock."""


class ZhaValve(Valve):
    def __init__(self, entity_id: str, name: str, thermostat: Any, time: Any | None) -> None:
        super().__init__(entity_id, name)
        self._thermostat = thermostat
        self._time = time

    async def async_read_schedule(self) -> tuple[Schedule, bool]:
        from .transports.zha import async_read_schedule

        return await async_read_schedule(self._thermostat, VALVE_READ_TIMEOUT)

    async def async_write_schedule(self, schedule: Schedule) -> int:
        from .transports.zha import async_write_schedule

        return await async_write_schedule(self._thermostat, schedule, acknowledged=True)

    async def _write(self, cluster: Any, attrs: dict[str, Any]) -> None:
        from zigpy.exceptions import ZigbeeException
        from zigpy.zcl.foundation import Status

        try:
            result = await cluster.write_attributes(attrs)
        except (TimeoutError, ZigbeeException) as err:
            raise HomeAssistantError(f"{self.name} didn't respond: {err}") from err
        if failed := [r for r in result[0] if r.status != Status.SUCCESS]:
            raise HomeAssistantError(f"{self.name} refused {list(attrs)}: {failed}")

    async def async_follow_schedule(self) -> None:
        await self._write(self._thermostat, {"programing_oper_mode": SCHEDULE_MODE})

    async def async_set_clock(self) -> None:
        if self._time is None:
            return
        attrs = time_attributes(dt_util.utcnow(), dt_util.get_default_time_zone())
        _LOGGER.debug("%s clock: %s", self.name, attrs)
        await self._write(self._time, attrs)


class Z2mValve(Valve):
    """Zigbee2MQTT already keeps the Ally's clock right (daily), so no clock here."""

    def __init__(self, hass: HomeAssistant, entity_id: str, name: str, topic: str) -> None:
        super().__init__(entity_id, name)
        self.hass = hass
        self.topic = topic

    async def async_read_schedule(self) -> tuple[Schedule, bool]:
        from .transports.z2m import async_read_schedule

        return await async_read_schedule(self.hass, self.topic, "weekly_schedule", VALVE_READ_TIMEOUT)

    async def async_write_schedule(self, schedule: Schedule) -> int:
        from .transports.z2m import async_write_schedule

        return await async_write_schedule(self.hass, self.topic, schedule)

    async def async_follow_schedule(self) -> None:
        await mqtt.async_publish(
            self.hass, f"{self.topic}/set", json.dumps({"programming_operation_mode": "schedule"})
        )


def _z2m_base_topic(hass: HomeAssistant) -> str:
    """The base topic a Z2M receiver was set up with, else Z2M's default."""
    for entry in hass.config_entries.async_entries(DOMAIN):
        if entry.data.get(CONF_TRANSPORT, TRANSPORT_Z2M) == TRANSPORT_Z2M and entry.data.get(CONF_BASE_TOPIC):
            return entry.data[CONF_BASE_TOPIC]
    return DEFAULT_BASE_TOPIC


def async_valve(hass: HomeAssistant, entity_id: str) -> Valve:
    """The valve behind a climate entity. HomeAssistantError if it can't be reached."""
    entry = er.async_get(hass).async_get(entity_id)
    device = dr.async_get(hass).async_get(entry.device_id) if entry and entry.device_id else None
    if entry is None or device is None:
        raise HomeAssistantError(f"{entity_id} isn't a device Home Assistant knows")
    name = device.name_by_user or device.name or entity_id

    if entry.platform == "zha":
        from homeassistant.components.zha.helpers import async_get_zha_device_proxy

        try:
            zigpy_device = async_get_zha_device_proxy(hass, device.id).device.device
        except (KeyError, ValueError, StopIteration) as err:
            raise HomeAssistantError(f"ZHA doesn't have {name} loaded") from err
        for ep_id, ep in zigpy_device.endpoints.items():
            if ep_id and THERMOSTAT_CLUSTER in ep.in_clusters:
                return ZhaValve(entity_id, name, ep.in_clusters[THERMOSTAT_CLUSTER], ep.in_clusters.get(TIME_CLUSTER))
        raise HomeAssistantError(f"{name} has no thermostat on ZHA")

    if entry.platform == "mqtt":
        # Z2M's MQTT discovery names the HA device after the friendly name.
        return Z2mValve(hass, entity_id, name, f"{_z2m_base_topic(hass)}/{device.name}")

    raise HomeAssistantError(f"{name} isn't on ZHA or Zigbee2MQTT")
