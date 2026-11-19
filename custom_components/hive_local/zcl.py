"""Pure ZCL Thermostat helpers for the ZHA transport (no Home Assistant or zigpy imports).

Values are raw ZCL, as zigpy reads and writes them: temperatures in centi-°C,
system_mode / hold as enum ints, running_state as a bitmap. Attribute names are
zigpy's (`temp_setpoint_hold`, not Z2M's `temperature_setpoint_hold`).

Same modes as the Z2M payloads in `z2m.py`:

  schedule -> system_mode Heat, temp_setpoint_hold 0
  manual   -> system_mode Heat, temp_setpoint_hold 1, occupied_heating_setpoint
  off      -> system_mode Off, temp_setpoint_hold 0
  boost    -> system_mode Emergency_Heating, temp_setpoint_hold_duration, temp_setpoint_hold 1,
              occupied_heating_setpoint   (one Write Attributes command)
"""

from __future__ import annotations

from datetime import datetime, timedelta, timezone, tzinfo
from typing import Any

from .const import CHANNEL_HEAT, CHANNEL_WATER, ZHA_EP_HEAT, ZHA_EP_WATER
from .schedule import DAYS, hhmm_to_minutes, minutes_to_hhmm, per_day, tidy_transitions
from .z2m import BOOST_MAX_MINUTES, MODE_BOOST, MODE_MANUAL, MODE_OFF, MODE_SCHEDULE

SYSTEM_MODE_OFF = 0x00
SYSTEM_MODE_HEAT = 0x04
SYSTEM_MODE_EMERGENCY_HEATING = 0x05

RUNNING_STATE_HEAT = 0x0001
TEMP_INVALID = -0x8000  # int16s "no reading"

# set/get_weekly_schedule. SeqDayOfWeek: Sun=0x01 ... Sat=0x40, Away=0x80.
SEQ_MODE_HEAT = 0x01
SEQ_MODE_COOL = 0x02
DAY_BITS: dict[str, int] = {
    "sunday": 0x01,
    "monday": 0x02,
    "tuesday": 0x04,
    "wednesday": 0x08,
    "thursday": 0x10,
    "friday": 0x20,
    "saturday": 0x40,
}
ALL_DAYS = 0x7F

STATE_ATTRS: tuple[str, ...] = (
    "system_mode",
    "temp_setpoint_hold",
    "temp_setpoint_hold_duration",
    "occupied_heating_setpoint",
    "local_temperature",
    "running_state",
)
# Not in ZHA's reporting config, so the transport has to read these itself.
HOLD_ATTRS: tuple[str, ...] = ("system_mode", "temp_setpoint_hold", "temp_setpoint_hold_duration")


# Like Z2M, the model decides how many channels a receiver has; some single-channel
# receivers still list a Thermostat cluster on the hot water endpoint.
SINGLE_CHANNEL_MODELS = ("SLR1", "OTR1")  # SLR1, SLR1b/c/d, OTR1
DUAL_CHANNEL_MODELS = ("SLR2",)  # SLR2, SLR2b/c/d


def receiver_endpoints(model: str | None, thermostat_eps: list[int]) -> dict[str, int]:
    """{channel: endpoint} for a receiver, given the endpoints that have a Thermostat cluster.

    Known single-channel models get heating only (endpoint 5), known dual-channel
    models heating 5 + hot water 6. Unknown models go by the endpoints.
    """
    eps = sorted(thermostat_eps)
    if not eps:
        return {}
    heat = ZHA_EP_HEAT if ZHA_EP_HEAT in eps else eps[0]
    name = (model or "").upper()
    if name.startswith(SINGLE_CHANNEL_MODELS):
        return {CHANNEL_HEAT: heat}
    if ZHA_EP_HEAT in eps and ZHA_EP_WATER in eps:
        return {CHANNEL_HEAT: ZHA_EP_HEAT, CHANNEL_WATER: ZHA_EP_WATER}
    return {CHANNEL_HEAT: heat}


# Hive SLT wall thermostats. ZHA sets their temperature reporting to at most every
# 15 minutes, but the receiver drops a thermostat it hasn't heard from for a few
# minutes: red light, boiler off, "No signal" on the thermostat, every ~6 minutes
# (zigpy/zha-device-handlers#2776). Reporting at least every 2 minutes fixes it.
THERMOSTAT_MODELS = ("SLT",)  # SLT2, SLT3, SLT3b/c/d, SLT6 ...
TEMPERATURE_REPORTING = (5, 120, 50)  # min s, max s, change (centi-°C)


def is_hive_thermostat(manufacturer: str | None, model: str | None) -> bool:
    return (model or "").upper().startswith(THERMOSTAT_MODELS) and (
        manufacturer or ""
    ).lower() in ("computime", "hive", "")


# --- Hive radiator valves (Danfoss Ally) -------------------------------------------
VALVE_MIN = 5.0  # the valve's minimum setpoint; a schedule's "off" periods use it
VALVE_MAX = 35.0
# Thermostat programing_oper_mode (0x0025) bit 0: follow the weekly schedule.
SCHEDULE_MODE = 0x01
TIME_STATUS_SYNCHRONIZED = 0x02  # the only bit the Ally accepts
NO_DST = 0xFFFFFFFF


def _zigbee_seconds(when: datetime) -> int:
    """Seconds since 2000-01-01 00:00 UTC (ZCL UTCTime)."""
    return round((when - datetime(2000, 1, 1, tzinfo=timezone.utc)).total_seconds())


def _offset_changes(tz: tzinfo, year: int) -> list[tuple[datetime, int]]:
    """(first UTC instant of the new offset, change in seconds) between 1 Feb and 1 Dec."""
    start = datetime(year, 2, 1, tzinfo=timezone.utc)
    end = datetime(year, 12, 1, tzinfo=timezone.utc)
    off = lambda t: int(t.astimezone(tz).utcoffset().total_seconds())  # noqa: E731
    changes = []
    t, prev = start, off(start)
    while t < end:
        nxt = t + timedelta(hours=1)
        if off(nxt) != prev:
            lo, hi = t, nxt  # bisect to the second
            while (hi - lo) > timedelta(seconds=1):
                mid = lo + (hi - lo) / 2
                lo, hi = (mid, hi) if off(mid) == prev else (lo, mid)
            changes.append((hi.replace(microsecond=0), off(nxt) - prev))
            prev = off(nxt)
        t = nxt
    return changes


def time_attributes(now: datetime, tz: tzinfo) -> dict[str, int]:
    """ZCL Time cluster values for a valve, the way Zigbee2MQTT sets them for the Ally.

    time_zone is the standard offset; dst_start/dst_end bound the current or next DST
    period (dst_end is its last second); no regular DST -> both 0xFFFFFFFF, shift 0.
    """
    year = now.year
    changes = _offset_changes(tz, year)
    zone = int(now.astimezone(tz).utcoffset().total_seconds())
    dst_start = dst_end = NO_DST
    shift = 0
    if len(changes) == 2:
        if changes[0][1] > 0:  # northern hemisphere: DST in the middle of the year
            (begin, change), (finish, back) = changes
            zone = int((finish).astimezone(tz).utcoffset().total_seconds())
            dst_start, dst_end, shift = _zigbee_seconds(begin), _zigbee_seconds(finish) - 1, change
        elif now < changes[0][0]:  # southern, in the DST period that started last year
            last = _offset_changes(tz, year - 1)
            if len(last) == 2:
                zone = int(changes[0][0].astimezone(tz).utcoffset().total_seconds())
                dst_start, dst_end, shift = _zigbee_seconds(last[1][0]), _zigbee_seconds(changes[0][0]) - 1, last[1][1]
        else:  # southern, DST starts later this year and ends next year
            following = _offset_changes(tz, year + 1)
            if len(following) == 2:
                zone = int(changes[0][0].astimezone(tz).utcoffset().total_seconds())
                dst_start, dst_end, shift = _zigbee_seconds(changes[1][0]), _zigbee_seconds(following[0][0]) - 1, changes[1][1]
    return {
        "time": _zigbee_seconds(now),
        "time_status": TIME_STATUS_SYNCHRONIZED,
        "time_zone": zone,
        "dst_start": dst_start,
        "dst_end": dst_end,
        "dst_shift": shift,
    }


def _celsius(value: Any) -> float | None:
    if not isinstance(value, int) or value == TEMP_INVALID:
        return None
    return round(value / 100, 2)


def _centi(value: float) -> int:
    return int(round(float(value) * 100))


def channel_status(attrs: dict[str, Any]) -> dict[str, Any] | None:
    """Summarise cached Thermostat attributes, or None if system_mode isn't known yet.

    Same shape as `z2m.channel_status`.
    """
    system_mode = attrs.get("system_mode")
    if system_mode is None:
        return None
    hold = attrs.get("temp_setpoint_hold")
    duration = attrs.get("temp_setpoint_hold_duration")

    if system_mode == SYSTEM_MODE_EMERGENCY_HEATING:
        mode = MODE_BOOST
    elif system_mode == SYSTEM_MODE_OFF:
        mode = MODE_OFF
    elif hold == 1:
        mode = MODE_MANUAL
    else:
        mode = MODE_SCHEDULE

    remaining: int | None = 0
    if mode == MODE_BOOST:
        remaining = (
            int(duration)
            if isinstance(duration, int) and 0 <= duration <= BOOST_MAX_MINUTES
            else None
        )

    running = attrs.get("running_state")
    return {
        "mode": mode,
        "boost_remaining": remaining,
        "current_temperature": _celsius(attrs.get("local_temperature")),
        "setpoint": _celsius(attrs.get("occupied_heating_setpoint")),
        "heating": isinstance(running, int) and bool(running & RUNNING_STATE_HEAT),
    }


def mode_attributes(mode: str, setpoint: float | None = None) -> dict[str, int]:
    if mode == MODE_SCHEDULE:
        return {"system_mode": SYSTEM_MODE_HEAT, "temp_setpoint_hold": 0}
    if mode == MODE_OFF:
        return {"system_mode": SYSTEM_MODE_OFF, "temp_setpoint_hold": 0}
    if mode == MODE_MANUAL:
        attrs = {"system_mode": SYSTEM_MODE_HEAT, "temp_setpoint_hold": 1}
        if setpoint is not None:
            attrs["occupied_heating_setpoint"] = _centi(setpoint)
        return attrs
    raise ValueError(f"Unknown mode '{mode}'")


def setpoint_attributes(setpoint: float) -> dict[str, int]:
    """Just the setpoint, mode untouched. On schedule it lasts until the next change."""
    return {"occupied_heating_setpoint": _centi(setpoint)}


def boost_attributes(minutes: int, setpoint: float | None = None) -> dict[str, int]:
    """All boost fields in one write, in the same order as the Z2M payload."""
    if not 1 <= minutes <= BOOST_MAX_MINUTES:
        raise ValueError(f"Boost must be 1-{BOOST_MAX_MINUTES} minutes")
    attrs = {
        "system_mode": SYSTEM_MODE_EMERGENCY_HEATING,
        "temp_setpoint_hold_duration": int(minutes),
        "temp_setpoint_hold": 1,
    }
    if setpoint is not None:  # hot water boosts have no setpoint
        attrs["occupied_heating_setpoint"] = _centi(setpoint)
    return attrs


def day_bits(days: list[str]) -> int:
    bits = 0
    for day in days:
        bits |= DAY_BITS[day]
    return bits


def schedule_commands(schedule: dict[str, list[dict[str, Any]]]) -> list[dict[str, Any]]:
    """Keyword args for `cluster.set_weekly_schedule`, one per day."""
    commands = []
    for days, transitions in per_day(schedule):
        values: list[int] = []
        for t in transitions:
            values += [hhmm_to_minutes(t["time"]), _centi(t["setpoint"])]
        commands.append(
            {
                "num_transitions_for_sequence": len(transitions),
                "day_of_week_for_sequence": day_bits(days),
                "mode_for_sequence": SEQ_MODE_HEAT,
                "values": values,
            }
        )
    return commands


def parse_schedule_response(
    days: int, mode: int, values: list[int]
) -> dict[str, list[dict[str, Any]]]:
    """Turn one get_weekly_schedule_response into {day: transitions}.

    Values are (time, heat) pairs for a heat sequence, or (time, heat, cool)
    triplets for heat+cool. A cool-only sequence has nothing for us.
    """
    if not int(mode) & SEQ_MODE_HEAT:
        return {}
    step = 3 if int(mode) & SEQ_MODE_COOL else 2
    transitions = tidy_transitions(
        [
            {"time": minutes_to_hhmm(values[i]), "setpoint": float(_celsius(values[i + 1]))}
            for i in range(0, len(values) - step + 1, step)
            if values[i + 1] != TEMP_INVALID
        ]
    )
    return {day: list(transitions) for day in DAYS if int(days) & DAY_BITS[day]}
