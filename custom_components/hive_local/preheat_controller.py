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
from .preheat import MIN_WARMUPS, Plan, Rate, plan
from .preheat import learn_rate as _learn_rate
from .schedule import DAYS
from .transports import Transport
from .z2m import BOOST_MAX_MINUTES, MODE_BOOST, MODE_SCHEDULE

_LOGGER = logging.getLogger(__name__)

STORE_VERSION = 1
Schedule = dict[str, list[dict[str, Any]]]


class Preheat:
    """Pre-heat for one receiver's heating channel."""

    def __init__(self, hass: HomeAssistant, transport: Transport) -> None:
        self.hass = hass
        self.transport = transport
        self.entry_id = transport.entry_id
        self.enabled = False
        self.max_lead = DEFAULT_PREHEAT_MAX_LEAD
        self.rate = Rate(None, 0)
        self.schedule: Schedule = {}
        self._store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, f"{DOMAIN}.schedule.{self.entry_id}")
        # The scheduled change (UTC) we're pre-heating for, and ones someone cancelled.
        self.active_for: datetime | None = None
        self._skipped: set[datetime] = set()
        self._plan: Plan | None = None
        self._plan_key: tuple[datetime, float, int] | None = None
        self._unsubs: list[Callable[[], None]] = []
        self._starting = False
        # Set by the holiday: no pre-heating while away.
        self.blocked: Callable[[], bool] = lambda: False

    @property
    def available(self) -> bool:
        return CHANNEL_HEAT in self.transport.channels

    # -- lifecycle -------------------------------------------------------------

    async def async_start(self) -> None:
        if not self.available:
            return
        if stored := await self._store.async_load():
            self.schedule = stored.get(CHANNEL_HEAT) or {}
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
            self.active_for = None
            self._save()
            if (self.transport.status(CHANNEL_HEAT) or {}).get("mode") == MODE_BOOST:
                await self.transport.async_cancel_boost(CHANNEL_HEAT)
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
        self._evaluate()

    async def async_refresh_schedule(self) -> None:
        try:
            schedule, _complete = await self.transport.async_read(CHANNEL_HEAT)
        except Exception:  # noqa: BLE001 - try again tonight
            _LOGGER.warning("Pre-heat couldn't read the heating schedule", exc_info=True)
            return
        if schedule:
            self.schedule_seen(CHANNEL_HEAT, schedule)

    async def async_learn(self) -> None:
        if "recorder" not in self.hass.config.components:
            return
        entity_id = channel_entity_id(self.hass, self.entry_id, CHANNEL_HEAT)
        if entity_id is None:
            return
        end = dt_util.utcnow()
        try:
            samples = await async_samples(
                self.hass, CHANNEL_HEAT, entity_id, end - timedelta(days=PREHEAT_LEARN_DAYS), end
            )
        except Exception:  # noqa: BLE001 - try again later
            _LOGGER.warning("Pre-heat couldn't read the heating history", exc_info=True)
            return
        rate = _learn_rate(samples)
        if rate != self.rate:
            _LOGGER.debug("Pre-heat warm-up rate: %s", rate)
            self.rate = rate
            self._notify()

    @callback
    def _save(self) -> None:
        self._store.async_delay_save(
            lambda: {
                CHANNEL_HEAT: self.schedule,
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
        if self.active_for is not None and status.get("mode") != MODE_BOOST and not self._starting:
            if dt_util.utcnow() < self.active_for - timedelta(minutes=2):
                # Someone ended our boost early: leave this change alone.
                _LOGGER.info("Pre-heat boost cancelled; skipping %s", self.active_for)
                self._skipped.add(self.active_for)
            self.active_for = None
            self._save()
            self._notify()

    @callback
    def _evaluate(self) -> None:
        now = dt_util.now()
        if self.active_for is not None and dt_util.utcnow() >= self.active_for:
            self.active_for = None
            self._save()
        self._skipped = {t for t in self._skipped if t > dt_util.utcnow()}
        status = self.transport.status(CHANNEL_HEAT)
        new_plan = None
        if self.enabled and status and status.get("mode") in (MODE_SCHEDULE, MODE_BOOST):
            new_plan = plan(
                self.schedule,
                weekday=now.weekday(),
                minute=now.hour * 60 + now.minute,
                current=status.get("current_temperature"),
                rate=self.rate.per_hour,
                max_lead=self.max_lead,
            )
        self._plan = new_plan
        # minutes_until counts down every minute; only tell the panel when the times change.
        key = None if new_plan is None else (self._at(now, new_plan.minutes_until), new_plan.setpoint, new_plan.lead)
        if key != self._plan_key:
            self._plan_key = key
            self._notify()
        if new_plan is None or new_plan.start_in > 0 or self.active_for is not None:
            return
        if not status or status.get("mode") != MODE_SCHEDULE:
            return  # only from the schedule (not over someone's boost)
        if self.blocked():
            return  # on holiday
        at = self._at(now, new_plan.minutes_until)
        if at in self._skipped:
            return
        self.hass.async_create_task(self._async_begin(at, new_plan))

    @staticmethod
    def _at(now: datetime, minutes_until: int) -> datetime:
        """The scheduled change's time (UTC), on the minute."""
        return dt_util.as_utc(now.replace(second=0, microsecond=0) + timedelta(minutes=minutes_until))

    async def _async_begin(self, at: datetime, p: Plan) -> None:
        minutes = max(1, min(BOOST_MAX_MINUTES, math.ceil((at - dt_util.utcnow()).total_seconds() / 60)))
        _LOGGER.info("Pre-heating to %s °C for %s (%s min)", p.setpoint, dt_util.as_local(at).strftime("%H:%M"), minutes)
        self.active_for = at
        self._save()
        self._starting = True
        try:
            await self.transport.async_boost(CHANNEL_HEAT, minutes, p.setpoint)
        except Exception:  # noqa: BLE001
            _LOGGER.warning("Pre-heat couldn't start the boost", exc_info=True)
            self.active_for = None
            self._save()
            self._skipped.add(at)
        finally:
            # The receiver's boost state may take a moment to arrive.
            self.hass.loop.call_later(30, self._started)
        self._notify()

    @callback
    def _started(self) -> None:
        self._starting = False

    # -- reporting --------------------------------------------------------------

    @callback
    def _notify(self) -> None:
        async_dispatcher_send(self.hass, f"{SIGNAL_STATUS}_{self.entry_id}")
        async_dispatcher_send(self.hass, SIGNAL_STATUS)

    def as_dict(self) -> dict[str, Any]:
        """For the panel."""
        now = dt_util.now()
        nxt = None
        if self._plan is not None:
            at = now + timedelta(minutes=self._plan.minutes_until)
            nxt = {
                "at": at.strftime("%H:%M"),
                "setpoint": self._plan.setpoint,
                "start": (at - timedelta(minutes=self._plan.lead)).strftime("%H:%M"),
            }
        return {
            "enabled": self.enabled,
            "max_lead": self.max_lead,
            "rate": self.rate.per_hour,
            "warmups": self.rate.warmups,
            "warmups_needed": MIN_WARMUPS,
            "schedule_known": self._complete(),
            "active_for": dt_util.as_local(self.active_for).strftime("%H:%M") if self.active_for else None,
            "next": nxt,
        }

    @property
    def is_active(self) -> bool:
        return self.active_for is not None and (self.transport.status(CHANNEL_HEAT) or {}).get("mode") == MODE_BOOST
