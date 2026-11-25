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
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .. import boosts
from ..const import (
    BOOST_DEADLINE_GRACE,
    BOOST_MIN_TEMP,
    CHANNEL_HEAT,
    DOMAIN,
    MANUAL_DEFAULT_TEMP,
    SIGNAL_STATUS,
)
from ..schedule import ScheduleError
from ..z2m import MODE_BOOST, MODE_MANUAL, MODE_SCHEDULE

Schedule = dict[str, list[dict[str, Any]]]

_LOGGER = logging.getLogger(__name__)

BOOST_STORE_VERSION = 1


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
        # Deadlines and pre-boost modes are saved, so a restart mid-boost can still end it.
        # The last schedule read per channel, for diagnostics.
        self._last_read: dict[str, dict[str, Any]] = {}
        self._boost_store: Store[dict[str, Any]] = Store(
            hass, BOOST_STORE_VERSION, f"{DOMAIN}.boost.{entry_id}"
        )
        # When we started and when the receiver last told us anything (health.py).
        self.started = dt_util.utcnow()
        self.last_seen: datetime | None = None

    async def async_load_boosts(self) -> None:
        """Load boosts saved before a restart. Call before async_start.

        The deadline's timer starts once the receiver reports it's still boosting
        (at once if the deadline has passed); any other report drops it.
        """
        deadlines, resume = boosts.decode(await self._boost_store.async_load(), self.channels)
        self._deadline.update(deadlines)
        self._resume.update(resume)
        if deadlines:
            _LOGGER.debug("Restored boost deadlines: %s", deadlines)

    @callback
    def _save_boosts(self) -> None:
        self._boost_store.async_delay_save(
            lambda: boosts.encode(self._deadline, self._resume), 1
        )

    def check_channel(self, channel: str) -> None:
        if channel not in self.channels:
            raise ScheduleError("Hot water is only available on SLR2 receivers")

    def status(self, channel: str) -> dict[str, Any] | None:
        return self._status.get(channel)

    @callback
    def mark_seen(self) -> None:
        """The receiver just told us something (a report, or an answer to a read)."""
        self.last_seen = dt_util.utcnow()

    async def async_ping(self) -> None:
        """Ask the receiver for its state, after it's been quiet (health.py).

        Transports that already re-read it regularly (ZHA) needn't do anything.
        """

    @callback
    def _update_status(self, channel: str, status: dict[str, Any], *, seen: bool = True) -> None:
        if seen:
            self.mark_seen()
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
            # across an HA restart we have no saved deadline for: trust the
            # receiver's figure once.
            self._set_deadline(channel, now + timedelta(minutes=remaining))
        elif channel in self._deadline and channel not in self._deadline_unsub:
            # A deadline saved before a restart, now we know it's still boosting.
            # If the receiver reports a valid time left that runs past it, someone
            # started a new boost while HA was down: keep theirs, don't cancel it.
            deadline = self._deadline[channel]
            if remaining:
                deadline = max(deadline, now + timedelta(minutes=remaining))
            self._set_deadline(channel, deadline)
        if remaining is None and (deadline := self._deadline.get(channel)):
            left = max(0, math.ceil((deadline - now).total_seconds() / 60))
            status = {**status, "boost_remaining": left}
        return status

    @callback
    def _set_deadline(self, channel: str, deadline: datetime) -> None:
        self._clear_deadline(channel)
        self._deadline[channel] = deadline
        self._save_boosts()

        @callback
        def _expired(_now: datetime) -> None:
            self._deadline_unsub.pop(channel, None)
            self._deadline.pop(channel, None)
            self._save_boosts()
            if (self.status(channel) or {}).get("mode") != MODE_BOOST:
                return
            _LOGGER.info("%s boost outlived its time; ending it", channel)
            self.hass.async_create_task(self.async_cancel_boost(channel))

        self._deadline_unsub[channel] = async_track_point_in_utc_time(
            self.hass, _expired, deadline + BOOST_DEADLINE_GRACE
        )

    @callback
    def _clear_deadline(self, channel: str) -> None:
        if unsub := self._deadline_unsub.pop(channel, None):
            unsub()
        if self._deadline.pop(channel, None) is not None:
            self._save_boosts()

    @callback
    def _clear_deadlines(self) -> None:
        """Stop the timers on unload. The deadlines stay saved for the next start."""
        while self._deadline_unsub:
            self._deadline_unsub.popitem()[1]()

    @callback
    def _record_read(
        self, channel: str, raw: list[Any], schedule: Schedule, complete: bool
    ) -> None:
        """Keep what the receiver sent for the last read (shown in diagnostics)."""
        self._last_read[channel] = {
            "at": dt_util.utcnow().isoformat(),
            "complete": complete,
            "raw": raw,
            "schedule": schedule,
        }

    def diagnostics(self) -> dict[str, Any]:
        """Transport state for the diagnostics download. Subclasses add their own."""
        return {
            "type": type(self).__name__,
            "channels": list(self.channels),
            "status": self._status,
            "boost_deadlines": {c: d.isoformat() for c, d in self._deadline.items()},
            "boost_timers": sorted(self._deadline_unsub),
            "resume": {c: list(r) for c, r in self._resume.items()},
            "last_read": self._last_read,
            "started": self.started.isoformat(),
            "last_seen": self.last_seen.isoformat() if self.last_seen else None,
        }

    def resume_mode(self, channel: str) -> str:
        """The non-boost mode this channel was in last (what cancelling a boost returns to)."""
        return self._resume.get(channel, (MODE_SCHEDULE, None))[0]

    def resume_state(self, channel: str) -> tuple[str, float | None]:
        """The non-boost mode and setpoint this channel was in last."""
        return self._resume.get(channel, (MODE_SCHEDULE, None))

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
