"""Heating and hot water statistics from recorded history. Pure: no HA imports.

The websocket handler turns each recorded state of our climate / water_heater entity
into a `Sample` (`sample_from_state`), then `summarise` works out, for a period, how
long the receiver called for heat, how often it fired up, time in each mode, boosts and
room temperatures, plus per-day totals and evenly spaced buckets for the chart.

A sample holds until the next one. A sample with mode None (unavailable / unknown)
counts towards nothing except `unknown_minutes`.
"""

from __future__ import annotations

from bisect import bisect_right
from dataclasses import dataclass
from typing import Any

MODES = ("schedule", "manual", "off", "boost")

# climate: hvac mode (state) -> our mode. Boost is the climate's preset.
_CLIMATE_MODES = {"auto": "schedule", "heat": "manual", "off": "off"}
# water_heater: operation (state) -> our mode.
_WATER_MODES = {"schedule": "schedule", "on": "manual", "off": "off", "boost": "boost"}


@dataclass(frozen=True)
class Sample:
    t: float  # epoch seconds
    mode: str | None  # None: unavailable / unknown
    heating: bool = False
    current: float | None = None
    target: float | None = None


def _num(value: Any) -> float | None:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return None
    return float(value)


def sample_from_state(channel: str, t: float, state: str, attributes: dict[str, Any]) -> Sample:
    """One recorded state of our heating (climate) or hot water (water_heater) entity."""
    if channel == "water":
        mode = _WATER_MODES.get(state)
        return Sample(t, mode, heating=bool(attributes.get("heating")) and mode not in (None, "off"))
    mode = _CLIMATE_MODES.get(state)
    if mode is None:
        return Sample(t, None)
    if attributes.get("preset_mode") == "boost":
        mode = "boost"
    return Sample(
        t,
        mode,
        heating=attributes.get("hvac_action") == "heating",
        current=_num(attributes.get("current_temperature")),
        target=_num(attributes.get("temperature")),
    )


class _Window:
    """Time-weighted totals for [start, end)."""

    def __init__(self, samples: list[Sample], times: list[float], start: float, end: float) -> None:
        self.heating = 0.0
        self.known = 0.0
        self.unknown = 0.0
        self.modes = dict.fromkeys(MODES, 0.0)
        self.cycles = 0
        self.boosts = 0
        self.temp_sum = self.temp_time = 0.0
        self.target_sum = self.target_time = 0.0
        self.temp_min: float | None = None
        self.temp_max: float | None = None
        if end <= start:
            return
        # The sample in force at `start`, then every one up to `end`.
        i = max(0, bisect_right(times, start) - 1)
        prev = samples[i - 1] if i > 0 else None
        for j in range(i, len(samples)):
            s = samples[j]
            if s.t >= end:
                break
            a = max(s.t, start)
            b = min(samples[j + 1].t, end) if j + 1 < len(samples) else end
            # A change that happened inside the window (not the state carried in).
            if s.t >= start and prev is not None:
                if s.heating and not prev.heating:
                    self.cycles += 1
                if s.mode == "boost" and prev.mode != "boost":
                    self.boosts += 1
            prev = s
            if b <= a:
                continue
            dur = b - a
            if s.mode is None:
                self.unknown += dur
                continue
            self.known += dur
            self.modes[s.mode] += dur
            if s.heating:
                self.heating += dur
            if s.current is not None:
                self.temp_sum += s.current * dur
                self.temp_time += dur
                self.temp_min = s.current if self.temp_min is None else min(self.temp_min, s.current)
                self.temp_max = s.current if self.temp_max is None else max(self.temp_max, s.current)
            if s.target is not None and s.mode != "off":
                self.target_sum += s.target * dur
                self.target_time += dur

    @property
    def temp_avg(self) -> float | None:
        return self.temp_sum / self.temp_time if self.temp_time else None

    @property
    def target_avg(self) -> float | None:
        return self.target_sum / self.target_time if self.target_time else None


def _minutes(seconds: float) -> float:
    return round(seconds / 60, 1)


def _r1(value: float | None) -> float | None:
    return None if value is None else round(value, 1)


def summarise(
    samples: list[Sample],
    start: float,
    end: float,
    *,
    day_starts: list[float],
    bucket_starts: list[float],
    period_end: float,
    previous: tuple[float, float] | None = None,
) -> dict[str, Any]:
    """Stats for [start, end) (end is "now").

    day_starts: the start of each calendar day in the period (local midnights).
    bucket_starts: chart buckets, each lasting until the next (the last until period_end).
    Days and buckets that start after `end` come back empty (None).
    previous: the same stretch of the previous period, for a comparison.
    """
    samples = sorted(samples, key=lambda s: s.t)
    times = [s.t for s in samples]

    def window(a: float, b: float) -> _Window:
        return _Window(samples, times, a, min(b, end))

    total = window(start, end)
    out: dict[str, Any] = {
        "start": start,
        "end": end,
        "has_data": total.known > 0,
        "heating_minutes": _minutes(total.heating),
        "known_minutes": _minutes(total.known),
        "unknown_minutes": _minutes(total.unknown),
        "cycles": total.cycles,
        "boosts": total.boosts,
        "mode_minutes": {m: _minutes(v) for m, v in total.modes.items()},
        "temperature": {
            "avg": _r1(total.temp_avg),
            "min": _r1(total.temp_min),
            "max": _r1(total.temp_max),
        },
        "target_avg": _r1(total.target_avg),
        "previous": None,
    }
    if previous is not None:
        prev = _Window(samples, times, previous[0], previous[1])
        out["previous"] = {
            "has_data": prev.known > 0,
            "heating_minutes": _minutes(prev.heating),
            "known_minutes": _minutes(prev.known),
            "cycles": prev.cycles,
        }

    edges = [*day_starts[1:], period_end]
    days = []
    for a, b in zip(day_starts, edges):
        if a >= end:
            days.append({"start": a, "heating_minutes": None, "temp_avg": None, "known_minutes": 0})
            continue
        w = window(a, b)
        days.append(
            {
                "start": a,
                "heating_minutes": _minutes(w.heating) if w.known else None,
                "known_minutes": _minutes(w.known),
                "temp_avg": _r1(w.temp_avg),
            }
        )
    out["days"] = days

    edges = [*bucket_starts[1:], period_end]
    series = []
    for a, b in zip(bucket_starts, edges):
        w = window(a, b) if a < end else None
        if w is None or not w.known:
            series.append({"t": a, "current": None, "target": None, "heating": None})
            continue
        series.append(
            {
                "t": a,
                "current": _r1(w.temp_avg),
                "target": _r1(w.target_avg),
                "heating": round(w.heating / w.known, 3),
            }
        )
    out["series"] = series
    return out
