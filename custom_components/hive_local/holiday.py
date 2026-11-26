"""Pure holiday helpers (no Home Assistant imports, so they're unit-testable).

While away, heating is a **boost** at the holiday temperature (the frost protection
setting by default) and hot water is off. A boost is the only timer the receiver keeps
itself (a manual hold ignores the hold duration: it reads back 65535, verified on an
OTR1), so it's the fail-safe: we renew it while Home Assistant is running, and if HA
stops, the receiver ends it within `LEASE_MINUTES` and goes back to its previous mode.
In the last `LEASE_MINUTES` the boost is set to end exactly at the holiday's end, so
the receiver comes off the holiday on time by itself even if HA is down then.

At the end, or on cancel, each channel goes back to the mode it was in before.
"""

from __future__ import annotations

import math
from dataclasses import asdict, dataclass
from typing import Any

MODE_SCHEDULE = "schedule"
MODE_MANUAL = "manual"
MODE_OFF = "off"
MODE_BOOST = "boost"

CHANNEL_HEAT = "heat"

# The longest boost the receiver takes (minutes), and how long it may run down before
# we renew it. Renewing every hour means HA can be down ~5 h before the holiday ends early.
LEASE_MINUTES = 360
RENEW_AFTER = 60
# A boost that ends this close to its lease end (seconds) ran out; earlier, someone ended it.
LEASE_GRACE = 120

# A reported setpoint this close to ours is still our boost (0.5 °C steps, float noise).
SETPOINT_TOLERANCE = 0.25

# What to do about a report from the receiver while away.
KEEP = "keep"  # ours, or a boost someone started on top
REASSERT = "reassert"  # our hold lapsed (lease ran out, or a boost on top ended): put it back
DROP = "drop"  # someone changed the mode: leave it, the holiday is over


@dataclass(frozen=True)
class Away:
    """One channel's holiday: until when (UTC epoch seconds; None = until you're back, the
    Away toggle), and what to go back to.

    `lease_end` is when our current heating boost runs out on the receiver (epoch).
    """

    until: float | None
    temperature: float | None  # heating only
    restore_mode: str
    restore_setpoint: float | None
    lease_end: float | None = None

    def as_store(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_store(cls, data: Any) -> Away | None:
        def num(key: str) -> float | None:
            return None if data.get(key) is None else float(data[key])

        try:
            away = cls(
                until=num("until"),
                temperature=num("temperature"),
                restore_mode=str(data["restore_mode"]),
                restore_setpoint=num("restore_setpoint"),
                lease_end=num("lease_end"),
            )
        except (KeyError, TypeError, ValueError, AttributeError):
            return None
        if away.restore_mode not in (MODE_SCHEDULE, MODE_MANUAL, MODE_OFF):
            return None
        return away


def restore_point(
    mode: str, setpoint: float | None, resume: tuple[str, float | None]
) -> tuple[str, float | None]:
    """What to go back to: the current mode, or what a running boost would return to."""
    if mode == MODE_BOOST:
        mode, setpoint = resume
    if mode == MODE_BOOST:  # never resume into a boost
        mode = MODE_SCHEDULE
    return mode, setpoint if mode == MODE_MANUAL else None


def lease_minutes(now: float, until: float | None) -> int:
    """How long the heating boost should run from now: up to the lease, never past the end."""
    if until is None:
        return LEASE_MINUTES
    return max(1, min(LEASE_MINUTES, math.ceil((until - now) / 60)))


def overdue(away: Away, now: float) -> bool:
    """Past its end time (never, for an open-ended one)."""
    return away.until is not None and now >= away.until


def needs_renewal(remaining: int | None, wanted: int) -> bool:
    """Renew our boost once it has run down an hour (or if it runs past the end)."""
    if remaining is None:
        return True
    return remaining < wanted - RENEW_AFTER or remaining > wanted + 5


def is_our_boost(away: Away, setpoint: Any) -> bool:
    return (
        away.temperature is not None
        and isinstance(setpoint, (int, float))
        and abs(setpoint - away.temperature) <= SETPOINT_TOLERANCE
    )


def judge(
    channel: str,
    away: Away,
    mode: str,
    setpoint: Any,
    now: float,
    boosted_on_top: bool,
) -> str:
    """KEEP, REASSERT or DROP, for a report while away.

    `boosted_on_top`: the last boost we saw was someone else's (any hot water boost, or a
    heating boost at another temperature), so when it ends we put the holiday back.
    """
    if mode == MODE_BOOST:
        return KEEP
    if channel == CHANNEL_HEAT:
        if boosted_on_top:
            return REASSERT
        if away.lease_end is None or now >= away.lease_end - LEASE_GRACE:
            return REASSERT  # our boost ran out (HA was down, or a renewal failed)
        return DROP
    if mode == MODE_OFF:
        return KEEP
    return REASSERT if boosted_on_top else DROP
