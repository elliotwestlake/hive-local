"""Rooms call for heat (opt-in, per receiver): ask the receiver for heat when a room needs it.

Every minute, while the heating follows its schedule, we look at the rooms this receiver
heats (`demand.py` decides). If one is cold or a valve is heating and the receiver isn't,
we boost the heating for a short lease (30 min), renewed while the rooms still want heat,
and cancel the boost (back to the schedule) once they're warm. If Home Assistant stops,
the receiver ends the boost by itself and carries on with its schedule.

Priority: a holiday or a pre-heat wins (we don't start, and step aside if one takes
over). If someone cancels our boost, changes the mode or boosts on top, we leave it:
a cancel or a mode change stops us until the rooms are warm again (or the heating is put
back on the schedule from Manual or Off); someone's boost on top just ends this request.

The running request is kept in `.storage/hive_local.demand.<entry_id>`, so a restart
mid-way picks it up again (or notices the lease ran out while HA was down).
"""

from __future__ import annotations

import logging
from collections.abc import Callable
from datetime import datetime, timedelta
from typing import TYPE_CHECKING, Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send
from homeassistant.helpers.event import async_call_later, async_track_time_interval
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from . import demand as d
from .const import CHANNEL_HEAT, DOMAIN, SIGNAL_STATUS
from .schedule import HEAT_MIN
from .transports import Transport
from .z2m import MODE_BOOST, MODE_MANUAL, MODE_OFF, MODE_SCHEDULE

if TYPE_CHECKING:
    from .holiday_controller import Holiday
    from .preheat_controller import Preheat

_LOGGER = logging.getLogger(__name__)

STORE_VERSION = 1
# After we send something (or start up) the new state can take a moment to arrive.
SETTLE_SECONDS = 30
TICK = timedelta(minutes=1)


class Demand:
    """Rooms calling for heat, for one receiver's heating."""

    def __init__(self, hass: HomeAssistant, transport: Transport, preheat: Preheat, holiday: Holiday) -> None:
        self.hass = hass
        self.transport = transport
        self.preheat = preheat
        self.holiday = holiday
        self.entry_id = transport.entry_id
        # Settings (switches and numbers, restored by them).
        self.enabled = False
        self.outside_schedule = False
        self.start_below = d.START_BELOW
        self.stop_within = d.STOP_WITHIN
        self.min_on = d.MIN_ON
        self.min_off = d.MIN_OFF
        # Our running request, and when the last one ended (for the minimum off time).
        self.run: d.Run | None = None
        self.last_end: float | None = None
        # Someone stopped us (cancelled our boost or changed the mode): wait until the rooms are warm.
        self.suppressed = False
        # The rooms calling now and why we're not acting, for the panel and diagnostics.
        self.calling: list[d.Need] = []
        self.needs: list[d.Need] = []
        self.reason: str | None = "off"
        self._store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, f"{DOMAIN}.demand.{self.entry_id}")
        self._settle_until = 0.0
        self._busy = False
        # The receiver has reported the current request's boost.
        self._seen = False
        self._last_mode: str | None = None
        self._recheck: Callable[[], None] | None = None
        self._unsubs: list[Callable[[], None]] = []

    @property
    def available(self) -> bool:
        return CHANNEL_HEAT in self.transport.channels

    # -- lifecycle -------------------------------------------------------------

    async def async_start(self) -> None:
        if not self.available:
            return
        stored = await self._store.async_load() or {}
        self.run = d.Run.from_store(stored.get("run")) if stored.get("run") else None
        if isinstance(stored.get("last_end"), (int, float)):
            self.last_end = float(stored["last_end"])
        self.suppressed = bool(stored.get("suppressed"))
        if self.run:
            _LOGGER.info("Rooms were calling for heat when Home Assistant stopped (%s)", ", ".join(self.run.rooms))
            self._settle()  # give the receiver a moment to report
        self._unsubs += [
            async_dispatcher_connect(self.hass, f"{SIGNAL_STATUS}_{self.entry_id}", self._on_status),
            async_track_time_interval(self.hass, self._tick, TICK),
        ]

    async def async_stop(self) -> None:
        while self._unsubs:
            self._unsubs.pop()()
        if self._recheck:
            self._recheck()
            self._recheck = None

    # -- settings ----------------------------------------------------------------

    async def async_set_enabled(self, enabled: bool) -> None:
        if enabled == self.enabled:
            return
        self.enabled = enabled
        self.suppressed = False
        if enabled:
            self._want_schedule()
            self._evaluate()
        elif self.run is not None:
            await self._async_end("turned off")
        self._save()
        self._notify()

    async def async_set_outside_schedule(self, allowed: bool) -> None:
        self.outside_schedule = allowed
        self._notify()
        self._evaluate()

    def set_number(self, key: str, value: float) -> None:
        setattr(self, key, value)
        self._notify()

    @callback
    def _want_schedule(self) -> None:
        """Pre-heat keeps the onboard schedule; read it if we don't have the whole week."""
        if not self.preheat._complete():  # noqa: SLF001 - same package
            self.hass.async_create_task(self.preheat.async_refresh_schedule())

    # -- reading the rooms --------------------------------------------------------

    def _rooms(self) -> list[dict[str, Any]]:
        from .room_manager import DATA_ROOMS  # noqa: PLC0415 - avoid an import cycle

        manager = self.hass.data.get(DATA_ROOMS)
        if manager is None:
            return []
        return [r for r in manager.rooms if r.get("receiver") in (self.entry_id, None)]

    def _age(self, state: Any, now: datetime) -> float:
        reported = getattr(state, "last_reported", None) or state.last_updated
        return (now - reported).total_seconds() / 60

    @callback
    def _read_needs(self) -> list[d.Need]:
        now = dt_util.utcnow()
        needs = []
        for room in self._rooms():
            readings = []
            for entity_id in room.get("valves") or []:
                state = self.hass.states.get(entity_id)
                if state is None:
                    continue
                if reading := d.valve_reading(state.state, dict(state.attributes), self._age(state, now)):
                    readings.append(reading)
            sensor = None
            if room.get("sensor") and (s := self.hass.states.get(room["sensor"])) is not None:
                if self._age(s, now) <= d.STALE_MINUTES:
                    sensor = d._number(s.state)  # noqa: SLF001
            if need := d.room_need(room.get("name") or room.get("id", "?"), readings, sensor):
                needs.append(need)
        return needs

    def _scheduled(self, status: dict[str, Any]) -> float | None:
        """What the schedule holds now: from the cached schedule, else the receiver's last report on it."""
        now = dt_util.now()
        if (sp := d.scheduled_now(self.preheat.schedule, weekday=now.weekday(), minute=now.hour * 60 + now.minute)) is not None:
            return sp
        if status.get("mode") == MODE_SCHEDULE:
            return status.get("setpoint")
        mode, setpoint = self.transport.resume_state(CHANNEL_HEAT)
        return setpoint if mode == MODE_SCHEDULE else None

    def _until_off(self) -> int | None:
        now = dt_util.now()
        return d.minutes_until_off(self.preheat.schedule, weekday=now.weekday(), minute=now.hour * 60 + now.minute)

    # -- who else is in charge ------------------------------------------------------

    def _blocked(self) -> str | None:
        if CHANNEL_HEAT in self.holiday.away:
            return "holiday"
        if self.preheat.active_for is not None:
            return "preheat"
        return None

    def _ours(self, status: dict[str, Any] | None) -> bool:
        return bool(status) and self.run is not None and d.is_ours(self.run.setpoint, status.get("mode"), status.get("setpoint"))

    @property
    def is_active(self) -> bool:
        """Our boost is running on the receiver right now."""
        return self._ours(self.transport.status(CHANNEL_HEAT)) and self._blocked() is None

    def owns_boost(self) -> bool:
        """For pre-heat: the boost running now is ours, so it may start over it."""
        return self.is_active

    # -- watching ------------------------------------------------------------------

    @callback
    def _settle(self) -> None:
        self._settle_until = dt_util.utcnow().timestamp() + SETTLE_SECONDS
        if self._recheck:
            self._recheck()

        @callback
        def _again(_now: datetime) -> None:
            self._recheck = None
            self._on_status()

        self._recheck = async_call_later(self.hass, SETTLE_SECONDS + 1, _again)

    @callback
    def _on_status(self) -> None:
        status = self.transport.status(CHANNEL_HEAT)
        if not status or self._busy:
            return
        mode = status.get("mode")
        prev, self._last_mode = self._last_mode, mode
        if prev in (MODE_MANUAL, MODE_OFF) and mode == MODE_SCHEDULE and self.suppressed:
            _LOGGER.info("Heating back on schedule; rooms can call for heat again")
            self.suppressed = False
            self._save()
        if self.run is None:
            return
        now = dt_util.utcnow().timestamp()
        if blocked := self._blocked():
            # A holiday or pre-heat took over (its boost replaces ours): step aside, don't cancel.
            self._release(blocked)
            return
        if mode == MODE_BOOST:
            if self._ours(status):
                self._seen = True
            elif now >= self._settle_until:
                self._release("someone else's boost")
            return
        if now < self._settle_until:
            return
        if not self._seen:
            # The receiver never showed our boost (or HA restarted and it's not boosting).
            self._release("not taken up")
        elif now >= self.run.lease_end - d.LEASE_GRACE:
            # Our boost ran out (HA was down, or a renewal failed): the next check may ask again.
            _LOGGER.info("Rooms' heat request ran out")
            self._release("lapsed", at=self.run.lease_end)
        else:
            # Someone cancelled our boost or changed the mode: leave it until the rooms are warm.
            _LOGGER.info("Rooms' heat request stopped (heating now %s); waiting until the rooms are warm", mode)
            self.suppressed = True
            self._release("stopped")

    @callback
    def _release(self, why: str, at: float | None = None) -> None:
        _LOGGER.debug("Rooms' heat request ended: %s", why)
        self.run = None
        self.last_end = at if at is not None else dt_util.utcnow().timestamp()
        self._save()
        self._notify()

    @callback
    def _tick(self, _now: datetime | None = None) -> None:
        self._evaluate()

    @callback
    def _evaluate(self) -> None:
        if not self.available or self._busy:
            return
        status = self.transport.status(CHANNEL_HEAT)
        needs = self._read_needs()
        before = (self.reason, [n.room for n in self.calling])
        try:
            self._decide(status, needs)
        finally:
            if (self.reason, [n.room for n in self.calling]) != before:
                self._notify()

    @callback
    def _decide(self, status: dict[str, Any] | None, needs: list[d.Need]) -> None:
        self.needs = needs
        now = dt_util.utcnow().timestamp()
        if not self.enabled:
            self.calling, self.reason = [], "off"
            return
        if not status:
            self.reason = "waiting"
            return
        if self.run is not None and not self._ours(status):
            return  # just sent, or someone else's: _on_status sorts it out
        running = self.run is not None
        if blocked := self._blocked():
            self.calling, self.reason = [], blocked
            return
        self.calling = d.calling(needs, running, self.start_below, self.stop_within)
        if self.suppressed and not d.calling(needs, True, self.start_below, self.stop_within):
            _LOGGER.info("Rooms are warm again; they can call for heat next time")
            self.suppressed = False
            self._save()
        scheduled = self._scheduled(status)
        schedule_off = scheduled is not None and scheduled <= HEAT_MIN
        lease = d.lease_minutes(self._until_off(), self.outside_schedule)
        verdict = d.decide(
            running=running,
            wanted=bool(self.calling),
            mode=status.get("mode"),
            schedule_off=schedule_off,
            outside_schedule=self.outside_schedule,
            receiver_heating=bool(status.get("heating")),
            now=now,
            started=self.run.started if self.run else None,
            last_end=self.last_end,
            min_on=self.min_on,
            min_off=self.min_off,
            suppressed=self.suppressed,
            lease=lease,
        )
        self.reason = self._why(verdict, status, schedule_off, now)
        setpoint = d.boost_setpoint(self.calling or needs, scheduled, status.get("current_temperature"))
        if verdict == d.START:
            rooms = tuple(n.room for n in self.calling)
            _LOGGER.info("%s calling for heat: boosting the heating to %s °C for %s min", ", ".join(rooms), setpoint, lease)
            self._claim(d.Run(started=now, lease_end=now + lease * 60, setpoint=setpoint, rooms=rooms), lease)
        elif verdict == d.KEEP and self.run is not None:
            renew = d.needs_renewal(status.get("boost_remaining"), lease)
            if renew or abs(setpoint - self.run.setpoint) >= 0.5:
                rooms = tuple(n.room for n in self.calling) or self.run.rooms
                self._claim(d.Run(started=self.run.started, lease_end=now + lease * 60, setpoint=setpoint, rooms=rooms), lease)
        elif verdict == d.STOP:
            why = "the schedule is off" if schedule_off else "the rooms are warm"
            self.hass.async_create_task(self._async_end(why))

    def _why(self, verdict: str, status: dict[str, Any], schedule_off: bool, now: float) -> str | None:
        """Why nothing's happening (None while we're asking for heat)."""
        if verdict in (d.START, d.KEEP):
            return None
        if not self.calling:
            return "warm" if self.needs else "no_rooms"
        if self.suppressed:
            return "stopped"
        if status.get("mode") != MODE_SCHEDULE:
            return "mode"
        if schedule_off and not self.outside_schedule:
            return "schedule_off"
        if status.get("heating"):
            return "heating"
        return "waiting"  # minimum off time, or the schedule turns off very soon

    # -- talking to the receiver ---------------------------------------------------

    @callback
    def _claim(self, run: d.Run, minutes: int) -> None:
        """Take (or renew) the request now, so the reports our boost causes are recognised
        as ours and a second check before the boost is sent doesn't send it twice."""
        previous, self.run = self.run, run
        if previous is None:
            self._seen = False
        self._busy = True
        self._settle()
        self._save()
        self.hass.async_create_task(self._async_boost(run, minutes, previous))

    async def _async_boost(self, run: d.Run, minutes: int, previous: d.Run | None) -> None:
        try:
            await self.transport.async_boost(CHANNEL_HEAT, minutes, run.setpoint)
        except Exception:  # noqa: BLE001 - try again at the next check
            _LOGGER.warning("Rooms couldn't ask the receiver for heat", exc_info=True)
            if self.run == run:
                self.run = previous
                self._save()
        finally:
            self._busy = False
        self._notify()

    async def _async_end(self, why: str) -> None:
        """Hand back: cancel our boost, so the receiver goes back to its pre-boost mode."""
        if self.run is None:
            return
        _LOGGER.info("Rooms' heat request over (%s): back to the schedule", why)
        status = self.transport.status(CHANNEL_HEAT) or {}
        settling = dt_util.utcnow().timestamp() < self._settle_until
        # Ours, or just sent and not reported yet (not a holiday's or pre-heat's).
        ours = self._blocked() is None and status.get("mode") == MODE_BOOST and (self._ours(status) or settling)
        self.run = None
        self.last_end = dt_util.utcnow().timestamp()
        self._settle()
        self._save()
        self._notify()
        if not ours:
            return
        self._busy = True
        try:
            await self.transport.async_cancel_boost(CHANNEL_HEAT)
        except Exception:  # noqa: BLE001 - the lease runs out by itself
            _LOGGER.warning("Rooms couldn't cancel their boost; it ends by itself", exc_info=True)
        finally:
            self._busy = False

    # -- reporting -------------------------------------------------------------------

    @callback
    def _save(self) -> None:
        self._store.async_delay_save(
            lambda: {"run": self.run.as_store() if self.run else None, "last_end": self.last_end, "suppressed": self.suppressed},
            1,
        )

    @callback
    def _notify(self) -> None:
        async_dispatcher_send(self.hass, f"{SIGNAL_STATUS}_{self.entry_id}")
        async_dispatcher_send(self.hass, SIGNAL_STATUS)

    def rooms_heating(self) -> list[str] | None:
        """The rooms we're heating for right now (the climate entity's `room_demand`), or None."""
        return list(self.run.rooms) if self.run and self.is_active else None

    def as_dict(self) -> dict[str, Any]:
        """For the panel."""
        return {
            "enabled": self.enabled,
            "outside_schedule": self.outside_schedule,
            "active": self.is_active,
            "rooms": self.rooms_heating() or [],
            "calling": [n.room for n in self.calling],
            "setpoint": self.run.setpoint if self.run else None,
            "reason": self.reason,
            "start_below": self.start_below,
            "stop_within": self.stop_within,
            "min_on": self.min_on,
            "min_off": self.min_off,
        }

    def diagnostics(self) -> dict[str, Any]:
        return {
            **self.as_dict(),
            "run": self.run.as_store() if self.run else None,
            "last_end": dt_util.utc_from_timestamp(self.last_end).isoformat() if self.last_end else None,
            "suppressed": self.suppressed,
            "needs": [
                {"room": n.room, "current": n.current, "target": n.target, "heating": n.heating} for n in self.needs
            ],
        }
