"""Weekly schedules on the Hive radiator valves of a room (#5). Experimental.

Each Hive valve (a Danfoss Ally) keeps its own weekly schedule. A room's schedule is
read from its valves and written to every one of them, like the receiver's: one
command per day, padded to 6 transitions, and the panel sends only the days that
changed. The valve follows it only in its "schedule" programming mode.

ZHA: endpoint 1's Thermostat cluster (transports/zha_valve.py). The schedule runs on the
valve's clock, so before writing we check it and set it when it's more than
trv.CLOCK_TOLERANCE out (what Zigbee2MQTT does for the Ally anyway); if it's still wrong
that valve isn't written.

Zigbee2MQTT: the Ally's `schedule_<day>` keys (zigbee-herdsman-converters
`danfossWeeklySchedule`, one setWeeklySchedule per key) on the valve's own topic, found
from its IEEE address in bridge/devices. Z2M keeps the valve's clock set itself.

Unverified on real valves: the timings for a sleepy valve, and whether the Ally takes
6 transitions with repeats as the receiver does.
"""

from __future__ import annotations

import asyncio
import json
import logging
from typing import Any, Protocol

from homeassistant.components import mqtt
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er

from .const import (
    CONF_BASE_TOPIC,
    CONF_TRANSPORT,
    DEFAULT_BASE_TOPIC,
    DOMAIN,
    MAX_TRANSITIONS,
    TRANSPORT_Z2M,
    VALVE_READ_TIMEOUT,
)
from .room_manager import RoomManager
from .schedule import DAYS, validate
from .trv import (
    VALVE_MAX,
    VALVE_MIN,
    combine_reads,
    parse_z2m_state,
    valve_address,
    z2m_friendly_name,
    z2m_payloads,
)

_LOGGER = logging.getLogger(__name__)

Schedule = dict[str, list[dict[str, Any]]]

# What the panel's schedule editor needs to know about a valve schedule.
LIMITS = {"max_transitions": MAX_TRANSITIONS, "heat_min": VALVE_MIN, "heat_max": VALVE_MAX}

Z2M_MODE = "programming_operation_mode"


class ValveLink(Protocol):
    transport: str

    async def async_read(self) -> Schedule: ...
    async def async_write(self, schedule: Schedule) -> int: ...
    async def async_clock(self, *, fix: bool) -> dict[str, Any]: ...
    async def async_schedule_mode(self) -> bool | None: ...
    async def async_set_schedule_mode(self, enabled: bool) -> None: ...


class Z2MValve:
    """A valve on Zigbee2MQTT, through its `schedule_<day>` keys."""

    transport = "z2m"

    def __init__(self, hass: HomeAssistant, topic: str) -> None:
        self.hass = hass
        self.topic = topic
        self._mode: bool | None = None

    async def _publish(self, verb: str, payload: dict[str, Any]) -> None:
        _LOGGER.debug("%s/%s: %s", self.topic, verb, payload)
        await mqtt.async_publish(self.hass, f"{self.topic}/{verb}", json.dumps(payload))

    async def async_read(self) -> Schedule:
        collected: Schedule = {}
        all_days = asyncio.Event()
        request_sent = False

        @callback
        def _on_state(message) -> None:
            # Z2M's state messages carry everything it has cached; ignore what came
            # before our request.
            if not request_sent:
                return
            try:
                payload = json.loads(message.payload)
            except (ValueError, TypeError):
                return
            if not isinstance(payload, dict):
                return
            if isinstance(mode := payload.get(Z2M_MODE), str):
                self._mode = mode.startswith("schedule")
            collected.update(parse_z2m_state(payload))
            if all(day in collected for day in DAYS):
                all_days.set()

        unsub = await mqtt.async_subscribe(self.hass, self.topic, _on_state, qos=0)
        try:
            request_sent = True
            # Each key is one getWeeklySchedule for that day.
            await self._publish("get", {f"schedule_{day}": "" for day in DAYS} | {Z2M_MODE: ""})
            try:
                await asyncio.wait_for(all_days.wait(), VALVE_READ_TIMEOUT)
            except TimeoutError:
                pass
        finally:
            unsub()
        return {d: collected[d] for d in DAYS if d in collected}

    async def async_write(self, schedule: Schedule) -> int:
        payloads = z2m_payloads(schedule)
        for payload in payloads:
            await self._publish("set", payload)
            await asyncio.sleep(0.5)
        return len(payloads)

    async def async_clock(self, *, fix: bool) -> dict[str, Any]:
        # Zigbee2MQTT sets the Ally's clock itself (on pairing, rejoining and daily).
        return {"offset": None, "ok": True, "set": False, "managed": "z2m"}

    async def async_schedule_mode(self) -> bool | None:
        return self._mode

    async def async_set_schedule_mode(self, enabled: bool) -> None:
        await self._publish("set", {Z2M_MODE: "schedule" if enabled else "setpoint"})


async def _async_z2m_topic(hass: HomeAssistant, ieee: str) -> str:
    """<base>/<friendly name> for a valve, from Z2M's retained bridge/devices."""
    from .config_flow import _async_fetch_z2m_devices  # noqa: PLC0415

    bases = [
        e.data.get(CONF_BASE_TOPIC, DEFAULT_BASE_TOPIC)
        for e in hass.config_entries.async_entries(DOMAIN)
        if e.data.get(CONF_TRANSPORT, TRANSPORT_Z2M) == TRANSPORT_Z2M
    ]
    for base in dict.fromkeys([*bases, DEFAULT_BASE_TOPIC]):
        if (name := z2m_friendly_name(await _async_fetch_z2m_devices(hass, base), ieee)) is not None:
            return f"{base}/{name}"
    raise HomeAssistantError("Couldn't find it in Zigbee2MQTT's device list")


async def async_link(hass: HomeAssistant, entity_id: str) -> ValveLink:
    """How to reach the valve behind a room's climate entity."""
    entry = er.async_get(hass).async_get(entity_id)
    device = dr.async_get(hass).async_get(entry.device_id) if entry and entry.device_id else None
    address = valve_address(device.identifiers) if device else None
    if address is None:
        raise HomeAssistantError("It isn't a ZHA or Zigbee2MQTT device")
    kind, ieee = address
    if kind == "zha":
        from .transports.zha_valve import ZHAValve  # noqa: PLC0415  (only with ZHA)

        return ZHAValve(hass, device.id, entity_id)
    return Z2MValve(hass, await _async_z2m_topic(hass, ieee))


def _name(hass: HomeAssistant, entity_id: str) -> str:
    state = hass.states.get(entity_id)
    return state.name if state else entity_id


async def _read_one(hass: HomeAssistant, entity_id: str) -> tuple[dict[str, Any], Schedule]:
    out: dict[str, Any] = {"entity_id": entity_id, "name": _name(hass, entity_id), "transport": None}
    try:
        link = await async_link(hass, entity_id)
        out["transport"] = link.transport
        schedule = await link.async_read()
    except HomeAssistantError as err:
        return out | {"days": 0, "complete": False, "error": str(err)}, {}
    out |= {"days": len(schedule), "complete": len(schedule) == len(DAYS), "error": None}
    try:
        out["clock"] = await link.async_clock(fix=False)
    except HomeAssistantError as err:
        out["clock"] = {"offset": None, "ok": False, "set": False, "error": str(err)}
    out["schedule_mode"] = await link.async_schedule_mode()
    return out, schedule


async def async_read_room(hass: HomeAssistant, rooms: RoomManager, room_id: str) -> dict[str, Any]:
    """Read every valve in the room. The schedule is the first valve's (see combine_reads)."""
    room = rooms._room(room_id)  # noqa: SLF001
    results = await asyncio.gather(*(_read_one(hass, v) for v in room["valves"]))
    valves = [info for info, _ in results]
    schedule, differs = combine_reads([s for _, s in results if s])
    return {
        "schedule": schedule,
        "complete": len(schedule) == len(DAYS),
        "differs": differs,
        "valves": valves,
        "limits": LIMITS,
    }


async def _write_one(hass: HomeAssistant, entity_id: str, schedule: Schedule) -> dict[str, Any]:
    out: dict[str, Any] = {"entity_id": entity_id, "name": _name(hass, entity_id), "commands": 0, "error": None}
    try:
        link = await async_link(hass, entity_id)
        out["transport"] = link.transport
        try:
            # Before writing: a valve on the wrong time runs the schedule at the wrong times.
            out["clock"] = await link.async_clock(fix=True)
        except HomeAssistantError as err:
            raise HomeAssistantError(f"Not written, its clock may be wrong: {err}") from err
        out["commands"] = await link.async_write(schedule)
    except HomeAssistantError as err:
        out["error"] = str(err)
    return out


async def async_write_room(
    hass: HomeAssistant, rooms: RoomManager, room_id: str, schedule: Schedule
) -> dict[str, Any]:
    """Write the given days to every valve in the room (one command per day each)."""
    room = rooms._room(room_id)  # noqa: SLF001
    clean = validate(schedule, max_transitions=MAX_TRANSITIONS, min_setpoint=VALVE_MIN, max_setpoint=VALVE_MAX)
    valves = await asyncio.gather(*(_write_one(hass, v, clean) for v in room["valves"]))
    failed = [v["entity_id"] for v in valves if v["error"]]
    if valves and len(failed) == len(valves):
        raise HomeAssistantError(
            "No valve took the schedule: " + "; ".join(f"{v['name']}: {v['error']}" for v in valves)
        )
    return {
        "schedule": clean,
        "commands": sum(v["commands"] for v in valves),
        "valves": valves,
        "failed": failed,
    }


async def async_set_room_schedule_mode(
    hass: HomeAssistant, rooms: RoomManager, room_id: str, enabled: bool
) -> dict[str, Any]:
    """Make every valve in the room follow its schedule (or go back to a fixed setpoint)."""
    failed = []
    for entity_id in rooms._room(room_id)["valves"]:  # noqa: SLF001
        try:
            await (await async_link(hass, entity_id)).async_set_schedule_mode(enabled)
        except HomeAssistantError as err:
            _LOGGER.debug("Schedule mode on %s: %s", entity_id, err)
            failed.append(entity_id)
    return {"failed": failed}
