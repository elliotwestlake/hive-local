"""Pure room helpers (no Home Assistant imports, so they're unit-testable).

Rooms are house-wide. A room is a set of Hive radiator valves (their HA climate
entities, on ZHA or Zigbee2MQTT), an optional temperature sensor, and the receiver
(config entry) whose zone heats it:

    {"id": "a1b2c3", "name": "Lounge", "valves": ["climate.lounge_trv"],
     "sensor": "sensor.lounge_temp", "receiver": "<entry_id>", "sensor_on_valves": true}

sensor_on_valves (default true; missing in rooms saved before it) pushes the sensor's
reading into each valve (valve_sensor.py).

Each valve's live state comes in as:

    {"entity_id", "name", "available", "current_temperature", "target", "hvac_action", "battery"}
"""

from __future__ import annotations

import secrets
from typing import Any

LOW_BATTERY = 20  # % at or below which a valve's battery is flagged

# The Hive radiator valve (UK7004240) is a rebadged Danfoss Ally. ZHA reports it as
# manufacturer "Danfoss" with Hive's own model ids TRV001/TRV003; Zigbee2MQTT as
# vendor Hive, model "Radiator valve (UK7004240)".
HIVE_VALVE_IDS = ("TRV001", "TRV003", "UK7004240")


def is_hive_valve(model: str | None, model_id: str | None = None) -> bool:
    text = f"{model or ''} {model_id or ''}".upper()
    return any(valve_id in text for valve_id in HIVE_VALVE_IDS)
NAME_MAX = 40


class RoomError(ValueError):
    """Raised for invalid room definitions (shown to the user)."""


def new_room_id(existing: set[str]) -> str:
    while (room_id := secrets.token_hex(3)) in existing:
        pass
    return room_id


def clean_room(
    raw: dict[str, Any], *, known_valves: set[str], known_sensors: set[str], receivers: list[str]
) -> dict[str, Any]:
    """Validate a room from the panel: a name, valves, optional sensor, and its receiver.

    With one receiver the room is heated by it; with several the panel must say which.
    """
    name = " ".join(str(raw.get("name") or "").split())
    if not name:
        raise RoomError("Give the room a name")
    if len(name) > NAME_MAX:
        raise RoomError(f"Room names can be at most {NAME_MAX} characters")
    valves = list(dict.fromkeys(raw.get("valves") or []))
    if not valves:
        raise RoomError("Pick at least one Hive radiator valve")
    if unknown := [v for v in valves if v not in known_valves]:
        raise RoomError(f"Not a Hive radiator valve: {', '.join(unknown)}")
    sensor = raw.get("sensor") or None
    if sensor is not None and sensor not in known_sensors:
        raise RoomError(f"Not a temperature sensor: {sensor}")
    receiver = raw.get("receiver") or None
    if receiver is None and len(receivers) == 1:
        receiver = receivers[0]
    if receiver is None:
        raise RoomError("Choose which receiver heats this room")
    if receiver not in receivers:
        raise RoomError("That receiver isn't set up in Hive Local")
    sensor_on_valves = raw.get("sensor_on_valves")
    return {
        "name": name,
        "valves": valves,
        "sensor": sensor,
        "receiver": receiver,
        "sensor_on_valves": True if sensor_on_valves is None else bool(sensor_on_valves),
    }


def suggest_rooms(
    valves: list[dict[str, Any]], sensors: list[dict[str, Any]], taken: set[str]
) -> list[dict[str, Any]]:
    """A room per HA area that has Hive valves not in a room yet, for first-time setup.

    valves: {"entity_id", "area"}; sensors: {"entity_id", "area"} (temperature sensors
    that aren't on a valve). Each suggestion takes the area's free valves and its first
    sensor (None: the valves' own readings). Valves with no area aren't suggested.
    """
    by_area: dict[str, list[str]] = {}
    for valve in valves:
        if valve.get("area") and valve["entity_id"] not in taken:
            by_area.setdefault(valve["area"], []).append(valve["entity_id"])
    out = []
    for area in sorted(by_area, key=str.lower):
        sensor = next((s["entity_id"] for s in sensors if s.get("area") == area), None)
        out.append({"name": area[:NAME_MAX], "valves": by_area[area], "sensor": sensor})
    return out


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
