"""Holiday (away) mode for one receiver: hold frost protection until a set time.

While away, heating is a boost at the holiday temperature, renewed every hour for up
to 6 h at a time (see `holiday.py`), and hot water is off. At the end time, or on
cancel, each channel goes back to the mode it was in before.

Fail-safe: if Home Assistant stops, the heating boost runs out within 6 h and the
receiver goes back to its previous mode by itself; in the last 6 h it runs out exactly
at the end time. Hot water has no such timer, so it stays off until HA is back.

The holiday is kept in `.storage/hive_local.holiday.<entry_id>`, so it survives a
restart: an overdue one ends on the receiver's first report, and a lapsed heating boost
is put back. A boost someone starts on top is fine; when it ends, the holiday comes
back. Anyone changing the mode otherwise (the thermostat, the mode select) ends the
holiday for that channel: we don't fight it.
"""

from __future__ import annotations

import logging
from collections.abc import Callable
from dataclasses import replace
from datetime import datetime, timedelta
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send
from homeassistant.helpers.event import async_call_later, async_track_point_in_utc_time, async_track_time_interval
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import CHANNEL_HEAT, DOMAIN, HOLIDAY_MAX_DAYS, SIGNAL_STATUS
from .holiday import DROP, REASSERT, Away, is_our_boost, judge, lease_minutes, needs_renewal, restore_point
from .schedule import ScheduleError
from .transports import Transport
from .z2m import MODE_BOOST, MODE_OFF

_LOGGER = logging.getLogger(__name__)

STORE_VERSION = 1
# After we send something (or the receiver restarts) the new state can take a moment
# to arrive; don't read the old state as someone else's change.
SETTLE_SECONDS = 30
RENEW_CHECK = timedelta(minutes=5)


class Holiday:
    """Holiday mode for every channel of one receiver."""

    def __init__(self, hass: HomeAssistant, transport: Transport) -> None:
        self.hass = hass
        self.transport = transport
        self.entry_id = transport.entry_id
        self.away: dict[str, Away] = {}
        self._store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, f"{DOMAIN}.holiday.{self.entry_id}")
        self._settling: dict[str, float] = {}
        self._busy: set[str] = set()  # sending to (or ending) this channel right now
        self._on_top: set[str] = set()  # the boost running now is someone else's
        self._timer: Callable[[], None] | None = None
        self._recheck: Callable[[], None] | None = None
        self._unsubs: list[Callable[[], None]] = []

    # -- lifecycle -------------------------------------------------------------

    async def async_start(self) -> None:
        stored = await self._store.async_load() or {}
        for channel, data in (stored.get("channels") or {}).items():
            if channel in self.transport.channels and (away := Away.from_store(data)):
                self.away[channel] = away
                self._settle(channel)  # give the receiver a moment to report
        if self.away:
            _LOGGER.info("Holiday until %s", self.until(next(iter(self.away))))
        self._unsubs += [
            async_dispatcher_connect(self.hass, f"{SIGNAL_STATUS}_{self.entry_id}", self._on_status),
            async_track_time_interval(self.hass, self._renew_check, RENEW_CHECK),
        ]
        self._arm()

    async def async_stop(self) -> None:
        while self._unsubs:
            self._unsubs.pop()()
        if self._recheck:
            self._recheck()
            self._recheck = None
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
            self.away[channel] = Away(
                until=until.timestamp(),
                temperature=temperature if channel == CHANNEL_HEAT else None,
                restore_mode=mode,
                restore_setpoint=setpoint,
            )
            self._on_top.discard(channel)
            await self._async_hold(channel)
        self._save()
        self._arm()
        self._notify()

    async def async_set_temperature(self, temperature: float) -> None:
        """Change what the heating holds while away (the panel's − / +, the climate card)."""
        away = self.away.get(CHANNEL_HEAT)
        if away is None:
            raise ScheduleError("Not on holiday")
        self.away[CHANNEL_HEAT] = replace(away, temperature=temperature)
        self._on_top.discard(CHANNEL_HEAT)
        await self._async_hold(CHANNEL_HEAT)
        self._save()
        self._notify()

    async def async_cancel(self) -> None:
        """Come back early: every channel goes back to what it was doing before."""
        for channel in list(self.away):
            await self._async_end(channel)

    # -- talking to the receiver ---------------------------------------------------

    async def _async_hold(self, channel: str) -> None:
        """Send (or renew) the holiday hold: a boost to the holiday temperature, or hot water off."""
        away = self.away[channel]
        self._settle(channel)
        self._busy.add(channel)
        try:
            if channel == CHANNEL_HEAT:
                now = dt_util.utcnow().timestamp()
                minutes = lease_minutes(now, away.until)
                _LOGGER.debug("Holiday: boosting heating to %s for %s min", away.temperature, minutes)
                await self.transport.async_boost(channel, minutes, away.temperature)
                self.away[channel] = replace(away, lease_end=now + minutes * 60)
                self._save()
            else:
                await self.transport.async_set_mode(channel, MODE_OFF)
        finally:
            self._busy.discard(channel)

    async def _async_hold_quietly(self, channel: str) -> None:
        if channel not in self.away:
            return
        try:
            await self._async_hold(channel)
        except Exception:  # noqa: BLE001 - try again at the next check
            _LOGGER.warning("Holiday: couldn't hold %s", channel, exc_info=True)

    async def _async_end(self, channel: str, quiet: bool = False) -> None:
        away = self.away.get(channel)
        if away is None:
            return
        self._busy.add(channel)
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
            self._busy.discard(channel)
        self._drop(channel)

    # -- watching ------------------------------------------------------------------

    @callback
    def _settle(self, channel: str) -> None:
        self._settling[channel] = dt_util.utcnow().timestamp() + SETTLE_SECONDS
        # A report that arrived while settling isn't sent again if nothing changes, so
        # look at the state once the window has passed.
        if self._recheck:
            self._recheck()

        @callback
        def _recheck(_now: datetime) -> None:
            self._recheck = None
            self._on_status()

        self._recheck = async_call_later(self.hass, SETTLE_SECONDS + 1, _recheck)

    @callback
    def _on_status(self) -> None:
        now = dt_util.utcnow().timestamp()
        for channel, away in list(self.away.items()):
            status = self.transport.status(channel)
            if not status or channel in self._busy:
                continue
            mode, setpoint = status["mode"], status.get("setpoint")
            if now >= away.until:
                # Overdue, e.g. Home Assistant was down at the end time.
                self.hass.async_create_task(self._async_end(channel, quiet=True))
                continue
            if mode == MODE_BOOST and (channel != CHANNEL_HEAT or not is_our_boost(away, setpoint)):
                self._on_top.add(channel)
            elif mode == MODE_BOOST:
                self._on_top.discard(channel)
            if now < self._settling.get(channel, 0):
                continue
            verdict = judge(channel, away, mode, setpoint, now, channel in self._on_top)
            if verdict == DROP:
                _LOGGER.info("Holiday: %s changed to %s; ending the holiday for it", channel, mode)
                self._drop(channel)
            elif verdict == REASSERT:
                _LOGGER.info("Holiday: %s is %s; putting the holiday back", channel, mode)
                self._on_top.discard(channel)
                self.hass.async_create_task(self._async_hold_quietly(channel))

    @callback
    def _renew_check(self, _now: datetime | None = None) -> None:
        """Keep our heating boost topped up (the fail-safe's dead man's switch)."""
        self._on_status()
        away = self.away.get(CHANNEL_HEAT)
        status = self.transport.status(CHANNEL_HEAT)
        if away is None or not status or CHANNEL_HEAT in self._busy:
            return
        if status["mode"] != MODE_BOOST or not is_our_boost(away, status.get("setpoint")):
            return  # not ours right now: _on_status deals with it
        now = dt_util.utcnow().timestamp()
        if now >= away.until:
            return
        if needs_renewal(status.get("boost_remaining"), lease_minutes(now, away.until)):
            self.hass.async_create_task(self._async_hold_quietly(CHANNEL_HEAT))

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

        @callback
        def _due(_now: datetime) -> None:
            self._timer = None
            for channel, away in list(self.away.items()):
                if dt_util.utcnow().timestamp() >= away.until and self.transport.status(channel):
                    self.hass.async_create_task(self._async_end(channel, quiet=True))
            self._arm()

        self._timer = async_track_point_in_utc_time(self.hass, _due, dt_util.utc_from_timestamp(min(future)))

    @callback
    def _drop(self, channel: str) -> None:
        if self.away.pop(channel, None) is None:
            return
        self._settling.pop(channel, None)
        self._on_top.discard(channel)
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

    def is_holding(self, channel: str) -> bool:
        """The heating is on our holiday boost right now (not one someone started on top)."""
        away = self.away.get(channel)
        status = self.transport.status(channel)
        return (
            away is not None
            and channel == CHANNEL_HEAT
            and bool(status)
            and status["mode"] == MODE_BOOST
            and is_our_boost(away, status.get("setpoint"))
        )

    def until(self, channel: str) -> datetime | None:
        away = self.away.get(channel)
        return dt_util.as_local(dt_util.utc_from_timestamp(away.until)) if away else None

    def as_dict(self, channel: str) -> dict[str, Any] | None:
        """For the panel: {until (ISO, local), temperature, restore_mode, holding}, or None."""
        away = self.away.get(channel)
        if away is None:
            return None
        return {
            "until": self.until(channel).isoformat(),
            "temperature": away.temperature,
            "restore_mode": away.restore_mode,
            "holding": self.is_holding(channel),
        }
