"""Estimated heating cost. Pure: no HA imports.

Cost ≈ hours the boiler was on × its output (kW) × the gas price per kWh. It's an
estimate, and on the high side: a modulating boiler rarely runs at full output.

A gas price can come per kWh, per MWh, per m³ or per ft³ / CCF (from HA's energy settings
or a price entity's unit, e.g. "GBP/kWh" or "GBP/m³"). Volumes are converted with
`KWH_PER_M3`, a typical figure for UK natural gas (about 39.5 MJ/m³ × the volume
correction 1.02264 ÷ 3.6), which bills also use.
"""

from __future__ import annotations

import math
from typing import Any

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
