"""Default boost duration (and heating boost temperature), per channel, plus the
heating frost-protection temperature shown during schedule "off" periods.

These live in HA, not on the receiver: they're what the Boost button, the mode
select and the services use when no value is given.
"""

from __future__ import annotations

from homeassistant.components.number import NumberMode, RestoreNumber
from homeassistant.const import EntityCategory, UnitOfTemperature, UnitOfTime
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from .const import (
    BOOST_MIN_TEMP,
    CHANNEL_HEAT,
    FROST_MAX,
    FROST_MIN,
    HEAT_MAX,
    PREHEAT_MAX_LEAD_MAX,
    PREHEAT_MAX_LEAD_MIN,
)
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
        entities.append(FrostTemperature(entry, CHANNEL_HEAT))
        entities.append(PreheatMaxLead(entry, CHANNEL_HEAT))
        entities += [
            DemandNumber(entry, "room_demand_start", "start_below", 0.2, 3.0, 0.1, UnitOfTemperature.CELSIUS),
            DemandNumber(entry, "room_demand_stop", "stop_within", 0.0, 1.0, 0.1, UnitOfTemperature.CELSIUS),
            DemandNumber(entry, "room_demand_min_on", "min_on", 0, 60, 1, UnitOfTime.MINUTES),
            DemandNumber(entry, "room_demand_min_off", "min_off", 0, 60, 1, UnitOfTime.MINUTES),
        ]
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


class FrostTemperature(_BoostNumber):
    """Match this to the thermostat's frost protection; it's only used for display."""

    _field = "frost"
    _attr_native_min_value = FROST_MIN
    _attr_native_max_value = FROST_MAX
    _attr_native_step = 0.5
    _attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS

    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "frost_temperature")


class PreheatMaxLead(HiveEntity, RestoreNumber):
    """How far ahead of a scheduled rise pre-heat may start, at most."""

    _attr_entity_category = EntityCategory.CONFIG
    _attr_mode = NumberMode.BOX
    _attr_native_min_value = PREHEAT_MAX_LEAD_MIN
    _attr_native_max_value = PREHEAT_MAX_LEAD_MAX
    _attr_native_step = 5
    _attr_native_unit_of_measurement = UnitOfTime.MINUTES

    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "preheat_max_lead")

    @property
    def native_value(self) -> float:
        return self._data.preheat.max_lead

    async def async_set_native_value(self, value: float) -> None:
        self._data.preheat.set_max_lead(int(value))
        self.async_write_ha_state()

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        if (last := await self.async_get_last_number_data()) and last.native_value is not None:
            self._data.preheat.set_max_lead(int(last.native_value))


class DemandNumber(HiveEntity, RestoreNumber):
    """Rooms calling for heat: how far below target starts it, how close ends it, minimum on/off times."""

    _attr_entity_category = EntityCategory.CONFIG
    _attr_mode = NumberMode.BOX

    def __init__(
        self, entry: HiveConfigEntry, key: str, field: str, low: float, high: float, step: float, unit: str
    ) -> None:
        super().__init__(entry, CHANNEL_HEAT, key)
        self._field = field
        self._attr_native_min_value = low
        self._attr_native_max_value = high
        self._attr_native_step = step
        self._attr_native_unit_of_measurement = unit

    @property
    def native_value(self) -> float:
        return getattr(self._data.demand, self._field)

    async def async_set_native_value(self, value: float) -> None:
        self._data.demand.set_number(self._field, round(float(value), 1))
        self.async_write_ha_state()

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        if (last := await self.async_get_last_number_data()) and last.native_value is not None:
            self._data.demand.set_number(self._field, round(float(last.native_value), 1))
