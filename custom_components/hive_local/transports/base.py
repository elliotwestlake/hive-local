"""Transport interface: how we talk to a receiver (Z2M or ZHA)."""

from __future__ import annotations

import logging
import math
from abc import ABC, abstractmethod
from collections.abc import Callable
from datetime import datetime, timedelta
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_point_in_utc_time
from homeassistant.util import dt as dt_util

from ..const import (
    BOOST_DEADLINE_GRACE,
    BOOST_MIN_TEMP,
    CHANNEL_HEAT,
    MANUAL_DEFAULT_TEMP,
    SIGNAL_STATUS,
)
from ..schedule import ScheduleError
from ..z2m import MODE_BOOST, MODE_MANUAL, MODE_SCHEDULE

Schedule = dict[str, list[dict[str, Any]]]

_LOGGER = logging.getLogger(__name__)


class Transport(ABC):
    """One receiver. Tracks per-channel status and sends commands."""

    def __init__(self, hass: HomeAssistant, entry_id: str, channels: tuple[str, ...]) -> None:
        self.hass = hass
        self.entry_id = entry_id
        self.channels = channels
        self._status: dict[str, dict[str, Any]] = {}
        # Mode (and setpoint) to go back to when a boost is cancelled.
        self._resume: dict[str, tuple[str, float | None]] = {}
        # When each boost should end. Zigbee2MQTT can replace the hold duration with
        # null/65535 ("not used"), and the receiver then boosts until something else
        # changes it, so we end it ourselves if it's still boosting after this.
        self._deadline: dict[str, datetime] = {}
        self._deadline_unsub: dict[str, Callable[[], None]] = {}

    def check_channel(self, channel: str) -> None:
        if channel not in self.channels:
            raise ScheduleError("Hot water is only available on SLR2 receivers")

    def status(self, channel: str) -> dict[str, Any] | None:
        return self._status.get(channel)

    @callback
    def _update_status(self, channel: str, status: dict[str, Any]) -> None:
        if status["mode"] != MODE_BOOST:
            self._resume[channel] = (status["mode"], status["setpoint"])
            self._clear_deadline(channel)
        else:
            status = self._track_boost(channel, status)
        if self._status.get(channel) == status:
            return
        self._status[channel] = status
        async_dispatcher_send(self.hass, f"{SIGNAL_STATUS}_{self.entry_id}")
        async_dispatcher_send(self.hass, SIGNAL_STATUS)

    @callback
    def _track_boost(self, channel: str, status: dict[str, Any]) -> dict[str, Any]:
        """Keep a deadline for a running boost, and fill in the time left from it."""
        now = dt_util.utcnow()
        remaining = status["boost_remaining"]
        if channel not in self._deadline and remaining:
            # A boost we didn't start (e.g. from the thermostat), or one running
            # across an HA restart: trust the receiver's figure once.
            self._set_deadline(channel, now + timedelta(minutes=remaining))
        if remaining is None and (deadline := self._deadline.get(channel)):
            left = max(0, math.ceil((deadline - now).total_seconds() / 60))
            status = {**status, "boost_remaining": left}
        return status

    @callback
    def _set_deadline(self, channel: str, deadline: datetime) -> None:
        self._clear_deadline(channel)
        self._deadline[channel] = deadline

        @callback
        def _expired(_now: datetime) -> None:
            self._deadline_unsub.pop(channel, None)
            self._deadline.pop(channel, None)
            if (self.status(channel) or {}).get("mode") != MODE_BOOST:
                return
            _LOGGER.info("%s boost outlived its time; ending it", channel)
            self.hass.async_create_task(self.async_cancel_boost(channel))

        self._deadline_unsub[channel] = async_track_point_in_utc_time(
            self.hass, _expired, deadline + BOOST_DEADLINE_GRACE
        )

    @callback
    def _clear_deadline(self, channel: str) -> None:
        self._deadline.pop(channel, None)
        if unsub := self._deadline_unsub.pop(channel, None):
            unsub()

    @callback
    def _clear_deadlines(self) -> None:
        for channel in list(self._deadline_unsub):
            self._clear_deadline(channel)

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
        self._set_deadline(channel, dt_util.utcnow() + timedelta(minutes=minutes))

    async def async_set_setpoint(self, channel: str, setpoint: float) -> None:
        """Change only the heating setpoint; on schedule it lasts until the next change."""
        self.check_channel(channel)
        if channel != CHANNEL_HEAT:
            raise ScheduleError("Hot water has no temperature")
        await self._async_set_setpoint(channel, setpoint)

    async def async_cancel_boost(self, channel: str) -> None:
        """Go back to whatever the channel was doing before the boost."""
        self._clear_deadline(channel)
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
