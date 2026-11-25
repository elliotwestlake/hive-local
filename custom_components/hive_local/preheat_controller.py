"""Pre-heat for one receiver's heating: start early so it's warm at the scheduled time.

Opt-in (the Pre-heat switch). Needs two things it keeps for itself:

- the onboard heating schedule, cached in `.storage/hive_local.schedule.<entry_id>`
  whenever the panel reads or writes it, read once at start if we've never seen it,
  and re-read every night (the thermostat can change it too);
- the warm-up rate, learned from the recorder (`preheat.learn_rate`) at start and every
  few hours.

Every minute, while the heating follows its schedule, `preheat.plan` says whether the
next change is a rise to start on now. If so we boost to that temperature until the
scheduled time. When the boost ends the receiver is back on its schedule at the new
temperature, and if Home Assistant stops mid-way the receiver ends the boost by itself.
If someone cancels our boost, we leave that change alone.
"""

from __future__ import annotations

import logging
import math
from collections.abc import Callable
from datetime import datetime, timedelta
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send
from homeassistant.helpers.event import async_call_later, async_track_time_change, async_track_time_interval
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import (
    CHANNEL_HEAT,
    DEFAULT_PREHEAT_MAX_LEAD,
    DOMAIN,
    PREHEAT_LEARN_DAYS,
    PREHEAT_LEARN_INTERVAL,
    SIGNAL_STATUS,
)
from .history import async_samples, channel_entity_id
from .preheat import MIN_WARMUPS, Plan, Rate, plan, still_wanted
from .preheat import learn_rate as _learn_rate
from .schedule import DAYS
from .transports import Transport
from .z2m import BOOST_MAX_MINUTES, MODE_BOOST, MODE_MANUAL, MODE_OFF, MODE_SCHEDULE

_LOGGER = logging.getLogger(__name__)

STORE_VERSION = 1
# How long after starting a boost to wait for the receiver to report it.
SETTLE = timedelta(seconds=30)
Schedule = dict[str, list[dict[str, Any]]]


def _details(p: Plan | None) -> tuple[float, int] | None:
    return None if p is None else (p.setpoint, p.lead)


class Preheat:
    """Pre-heat for one receiver's heating channel."""

    def __init__(self, hass: HomeAssistant, transport: Transport) -> None:
        self.hass = hass
        self.transport = transport
        self.entry_id = transport.entry_id
        self.enabled = False
        self.max_lead = DEFAULT_PREHEAT_MAX_LEAD
        self.rate = Rate(None, 0)
        # Whether we have a rate to show yet (learned, or saved from before a restart),
        # and what the last attempt at learning found (for diagnostics).
        self.rate_known = False
        self._last_learn: dict[str, Any] | None = None
        self.schedule: Schedule = {}
        self._store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, f"{DOMAIN}.schedule.{self.entry_id}")
        # The scheduled change (UTC) we're pre-heating for, and ones someone cancelled.
        self.active_for: datetime | None = None
        self._skipped: set[datetime] = set()
        # The next scheduled rise worth pre-heating for, and when it is (UTC, on the minute).
        self._plan: Plan | None = None
        self._plan_at: datetime | None = None
        self._last_mode: str | None = None
        # Until then, non-boost reports don't end our pre-heat: the boost takes a moment to show.
        self._settle_until: datetime | None = None
        self._unsubs: list[Callable[[], None]] = []
        # Set by the holiday: no pre-heating while away.
        self.blocked: Callable[[], bool] = lambda: False
        # Set by rooms calling for heat: the boost running now is theirs, so we may start over it.
        self.overridable: Callable[[], bool] = lambda: False

    @property
    def available(self) -> bool:
        return CHANNEL_HEAT in self.transport.channels

    # -- lifecycle -------------------------------------------------------------

    async def async_start(self) -> None:
        if not self.available:
            return
        if stored := await self._store.async_load():
            self.schedule = stored.get(CHANNEL_HEAT) or {}
            # The warm-up rate learned before the restart, until we've learned it again.
            if isinstance(saved := stored.get("rate"), dict):
                try:
                    per_hour = saved.get("per_hour")
                    self.rate = Rate(None if per_hour is None else float(per_hour), int(saved.get("warmups") or 0))
                    self.rate_known = True
                except (TypeError, ValueError):
                    pass
            # A pre-heat that was running when HA stopped (the receiver kept boosting).
            if (at := dt_util.parse_datetime(stored.get("active_for") or "")) and at > dt_util.utcnow():
                self.active_for = at
        self._unsubs += [
            async_track_time_interval(self.hass, self._tick, timedelta(minutes=1)),
            async_track_time_interval(self.hass, self._learn_later, PREHEAT_LEARN_INTERVAL),
            # The thermostat can change the schedule too, so re-read it every night.
            async_track_time_change(self.hass, self._nightly, hour=3, minute=17, second=0),
            async_dispatcher_connect(self.hass, f"{SIGNAL_STATUS}_{self.entry_id}", self._on_status),
            # Give the recorder (and the receiver) a moment after startup.
            async_call_later(self.hass, 60, self._startup),
        ]

    async def async_stop(self) -> None:
        while self._unsubs:
            self._unsubs.pop()()

    @callback
    def _startup(self, _now: datetime) -> None:
        self.hass.async_create_task(self.async_learn())
        if self.enabled and not self._complete():
            self.hass.async_create_task(self.async_refresh_schedule())

    @callback
    def _nightly(self, _now: datetime) -> None:
        if self.enabled:
            self.hass.async_create_task(self.async_refresh_schedule())

    @callback
    def _learn_later(self, _now: datetime) -> None:
        self.hass.async_create_task(self.async_learn())

    # -- settings ---------------------------------------------------------------

    async def async_set_enabled(self, enabled: bool) -> None:
        if enabled == self.enabled:
            return
        self.enabled = enabled
        if not enabled and self.active_for is not None:
            self._set_active(None)
            if (self.transport.status(CHANNEL_HEAT) or {}).get("mode") == MODE_BOOST:
                await self.transport.async_cancel_boost(CHANNEL_HEAT)
        if enabled:
            self._skipped.clear()
        self._notify()
        if enabled:
            if not self._complete():
                self.hass.async_create_task(self.async_refresh_schedule())
            self._evaluate()

    def set_max_lead(self, minutes: int) -> None:
        self.max_lead = int(minutes)
        self._notify()
        self._evaluate()

    # -- schedule and rate --------------------------------------------------------

    def _complete(self) -> bool:
        return all(self.schedule.get(d) for d in DAYS)

    @callback
    def schedule_seen(self, channel: str, schedule: Schedule) -> None:
        """The panel read or wrote these days of the schedule."""
        if channel != CHANNEL_HEAT or not schedule:
            return
        self.schedule = {**self.schedule, **{d: list(t) for d, t in schedule.items() if t}}
        self._save()
        self._notify()
        if not self._check_active():
            self._evaluate()

    @callback
    def _check_active(self) -> bool:
        """After a schedule change: is the running pre-heat still wanted? True if we're
        stopping it (it re-plans once the boost is cancelled)."""
        status = self.transport.status(CHANNEL_HEAT) or {}
        if self.active_for is None or status.get("mode") != MODE_BOOST:
            return False
        at = dt_util.as_local(self.active_for)
        setpoint = still_wanted(self.schedule, weekday=at.weekday(), minute=at.hour * 60 + at.minute)
        if setpoint is None:
            _LOGGER.info("The schedule no longer changes at %s; stopping the pre-heat", at.strftime("%H:%M"))
            self.hass.async_create_task(self._async_stop())
            return True
        current = status.get("setpoint")
        if not isinstance(current, (int, float)) or abs(current - setpoint) > 0.25:
            # Same time, new temperature: boost to that instead, to the same end.
            _LOGGER.info("Pre-heating to %s °C instead, for %s", setpoint, at.strftime("%H:%M"))
            self._settle_until = dt_util.utcnow() + SETTLE
            self.hass.async_create_task(self._async_retarget(self.active_for, setpoint))
        return False

    async def _async_stop(self) -> None:
        # Keep active_for until the boost is cancelled, so nothing starts another meanwhile,
        # and settle, so the cancel isn't taken as someone stopping it (and skipped).
        self._settle_until = dt_util.utcnow() + SETTLE
        try:
            await self.transport.async_cancel_boost(CHANNEL_HEAT)
        except Exception:  # noqa: BLE001
            _LOGGER.warning("Pre-heat couldn't cancel its boost", exc_info=True)
        self._set_active(None)
        self._notify()
        self._evaluate()

    async def _async_retarget(self, at: datetime, setpoint: float) -> None:
        try:
            await self.transport.async_boost(CHANNEL_HEAT, self._minutes_until(at), setpoint)
        except Exception:  # noqa: BLE001
            _LOGGER.warning("Pre-heat couldn't change its boost", exc_info=True)

    async def async_refresh_schedule(self) -> None:
        try:
            schedule, _complete = await self.transport.async_read(CHANNEL_HEAT)
        except Exception:  # noqa: BLE001 - try again tonight
            _LOGGER.warning("Pre-heat couldn't read the heating schedule", exc_info=True)
            return
        if schedule:
            self.schedule_seen(CHANNEL_HEAT, schedule)

    async def async_learn(self) -> None:
        end = dt_util.utcnow()
        self._last_learn = {"at": end.isoformat()}
        if "recorder" not in self.hass.config.components:
            self._last_learn["error"] = "recorder not loaded"
            return
        entity_id = channel_entity_id(self.hass, self.entry_id, CHANNEL_HEAT)
        self._last_learn["entity_id"] = entity_id
        if entity_id is None:
            self._last_learn["error"] = "heating entity not found"
            _LOGGER.warning("Pre-heat couldn't find the heating entity to learn from")
            return
        try:
            samples = await async_samples(
                self.hass, CHANNEL_HEAT, entity_id, end - timedelta(days=PREHEAT_LEARN_DAYS), end
            )
        except Exception as err:  # noqa: BLE001 - try again later
            self._last_learn["error"] = repr(err)
            _LOGGER.warning("Pre-heat couldn't read the heating history", exc_info=True)
            return
        rate = _learn_rate(samples)
        self._last_learn.update(
            samples=len(samples), heating_samples=sum(1 for x in samples if x.heating), rate=rate.per_hour, warmups=rate.warmups
        )
        if rate.per_hour is None and self.rate.per_hour is not None:
            # Too few warm-ups in the window now (e.g. after a holiday): keep the last rate.
            _LOGGER.debug("Pre-heat found %s warm-ups; keeping %s °C/h", rate.warmups, self.rate.per_hour)
            rate = self.rate
        changed = rate != self.rate or not self.rate_known
        self.rate, self.rate_known = rate, True
        if changed:
            _LOGGER.debug("Pre-heat warm-up rate: %s", rate)
            self._save()
            self._notify()
            self._evaluate()

    @callback
    def _set_active(self, at: datetime | None) -> None:
        self.active_for = at
        self._save()

    @callback
    def _save(self) -> None:
        self._store.async_delay_save(
            lambda: {
                CHANNEL_HEAT: self.schedule,
                "rate": {"per_hour": self.rate.per_hour, "warmups": self.rate.warmups},
                "active_for": self.active_for.isoformat() if self.active_for else None,
            },
            5,
        )

    # -- deciding -----------------------------------------------------------------

    @callback
    def _tick(self, _now: datetime) -> None:
        self._evaluate()

    @callback
    def _on_status(self) -> None:
        status = self.transport.status(CHANNEL_HEAT)
        if not status:
            return  # not reported yet (e.g. just after a restart)
        mode = status.get("mode")
        prev, self._last_mode = self._last_mode, mode
        now = dt_util.utcnow()
        settling = self._settle_until is not None and now < self._settle_until
        if self.active_for is not None and mode != MODE_BOOST and not settling:
            if now < self.active_for - timedelta(minutes=2):
                # Someone ended our boost early: leave this change alone.
                _LOGGER.info("Pre-heat boost cancelled; skipping %s", self.active_for)
                self._skipped.add(self.active_for)
            self._set_active(None)
            self._notify()
        if prev in (MODE_MANUAL, MODE_OFF) and mode == MODE_SCHEDULE and self._skipped:
            # Put back on the schedule by hand: pre-heat for its changes again.
            _LOGGER.info("Heating back on schedule; pre-heat can run again")
            self._skipped.clear()
        if mode != prev:
            self._evaluate()  # don't wait for the next minute

    @callback
    def _evaluate(self) -> None:
        now = dt_util.now()
        if self.active_for is not None and now >= self.active_for:
            self._set_active(None)
        self._skipped = {t for t in self._skipped if t > now}
        status = self.transport.status(CHANNEL_HEAT) or {}
        mode = status.get("mode")
        new_plan = None
        if self.enabled and mode in (MODE_SCHEDULE, MODE_BOOST):
            new_plan = plan(
                self.schedule,
                weekday=now.weekday(),
                minute=now.hour * 60 + now.minute,
                current=status.get("current_temperature"),
                rate=self.rate.per_hour,
                max_lead=self.max_lead,
            )
        new_at = None if new_plan is None else self._at(now, new_plan.minutes_until)
        # minutes_until counts down every minute; only tell the panel when the times change.
        changed = (new_at, _details(new_plan)) != (self._plan_at, _details(self._plan))
        self._plan, self._plan_at = new_plan, new_at
        if changed:
            self._notify()
        if (
            new_plan is None
            or new_at is None
            or new_plan.start_in > 0
            or self.active_for is not None
            # Only from the schedule, not over someone's boost (the rooms' boost is fine: pre-heat wins).
            or (mode != MODE_SCHEDULE and not (mode == MODE_BOOST and self.overridable()))
            or new_at in self._skipped
        ):
            return
        if self.blocked():
            return  # on holiday
        # Claim it now, so a second evaluation before the task runs doesn't boost twice.
        self._set_active(new_at)
        self._settle_until = dt_util.utcnow() + SETTLE
        self.hass.async_create_task(self._async_begin(new_at, new_plan))

    @staticmethod
    def _minutes_until(at: datetime) -> int:
        return max(1, min(BOOST_MAX_MINUTES, math.ceil((at - dt_util.utcnow()).total_seconds() / 60)))

    @staticmethod
    def _at(now: datetime, minutes_until: int) -> datetime:
        """The scheduled change's time (UTC), on the minute."""
        return dt_util.as_utc(now.replace(second=0, microsecond=0) + timedelta(minutes=minutes_until))

    async def _async_begin(self, at: datetime, p: Plan) -> None:
        minutes = self._minutes_until(at)
        _LOGGER.info("Pre-heating to %s °C for %s (%s min)", p.setpoint, dt_util.as_local(at).strftime("%H:%M"), minutes)
        try:
            await self.transport.async_boost(CHANNEL_HEAT, minutes, p.setpoint)
        except Exception:  # noqa: BLE001
            _LOGGER.warning("Pre-heat couldn't start the boost", exc_info=True)
            self._set_active(None)
            self._skipped.add(at)
        self._notify()

    # -- reporting --------------------------------------------------------------

    @callback
    def _notify(self) -> None:
        async_dispatcher_send(self.hass, f"{SIGNAL_STATUS}_{self.entry_id}")
        async_dispatcher_send(self.hass, SIGNAL_STATUS)

    def as_dict(self) -> dict[str, Any]:
        """For the panel."""
        nxt = None
        if self._plan is not None and self._plan_at is not None:
            at = dt_util.as_local(self._plan_at)
            nxt = {
                "at": at.strftime("%H:%M"),
                "setpoint": self._plan.setpoint,
                "start": (at - timedelta(minutes=self._plan.lead)).strftime("%H:%M"),
                # Pre-heating for it was stopped early, so it won't start again.
                "skipped": self._plan_at in self._skipped,
            }
        return {
            "enabled": self.enabled,
            "max_lead": self.max_lead,
            "rate": self.rate.per_hour,
            "warmups": self.rate.warmups,
            "warmups_needed": MIN_WARMUPS,
            "rate_known": self.rate_known,
            "schedule_known": self._complete(),
            "active_for": dt_util.as_local(self.active_for).strftime("%H:%M") if self.active_for else None,
            "next": nxt,
        }

    def diagnostics(self) -> dict[str, Any]:
        return {
            **self.as_dict(),
            "last_learn": self._last_learn,
            "skipped": sorted(t.isoformat() for t in self._skipped),
            "schedule_days": sorted(d for d, t in self.schedule.items() if t),
        }

    @property
    def is_active(self) -> bool:
        return self.active_for is not None and (self.transport.status(CHANNEL_HEAT) or {}).get("mode") == MODE_BOOST
