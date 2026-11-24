"""Hot water as a water_heater entity: schedule / on / off, plus boost.

No temperatures: Z2M reports a fixed 21°C current and 22°C setpoint for hot water.
"""

from __future__ import annotations

from typing import Any

from homeassistant.components.water_heater import (
    STATE_OFF,
    STATE_ON,
    WaterHeaterEntity,
    WaterHeaterEntityFeature,
)
from homeassistant.const import UnitOfTemperature
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from .const import CHANNEL_WATER
from .data import HiveConfigEntry
from .entity import HiveStatusEntity
from .z2m import MODE_BOOST, MODE_MANUAL, MODE_OFF, MODE_SCHEDULE

OP_SCHEDULE = "schedule"
OP_BOOST = "boost"
TO_OP = {MODE_SCHEDULE: OP_SCHEDULE, MODE_MANUAL: STATE_ON, MODE_OFF: STATE_OFF, MODE_BOOST: OP_BOOST}
FROM_OP = {v: k for k, v in TO_OP.items()}


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HiveConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    if CHANNEL_WATER in entry.runtime_data.transport.channels:
        async_add_entities([HiveWaterHeater(entry)])


class HiveWaterHeater(HiveStatusEntity, WaterHeaterEntity):
    _attr_operation_list = list(TO_OP.values())
    _attr_supported_features = WaterHeaterEntityFeature.OPERATION_MODE | WaterHeaterEntityFeature.ON_OFF
    _attr_temperature_unit = UnitOfTemperature.CELSIUS

    def __init__(self, entry: HiveConfigEntry) -> None:
        super().__init__(entry, CHANNEL_WATER, "water_heater")

    @property
    def current_operation(self) -> str | None:
        return TO_OP[self._status["mode"]] if self._status else None

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        if not self._status:
            return None
        until = self._data.holiday.until(self._channel)
        return {
            "heating": self._status["heating"],
            "boost_remaining": self._status["boost_remaining"],
            "holiday_until": until.isoformat() if until else None,
        }

    async def async_set_operation_mode(self, operation_mode: str) -> None:
        mode = FROM_OP[operation_mode]
        if mode == MODE_BOOST:
            await self._data.async_boost(self._channel)
        else:
            await self._data.transport.async_set_mode(self._channel, mode)

    async def async_turn_on(self, **kwargs: Any) -> None:
        await self.async_set_operation_mode(OP_SCHEDULE)

    async def async_turn_off(self, **kwargs: Any) -> None:
        await self.async_set_operation_mode(STATE_OFF)
