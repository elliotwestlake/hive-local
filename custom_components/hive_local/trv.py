"""Pure helpers for schedules on the Hive radiator valves (no Home Assistant imports).

The Hive valve (UK7004240, TRV001/TRV003) is a Danfoss Ally. It keeps its own weekly
schedule with the same ZCL Thermostat commands as the receiver (set/get_weekly_schedule,
on endpoint 1), and follows it only while its programming operation mode is "schedule".

ZHA: the valve's clock is the ZCL Time cluster (0x000A) on endpoint 1. The schedule runs
on the valve's local time, so a wrong clock runs it at the wrong times. ZCL time is seconds
since 2000-01-01 00:00 UTC; local time = time + time_zone (+ dst_shift inside DST).

Zigbee2MQTT (zigbee-herdsman-converters `danfoss.ts`) sets the valve's clock itself (on
pairing, when it rejoins, and daily) and exposes the schedule as one text key per day:

    {"schedule_monday": "06:00/21 08:30/17 16:30/21 22:00/17"}
"""

from __future__ import annotations

import re
from datetime import UTC, datetime, timedelta, tzinfo
from typing import Any

from .schedule import DAYS, minutes_to_hhmm, pad_transitions, tidy_transitions, valid_minutes

VALVE_ENDPOINT = 1
# The Ally's setpoints run 5-35 °C; it has no "off", its lowest setpoint does that job.
VALVE_MIN = 5.0
VALVE_MAX = 32.0  # the panel's limit, as for the receiver

ZCL_EPOCH = datetime(2000, 1, 1, tzinfo=UTC)
# How far the valve's clock may be out before we set it.
CLOCK_TOLERANCE = 120  # seconds
TIME_INVALID = 0xFFFFFFFF
TIME_STATUS_SYNCHRONIZED = 0x02  # bit 1, the only one the Ally takes (Danfoss spec 1.2)


# --- which valve -----------------------------------------------------------------------


def valve_address(identifiers: set[tuple[str, str]] | list[tuple[str, str]]) -> tuple[str, str] | None:
    """("zha", ieee) or ("z2m", "0x...") from a device registry entry's identifiers.

    ZHA devices are ("zha", "00:1e:..."); Zigbee2MQTT's discovered devices are
    ("mqtt", "zigbee2mqtt_0x...").
    """
    for domain, value in identifiers:
        if domain == "zha":
            return ("zha", value)
    for domain, value in identifiers:
        if domain == "mqtt" and value.startswith("zigbee2mqtt_0x"):
            return ("z2m", value.removeprefix("zigbee2mqtt_"))
    return None


def z2m_friendly_name(devices: Any, ieee: str) -> str | None:
    """The friendly name for ieee in Z2M's bridge/devices list."""
    for dev in devices if isinstance(devices, list) else []:
        if isinstance(dev, dict) and str(dev.get("ieee_address", "")).lower() == ieee.lower():
            return dev.get("friendly_name") or None
    return None


# --- schedules -------------------------------------------------------------------------


def clamp_day(transitions: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """A day read from a valve, made safe to write back: below 5 °C is 5 °C (its "off")."""
    return [t if t["setpoint"] >= VALVE_MIN else {**t, "setpoint": VALVE_MIN} for t in transitions]


def clamp_schedule(schedule: dict[str, list[dict[str, Any]]]) -> dict[str, list[dict[str, Any]]]:
    return {day: clamp_day(transitions) for day, transitions in schedule.items()}


def z2m_key(day: str) -> str:
    return f"schedule_{day}"


_SLOT = re.compile(r"^(\d{1,2}):(\d{2})/(-?\d+(?:\.\d+)?)$")


def parse_z2m_day(value: Any) -> list[dict[str, Any]] | None:
    """One `schedule_<day>` text from Zigbee2MQTT ("06:00/21 22:00/17") as transitions."""
    if not isinstance(value, str):
        return None
    transitions = []
    for token in value.split():
        match = _SLOT.match(token)
        if not match:
            continue
        minutes = int(match.group(1)) * 60 + int(match.group(2))
        if not valid_minutes(minutes):
            continue
        transitions.append({"time": minutes_to_hhmm(minutes), "setpoint": float(match.group(3))})
    return clamp_day(tidy_transitions(transitions)) if transitions else None


def parse_z2m_state(payload: Any) -> dict[str, list[dict[str, Any]]]:
    """Every `schedule_<day>` in a Zigbee2MQTT state message."""
    if not isinstance(payload, dict):
        return {}
    out = {}
    for day in DAYS:
        if (transitions := parse_z2m_day(payload.get(z2m_key(day)))) is not None:
            out[day] = transitions
    return out


def z2m_day_text(transitions: list[dict[str, Any]]) -> str:
    """A day for Zigbee2MQTT, padded to 6 transitions like every write (see schedule.py)."""
    return " ".join(f"{t['time']}/{t['setpoint']:g}" for t in pad_transitions(transitions))


def z2m_payloads(schedule: dict[str, list[dict[str, Any]]]) -> list[dict[str, str]]:
    """One /set payload per day, Monday first (Z2M sends one setWeeklySchedule for each)."""
    return [{z2m_key(day): z2m_day_text(schedule[day])} for day in DAYS if day in schedule]


def combine_reads(
    reads: list[dict[str, list[dict[str, Any]]]],
) -> tuple[dict[str, list[dict[str, Any]]], list[str]]:
    """One schedule for a room from what each valve said, and the days the valves disagree on.

    Takes the first valve with the most days (the room's valves are listed in order) and,
    for days it doesn't have, the first valve that does.
    """
    if not reads:
        return {}, []
    best = max(reads, key=len)  # the first with the most days
    schedule = dict(best)
    for read in reads:
        for day, transitions in read.items():
            schedule.setdefault(day, transitions)
    differs = [
        day
        for day in DAYS
        if day in schedule and any(day in read and read[day] != schedule[day] for read in reads)
    ]
    return {d: schedule[d] for d in DAYS if d in schedule}, differs


# --- the valve's clock (ZHA) -----------------------------------------------------------


def zcl_time(when: datetime) -> int:
    """Seconds since 2000-01-01 UTC."""
    return int((when - ZCL_EPOCH).total_seconds())


def _changes(year: int, tz: tzinfo) -> list[tuple[datetime, timedelta]]:
    """Each change in tz's UTC offset during year: (when, in UTC, to the minute; new offset)."""
    out = []
    at = datetime(year, 1, 1, tzinfo=UTC)
    end = datetime(year + 1, 1, 1, tzinfo=UTC)
    previous = at.astimezone(tz).utcoffset()
    while at < end:
        nxt = at + timedelta(hours=1)
        if (offset := nxt.astimezone(tz).utcoffset()) != previous:
            # Hour steps find it to within an hour; halve down to the minute.
            lo, hi = at, nxt
            while hi - lo > timedelta(minutes=1):
                mid = lo + (hi - lo) / 2
                if mid.astimezone(tz).utcoffset() == previous:
                    lo = mid
                else:
                    hi = mid
            out.append((hi.replace(second=0, microsecond=0), offset))
            previous = offset
        at = nxt
    return out


def dst_period(now: datetime, tz: tzinfo) -> tuple[datetime, datetime, int] | None:
    """The daylight saving period now is in, else the next one: (start, end, shift seconds).

    None for a time zone without DST. Works for either hemisphere (a southern summer
    runs across the new year).
    """
    changes = [c for year in (now.year - 1, now.year, now.year + 1) for c in _changes(year, tz)]
    if not changes:
        return None
    offsets = {offset for _, offset in changes}
    summer, winter = max(offsets), min(offsets)
    shift = int((summer - winter).total_seconds())
    periods = []
    for (when, offset), following in zip(changes, changes[1:]):
        if offset == summer:
            periods.append((when, following[0], shift))
    current = next((p for p in periods if p[0] <= now < p[1]), None)
    return current or next((p for p in periods if p[0] > now), periods[-1] if periods else None)


def time_attributes(now: datetime, tz: tzinfo) -> dict[str, int]:
    """Time cluster attributes to set the valve's clock, as Zigbee2MQTT does for the Ally."""
    period = dst_period(now, tz)
    offset = now.astimezone(tz).utcoffset() or timedelta()
    if period is None:
        standard, dst_start, dst_end, shift = int(offset.total_seconds()), TIME_INVALID, TIME_INVALID, 0
    else:
        start, end, shift = period
        in_dst = start <= now < end
        standard = int(offset.total_seconds()) - (shift if in_dst else 0)
        dst_start, dst_end = zcl_time(start), zcl_time(end)
    return {
        "time": zcl_time(now),
        "time_status": TIME_STATUS_SYNCHRONIZED,
        "time_zone": standard,
        "dst_start": dst_start,
        "dst_end": dst_end,
        "dst_shift": shift,
    }


def _int(value: Any) -> int | None:
    try:
        number = int(value)
    except (TypeError, ValueError):
        return None
    return None if number == TIME_INVALID else number


def valve_local_time(attrs: dict[str, Any]) -> int | None:
    """The valve's local time (seconds since 2000-01-01, wall clock), or None if unknown.

    Its own local_time if it has one, else worked out from time, time_zone and DST.
    """
    if (local := _int(attrs.get("local_time"))) is not None and local > 0:
        return local
    if (utc := _int(attrs.get("time"))) is None or utc <= 0:
        return None
    local = utc + (_int(attrs.get("time_zone")) or 0)
    start, end = _int(attrs.get("dst_start")), _int(attrs.get("dst_end"))
    if start is not None and end is not None and start <= utc < end:
        local += _int(attrs.get("dst_shift")) or 0
    return local


def expected_local_time(now: datetime, tz: tzinfo) -> int:
    """Home Assistant's local time now, in the same terms as valve_local_time."""
    offset = now.astimezone(tz).utcoffset() or timedelta()
    return zcl_time(now) + int(offset.total_seconds())


def clock_offset(attrs: dict[str, Any], now: datetime, tz: tzinfo) -> int | None:
    """How far ahead (+) or behind (-) the valve's clock is, in seconds; None if unknown."""
    local = valve_local_time(attrs)
    return None if local is None else local - expected_local_time(now, tz)


def clock_ok(offset: int | None) -> bool:
    return offset is not None and abs(offset) <= CLOCK_TOLERANCE

