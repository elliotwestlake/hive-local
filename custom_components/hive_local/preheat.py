"""Pre-heat: start heating early so the room is warm at the scheduled time. Pure: no HA imports.

`learn_rate` looks at recorded history (stats.Sample) for warm-ups: stretches where the
boiler ran from well below the target, and how fast the room temperature rose. The
median of those is the channel's warm-up rate in °C per hour.

`plan` takes the onboard schedule, the time now, the room temperature and that rate,
and says whether the next scheduled change is a rise worth pre-heating for, and when
to start. The controller then boosts to the new temperature until the scheduled time,
so if Home Assistant stops, the receiver simply goes back to its schedule.
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from statistics import median
from typing import Any

from .schedule import DAYS, HEAT_MIN, hhmm_to_minutes
from .stats import Sample

# A warm-up counts if the boiler ran at least this long, starting at least this far
# below the target, and the room rose at least this much.
WARMUP_MIN_MINUTES = 20
WARMUP_MIN_GAP = 1.0
WARMUP_MIN_RISE = 0.3
# Rates outside this are sensor noise or a bad sample.
RATE_MIN = 0.3
RATE_MAX = 6.0
# How many warm-ups are needed before pre-heating starts.
MIN_WARMUPS = 3
# Start this many minutes earlier than the rate alone says (the boiler and radiators
# take a while to get going).
MARGIN_MINUTES = 10
# Don't pre-heat for a rise this small.
MIN_RISE = 0.5

Schedule = dict[str, list[dict[str, Any]]]


@dataclass(frozen=True)
class Rate:
    per_hour: float | None  # None until there are MIN_WARMUPS warm-ups
    warmups: int


@dataclass(frozen=True)
class Plan:
    minutes_until: int  # until the scheduled rise
    setpoint: float  # the temperature it rises to
    start_in: int  # minutes until pre-heating should start (<= 0: now)
    lead: int  # minutes of pre-heating needed


def learn_rate(samples: list[Sample]) -> Rate:
    """Warm-up rate from recorded history (oldest first or not; it's sorted here)."""
    samples = sorted(samples, key=lambda s: s.t)
    rates: list[float] = []
    i = 0
    while i < len(samples):
        s = samples[i]
        if not (s.heating and s.mode not in (None, "off")):
            i += 1
            continue
        # A run of heating samples from i to j (exclusive).
        j = i
        while j < len(samples) and samples[j].heating and samples[j].mode not in (None, "off"):
            j += 1
        end_t = samples[j].t if j < len(samples) else samples[j - 1].t
        rate = _warmup_rate(samples[i:j], end_t, _temp_before(samples, i))
        if rate is not None:
            rates.append(rate)
        i = j
    rates = [r for r in rates if RATE_MIN <= r <= RATE_MAX]
    if len(rates) < MIN_WARMUPS:
        return Rate(None, len(rates))
    return Rate(round(median(rates), 2), len(rates))


def _temp_before(samples: list[Sample], i: int) -> float | None:
    for s in reversed(samples[: i + 1]):
        if s.current is not None:
            return s.current
    return None


def _warmup_rate(run: list[Sample], end_t: float, start_temp: float | None) -> float | None:
    if start_temp is None or (end_t - run[0].t) / 60 < WARMUP_MIN_MINUTES:
        return None
    targets = [s.target for s in run if s.target is not None]
    if not targets or max(targets) - start_temp < WARMUP_MIN_GAP:
        return None  # keeping a warm room warm, not warming it up
    # The highest temperature reached, and when it was first reached.
    peak, peak_t = start_temp, run[0].t
    for s in run:
        if s.current is not None and s.current > peak:
            peak, peak_t = s.current, s.t
    rise = peak - start_temp
    hours = (peak_t - run[0].t) / 3600
    if rise < WARMUP_MIN_RISE or hours <= 0:
        return None
    return rise / hours


def _transitions(schedule: Schedule, weekday: int) -> list[tuple[int, float]] | None:
    day = schedule.get(DAYS[weekday % 7])
    if not day:
        return None
    return sorted((hhmm_to_minutes(t["time"]), float(t["setpoint"])) for t in day)


def plan(
    schedule: Schedule,
    *,
    weekday: int,
    minute: int,
    current: float | None,
    rate: float | None,
    max_lead: int,
) -> Plan | None:
    """Should we pre-heat for the next scheduled change? weekday 0 = Monday, minute of the day.

    Only the very next change counts, and only if it's a rise from what the schedule
    holds now. Returns None if there's nothing to do (or not enough to go on).
    """
    if current is None or rate is None or rate <= 0:
        return None
    today = _transitions(schedule, weekday)
    if today is None:
        return None
    # What the schedule holds now: today's last change at or before now, else yesterday's last.
    earlier = [sp for m, sp in today if m <= minute]
    if earlier:
        now_sp = earlier[-1]
    else:
        yesterday = _transitions(schedule, weekday - 1)
        if yesterday is None:
            return None
        now_sp = yesterday[-1][1]
    later = [(m - minute, sp) for m, sp in today if m > minute]
    if not later:
        tomorrow = _transitions(schedule, weekday + 1)
        if tomorrow is None:
            return None
        later = [(m + 1440 - minute, sp) for m, sp in tomorrow]
    minutes_until, setpoint = later[0]
    if setpoint <= HEAT_MIN or setpoint <= max(now_sp, HEAT_MIN):
        return None  # not a rise
    if setpoint - current < MIN_RISE:
        return None  # already warm enough
    if minutes_until > max_lead:
        return None  # too far off to start, whatever the rate
    lead = min(max_lead, math.ceil((setpoint - current) / rate * 60) + MARGIN_MINUTES)
    return Plan(minutes_until, setpoint, minutes_until - lead, lead)
