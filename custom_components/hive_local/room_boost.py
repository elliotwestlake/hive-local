"""Boosting one room. Pure: no Home Assistant imports, so it's unit-testable.

A room boost sets the room's Hive valves to a temperature for a while and then puts their
own targets back. The valves have no timer of their own, so the end comes from us (and
from the store after a restart). The boiler is asked for heat by the receiver's rooms
demand (`demand_controller`), which treats a boosted room as always calling, so the
receiver's part ends by itself if Home Assistant stops.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import Any

MIN_MINUTES = 15
MAX_MINUTES = 360
VALVE_MIN = 5.0
VALVE_MAX = 32.0


class RoomBoostError(ValueError):
    """A boost we can't start."""


def check(minutes: Any, temperature: Any) -> tuple[int, float]:
    """The boost's length and temperature, validated."""
    try:
        minutes, temperature = int(minutes), float(temperature)
    except (TypeError, ValueError) as err:
        raise RoomBoostError("A boost needs a length and a temperature") from err
    if not MIN_MINUTES <= minutes <= MAX_MINUTES:
        raise RoomBoostError(f"A room boost lasts {MIN_MINUTES} min to {MAX_MINUTES // 60} h")
    if not VALVE_MIN <= temperature <= VALVE_MAX:
        raise RoomBoostError(f"The valves take {VALVE_MIN:g}° to {VALVE_MAX:g}°")
    return minutes, round(temperature * 2) / 2


@dataclass
class Boost:
    """A running room boost: until when (epoch), at what, and the valves' targets before it."""

    room_id: str
    started: float
    until: float
    temperature: float
    previous: dict[str, float | None] = field(default_factory=dict)

    def remaining(self, now: float) -> int:
        """Whole minutes left (rounded up, so the last minute shows 1)."""
        return max(0, math.ceil((self.until - now) / 60))

    def over(self, now: float) -> bool:
        return now >= self.until

    def as_store(self) -> dict[str, Any]:
        return {"room_id": self.room_id, "started": self.started, "until": self.until,
                "temperature": self.temperature, "previous": dict(self.previous)}

    @classmethod
    def from_store(cls, data: Any) -> Boost | None:
        try:
            previous = {str(k): (float(v) if v is not None else None) for k, v in (data.get("previous") or {}).items()}
            return cls(str(data["room_id"]), float(data["started"]), float(data["until"]), float(data["temperature"]), previous)
        except (KeyError, TypeError, ValueError, AttributeError):
            return None


def start(room_id: str, valves: dict[str, float | None], minutes: int, temperature: float, now: float,
          running: Boost | None = None) -> Boost:
    """A new boost (or a running one changed): the targets to put back are the ones from
    before the first boost, so boosting again doesn't lose them."""
    previous = dict(running.previous) if running else {}
    for entity_id, target in valves.items():
        previous.setdefault(entity_id, target)
    return Boost(room_id, running.started if running else now, now + minutes * 60, temperature, previous)


def restore(boost: Boost, valves_now: list[str]) -> dict[str, float]:
    """What to set each valve back to: those still in the room with a target to go back to."""
    return {e: t for e, t in boost.previous.items() if e in valves_now and t is not None}
