"""Boiler demand from rooms (opt-in). Pure: no Home Assistant imports, so it's unit-testable.

When a room heated by a receiver is below its target (or one of its Hive valves is
heating) and the receiver isn't calling for heat, we ask it for heat with a **boost**:
a short lease (`LEASE_MINUTES`) renewed while the rooms still want heat. A boost is the
receiver's only self-ending timer, so if Home Assistant stops, the receiver goes back
to its schedule by itself within the lease. When the rooms are warm we cancel the boost
(back to the pre-boost mode, i.e. the schedule).

Hysteresis: demand starts at `START_BELOW` under the target and ends once every room is
within `STOP_WITHIN`; the boiler stays on at least `MIN_ON` minutes and off at least
`MIN_OFF` minutes between our requests. Only from Schedule (never Off or Manual), and by
default not during the schedule's "off" periods (1 °C) unless the user allows it.

Readings: a valve that's unavailable, off, or hasn't reported for `STALE_MINUTES` is
ignored; so is a stale room sensor (the valves' readings are used instead). A room with
no usable valves is ignored.
"""

from __future__ import annotations

import math
from dataclasses import asdict, dataclass, replace
from typing import Any

from .schedule import DAYS, HEAT_MAX, HEAT_MIN, hhmm_to_minutes

MODE_SCHEDULE = "schedule"
MODE_BOOST = "boost"

# Defaults (each one is a number entity, restored like the pre-heat ones).
START_BELOW = 0.5  # °C under the target that starts demand
STOP_WITHIN = 0.2  # every room within this of its target ends it
MIN_ON = 10  # minutes
MIN_OFF = 10  # minutes

# Our boost: this long at a time, renewed once it has less than RENEW_BELOW left.
LEASE_MINUTES = 30
RENEW_BELOW = 20
# A boost that ends this close to its lease end (seconds) ran out; earlier, someone ended it.
LEASE_GRACE = 120
# Don't start a request that would last less than this (the schedule turns off soon).
MIN_LEASE = 5

# Readings older than this (minutes) are ignored.
STALE_MINUTES = 60
# A valve's PI heating demand (%) at or above this counts as heating, where it's reported.
PI_HEATING_MIN = 10

# The boost asks for this much above what the receiver is aiming for, so it fires.
BOOST_MARGIN = 2.0
BOOST_FLOOR = 5.0  # the receiver's lowest boost temperature
SETPOINT_TOLERANCE = 0.25

# What to do (decide()).
IDLE = "idle"
START = "start"
KEEP = "keep"
STOP = "stop"

Schedule = dict[str, list[dict[str, Any]]]


def _number(value: Any) -> float | None:
    if isinstance(value, bool):
        return None
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return number if number == number else None  # drop NaN


@dataclass(frozen=True)
class Reading:
    """One usable valve: its temperature, target, and whether it's open for heat."""

    current: float | None
    target: float | None
    heating: bool


def valve_reading(state: str | None, attributes: dict[str, Any], age_minutes: float | None) -> Reading | None:
    """A valve's climate entity state, or None if it can't be trusted (unavailable, off, stale)."""
    if state in (None, "unavailable", "unknown", "off"):
        return None
    if age_minutes is None or age_minutes > STALE_MINUTES:
        return None
    pi = _number(attributes.get("pi_heating_demand"))
    heating = attributes.get("hvac_action") == "heating" or (pi is not None and pi >= PI_HEATING_MIN)
    return Reading(_number(attributes.get("current_temperature")), _number(attributes.get("temperature")), heating)


@dataclass(frozen=True)
class Need:
    """One room's state: how far below its target it is, and whether a valve is heating."""

    room: str
    current: float | None
    target: float | None
    heating: bool

    @property
    def deficit(self) -> float | None:
        if self.current is None or self.target is None:
            return None
        return round(self.target - self.current, 2)


def room_need(room: str, valves: list[Reading], sensor: float | None = None) -> Need | None:
    """A room's need from its usable valves and its (fresh) sensor; None if there's nothing to go on."""
    if not valves:
        return None
    readings = [v.current for v in valves if v.current is not None]
    current = sensor if sensor is not None else (round(sum(readings) / len(readings), 1) if readings else None)
    targets = [v.target for v in valves if v.target is not None]
    target = max(targets) if targets else None
    heating = any(v.heating for v in valves)
    if current is None and not heating:
        return None
    return Need(room, current, target, heating)


def calling(needs: list[Need], running: bool, start_below: float = START_BELOW, stop_within: float = STOP_WITHIN) -> list[Need]:
    """The rooms that want heat, with hysteresis: harder to start than to keep going.

    A valve that says it's heating counts only while its room is below the target (or the
    room's temperature isn't known): a valve turned down closes over several minutes and
    keeps reporting "heating" meanwhile, which mustn't keep the boiler on.
    """
    out = []
    for need in needs:
        deficit = need.deficit
        if need.heating and (deficit is None or deficit > 0):
            out.append(need)
        elif deficit is not None and (deficit > stop_within if running else deficit >= start_below):
            out.append(need)
    return out


def decide(
    *,
    running: bool,
    wanted: bool,
    mode: str | None,
    schedule_off: bool,
    outside_schedule: bool,
    receiver_heating: bool,
    now: float,
    started: float | None,
    last_end: float | None,
    min_on: float = MIN_ON,
    min_off: float = MIN_OFF,
    suppressed: bool = False,
    lease: int = LEASE_MINUTES,
) -> str:
    """IDLE, START, KEEP or STOP. Times are epoch seconds; `mode` is the receiver's mode now.

    The caller handles what's not ours (holiday, pre-heat, someone else's boost) first.
    """
    if running:
        if schedule_off and not outside_schedule:
            return STOP  # the schedule says off: respect it at once
        if not wanted and (started is None or now - started >= min_on * 60):
            return STOP
        return KEEP
    if not wanted or suppressed or mode != MODE_SCHEDULE:
        return IDLE
    if schedule_off and not outside_schedule:
        return IDLE
    if receiver_heating:
        return IDLE  # it's already heating: nothing to add
    if last_end is not None and now - last_end < min_off * 60:
        return IDLE
    if lease < MIN_LEASE:
        return IDLE
    return START


def boost_setpoint(needs: list[Need], scheduled: float | None, receiver_current: float | None) -> float:
    """A temperature that makes the receiver fire: above what it aims for, its own reading
    and what the rooms want. In 0.5 °C steps, within the receiver's boost range."""
    wanted = [BOOST_FLOOR]
    if scheduled is not None and scheduled > HEAT_MIN:
        wanted.append(scheduled + BOOST_MARGIN)
    if receiver_current is not None:
        wanted.append(receiver_current + 1)
    wanted += [n.target for n in needs if n.target is not None]
    return min(HEAT_MAX, math.ceil(max(wanted) * 2) / 2)


def _transitions(schedule: Schedule, weekday: int) -> list[tuple[int, float]] | None:
    day = schedule.get(DAYS[weekday % 7])
    if not day:
        return None
    try:
        return sorted((hhmm_to_minutes(t["time"]), float(t["setpoint"])) for t in day)
    except (KeyError, TypeError, ValueError):
        return None


def scheduled_now(schedule: Schedule, *, weekday: int, minute: int) -> float | None:
    """What the schedule holds now (weekday 0 = Monday, minute of the day), or None if unknown."""
    today = _transitions(schedule, weekday)
    if today is None:
        return None
    earlier = [sp for m, sp in today if m <= minute]
    if earlier:
        return earlier[-1]
    yesterday = _transitions(schedule, weekday - 1)
    return yesterday[-1][1] if yesterday else None


def minutes_until_off(schedule: Schedule, *, weekday: int, minute: int) -> int | None:
    """Minutes until the schedule's next "off" (1 °C) change, within a day; None if none or unknown."""
    for offset in range(2):
        day = _transitions(schedule, weekday + offset)
        if day is None:
            return None
        for m, sp in day:
            at = m + offset * 1440
            if at > minute and sp <= HEAT_MIN:
                return at - minute
    return None


def lease_minutes(until_off: int | None, outside_schedule: bool) -> int:
    """How long our boost runs: the lease, ending when the schedule turns off unless allowed past it."""
    if until_off is None or outside_schedule:
        return LEASE_MINUTES
    return max(1, min(LEASE_MINUTES, until_off))


def needs_renewal(remaining: int | None, wanted: int) -> bool:
    """Top the boost up once it has run down (or if it runs past what we want)."""
    if remaining is None:
        return True
    return remaining < min(RENEW_BELOW, wanted) or remaining > wanted + 2


def is_ours(run_setpoint: float | None, mode: str | None, setpoint: Any) -> bool:
    return (
        mode == MODE_BOOST
        and run_setpoint is not None
        and isinstance(setpoint, (int, float))
        and not isinstance(setpoint, bool)
        and abs(setpoint - run_setpoint) <= SETPOINT_TOLERANCE
    )


@dataclass(frozen=True)
class Run:
    """Our running request: since when, until when the boost runs (epoch), at what, for which rooms."""

    started: float
    lease_end: float
    setpoint: float
    rooms: tuple[str, ...] = ()

    def as_store(self) -> dict[str, Any]:
        return asdict(self) | {"rooms": list(self.rooms)}

    @classmethod
    def from_store(cls, data: Any) -> Run | None:
        try:
            return cls(
                started=float(data["started"]),
                lease_end=float(data["lease_end"]),
                setpoint=float(data["setpoint"]),
                rooms=tuple(str(r) for r in data.get("rooms") or ()),
            )
        except (KeyError, TypeError, ValueError, AttributeError):
            return None


# -- overshoot -------------------------------------------------------------------------
#
# When we stop because the rooms are warm, the radiators are still hot and the rooms keep
# warming for a while. We watch each room after a stop until it has clearly peaked (or for
# `COAST_MINUTES`), and keep what happened (`Overshoot`), so we can see how far past its
# target each room goes before changing when we stop. Recording only: nothing here changes
# what the boiler does.

COAST_MINUTES = 45  # watch a room this long after we stop
PEAKED_BY = 0.3  # °C below the peak that says it's past it
TRAIL_MINUTES = 15  # the rate of rise at the stop is taken over this long
TRAIL_MIN_MINUTES = 5  # and needs at least this much of it
KEEP_RUNS = 10  # per room
MIN_RUNS = 3  # before there's a median


def rise_rate(trail: list[tuple[float, float]], now: float) -> float | None:
    """°C per hour over the last `TRAIL_MINUTES` of (epoch, temperature) readings, or None."""
    recent = [(t, c) for t, c in trail if now - t <= TRAIL_MINUTES * 60]
    if len(recent) < 2:
        return None
    (t0, c0), (t1, c1) = recent[0], recent[-1]
    if t1 - t0 < TRAIL_MIN_MINUTES * 60:
        return None
    return round((c1 - c0) / ((t1 - t0) / 3600), 2)


@dataclass(frozen=True)
class Coast:
    """A room being watched after we stopped heating it."""

    room: str
    target: float
    stopped: float  # epoch
    stopped_at: float  # the room's temperature then
    rate: float | None  # °C/h rising when we stopped
    why: str  # "warm", "schedule_off", "turned_off"
    peak: float
    peak_at: float
    receiver_heated: bool = False  # the receiver fired by itself meanwhile

    @classmethod
    def begin(cls, need: Need, now: float, rate: float | None, why: str) -> Coast | None:
        if need.current is None or need.target is None:
            return None
        return cls(need.room, need.target, now, need.current, rate, why, need.current, now)

    def update(self, current: float | None, now: float, receiver_heating: bool) -> Coast:
        out = self
        if current is not None and current > self.peak:
            out = replace(out, peak=current, peak_at=now)
        if receiver_heating and not out.receiver_heated:
            out = replace(out, receiver_heated=True)
        return out

    def over(self, current: float | None, now: float) -> bool:
        if now - self.stopped >= COAST_MINUTES * 60:
            return True
        return current is not None and current <= self.peak - PEAKED_BY

    def result(self, *, cut_short: bool = False) -> dict[str, Any]:
        """What's kept: times as epoch seconds, temperatures in °C."""
        return {
            "stopped": self.stopped,
            "why": self.why,
            "target": self.target,
            "stopped_at": self.stopped_at,
            "peak": self.peak,
            "overshoot": round(self.peak - self.target, 2),
            "rise": round(self.peak - self.stopped_at, 2),
            "minutes_to_peak": round((self.peak_at - self.stopped) / 60),
            "rate": self.rate,
            "receiver_heated": self.receiver_heated,
            "cut_short": cut_short,
        }


def keep_run(runs: list[dict[str, Any]], run: dict[str, Any]) -> list[dict[str, Any]]:
    """Add a run to a room's history, keeping the latest `KEEP_RUNS`."""
    return [*runs, run][-KEEP_RUNS:]


def median_overshoot(runs: list[dict[str, Any]]) -> float | None:
    """The median overshoot of the runs that tell us something: we stopped because the room
    was warm, watched it to its peak, and the receiver didn't fire by itself meanwhile.
    None with fewer than `MIN_RUNS`."""
    values = sorted(
        float(r["overshoot"])
        for r in runs
        if r.get("why") == "warm"
        and not r.get("receiver_heated")
        and not r.get("cut_short")
        and isinstance(r.get("overshoot"), (int, float))
    )
    if len(values) < MIN_RUNS:
        return None
    mid = len(values) // 2
    return round(values[mid] if len(values) % 2 else (values[mid - 1] + values[mid]) / 2, 2)
