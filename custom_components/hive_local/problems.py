"""When to raise a Repairs issue (pure, no Home Assistant imports, so it's unit-testable).

health.py asks these questions every minute and raises or clears the matching issue in
HA's issue registry. Each issue clears itself once its problem goes away.
"""

from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

# Issue ids (also the translation keys in strings.json).
RECEIVER_SILENT = "receiver_silent"
Z2M_NO_STATE = "z2m_no_state"
ZHA_DEVICE_LOST = "zha_device_lost"
THERMOSTAT_QUIET = "thermostat_quiet"
VALVE_BATTERY_LOW = "valve_battery_low"
VALVE_UNAVAILABLE = "valve_unavailable"

# Zigbee2MQTT doesn't retain state and a receiver can go a while without reporting, so
# when it's been quiet this long we ask it for its state (ZHA re-reads every 5 min anyway).
PING_AFTER = timedelta(minutes=10)
# No word from the receiver for this long, despite asking: it's offline.
SILENT_AFTER = timedelta(minutes=30)
# Zigbee2MQTT answers the refresh we send on start within seconds. Nothing at all this long
# after starting almost always means the friendly name or the base topic is wrong.
NO_STATE_AFTER = timedelta(minutes=5)
# ZHA reloading rebuilds its devices; give it this long to come back before saying so.
ZHA_LOST_AFTER = timedelta(minutes=5)
# A Hive thermostat with our reporting fix reports at least every 2 min, and ZHA's own
# setting is every 15 min. The receiver shows "No signal" after a few minutes without one.
THERMOSTAT_QUIET_AFTER = timedelta(minutes=15)
THERMOSTAT_QUIET_AFTER_UNCONFIGURED = timedelta(minutes=35)
# Valves drop off for a moment now and then (and while HA starts), so wait before saying so.
VALVE_UNAVAILABLE_AFTER = timedelta(minutes=30)


def receiver_problem(
    now: datetime, started: datetime, last_seen: datetime | None, *, z2m: bool
) -> str | None:
    """RECEIVER_SILENT, Z2M_NO_STATE or None.

    started: when we started listening (or got ZHA's device back).
    """
    if last_seen is None and z2m:
        return Z2M_NO_STATE if now - started >= NO_STATE_AFTER else None
    latest = max(started, last_seen) if last_seen else started
    return RECEIVER_SILENT if now - latest >= SILENT_AFTER else None


def should_ping(
    now: datetime, started: datetime, last_seen: datetime | None, last_ping: datetime | None
) -> bool:
    """Ask the receiver for its state: quiet for PING_AFTER, and not asked in that time."""
    latest = max(t for t in (started, last_seen, last_ping) if t is not None)
    return now - latest >= PING_AFTER


def lost_for(now: datetime, lost_since: datetime | None) -> bool:
    """ZHA hasn't had the receiver for long enough to say so."""
    return lost_since is not None and now - lost_since >= ZHA_LOST_AFTER


def thermostat_quiet(now: datetime, last_report: datetime, *, configured: bool) -> bool:
    """No temperature report from a Hive thermostat for too long.

    last_report: its last report, or when we started watching it.
    configured: it accepted our faster reporting (so it should be heard from every 2 min).
    """
    limit = THERMOSTAT_QUIET_AFTER if configured else THERMOSTAT_QUIET_AFTER_UNCONFIGURED
    return now - last_report >= limit


def _number(value: Any) -> float | None:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return number if number == number else None  # drop NaN


def valve_problems(
    valves: list[dict[str, Any]],
    down_since: dict[str, datetime],
    now: datetime,
    low_battery: float,
) -> dict[tuple[str, str], dict[str, str]]:
    """{(issue, entity_id): placeholders} for Hive valves that need attention.

    valves: {"entity_id", "name", "available", "battery"} (RoomManager.valves()).
    down_since: when each valve went unavailable; updated in place (valves that came back,
    or that HA no longer has, are dropped).
    """
    out: dict[tuple[str, str], dict[str, str]] = {}
    current = {v["entity_id"] for v in valves}
    for entity_id in list(down_since):
        if entity_id not in current:
            del down_since[entity_id]
    for valve in valves:
        entity_id = valve["entity_id"]
        name = valve.get("name") or entity_id
        if valve.get("available"):
            down_since.pop(entity_id, None)
        else:
            since = down_since.setdefault(entity_id, now)
            if now - since >= VALVE_UNAVAILABLE_AFTER:
                out[(VALVE_UNAVAILABLE, entity_id)] = {"name": name, "entity_id": entity_id}
        battery = _number(valve.get("battery"))
        if battery is not None and battery <= low_battery:
            out[(VALVE_BATTERY_LOW, entity_id)] = {
                "name": name,
                "entity_id": entity_id,
                "battery": f"{battery:.0f}",
            }
    return out
