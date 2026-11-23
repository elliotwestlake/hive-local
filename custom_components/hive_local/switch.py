"""Pre-heat switch (heating): start early so it's warm at the scheduled time. Kept in HA."""

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
    if entry.runtime_data.preheat.available:
        async_add_entities([PreheatSwitch(entry, CHANNEL_HEAT)])


class PreheatSwitch(HiveEntity, SwitchEntity, RestoreEntity):
    _attr_entity_category = EntityCategory.CONFIG

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

    async def async_turn_on(self, **kwargs: Any) -> None:
        await self._data.preheat.async_set_enabled(True)
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs: Any) -> None:
        await self._data.preheat.async_set_enabled(False)
        self.async_write_ha_state()

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        if (last := await self.async_get_last_state()) and last.state == "on":
            await self._data.preheat.async_set_enabled(True)
