"""Pure holiday helpers (no Home Assistant imports, so they're unit-testable).

While away, heating holds a manual setpoint (the frost-protection temperature by
default) and hot water is off. At the end, or on cancel, each channel goes back to the
mode it was in before. The receivers have no holiday mode of their own over Zigbee, so
Home Assistant switches both ends.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any

MODE_SCHEDULE = "schedule"
MODE_MANUAL = "manual"
MODE_OFF = "off"
MODE_BOOST = "boost"

CHANNEL_HEAT = "heat"

# A reported setpoint this close to ours is still our hold (0.5 °C steps, float noise).
SETPOINT_TOLERANCE = 0.25


@dataclass(frozen=True)
class Away:
    """One channel's holiday: until when (UTC epoch seconds), and what to go back to."""

    until: float
    temperature: float | None  # heating only
    restore_mode: str
    restore_setpoint: float | None

    def as_store(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_store(cls, data: Any) -> Away | None:
        try:
            away = cls(
                until=float(data["until"]),
                temperature=None if data.get("temperature") is None else float(data["temperature"]),
                restore_mode=str(data["restore_mode"]),
                restore_setpoint=None if data.get("restore_setpoint") is None else float(data["restore_setpoint"]),
            )
        except (KeyError, TypeError, ValueError):
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


def holding(channel: str, away: Away) -> tuple[str, float | None]:
    """The mode (and setpoint) a channel holds while away."""
    if channel == CHANNEL_HEAT:
        return MODE_MANUAL, away.temperature
    return MODE_OFF, None


def is_ours(channel: str, away: Away, mode: str, setpoint: Any) -> bool:
    """Whether the reported state is still our holiday hold.

    A boost on top is fine (it goes back to the hold when it ends). Anything else
    means someone changed it, e.g. on the thermostat, and we leave it be.
    """
    if mode == MODE_BOOST:
        return True
    want_mode, want_setpoint = holding(channel, away)
    if mode != want_mode:
        return False
    if want_setpoint is None:
        return True
    return isinstance(setpoint, (int, float)) and abs(setpoint - want_setpoint) <= SETPOINT_TOLERANCE
