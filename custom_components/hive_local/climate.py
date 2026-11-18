"""Heating as a climate entity.

auto = follow the onboard schedule, heat = manual hold, off = off.
Boost is a preset; clearing it goes back to whatever was running before.
Changing the temperature on auto is a boost (a timed override back to the schedule).
"""

from __future__ import annotations

from typing import Any

from homeassistant.components.climate import (
    ATTR_HVAC_MODE,
    PRESET_BOOST,
    PRESET_NONE,
    ClimateEntity,
    ClimateEntityFeature,
    HVACAction,
    HVACMode,
)
from homeassistant.const import ATTR_TEMPERATURE, UnitOfTemperature
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from .const import BOOST_MIN_TEMP, CHANNEL_HEAT, HEAT_MAX
from .data import HiveConfigEntry
from .entity import HiveStatusEntity
from .schedule import ScheduleError
from .z2m import MODE_BOOST, MODE_MANUAL, MODE_OFF, MODE_SCHEDULE

TO_HVAC = {MODE_SCHEDULE: HVACMode.AUTO, MODE_MANUAL: HVACMode.HEAT, MODE_OFF: HVACMode.OFF}
FROM_HVAC = {v: k for k, v in TO_HVAC.items()}


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HiveConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    if CHANNEL_HEAT in entry.runtime_data.transport.channels:
        async_add_entities([HiveClimate(entry)])


class HiveClimate(HiveStatusEntity, ClimateEntity):
    _attr_hvac_modes = list(TO_HVAC.values())
    _attr_preset_modes = [PRESET_NONE, PRESET_BOOST]
    _attr_supported_features = (
        ClimateEntityFeature.TARGET_TEMPERATURE
        | ClimateEntityFeature.PRESET_MODE
        | ClimateEntityFeature.TURN_ON
        | ClimateEntityFeature.TURN_OFF
    )
    _attr_temperature_unit = UnitOfTemperature.CELSIUS
    _attr_target_temperature_step = 0.5
    _attr_min_temp = BOOST_MIN_TEMP
    _attr_max_temp = HEAT_MAX

    def __init__(self, entry: HiveConfigEntry) -> None:
        super().__init__(entry, CHANNEL_HEAT, "climate")

    @property
    def hvac_mode(self) -> HVACMode | None:
        if not self._status:
            return None
        mode = self._status["mode"]
        if mode == MODE_BOOST:
            # Boost is a preset on top of whatever it'll go back to.
            mode = self._data.transport.resume_mode(self._channel)
        return TO_HVAC[mode]

    @property
    def hvac_action(self) -> HVACAction | None:
        if not self._status:
            return None
        if self._status["mode"] == MODE_OFF:
            return HVACAction.OFF
        return HVACAction.HEATING if self._status["heating"] else HVACAction.IDLE

    @property
    def preset_mode(self) -> str | None:
        if not self._status:
            return None
        return PRESET_BOOST if self._status["mode"] == MODE_BOOST else PRESET_NONE

    @property
    def current_temperature(self) -> float | None:
        return self._status["current_temperature"] if self._status else None

    @property
    def target_temperature(self) -> float | None:
        if not self._status or self._status["mode"] == MODE_OFF:
            return None
        setpoint = self._status["setpoint"]
        if not isinstance(setpoint, (int, float)):
            return None
        # Hive uses 1°C for "off" periods in a schedule. HA hides the target control
        # when there's no target, so show the minimum instead: it stays adjustable
        # (adjusting holds the new temperature, like turning the thermostat dial).
        return max(setpoint, BOOST_MIN_TEMP)

    async def async_set_temperature(self, **kwargs: Any) -> None:
        """On auto, a new temperature is a timed override (a boost) that then returns
        to the schedule. Otherwise it's a manual hold, like turning the thermostat dial.
        """
        hvac_mode = kwargs.get(ATTR_HVAC_MODE)
        if hvac_mode == HVACMode.OFF:
            await self.async_set_hvac_mode(HVACMode.OFF)
            return
        if (temperature := kwargs.get(ATTR_TEMPERATURE)) is not None:
            if (hvac_mode or self.hvac_mode) == HVACMode.AUTO:
                await self._run(self._data.async_boost(self._channel, self._override_minutes(), temperature))
            else:
                await self._run(self._data.transport.async_set_mode(self._channel, MODE_MANUAL, temperature))
        elif hvac_mode is not None:
            await self.async_set_hvac_mode(hvac_mode)

    async def async_set_hvac_mode(self, hvac_mode: HVACMode) -> None:
        await self._run(self._data.transport.async_set_mode(self._channel, FROM_HVAC[hvac_mode]))

    async def async_set_preset_mode(self, preset_mode: str) -> None:
        if preset_mode == PRESET_BOOST:
            await self._run(self._data.async_boost(self._channel))
        elif self.preset_mode == PRESET_BOOST:
            await self._run(self._data.transport.async_cancel_boost(self._channel))

    def _override_minutes(self) -> int | None:
        """Changing the temperature mid-boost keeps the time left; otherwise use the default."""
        if self._status and self._status["mode"] == MODE_BOOST and self._status["boost_remaining"]:
            return self._status["boost_remaining"]
        return None

    async def async_turn_on(self) -> None:
        await self.async_set_hvac_mode(HVACMode.AUTO)

    async def async_turn_off(self) -> None:
        await self.async_set_hvac_mode(HVACMode.OFF)

    async def _run(self, coro) -> None:
        try:
            await coro
        except ScheduleError as err:
            raise ServiceValidationError(str(err)) from err
