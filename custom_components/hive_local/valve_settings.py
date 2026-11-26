"""A Hive valve's own settings (a Danfoss Ally), through the entities ZHA or Zigbee2MQTT create.

Pure: no Home Assistant imports, so it's unit-testable. The room page sets them for every
valve in a room at once. The ones that matter for how gently a room warms up:

- **Response time** (`control_algorithm_scale_factor`, Danfoss 0x4020): how quickly the valve
  opens after its target or the temperature changes. Slower opens more gently, which can
  mean less overshoot, but a slower warm-up. ZHA: a select (`setpoint_response_time`) with
  options "quick 5min" … "slow 80min"; Z2M: a number, 1–10.
- **Adaptation run** (`adaptation_run_settings` on, `adaptation_run_control` to start one,
  `adaptation_run_status`): the valve learns how its radiator's valve opens. Each night when
  it's on; once by hand after fitting or moving it.

Left out: load balancing (it needs something writing the house's average load to every
valve, which neither ZHA nor Z2M does) and radiator covered (only for a radiator behind a
cover or furniture; the valve then goes by the room sensor alone, which reacts slowly and
can make overshoot worse. Elliot, 2026-11-26: not wanted. `valve_sensor.py` still reads it
for how often to send the room sensor, if it's switched on in HA).
"""

from __future__ import annotations

from typing import Any

RESPONSE = "response"
ADAPTATION = "adaptation"
ADAPTATION_RUN = "adaptation_run"
ADAPTATION_STATUS = "adaptation_status"

# key: (domains, attribute names in unique ids / object ids, ZHA translation keys)
_ROLES: dict[str, tuple[tuple[str, ...], tuple[str, ...], tuple[str, ...]]] = {
    RESPONSE: (("select", "number"), ("control_algorithm_scale_factor",), ("setpoint_response_time",)),
    ADAPTATION: (("switch",), ("adaptation_run_settings",), ("adaptation_run_enabled",)),
    ADAPTATION_RUN: (("select",), ("adaptation_run_control",), ("adaptation_run_command",)),
    ADAPTATION_STATUS: (("sensor",), ("adaptation_run_status",), ("adaptation_run_status",)),
}

# The valve's scale factor (1–10) → minutes, as zha names them (some are its own estimates).
RESPONSE_MINUTES = {1: 5, 2: 10, 3: 15, 4: 25, 5: 30, 6: 40, 7: 50, 8: 60, 9: 70, 10: 80}
_ZHA_RESPONSE = {
    1: "quick 5min", 2: "quick 10min", 3: "quick 15min", 4: "quick 25min", 5: "moderate 30min",
    6: "moderate 40min", 7: "moderate 50min", 8: "moderate 60min", 9: "moderate 70min", 10: "slow 80min",
}
_ZHA_RESPONSE_VALUES = {name: value for value, name in _ZHA_RESPONSE.items()}

# Starting an adaptation run: ZHA's option, then Z2M's.
_START_RUN = ("Initiate", "initiate_adaptation")

# What the panel shows of the adaptation run's status.
IN_PROGRESS = "in_progress"
FOUND = "found"
LOST = "lost"
NONE = "none"


def entity_role(domain: str, unique_id: str | None, translation_key: str | None, entity_id: str) -> str | None:
    """Which setting an entity on a valve's device is, or None."""
    unique_id = (unique_id or "").lower().removesuffix("_zigbee2mqtt")
    object_id = entity_id.split(".", 1)[-1].lower()
    for key, (domains, names, translations) in _ROLES.items():
        if domain not in domains:
            continue
        if translation_key in translations:
            return key
        if any(unique_id.endswith((f"-{n}", f"_{n}")) or unique_id == n or object_id.endswith(n) for n in names):
            return key
    return None


def _number(value: Any) -> float | None:
    if isinstance(value, bool):
        return None
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return number if number == number else None


def read(key: str, domain: str, state: str | None, attributes: dict[str, Any]) -> Any:
    """A setting's value from its entity's state: minutes for RESPONSE, a bool for switches,
    a status for ADAPTATION_STATUS; None if unknown (or unavailable)."""
    if state in (None, "unavailable", "unknown"):
        if key == ADAPTATION_STATUS and domain == "sensor" and attributes:
            return _zha_status(attributes)
        return None
    if key == RESPONSE:
        factor = _ZHA_RESPONSE_VALUES.get(state) if domain == "select" else _number(state)
        return RESPONSE_MINUTES.get(int(factor)) if factor is not None and float(factor).is_integer() else None
    if key == ADAPTATION:
        return state == "on" if state in ("on", "off") else None
    if key == ADAPTATION_STATUS:
        if attributes and any(k in attributes for k in ("In_progress", "Valve_characteristic_found", "Valve_characteristic_lost")):
            return _zha_status(attributes)
        state = state.lower()
        return state if state in (IN_PROGRESS, FOUND, LOST, NONE) else None
    return None


def _zha_status(attributes: dict[str, Any]) -> str | None:
    """ZHA's bitmap sensor keeps the bits as attributes."""
    if attributes.get("In_progress"):
        return IN_PROGRESS
    if attributes.get("Valve_characteristic_lost"):
        return LOST
    if attributes.get("Valve_characteristic_found"):
        return FOUND
    if any(k in attributes for k in ("In_progress", "Valve_characteristic_found", "Valve_characteristic_lost")):
        return NONE
    return None


def response_factor(minutes: Any) -> int | None:
    """The valve's scale factor for one of RESPONSE_MINUTES' values, or None."""
    return next((f for f, m in RESPONSE_MINUTES.items() if m == minutes), None)


def call(key: str, domain: str, value: Any, options: list[str] | None = None) -> tuple[str, str, dict[str, Any]] | None:
    """The service to set a setting: (domain, service, data without entity_id), or None if
    the value doesn't fit (or the entity can't take it)."""
    if key == RESPONSE:
        factor = response_factor(value)
        if factor is None:
            return None
        if domain == "select":
            option = _ZHA_RESPONSE[factor]
            if options is not None and option not in options:
                return None
            return "select", "select_option", {"option": option}
        return "number", "set_value", {"value": factor}
    if key == ADAPTATION:
        if not isinstance(value, bool):
            return None
        return "switch", "turn_on" if value else "turn_off", {}
    if key == ADAPTATION_RUN:
        option = next((o for o in _START_RUN if options is None or o in options), None)
        return ("select", "select_option", {"option": option}) if option else None
    return None


def combine(values: list[Any]) -> tuple[Any, bool]:
    """The room's value from its valves' (unknown ones left out): (the value, whether they differ).
    With differing values, the most common one (the first on a tie)."""
    known = [v for v in values if v is not None]
    if not known:
        return None, False
    common = max(known, key=known.count)
    return common, len(set(known)) > 1
