"""Mode select per channel: schedule / manual / off / boost."""

from __future__ import annotations

from homeassistant.components.select import SelectEntity
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from .data import HiveConfigEntry
from .entity import HiveStatusEntity, channels
from .schedule import ScheduleError
from .z2m import MODE_BOOST, MODES


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HiveConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    async_add_entities(ModeSelect(entry, c) for c in channels(entry))


class ModeSelect(HiveStatusEntity, SelectEntity):
    _attr_options = list(MODES)

    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "mode")

    @property
    def current_option(self) -> str | None:
        return self._status["mode"] if self._status else None

    async def async_select_option(self, option: str) -> None:
        try:
            if option == MODE_BOOST:
                await self._data.async_boost(self._channel)
            else:
                await self._data.async_set_mode(self._channel, option)
        except ScheduleError as err:
            raise ServiceValidationError(str(err)) from err
