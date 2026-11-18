"""Transport interface: how we talk to a receiver (Z2M today, ZHA later)."""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send

from ..const import BOOST_MIN_TEMP, CHANNEL_HEAT, MANUAL_DEFAULT_TEMP, SIGNAL_STATUS
from ..schedule import ScheduleError
from ..z2m import MODE_BOOST, MODE_MANUAL, MODE_SCHEDULE

Schedule = dict[str, list[dict[str, Any]]]


class Transport(ABC):
    """One receiver. Tracks per-channel status and sends commands."""

    def __init__(self, hass: HomeAssistant, entry_id: str, channels: tuple[str, ...]) -> None:
        self.hass = hass
        self.entry_id = entry_id
        self.channels = channels
        self._status: dict[str, dict[str, Any]] = {}
        # Mode (and setpoint) to go back to when a boost is cancelled.
        self._resume: dict[str, tuple[str, float | None]] = {}

    def check_channel(self, channel: str) -> None:
        if channel not in self.channels:
            raise ScheduleError("Hot water is only available on SLR2 receivers")

    def status(self, channel: str) -> dict[str, Any] | None:
        return self._status.get(channel)

    @callback
    def _update_status(self, channel: str, status: dict[str, Any]) -> None:
        if status["mode"] != MODE_BOOST:
            self._resume[channel] = (status["mode"], status["setpoint"])
        if self._status.get(channel) == status:
            return
        self._status[channel] = status
        async_dispatcher_send(self.hass, f"{SIGNAL_STATUS}_{self.entry_id}")
        async_dispatcher_send(self.hass, SIGNAL_STATUS)

    def resume_mode(self, channel: str) -> str:
        """The non-boost mode this channel was in last (what cancelling a boost returns to)."""
        return self._resume.get(channel, (MODE_SCHEDULE, None))[0]

    async def async_set_mode(
        self, channel: str, mode: str, setpoint: float | None = None
    ) -> None:
        """schedule | manual | off. Heating manual needs a setpoint, so pick a sensible one."""
        self.check_channel(channel)
        if mode == MODE_MANUAL and channel == CHANNEL_HEAT and setpoint is None:
            current = (self.status(channel) or {}).get("setpoint")
            setpoint = (
                current
                if isinstance(current, (int, float)) and current >= BOOST_MIN_TEMP
                else MANUAL_DEFAULT_TEMP
            )
        if channel != CHANNEL_HEAT:
            setpoint = None
        await self._async_set_mode(channel, mode, setpoint)

    async def async_boost(
        self, channel: str, minutes: int, setpoint: float | None = None
    ) -> None:
        self.check_channel(channel)
        await self._async_boost(channel, minutes, setpoint if channel == CHANNEL_HEAT else None)

    async def async_set_setpoint(self, channel: str, setpoint: float) -> None:
        """Change only the heating setpoint; on schedule it lasts until the next change."""
        self.check_channel(channel)
        if channel != CHANNEL_HEAT:
            raise ScheduleError("Hot water has no temperature")
        await self._async_set_setpoint(channel, setpoint)

    async def async_cancel_boost(self, channel: str) -> None:
        """Go back to whatever the channel was doing before the boost."""
        mode, setpoint = self._resume.get(channel, (MODE_SCHEDULE, None))
        await self.async_set_mode(channel, mode, setpoint if mode == MODE_MANUAL else None)

    @abstractmethod
    async def async_start(self) -> None:
        """Start listening for state."""

    @abstractmethod
    async def async_stop(self) -> None:
        """Stop listening."""

    @abstractmethod
    async def async_read(self, channel: str) -> tuple[Schedule, bool]:
        """Read the onboard schedule. Returns (schedule, complete)."""

    @abstractmethod
    async def async_write(self, channel: str, schedule: Schedule) -> int:
        """Write a validated schedule. Returns the number of commands sent."""

    @abstractmethod
    async def _async_set_mode(self, channel: str, mode: str, setpoint: float | None) -> None:
        """Send a mode change."""

    @abstractmethod
    async def _async_set_setpoint(self, channel: str, setpoint: float) -> None:
        """Send just a setpoint change."""

    @abstractmethod
    async def _async_boost(self, channel: str, minutes: int, setpoint: float | None) -> None:
        """Start (or change) a boost."""
