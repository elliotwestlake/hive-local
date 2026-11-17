"""Boost time remaining, per channel."""

from __future__ import annotations

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.const import UnitOfTime
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from .data import HiveConfigEntry
from .entity import HiveStatusEntity, channels


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HiveConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    async_add_entities(BoostRemainingSensor(entry, c) for c in channels(entry))


class BoostRemainingSensor(HiveStatusEntity, SensorEntity):
    _attr_device_class = SensorDeviceClass.DURATION
    _attr_native_unit_of_measurement = UnitOfTime.MINUTES

    def __init__(self, entry: HiveConfigEntry, channel: str) -> None:
        super().__init__(entry, channel, "boost_remaining")

    @property
    def native_value(self) -> int | None:
        # None while boosting means the receiver hasn't said how long is left.
        return self._status["boost_remaining"] if self._status else None
