"""Default boost duration (and heating boost temperature), per channel.

These live in HA, not on the receiver: they're what the Boost button, the mode
select and the services use when no value is given.
"""

from __future__ import annotations

from homeassistant.components.number import NumberMode, RestoreNumber
from homeassistant.const import EntityCategory, UnitOfTemperature, UnitOfTime
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from .const import BOOST_MIN_TEMP, CHANNEL_HEAT, HEAT_MAX
from .data import HiveConfigEntry
from .entity import HiveEntity, channels
from .z2m import BOOST_MAX_MINUTES


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HiveConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    entities: list[RestoreNumber] = [BoostMinutes(entry, c) for c in channels(entry)]
    if CHANNEL_HEAT in channels(entry):
        entities.append(BoostTemperature(entry, CHANNEL_HEAT))
    async_add_entities(entities)


class _BoostNumber(HiveEntity, RestoreNumber):
    _attr_entity_category = EntityCategory.CONFIG
    _attr_mode = NumberMode.BOX
    _field: str

    @property
    def native_value(self) -> float:
        return getattr(self._data.boost_defaults(self._channel), self._field)

    async def async_set_native_value(self, value: float) -> None:
        setattr(self._data.boost_defaults(self._channel), self._field, self._cast(value))
        self.async_write_ha_state()
        self._data.notify_settings()

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        if (last := await self.async_get_last_number_data()) and last.native_value is not None:
            setattr(self._data.boost_defaults(self._channel), self._field, self._cast(last.native_value))

    def _cast(self, value: float) -> float:
        return value


class BoostMinutes(_BoostNumber):
    _field = "minutes"
    _attr_native_min_value = 1
    _attr_native_max_value = BOOST_MAX_MINUTES
    _attr_native_step = 1
    _attr_native_unit_of_measurement = UnitOfTime.MINUTES

    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "boost_minutes")

    def _cast(self, value: float) -> int:
        return int(value)


class BoostTemperature(_BoostNumber):
    _field = "temperature"
    _attr_native_min_value = BOOST_MIN_TEMP
    _attr_native_max_value = HEAT_MAX
    _attr_native_step = 0.5
    _attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS

    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "boost_temperature")
