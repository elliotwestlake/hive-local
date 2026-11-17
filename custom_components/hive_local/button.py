"""Boost / cancel boost buttons, per channel. Boost uses the boost number defaults."""

from __future__ import annotations

from homeassistant.components.button import ButtonEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from .data import HiveConfigEntry
from .entity import HiveStatusEntity, channels


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HiveConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    async_add_entities(
        button for c in channels(entry) for button in (BoostButton(entry, c), CancelBoostButton(entry, c))
    )


class BoostButton(HiveStatusEntity, ButtonEntity):
    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "boost")

    async def async_press(self) -> None:
        await self._data.async_boost(self._channel)


class CancelBoostButton(HiveStatusEntity, ButtonEntity):
    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "cancel_boost")

    async def async_press(self) -> None:
        await self._data.transport.async_cancel_boost(self._channel)
