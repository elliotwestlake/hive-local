"""Holiday (away) mode for one receiver: hold frost protection until a set time.

While away, heating is a manual hold at the holiday temperature and hot water is off.
At the end time, or on cancel, each channel goes back to the mode it was in before.

The end time is kept in `.storage/hive_local.holiday.<entry_id>`, so it survives a
restart. If Home Assistant is down when it passes, the receiver keeps holding frost
protection (a manual hold has no end of its own), and we resume as soon as the
receiver reports after the restart.

If someone changes the mode while we're away (on the thermostat, the mode select,
"Everything back to schedule"), the holiday is dropped: we don't fight it.
"""

from __future__ import annotations

import logging
from collections.abc import Callable
from dataclasses import replace
from datetime import datetime, timedelta
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send
from homeassistant.helpers.event import async_track_point_in_utc_time
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import CHANNEL_HEAT, DOMAIN, HOLIDAY_MAX_DAYS, SIGNAL_STATUS
from .holiday import Away, holding, is_ours, restore_point
from .schedule import ScheduleError
from .transports import Transport

_LOGGER = logging.getLogger(__name__)

STORE_VERSION = 1
# After we send the hold (or the receiver restarts) the new state can take a moment
# to arrive; don't read the old state as someone else's change.
SETTLE_SECONDS = 30


class Holiday:
    """Holiday mode for every channel of one receiver."""

    def __init__(self, hass: HomeAssistant, transport: Transport) -> None:
        self.hass = hass
        self.transport = transport
        self.entry_id = transport.entry_id
        self.away: dict[str, Away] = {}
        self._store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, f"{DOMAIN}.holiday.{self.entry_id}")
        self._settling: dict[str, float] = {}
        self._ending: set[str] = set()
        self._timer: Callable[[], None] | None = None
        self._unsubs: list[Callable[[], None]] = []

    # -- lifecycle -------------------------------------------------------------

    async def async_start(self) -> None:
        stored = await self._store.async_load() or {}
        for channel, data in (stored.get("channels") or {}).items():
            if channel in self.transport.channels and (away := Away.from_store(data)):
                self.away[channel] = away
                # Give the receiver a moment to report after the restart.
                self._settle(channel)
        if self.away:
            _LOGGER.info("Holiday until %s", self._until_text())
        self._unsubs.append(
            async_dispatcher_connect(self.hass, f"{SIGNAL_STATUS}_{self.entry_id}", self._on_status)
        )
        self._arm()

    async def async_stop(self) -> None:
        while self._unsubs:
            self._unsubs.pop()()
        if self._timer:
            self._timer()
            self._timer = None

    # -- commands ----------------------------------------------------------------

    async def async_set(self, until: datetime, temperature: float) -> None:
        """Go away until `until`: every channel of this receiver."""
        until = dt_util.as_utc(until)
        now = dt_util.utcnow()
        if until <= now + timedelta(minutes=1):
            raise ScheduleError("Pick a time in the future")
        if until > now + timedelta(days=HOLIDAY_MAX_DAYS):
            raise ScheduleError(f"A holiday can last at most {HOLIDAY_MAX_DAYS} days")
        for channel in self.transport.channels:
            status = self.transport.status(channel)
            if previous := self.away.get(channel):
                # Already away: keep what we'll go back to.
                mode, setpoint = previous.restore_mode, previous.restore_setpoint
            elif status:
                mode, setpoint = restore_point(
                    status["mode"], status.get("setpoint"), self.transport.resume_state(channel)
                )
            else:
                raise ScheduleError("The receiver hasn't reported yet")
            away = Away(
                until=until.timestamp(),
                temperature=temperature if channel == CHANNEL_HEAT else None,
                restore_mode=mode,
                restore_setpoint=setpoint,
            )
            self.away[channel] = away
            self._settle(channel)
            hold_mode, hold_setpoint = holding(channel, away)
            _LOGGER.info("Holiday: %s holds %s %s until %s", channel, hold_mode, hold_setpoint or "", until)
            await self.transport.async_set_mode(channel, hold_mode, hold_setpoint)
        self._save()
        self._arm()
        self._notify()

    async def async_set_temperature(self, temperature: float) -> None:
        """Change what the heating holds while away (the panel's − / +, the climate card)."""
        away = self.away.get(CHANNEL_HEAT)
        if away is None:
            raise ScheduleError("Not on holiday")
        self.away[CHANNEL_HEAT] = away = replace(away, temperature=temperature)
        self._settle(CHANNEL_HEAT)
        self._save()
        await self.transport.async_set_mode(CHANNEL_HEAT, *holding(CHANNEL_HEAT, away))
        self._notify()

    async def async_cancel(self) -> None:
        """Come back early: every channel goes back to what it was doing before."""
        for channel in list(self.away):
            await self._async_end(channel)

    async def _async_end(self, channel: str, quiet: bool = False) -> None:
        away = self.away.get(channel)
        if away is None or channel in self._ending:
            return
        self._ending.add(channel)
        try:
            _LOGGER.info("Holiday over: %s back to %s", channel, away.restore_mode)
            await self.transport.async_set_mode(channel, away.restore_mode, away.restore_setpoint)
        except Exception:
            # Try again on the receiver's next report.
            _LOGGER.warning("Holiday: couldn't put %s back to %s", channel, away.restore_mode, exc_info=True)
            if quiet:
                return
            raise
        finally:
            self._ending.discard(channel)
        self._drop(channel)

    # -- watching ------------------------------------------------------------------

    @callback
    def _settle(self, channel: str) -> None:
        self._settling[channel] = dt_util.utcnow().timestamp() + SETTLE_SECONDS

    @callback
    def _on_status(self) -> None:
        now = dt_util.utcnow().timestamp()
        for channel, away in list(self.away.items()):
            status = self.transport.status(channel)
            if not status or channel in self._ending:
                continue
            ours = is_ours(channel, away, status["mode"], status.get("setpoint"))
            if not ours and now >= self._settling.get(channel, 0):
                # Someone changed it (also while HA was down): theirs wins, don't resume.
                _LOGGER.info("Holiday: %s changed to %s; dropping the holiday", channel, status["mode"])
                self._drop(channel)
            elif ours and now >= away.until:
                # Overdue, e.g. Home Assistant was down at the end time.
                self.hass.async_create_task(self._async_end(channel, quiet=True))

    @callback
    def _arm(self) -> None:
        if self._timer:
            self._timer()
            self._timer = None
        now = dt_util.utcnow().timestamp()
        # Overdue channels are ended from _on_status, once the receiver has reported.
        future = [a.until for a in self.away.values() if a.until > now]
        if not future:
            return
        until = min(future)

        @callback
        def _due(_now: datetime) -> None:
            self._timer = None
            for channel, away in list(self.away.items()):
                if dt_util.utcnow().timestamp() >= away.until:
                    if self.transport.status(channel):
                        self.hass.async_create_task(self._async_end(channel, quiet=True))
                    # else: _on_status ends it once the receiver reports.
            self._arm()

        self._timer = async_track_point_in_utc_time(self.hass, _due, dt_util.utc_from_timestamp(until))

    @callback
    def _drop(self, channel: str) -> None:
        if self.away.pop(channel, None) is None:
            return
        self._settling.pop(channel, None)
        self._save()
        self._arm()
        self._notify()

    @callback
    def _save(self) -> None:
        self._store.async_delay_save(
            lambda: {"channels": {c: a.as_store() for c, a in self.away.items()}}, 1
        )

    @callback
    def _notify(self) -> None:
        async_dispatcher_send(self.hass, f"{SIGNAL_STATUS}_{self.entry_id}")
        async_dispatcher_send(self.hass, SIGNAL_STATUS)

    # -- reporting -------------------------------------------------------------------

    def _until_text(self) -> str:
        return ", ".join(f"{c} {dt_util.as_local(dt_util.utc_from_timestamp(a.until))}" for c, a in self.away.items())

    def until(self, channel: str) -> datetime | None:
        away = self.away.get(channel)
        return dt_util.as_local(dt_util.utc_from_timestamp(away.until)) if away else None

    def as_dict(self, channel: str) -> dict[str, Any] | None:
        """For the panel: {until (ISO, local), temperature, restore_mode}, or None."""
        away = self.away.get(channel)
        if away is None:
            return None
        return {
            "until": self.until(channel).isoformat(),
            "temperature": away.temperature,
            "restore_mode": away.restore_mode,
        }
