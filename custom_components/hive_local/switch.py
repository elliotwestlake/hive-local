"""Switches (heating), kept in HA: pre-heat, and rooms calling for heat."""

from __future__ import annotations

from typing import Any

from homeassistant.components.switch import SwitchEntity
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.helpers.restore_state import RestoreEntity

from .const import CHANNEL_HEAT
from .data import HiveConfigEntry
from .entity import HiveEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HiveConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    entities: list[SwitchEntity] = []
    if entry.runtime_data.preheat.available:
        entities.append(PreheatSwitch(entry, CHANNEL_HEAT))
    if entry.runtime_data.demand.available:
        entities += [RoomDemandSwitch(entry, CHANNEL_HEAT), RoomDemandOutsideSwitch(entry, CHANNEL_HEAT)]
    async_add_entities(entities)


class _RestoredSwitch(HiveEntity, SwitchEntity, RestoreEntity):
    _attr_entity_category = EntityCategory.CONFIG

    async def _async_set(self, on: bool) -> None:
        raise NotImplementedError

    async def async_turn_on(self, **kwargs: Any) -> None:
        await self._async_set(True)
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs: Any) -> None:
        await self._async_set(False)
        self.async_write_ha_state()

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        if (last := await self.async_get_last_state()) and last.state == "on":
            await self._async_set(True)


class PreheatSwitch(_RestoredSwitch):
    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "preheat")

    @property
    def is_on(self) -> bool:
        return self._data.preheat.enabled

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        info = self._data.preheat.as_dict()
        return {
            "warm_up_rate": info["rate"],
            "warm_ups_seen": info["warmups"],
            "schedule_known": info["schedule_known"],
            "pre_heating_for": info["active_for"],
            "next_start": (info["next"] or {}).get("start"),
        }

    async def _async_set(self, on: bool) -> None:
        await self._data.preheat.async_set_enabled(on)


class RoomDemandSwitch(_RestoredSwitch):
    """Rooms call for heat: boost the heating while a room of this receiver is cold. Off by default."""

    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "room_demand")

    @property
    def is_on(self) -> bool:
        return self._data.demand.enabled

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        info = self._data.demand.as_dict()
        return {"heating_for": info["rooms"], "rooms_calling": info["calling"], "reason": info["reason"]}

    async def _async_set(self, on: bool) -> None:
        await self._data.demand.async_set_enabled(on)


class RoomDemandOutsideSwitch(_RestoredSwitch):
    """Let rooms call for heat during the schedule's "off" periods too. Off by default."""

    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "room_demand_outside_schedule")

    @property
    def is_on(self) -> bool:
        return self._data.demand.outside_schedule

    async def _async_set(self, on: bool) -> None:
        await self._data.demand.async_set_outside_schedule(on)
