"""Pure schedule helpers (no Home Assistant imports, so they're unit-testable).

Internal format used between the panel and the backend:

    {
      "monday":   [{"time": "06:30", "setpoint": 20.0}, ...],
      "tuesday":  [...],
      ...
    }

Z2M wire formats (zigbee-herdsman-converters thermostat_weekly_schedule):

  set  -> {"weekly_schedule[_ep]": {"dayofweek": ["monday", ...],
                                     "transitions": [{"heatSetpoint": 20, "transitionTime": "06:30"}]}}
  read <- {"weekly_schedule[_ep]": {"days": ["monday", ...],
                                     "transitions": [{"time": 390, "heating_setpoint": 20}]}}
"""

from __future__ import annotations

import re
from typing import Any

DAYS: tuple[str, ...] = (
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
)

TIME_RE = re.compile(r"^([01]\d|2[0-3]):([0-5]\d)$")


class ScheduleError(ValueError):
    """Raised when a schedule fails validation."""


def minutes_to_hhmm(minutes: int) -> str:
    minutes = int(minutes) % 1440
    return f"{minutes // 60:02d}:{minutes % 60:02d}"


def hhmm_to_minutes(value: str) -> int:
    match = TIME_RE.match(value)
    if not match:
        raise ScheduleError(f"Invalid time '{value}', expected HH:MM")
    return int(match.group(1)) * 60 + int(match.group(2))


def schedule_key(channel: str | None) -> str:
    """Z2M state/command key. SLR2 is multi-endpoint so keys get a suffix."""
    return f"weekly_schedule_{channel}" if channel else "weekly_schedule"


def parse_z2m_reply(value: Any) -> dict[str, list[dict[str, Any]]]:
    """Turn one Z2M weekly_schedule reply into {day: transitions}."""
    if not isinstance(value, dict):
        return {}
    days = value.get("days") or []
    transitions = []
    for item in value.get("transitions") or []:
        if not isinstance(item, dict) or "time" not in item:
            continue
        setpoint = item.get("heating_setpoint")
        if setpoint is None:
            continue
        transitions.append(
            {"time": minutes_to_hhmm(item["time"]), "setpoint": float(setpoint)}
        )
    transitions.sort(key=lambda t: t["time"])
    return {day: list(transitions) for day in days if day in DAYS}


def validate(
    schedule: dict[str, list[dict[str, Any]]],
    *,
    max_transitions: int,
    min_setpoint: float,
    max_setpoint: float,
) -> dict[str, list[dict[str, Any]]]:
    """Validate and normalise (sort, dedupe times, round setpoints to 0.5)."""
    if not isinstance(schedule, dict) or not schedule:
        raise ScheduleError("Schedule is empty")

    clean: dict[str, list[dict[str, Any]]] = {}
    for day, transitions in schedule.items():
        if day not in DAYS:
            raise ScheduleError(f"Unknown day '{day}'")
        if not isinstance(transitions, list) or not transitions:
            raise ScheduleError(f"{day}: needs at least one transition")
        if len(transitions) > max_transitions:
            raise ScheduleError(
                f"{day}: {len(transitions)} transitions, max is {max_transitions}"
            )
        seen: set[int] = set()
        out = []
        for t in transitions:
            minutes = hhmm_to_minutes(str(t.get("time", "")))
            if minutes in seen:
                raise ScheduleError(f"{day}: duplicate time {minutes_to_hhmm(minutes)}")
            seen.add(minutes)
            try:
                setpoint = round(float(t.get("setpoint")) * 2) / 2
            except (TypeError, ValueError) as err:
                raise ScheduleError(f"{day}: invalid setpoint") from err
            if not min_setpoint <= setpoint <= max_setpoint:
                raise ScheduleError(
                    f"{day}: setpoint {setpoint} outside {min_setpoint}-{max_setpoint}"
                )
            out.append({"time": minutes_to_hhmm(minutes), "setpoint": setpoint})
        out.sort(key=lambda t: t["time"])
        clean[day] = out
    return clean


def group_days(
    schedule: dict[str, list[dict[str, Any]]],
) -> list[tuple[list[str], list[dict[str, Any]]]]:
    """Group days with identical transitions so we send one command per pattern."""
    groups: list[tuple[list[str], list[dict[str, Any]]]] = []
    for day in DAYS:
        if day not in schedule:
            continue
        for days, transitions in groups:
            if transitions == schedule[day]:
                days.append(day)
                break
        else:
            groups.append(([day], schedule[day]))
    return groups


def to_z2m_payloads(
    schedule: dict[str, list[dict[str, Any]]], channel: str | None
) -> list[dict[str, Any]]:
    """Build the list of /set payloads, one per day group."""
    key = schedule_key(channel)
    return [
        {
            key: {
                "dayofweek": days,
                "transitions": [
                    {"heatSetpoint": t["setpoint"], "transitionTime": t["time"]}
                    for t in transitions
                ],
            }
        }
        for days, transitions in group_days(schedule)
    ]
