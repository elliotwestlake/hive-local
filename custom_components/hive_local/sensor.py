"""Boost time remaining, per channel, and the room temperature for heating."""

from __future__ import annotations

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity, SensorStateClass
from homeassistant.const import UnitOfTemperature, UnitOfTime
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from .const import CHANNEL_HEAT
from .data import HiveConfigEntry
from .entity import HiveStatusEntity, channels


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HiveConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    entities: list[SensorEntity] = [BoostRemainingSensor(entry, c) for c in channels(entry)]
    # Hot water has no sensor (Z2M always reports a fixed value for it).
    entities.append(TemperatureSensor(entry, CHANNEL_HEAT))
    async_add_entities(entities)


class BoostRemainingSensor(HiveStatusEntity, SensorEntity):
    _attr_device_class = SensorDeviceClass.DURATION
    _attr_native_unit_of_measurement = UnitOfTime.MINUTES

    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "boost_remaining")

    @property
    def native_value(self) -> int | None:
        # None while boosting means the receiver hasn't said how long is left.
        return self._status["boost_remaining"] if self._status else None


class TemperatureSensor(HiveStatusEntity, SensorEntity):
    """The room temperature the thermostat reports to the receiver."""

    _attr_device_class = SensorDeviceClass.TEMPERATURE
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS
    _attr_suggested_display_precision = 1

    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "temperature")

    @property
    def native_value(self) -> float | None:
        value = self._status.get("current_temperature") if self._status else None
        return value if isinstance(value, (int, float)) else None
