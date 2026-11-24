"""Estimated heating cost. Pure: no HA imports.

Cost ≈ hours the boiler was on × its average output while on (kW) × the gas price per kWh.

"On" is the receiver calling for heat, and a modulating boiler (any modern condensing
boiler, especially on OpenTherm) turns its flame down and cycles within that, so its
rated output is far too high: one real day of 7.8 h on came to ~70 kWh on the meter,
about 9 kW from a 24 kW boiler. So:

- With a gas meter in HA, the average output is learned (`fit_output`): each past day's
  gas use against the hours the boiler was on, fitted as gas = baseline + kW × hours.
  The baseline soaks up hot water and cooking on the same meter.
- Without one, the rated output counts at `MODULATION` (40%).

A gas price can come per kWh, per MWh, per m³ or per ft³ / CCF (from HA's energy settings
or a price entity's unit, e.g. "GBP/kWh" or "GBP/m³"). Volumes are converted with
`KWH_PER_M3`, a typical figure for UK natural gas (about 39.5 MJ/m³ × the volume
correction 1.02264 ÷ 3.6), which bills also use.
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Any, Iterable

KWH_PER_M3 = 11.2
_M3_PER_FT3 = 0.0283168

# Denominator (lower case) -> kWh in one of it.
_PER = {
    "kwh": 1.0,
    "mwh": 1000.0,
    "wh": 0.001,
    "m³": KWH_PER_M3,
    "m3": KWH_PER_M3,
    "ft³": KWH_PER_M3 * _M3_PER_FT3,
    "ft3": KWH_PER_M3 * _M3_PER_FT3,
    "ccf": KWH_PER_M3 * _M3_PER_FT3 * 100,
}
# Currencies quoted in hundredths (pence, cents).
_HUNDREDTHS = {"p", "pence", "gbx", "c", "ct", "cent", "cents", "¢"}

BOILER_KW_MIN, BOILER_KW_MAX = 1.0, 100.0
# Without a gas meter: the share of its rated output a modulating boiler averages while on.
MODULATION = 0.4
# Learning from a gas meter.
LEARN_MIN_DAYS = 4
LEARN_MIN_HOURS = 3.0  # of heating, in all
LEARN_MIN_SPREAD = 1.5  # hours between the shortest and longest day, to fit a baseline
PRICE_MAX = 100.0  # per kWh, in the main currency: anything above is surely a typo


def _number(value: Any) -> float | None:
    if isinstance(value, bool):
        return None
    try:
        out = float(value)
    except (TypeError, ValueError):
        return None
    return out if math.isfinite(out) else None


def price_unit(unit: str | None) -> tuple[float, bool] | None:
    """(kWh in the unit's denominator, quoted in hundredths) for a price unit like "GBP/kWh".

    None if the unit isn't a price per energy or gas volume. No unit means per kWh.
    """
    if not unit:
        return 1.0, False
    if "/" not in unit:
        return None
    money, per = (part.strip().lower() for part in unit.rsplit("/", 1))
    kwh = _PER.get(per)
    if kwh is None:
        return None
    return kwh, money in _HUNDREDTHS


def kwh_per_unit(unit: str | None) -> float | None:
    """kWh in one of a gas meter's units (kWh, MWh, Wh, m³, ft³, CCF), or None."""
    return _PER.get(unit.strip().lower()) if unit else None


def price_per_kwh(value: Any, unit: str | None) -> float | None:
    """A gas price in the main currency per kWh, or None if it can't be read."""
    price = _number(value)
    parsed = price_unit(unit)
    if price is None or parsed is None or price < 0:
        return None
    kwh, hundredths = parsed
    out = price / kwh / (100 if hundredths else 1)
    return out if out <= PRICE_MAX else None


def boiler_kw(value: Any) -> float | None:
    kw = _number(value)
    return kw if kw is not None and BOILER_KW_MIN <= kw <= BOILER_KW_MAX else None


def per_hour(kw: float | None, price: float | None) -> float | None:
    """What an hour of the boiler on costs, or None without both figures."""
    if kw is None or price is None:
        return None
    return kw * price


def estimate(minutes: float | None, kw: float | None, price: float | None) -> float | None:
    rate = per_hour(kw, price)
    if minutes is None or rate is None:
        return None
    return minutes / 60 * rate


# -- learning the average output from a gas meter -------------------------------------


@dataclass(frozen=True)
class Fit:
    kw: float  # average output while the boiler is on
    baseline: float  # kWh a day used without heating (hot water, cooking)
    days: int
    hours: float  # heating hours the fit is based on

    def as_dict(self) -> dict[str, Any]:
        return {"kw": round(self.kw, 2), "baseline": round(self.baseline, 1), "days": self.days, "hours": round(self.hours, 1)}


def heating_intervals(samples: Iterable[Any], end: float) -> list[tuple[float, float]]:
    """(start, end) while heating, from samples (`.t`, `.heating`), each lasting until the next."""
    items = sorted(samples, key=lambda s: s.t)
    out = []
    for i, s in enumerate(items):
        b = items[i + 1].t if i + 1 < len(items) else end
        if s.heating and b > s.t:
            out.append((s.t, min(b, end)))
    return out


def merge(intervals: Iterable[tuple[float, float]]) -> list[tuple[float, float]]:
    """Overlapping intervals joined: several receivers on one boiler heat at once."""
    out: list[list[float]] = []
    for a, b in sorted(intervals):
        if out and a <= out[-1][1]:
            out[-1][1] = max(out[-1][1], b)
        else:
            out.append([a, b])
    return [(a, b) for a, b in out]


def hours_per_day(intervals: Iterable[tuple[float, float]], day_starts: list[float], period_end: float) -> list[float]:
    """Hours inside each day [day_starts[i], next start or period_end)."""
    edges = [*day_starts[1:], period_end]
    merged = merge(intervals)
    return [
        sum(max(0.0, min(b, e) - max(a, d)) for a, b in merged) / 3600
        for d, e in zip(day_starts, edges)
    ]


def fit_output(days: Iterable[tuple[float, float | None]]) -> Fit | None:
    """Average output while on, from (heating hours, gas kWh) per day.

    Days without a meter reading (None) are skipped, and so are days that read 0 kWh
    with heating on (the meter's data hadn't arrived). gas = baseline + kW × hours by
    least squares when the days vary enough, else (or if that gives nonsense) through
    zero, which counts any baseline as heating and so reads a little high.
    """
    pts = [(h, g) for h, g in days if g is not None and g >= 0 and not (g == 0 and h > 0)]
    total_h = sum(h for h, _ in pts)
    if len(pts) < LEARN_MIN_DAYS or total_h < LEARN_MIN_HOURS:
        return None
    hs = [h for h, _ in pts]
    if max(hs) - min(hs) >= LEARN_MIN_SPREAD:
        n = len(pts)
        mh = total_h / n
        mg = sum(g for _, g in pts) / n
        sxx = sum((h - mh) ** 2 for h in hs)
        kw = sum((h - mh) * (g - mg) for h, g in pts) / sxx
        baseline = mg - kw * mh
        if BOILER_KW_MIN <= kw <= BOILER_KW_MAX and baseline >= 0:
            return Fit(kw, baseline, n, total_h)
    kw = sum(h * g for h, g in pts) / sum(h * h for h in hs)
    if not BOILER_KW_MIN <= kw <= BOILER_KW_MAX:
        return None
    return Fit(kw, 0.0, len(pts), total_h)
