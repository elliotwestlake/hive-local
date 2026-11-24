"""Pure Z2M state/payload helpers (no Home Assistant imports, so they're unit-testable).

`ep` is the Z2M endpoint name ("heat"/"water") on multi-endpoint receivers, or
None on single-endpoint ones, matching `schedule.schedule_key`.

Payloads follow the Z2M Hive receiver docs:

  schedule -> {"system_mode": "heat", "temperature_setpoint_hold": false}
  manual   -> {"system_mode": "heat", "temperature_setpoint_hold": 1, "occupied_heating_setpoint": 20}
  off      -> {"system_mode": "off", "temperature_setpoint_hold": 0}
  boost    -> {"system_mode": "emergency_heating", "temperature_setpoint_hold_duration": 30,
               "temperature_setpoint_hold": 1, "occupied_heating_setpoint": 21}   (one payload)
"""

from __future__ import annotations

from typing import Any

MODE_SCHEDULE = "schedule"
MODE_MANUAL = "manual"
MODE_OFF = "off"
MODE_BOOST = "boost"
MODES: tuple[str, ...] = (MODE_SCHEDULE, MODE_MANUAL, MODE_OFF, MODE_BOOST)

# Hive reports 65535 for "no hold duration"; real boosts are 1-360 minutes.
BOOST_MAX_MINUTES = 360

STATE_KEYS: tuple[str, ...] = (
    "system_mode",
    "temperature_setpoint_hold",
    "temperature_setpoint_hold_duration",
    "occupied_heating_setpoint",
    "local_temperature",
    "running_state",
)


def suffix(ep: str | None) -> str:
    return f"_{ep}" if ep else ""


def channel_status(state: Any, ep: str | None) -> dict[str, Any] | None:
    """Summarise one channel of a Z2M state message, or None if it isn't in it."""
    if not isinstance(state, dict):
        return None
    sfx = suffix(ep)
    system_mode = state.get(f"system_mode{sfx}")
    if system_mode is None:
        return None
    hold = state.get(f"temperature_setpoint_hold{sfx}")
    duration = state.get(f"temperature_setpoint_hold_duration{sfx}")

    if system_mode == "emergency_heating":
        mode = MODE_BOOST
    elif system_mode == "off":
        mode = MODE_OFF
    elif hold in (True, 1, "1", "true"):
        mode = MODE_MANUAL
    else:
        mode = MODE_SCHEDULE

    remaining: int | None = 0
    if mode == MODE_BOOST:
        remaining = (
            int(duration)
            if isinstance(duration, (int, float)) and 0 <= duration <= BOOST_MAX_MINUTES
            else None
        )

    return {
        "mode": mode,
        "boost_remaining": remaining,
        "current_temperature": state.get(f"local_temperature{sfx}"),
        "setpoint": state.get(f"occupied_heating_setpoint{sfx}"),
        "heating": state.get(f"running_state{sfx}") == "heat",
    }


def refresh_payload(ep: str | None) -> dict[str, str]:
    """/get payload asking Z2M to re-read the channel's state attributes."""
    sfx = suffix(ep)
    return {f"{key}{sfx}": "" for key in STATE_KEYS}


def mode_payload(ep: str | None, mode: str, setpoint: float | None = None) -> dict[str, Any]:
    sfx = suffix(ep)
    if mode == MODE_SCHEDULE:
        return {f"system_mode{sfx}": "heat", f"temperature_setpoint_hold{sfx}": False}
    if mode == MODE_OFF:
        return {f"system_mode{sfx}": "off", f"temperature_setpoint_hold{sfx}": 0}
    if mode == MODE_MANUAL:
        payload: dict[str, Any] = {
            f"system_mode{sfx}": "heat",
            f"temperature_setpoint_hold{sfx}": 1,
        }
        if setpoint is not None:
            payload[f"occupied_heating_setpoint{sfx}"] = setpoint
        return payload
    raise ValueError(f"Unknown mode '{mode}'")


def setpoint_payload(ep: str | None, setpoint: float) -> dict[str, Any]:
    """Just the setpoint, mode untouched. While following the schedule this is a
    temporary override until the next scheduled change, like turning the dial."""
    return {f"occupied_heating_setpoint{suffix(ep)}": setpoint}


def boost_payload(ep: str | None, minutes: int, setpoint: float | None = None) -> dict[str, Any]:
    """One payload: Hive needs all boost fields in a single command."""
    if not 1 <= minutes <= BOOST_MAX_MINUTES:
        raise ValueError(f"Boost must be 1-{BOOST_MAX_MINUTES} minutes")
    sfx = suffix(ep)
    payload: dict[str, Any] = {
        f"system_mode{sfx}": "emergency_heating",
        f"temperature_setpoint_hold_duration{sfx}": int(minutes),
        f"temperature_setpoint_hold{sfx}": 1,
    }
    if setpoint is not None:  # hot water boosts have no setpoint
        payload[f"occupied_heating_setpoint{sfx}"] = setpoint
    return payload
