"""Pure room helpers (no Home Assistant imports, so they're unit-testable).

A room is a set of radiator valves (any HA climate entity, from any integration)
plus an optional temperature sensor:

    {"id": "a1b2c3", "name": "Lounge", "valves": ["climate.lounge_trv"], "sensor": "sensor.lounge_temp"}

Each valve's live state comes in as:

    {"entity_id", "name", "available", "current_temperature", "target", "hvac_action", "battery"}
"""

from __future__ import annotations

import secrets
from typing import Any

LOW_BATTERY = 20  # % at or below which a valve's battery is flagged
NAME_MAX = 40


class RoomError(ValueError):
    """Raised for invalid room definitions (shown to the user)."""


def new_room_id(existing: set[str]) -> str:
    while (room_id := secrets.token_hex(3)) in existing:
        pass
    return room_id


def clean_room(raw: dict[str, Any], *, known_valves: set[str], known_sensors: set[str]) -> dict[str, Any]:
    """Validate a room from the panel: a name, at least one valve, optional sensor."""
    name = " ".join(str(raw.get("name") or "").split())
    if not name:
        raise RoomError("Give the room a name")
    if len(name) > NAME_MAX:
        raise RoomError(f"Room names can be at most {NAME_MAX} characters")
    valves = list(dict.fromkeys(raw.get("valves") or []))
    if not valves:
        raise RoomError("Pick at least one radiator valve")
    if unknown := [v for v in valves if v not in known_valves]:
        raise RoomError(f"Not a radiator valve: {', '.join(unknown)}")
    sensor = raw.get("sensor") or None
    if sensor is not None and sensor not in known_sensors:
        raise RoomError(f"Not a temperature sensor: {sensor}")
    return {"name": name, "valves": valves, "sensor": sensor}


def _number(value: Any) -> float | None:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return number if number == number else None  # drop NaN


def summarise(valves: list[dict[str, Any]], sensor_temperature: Any = None) -> dict[str, Any]:
    """One room's status from its valves' states and its sensor's reading."""
    live = [v for v in valves if v.get("available")]
    sensor = _number(sensor_temperature)
    readings = [t for v in live if (t := _number(v.get("current_temperature"))) is not None]
    if sensor is not None:
        current, source = sensor, "sensor"
    elif readings:
        current, source = round(sum(readings) / len(readings), 1), "valves"
    else:
        current, source = None, None

    targets = sorted({t for v in live if (t := _number(v.get("target"))) is not None})
    batteries = [b for v in valves if (b := _number(v.get("battery"))) is not None]
    heating = [v["entity_id"] for v in live if v.get("hvac_action") == "heating"]
    return {
        "current_temperature": current,
        "temperature_source": source,
        # One target if the valves agree; otherwise the spread, so the panel can say so.
        "target": targets[0] if len(targets) == 1 else None,
        "target_range": [targets[0], targets[-1]] if len(targets) > 1 else None,
        "heating": bool(heating),
        "heating_valves": heating,
        "unavailable": [v["entity_id"] for v in valves if not v.get("available")],
        "lowest_battery": min(batteries) if batteries else None,
        "battery_low": bool(batteries) and min(batteries) <= LOW_BATTERY,
    }
