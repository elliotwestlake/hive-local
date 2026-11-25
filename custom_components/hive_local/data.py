"""Per-entry runtime data."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import TYPE_CHECKING

from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.dispatcher import async_dispatcher_send

from .const import CHANNEL_HEAT, DEFAULT_BOOST_MINUTES, DEFAULT_BOOST_TEMP, DEFAULT_FROST_TEMP, SIGNAL_STATUS
from .schedule import ScheduleError
from .demand_controller import Demand
from .holiday_controller import Holiday
from .preheat_controller import Preheat
from .transports import Transport
from .z2m import MODE_BOOST, MODE_MANUAL, MODE_OFF, MODE_SCHEDULE

if TYPE_CHECKING:
    from .health import ReceiverHealth


@dataclass
class BoostDefaults:
    """Per-channel settings kept in HA, set by the number entities.

    minutes/temperature are used when a boost doesn't say otherwise; frost is the
    heating frost-protection temperature shown during schedule "off" periods.
    """

    minutes: int = DEFAULT_BOOST_MINUTES
    temperature: float = DEFAULT_BOOST_TEMP
    frost: float = DEFAULT_FROST_TEMP


@dataclass
class HiveData:
    transport: Transport
    preheat: Preheat
    holiday: Holiday
    demand: Demand
    boost: dict[str, BoostDefaults] = field(default_factory=dict)
    health: ReceiverHealth | None = None

    def boost_defaults(self, channel: str) -> BoostDefaults:
        return self.boost.setdefault(channel, BoostDefaults())

    def notify_settings(self) -> None:
        """Tell entities and open panels the settings changed."""
        async_dispatcher_send(self.transport.hass, f"{SIGNAL_STATUS}_{self.transport.entry_id}")
        async_dispatcher_send(self.transport.hass, SIGNAL_STATUS)

    async def async_boost(
        self, channel: str, minutes: int | None = None, temperature: float | None = None
    ) -> None:
        defaults = self.boost_defaults(channel)
        await self.transport.async_boost(
            channel,
            minutes if minutes is not None else defaults.minutes,
            temperature if temperature is not None else defaults.temperature,
        )

    async def async_set_holiday(self, until: datetime, temperature: float | None = None) -> None:
        """Away until `until`: heating holds `temperature` (default: frost protection), hot water off."""
        if temperature is None:
            temperature = self.boost_defaults(CHANNEL_HEAT).frost
        await self.holiday.async_set(until, temperature)

    async def async_set_mode(self, channel: str, mode: str, setpoint: float | None = None) -> None:
        """Schedule | manual | off, from the panel, the climate entity or the mode select."""
        if channel == CHANNEL_HEAT and mode == MODE_SCHEDULE and self.preheat.is_active:
            return  # a pre-heat is the schedule starting early: ending it would skip that change
        if channel == CHANNEL_HEAT and mode == MODE_SCHEDULE and self.demand.is_active:
            return  # rooms calling for heat is part of following the schedule (Stop ends it)
        await self.transport.async_set_mode(channel, mode, setpoint)

    async def async_set_target(self, channel: str, temperature: float) -> None:
        """Like turning the thermostat dial (heating only).

        Boosting: boost to the new temperature, keeping the time left. Manual: change
        the hold. Schedule: override until the next scheduled change.
        """
        if channel != CHANNEL_HEAT:
            raise ScheduleError("Hot water has no temperature")
        status = self.transport.status(channel)
        if not status:
            raise ScheduleError("The receiver hasn't reported yet")
        mode = status["mode"]
        if self.holiday.is_holding(channel):
            # Away: change the holiday temperature (the boost underneath is ours).
            await self.holiday.async_set_temperature(temperature)
            return
        if mode == MODE_OFF:
            raise ScheduleError("Heating is off")
        if mode == MODE_BOOST:
            await self.async_boost(channel, status.get("boost_remaining") or None, temperature)
        elif mode == MODE_MANUAL:
            await self.transport.async_set_mode(channel, MODE_MANUAL, temperature)
        else:
            await self.transport.async_set_setpoint(channel, temperature)


type HiveConfigEntry = ConfigEntry[HiveData]
