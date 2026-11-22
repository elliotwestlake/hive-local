"""Websocket API used by the sidebar panel.

hive_local/devices                                  -> configured receivers + limits
hive_local/subscribe                                -> pushes {"status": {entry_id: {...}}} on every change
hive_local/get   {entry_id, channel}                -> {"schedule": {day: [...]}, "complete": bool}
hive_local/set   {entry_id, channel, schedule}
hive_local/mode  {entry_id, channel, mode, setpoint?}   mode = schedule | manual | off
hive_local/boost {entry_id, channel, minutes?, temperature?}
hive_local/cancel_boost {entry_id, channel}
hive_local/target {entry_id, temperature}  like turning the thermostat dial (heating)
hive_local/stats {entry_id, channel, days: 1|7|30} -> heating time, cycles, modes, temperatures (from the recorder)
Rooms are house-wide, so these don't take an entry_id:
hive_local/rooms/subscribe                         -> pushes {"receivers", "rooms"} on any room/valve/sensor/battery change
hive_local/rooms/candidates                        -> {"valves", "sensors", "receivers"} for the room editor
hive_local/rooms/save {room_id?, name, valves, sensor?, receiver?}
hive_local/rooms/delete {room_id}
hive_local/rooms/set_target {room_id, temperature} -> {"failed": [valves that refused]}
"""

from __future__ import annotations

from collections.abc import Awaitable, Callable
from datetime import datetime, timedelta
from functools import wraps
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.util import dt as dt_util
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.event import async_track_state_change_event

from .const import (
    BOOST_MIN_TEMP,
    CHANNEL_HEAT,
    CHANNEL_WATER,
    CONF_Z2M_MODEL,
    DOMAIN,
    HEAT_MAX,
    HEAT_MIN,
    MAX_TRANSITIONS,
    SIGNAL_STATUS,
    WATER_OFF,
    WATER_ON,
)
from .data import HiveConfigEntry
from .room_manager import DATA_ROOMS, SIGNAL_ROOMS, RoomManager
from .schedule import ScheduleError, validate
from .stats import sample_from_state, summarise
from .z2m import BOOST_MAX_MINUTES, MODE_MANUAL, MODE_OFF, MODE_SCHEDULE

CHANNEL = {vol.Optional("channel", default=CHANNEL_HEAT): vol.In([CHANNEL_HEAT, CHANNEL_WATER])}
ENTRY = {vol.Required("entry_id"): str}


@callback
def async_register(hass: HomeAssistant) -> None:
    for command in (
        ws_devices,
        ws_subscribe,
        ws_get,
        ws_set,
        ws_mode,
        ws_boost,
        ws_cancel_boost,
        ws_target,
        ws_stats,
        ws_rooms_subscribe,
        ws_rooms_candidates,
        ws_rooms_save,
        ws_rooms_delete,
        ws_rooms_set_target,
    ):
        websocket_api.async_register_command(hass, command)


def _entries(hass: HomeAssistant) -> list[HiveConfigEntry]:
    return hass.config_entries.async_loaded_entries(DOMAIN)


def _with_entry(
    func: Callable[[HomeAssistant, Any, dict[str, Any], HiveConfigEntry], Awaitable[None]],
):
    """Look up msg["entry_id"] and turn ScheduleError/ValueError into websocket errors."""

    @wraps(func)
    async def wrapper(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
        entry = next((e for e in _entries(hass) if e.entry_id == msg["entry_id"]), None)
        if entry is None:
            connection.send_error(msg["id"], "not_found", "Unknown receiver")
            return
        try:
            await func(hass, connection, msg, entry)
        except (ScheduleError, ValueError) as err:
            connection.send_error(msg["id"], "invalid", str(err))

    return wrapper


def _status(hass: HomeAssistant) -> dict[str, Any]:
    out = {}
    for entry in _entries(hass):
        data = entry.runtime_data
        out[entry.entry_id] = {
            channel: {
                "status": data.transport.status(channel),
                "boost_minutes": data.boost_defaults(channel).minutes,
                "boost_temperature": data.boost_defaults(channel).temperature,
                "frost_temperature": data.boost_defaults(channel).frost,
            }
            for channel in data.transport.channels
        }
    return out


@websocket_api.websocket_command({vol.Required("type"): "hive_local/devices"})
@callback
def ws_devices(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    connection.send_result(
        msg["id"],
        {
            "devices": [
                {
                    "entry_id": e.entry_id,
                    "name": e.title,
                    "model": e.data.get(CONF_Z2M_MODEL),
                    "channels": list(e.runtime_data.transport.channels),
                }
                for e in _entries(hass)
            ],
            "limits": {
                "max_transitions": MAX_TRANSITIONS,
                "heat_min": HEAT_MIN,
                "heat_max": HEAT_MAX,
                "boost_min_temp": BOOST_MIN_TEMP,
                "boost_max_minutes": BOOST_MAX_MINUTES,
                "water_on": WATER_ON,
                "water_off": WATER_OFF,
            },
        },
    )


@websocket_api.websocket_command({vol.Required("type"): "hive_local/subscribe"})
@callback
def ws_subscribe(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    @callback
    def _send() -> None:
        connection.send_message(
            websocket_api.event_message(msg["id"], {"status": _status(hass)})
        )

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL_STATUS, _send)
    connection.send_result(msg["id"])
    _send()


@websocket_api.websocket_command({vol.Required("type"): "hive_local/get"} | ENTRY | CHANNEL)
@websocket_api.async_response
@_with_entry
async def ws_get(hass: HomeAssistant, connection, msg: dict[str, Any], entry: HiveConfigEntry) -> None:
    schedule, complete = await entry.runtime_data.transport.async_read(msg["channel"])
    connection.send_result(msg["id"], {"schedule": schedule, "complete": complete})


@websocket_api.websocket_command(
    {vol.Required("type"): "hive_local/set", vol.Required("schedule"): dict} | ENTRY | CHANNEL
)
@websocket_api.async_response
@_with_entry
async def ws_set(hass: HomeAssistant, connection, msg: dict[str, Any], entry: HiveConfigEntry) -> None:
    clean = validate(
        msg["schedule"],
        max_transitions=MAX_TRANSITIONS,
        min_setpoint=HEAT_MIN,
        max_setpoint=HEAT_MAX,
    )
    commands = await entry.runtime_data.transport.async_write(msg["channel"], clean)
    connection.send_result(msg["id"], {"commands": commands, "schedule": clean})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_local/mode",
        vol.Required("mode"): vol.In([MODE_SCHEDULE, MODE_MANUAL, MODE_OFF]),
        vol.Optional("setpoint"): vol.All(vol.Coerce(float), vol.Range(BOOST_MIN_TEMP, HEAT_MAX)),
    }
    | ENTRY
    | CHANNEL
)
@websocket_api.async_response
@_with_entry
async def ws_mode(hass: HomeAssistant, connection, msg: dict[str, Any], entry: HiveConfigEntry) -> None:
    await entry.runtime_data.transport.async_set_mode(
        msg["channel"], msg["mode"], msg.get("setpoint")
    )
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_local/boost",
        vol.Optional("minutes"): vol.All(vol.Coerce(int), vol.Range(1, BOOST_MAX_MINUTES)),
        vol.Optional("temperature"): vol.All(vol.Coerce(float), vol.Range(BOOST_MIN_TEMP, HEAT_MAX)),
    }
    | ENTRY
    | CHANNEL
)
@websocket_api.async_response
@_with_entry
async def ws_boost(hass: HomeAssistant, connection, msg: dict[str, Any], entry: HiveConfigEntry) -> None:
    await entry.runtime_data.async_boost(msg["channel"], msg.get("minutes"), msg.get("temperature"))
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_local/target",
        vol.Required("temperature"): vol.All(vol.Coerce(float), vol.Range(BOOST_MIN_TEMP, HEAT_MAX)),
    }
    | ENTRY
    | CHANNEL
)
@websocket_api.async_response
@_with_entry
async def ws_target(hass: HomeAssistant, connection, msg: dict[str, Any], entry: HiveConfigEntry) -> None:
    await entry.runtime_data.async_set_target(msg["channel"], msg["temperature"])
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command({vol.Required("type"): "hive_local/cancel_boost"} | ENTRY | CHANNEL)
@websocket_api.async_response
@_with_entry
async def ws_cancel_boost(hass: HomeAssistant, connection, msg: dict[str, Any], entry: HiveConfigEntry) -> None:
    await entry.runtime_data.transport.async_cancel_boost(msg["channel"])
    connection.send_result(msg["id"], {"ok": True})


ROOM = {vol.Required("room_id"): str}


def _rooms_handler(func: Callable[[HomeAssistant, Any, dict[str, Any], RoomManager], Awaitable[None]]):
    """Find the house-wide RoomManager; RoomError (a ValueError) -> "invalid"."""

    @wraps(func)
    async def wrapper(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
        try:
            await func(hass, connection, msg, hass.data[DATA_ROOMS])
        except ValueError as err:
            connection.send_error(msg["id"], "invalid", str(err))

    return wrapper


@websocket_api.websocket_command({vol.Required("type"): "hive_local/rooms/subscribe"})
@callback
def ws_rooms_subscribe(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    rooms: RoomManager = hass.data[DATA_ROOMS]
    unsub_states = None

    @callback
    def _send(*_args: Any) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], rooms.status()))

    @callback
    def _track() -> None:
        # Follow exactly the entities the rooms use; re-done whenever rooms change.
        nonlocal unsub_states
        if unsub_states:
            unsub_states()
        unsub_states = async_track_state_change_event(hass, list(rooms.tracked_entities()), _send)

    @callback
    def _rooms_changed() -> None:
        _track()
        _send()

    unsub_rooms = async_dispatcher_connect(hass, SIGNAL_ROOMS, _rooms_changed)
    _track()

    @callback
    def _unsubscribe() -> None:
        unsub_rooms()
        if unsub_states:
            unsub_states()

    connection.subscriptions[msg["id"]] = _unsubscribe
    connection.send_result(msg["id"])
    _send()


@websocket_api.websocket_command({vol.Required("type"): "hive_local/rooms/candidates"})
@websocket_api.async_response
@_rooms_handler
async def ws_rooms_candidates(hass, connection, msg: dict[str, Any], rooms: RoomManager) -> None:
    connection.send_result(msg["id"], rooms.candidates())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_local/rooms/save",
        vol.Optional("room_id"): str,
        vol.Required("name"): str,
        vol.Required("valves"): [str],
        vol.Optional("sensor"): vol.Any(str, None),
        vol.Optional("receiver"): vol.Any(str, None),
    }
)
@websocket_api.async_response
@_rooms_handler
async def ws_rooms_save(hass, connection, msg: dict[str, Any], rooms: RoomManager) -> None:
    room = await rooms.async_save_room(
        {k: msg.get(k) for k in ("name", "valves", "sensor", "receiver")}, msg.get("room_id")
    )
    connection.send_result(msg["id"], {"room": room})


@websocket_api.websocket_command({vol.Required("type"): "hive_local/rooms/delete"} | ROOM)
@websocket_api.async_response
@_rooms_handler
async def ws_rooms_delete(hass, connection, msg: dict[str, Any], rooms: RoomManager) -> None:
    await rooms.async_delete_room(msg["room_id"])
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_local/rooms/set_target",
        vol.Required("temperature"): vol.All(vol.Coerce(float), vol.Range(4, 35)),
    }
    | ROOM
)
@websocket_api.async_response
@_rooms_handler
async def ws_rooms_set_target(hass, connection, msg: dict[str, Any], rooms: RoomManager) -> None:
    failed = await rooms.async_set_target(msg["room_id"], msg["temperature"])
    connection.send_result(msg["id"], {"failed": failed})


# Chart bucket length for each period: 15 min over a day, 1 h over a week, 6 h over a month.
STATS_BUCKETS = {1: timedelta(minutes=15), 7: timedelta(hours=1), 30: timedelta(hours=6)}
_STATS_ENTITY = {CHANNEL_HEAT: ("climate", "climate"), CHANNEL_WATER: ("water_heater", "water_heater")}


def _history(hass: HomeAssistant, entity_id: str, start: datetime, end: datetime) -> list:
    """Every recorded state (attribute changes too), plus the one in force at `start`. Executor."""
    from homeassistant.components.recorder import history  # noqa: PLC0415

    states = history.get_significant_states(
        hass,
        start,
        end,
        entity_ids=[entity_id],
        include_start_time_state=True,
        significant_changes_only=False,
        minimal_response=False,
        no_attributes=False,
    )
    return states.get(entity_id, [])


@websocket_api.websocket_command(
    {vol.Required("type"): "hive_local/stats", vol.Optional("days", default=7): vol.In(list(STATS_BUCKETS))}
    | ENTRY
    | CHANNEL
)
@websocket_api.async_response
@_with_entry
async def ws_stats(hass: HomeAssistant, connection, msg: dict[str, Any], entry: HiveConfigEntry) -> None:
    channel, days = msg["channel"], msg["days"]
    if "recorder" not in hass.config.components:
        connection.send_error(msg["id"], "no_recorder", "Stats need Home Assistant's recorder")
        return
    platform, key = _STATS_ENTITY[channel]
    entity_id = er.async_get(hass).async_get_entity_id(
        platform, DOMAIN, f"{entry.entry_id}_{channel}_{key}"
    )
    if entity_id is None:
        connection.send_error(msg["id"], "not_found", "This receiver has no entity for that channel")
        return

    from homeassistant.components.recorder import get_instance  # noqa: PLC0415

    now = dt_util.now()
    today = dt_util.start_of_local_day(now)
    # Local calendar days, so "Today" starts at midnight. Wall-clock arithmetic keeps DST right.
    day_starts = [today - timedelta(days=i) for i in range(days - 1, -1, -1)]
    start, period_end = day_starts[0], today + timedelta(days=1)
    step = STATS_BUCKETS[days]
    buckets, b = [], start
    while b < period_end:
        buckets.append(b)
        b += step
    # The same stretch of the previous period, for "vs last week" and so on.
    prev_start, prev_end = start - timedelta(days=days), now - timedelta(days=days)

    states = await get_instance(hass).async_add_executor_job(_history, hass, entity_id, prev_start, now)
    samples = [
        sample_from_state(channel, s.last_updated.timestamp(), s.state, dict(s.attributes))
        for s in states
    ]

    def ts(d: datetime) -> float:
        return dt_util.as_utc(d).timestamp()

    result = summarise(
        samples,
        ts(start),
        now.timestamp(),
        day_starts=[ts(d) for d in day_starts],
        bucket_starts=[ts(d) for d in buckets],
        period_end=ts(period_end),
        previous=(ts(prev_start), ts(prev_end)),
    )
    connection.send_result(msg["id"], {**result, "entity_id": entity_id, "period": days})
