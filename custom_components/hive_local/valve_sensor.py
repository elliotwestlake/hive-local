"""Room sensor → Hive valve: pure decisions (no Home Assistant imports, so unit-testable).

A Hive radiator valve (UK7004240, a Danfoss Ally) measures beside the radiator unless it's
given the room's temperature in `external_measured_room_sensor` (Danfoss 0x4015, centi-°C).
The valve drops the value (back to -8000, "not used") if it isn't refreshed:

- auto-offset mode (`radiator_covered` off): at least every 3 h, at most every 30 min;
- room-sensor mode (`radiator_covered` on): at least every 30 min, at most every 5 min.

Both ZHA and Zigbee2MQTT expose it as a number entity on the valve's device, and
`radiator_covered` as a switch, so it's done through HA entities, not the transports:

- ZHA (zha 2.x, `DanfossExternalMeasuredRoomSensor`): unique id `<ieee>-<ep>-external_measured_room_sensor`,
  translation key `external_temperature_sensor`, in °C (min -80, max 35, step 0.01).
  `DanfossRadiatorCovered`: unique id `…-radiator_covered`, translation key
  `prioritize_external_temperature_sensor`.
- Zigbee2MQTT: unique ids `<ieee>_external_measured_room_sensor_zigbee2mqtt` (raw centi-°C,
  min -8000, max 3500) and `<ieee>_radiator_covered_zigbee2mqtt`.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Any

EXTERNAL = "external"
COVERED = "covered"

NOT_USED = -80.0  # °C (-8000 centi-°C): the valve uses its own sensor
CHANGE = 0.2  # °C: send sooner than the refresh when the room moved this much
# Refresh a little before the valve would drop the value (the check runs every minute).
MARGIN = timedelta(minutes=5)
# (at most every, at least every) per radiator_covered mode.
INTERVALS = {
    False: (timedelta(minutes=30), timedelta(hours=3)),
    True: (timedelta(minutes=5), timedelta(minutes=30)),
}
# No radiator_covered switch: we can't tell the mode, so keep to the shorter limit.
UNKNOWN_INTERVAL = timedelta(minutes=25)

_EXTERNAL_KEYS = ("external_measured_room_sensor",)
_EXTERNAL_TRANSLATIONS = ("external_temperature_sensor", "external_measured_room_sensor")
_COVERED_KEYS = ("radiator_covered",)
_COVERED_TRANSLATIONS = ("prioritize_external_temperature_sensor", "radiator_covered")

# A valve's status, for the panel.
USING = "using"  # the valve has the room sensor's temperature
WAITING = "waiting"  # it should, but nothing has been taken yet (or the sensor's unavailable)
UNSUPPORTED = "unsupported"  # no external sensor entity on the valve's device
OFF = "off"  # the room has no sensor, or the room's toggle is off


def entity_role(domain: str, unique_id: str | None, translation_key: str | None, entity_id: str) -> str | None:
    """Which part an entity on a valve's device plays: EXTERNAL (number), COVERED (switch) or None."""
    unique_id = (unique_id or "").lower().removesuffix("_zigbee2mqtt")
    object_id = entity_id.split(".", 1)[-1].lower()

    def matches(keys: tuple[str, ...], translations: tuple[str, ...]) -> bool:
        return (
            translation_key in translations
            or any(unique_id.endswith((f"-{k}", f"_{k}")) or unique_id == k for k in keys)
            or any(object_id.endswith(k) for k in keys)
        )

    if domain == "number" and matches(_EXTERNAL_KEYS, _EXTERNAL_TRANSLATIONS):
        return EXTERNAL
    if domain == "switch" and matches(_COVERED_KEYS, _COVERED_TRANSLATIONS):
        return COVERED
    return None


def native(celsius: float, minimum: Any = None, maximum: Any = None) -> float | int:
    """The number entity's value for a temperature: °C on ZHA, centi-°C on Zigbee2MQTT.

    Told apart by the entity's range (Z2M's runs -8000..3500), clamped to it.
    """
    lo, hi = to_float(minimum), to_float(maximum)
    centi = (hi is not None and hi > 100) or (lo is not None and lo < -100)
    value: float | int = int(round(celsius * 100)) if centi else round(celsius, 1)
    if lo is not None and value < lo:
        value = int(lo) if centi else lo
    if hi is not None and value > hi:
        value = int(hi) if centi else hi
    return value


def celsius(value: Any, minimum: Any = None, maximum: Any = None) -> float | None:
    """The number entity's state back in °C (None when unknown)."""
    number, lo, hi = to_float(value), to_float(minimum), to_float(maximum)
    if number is None:
        return None
    centi = (hi is not None and hi > 100) or (lo is not None and lo < -100)
    return round(number / 100, 2) if centi else number


@dataclass
class Sent:
    """What we last wrote to a valve (in °C) and when."""

    value: float
    at: datetime


def intervals(covered: bool | None) -> tuple[timedelta, timedelta]:
    """(least time between writes, when to refresh) for the valve's mode."""
    if covered is None:
        return UNKNOWN_INTERVAL, UNKNOWN_INTERVAL
    least, most = INTERVALS[covered]
    return least, most - MARGIN


def decide(last: Sent | None, temperature: float | None, covered: bool | None, now: datetime) -> float | None:
    """The value (°C) to write to a valve now, or None to leave it.

    temperature: the room sensor's reading, None when it's unavailable or the room
    shouldn't push (then the valve is cleared once, so it falls back to its own sensor).
    """
    if temperature is None:
        return NOT_USED if last is not None and last.value != NOT_USED else None
    value = round(temperature, 1)
    if last is None or last.value == NOT_USED:
        return value
    least, refresh = intervals(covered)
    elapsed = now - last.at
    if elapsed < least:
        return None
    if elapsed >= refresh or abs(value - last.value) >= CHANGE - 1e-9:
        return value
    return None


def valve_status(*, wanted: bool, supported: bool, last: Sent | None, covered: bool | None, now: datetime) -> str:
    """USING / WAITING / UNSUPPORTED / OFF for one valve."""
    if not wanted:
        return OFF
    if not supported:
        return UNSUPPORTED
    if last is None or last.value == NOT_USED:
        return WAITING
    least, refresh = intervals(covered)
    # Past the refresh plus the margin (or past the unknown-mode limit) the valve has dropped it.
    if now - last.at > max(refresh, least) + MARGIN:
        return WAITING
    return USING


def room_status(statuses: list[str]) -> str | None:
    """One line for a room from its valves' statuses: USING (all), "partly", WAITING,
    UNSUPPORTED (none can), OFF, or None without valves."""
    if not statuses:
        return None
    if all(s == OFF for s in statuses):
        return OFF
    if all(s == USING for s in statuses):
        return USING
    if any(s == USING for s in statuses):
        return "partly"
    if all(s == UNSUPPORTED for s in statuses):
        return UNSUPPORTED
    return WAITING


def to_float(value: Any) -> float | None:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return number if number == number else None
