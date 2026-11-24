"""Websocket API used by the sidebar panel.

hive_local/devices                                  -> configured receivers + limits
hive_local/subscribe                                -> pushes {"status": {entry_id: {...}}} on every change
hive_local/get   {entry_id, channel}                -> {"schedule": {day: [...]}, "complete": bool}
hive_local/set   {entry_id, channel, schedule}
hive_local/mode  {entry_id, channel, mode, setpoint?}   mode = schedule | manual | off
hive_local/boost {entry_id, channel, minutes?, temperature?}
hive_local/cancel_boost {entry_id, channel}
hive_local/target {entry_id, temperature}  like turning the thermostat dial (heating)
hive_local/preheat {entry_id, channel?, enabled?, max_lead?}  pre-heat settings (heating only)
hive_local/defaults {entry_id, channel, boost_minutes?, boost_temperature?, frost_temperature?} (through the number entities)
hive_local/settings                                -> {"outdoor_entity", "outdoor_candidates", "gas_meter", "gas_meter_candidates", "fit", "output_kw", "output_basis", "boiler_kw", "price_source", "fixed_price", "price_candidates", "energy_price", "price", "currency"} (house-wide)
hive_local/settings/set {outdoor_entity?, gas_meter?, boiler_kw?, price_source?: "energy"|"fixed"|entity_id|null, fixed_price?}
hive_local/stats {entry_id, channel, days: 1|7|30, offset?: periods back} -> heating time, cycles, modes, temperatures, outdoor temperature and the cost per hour of heating if set (from the recorder)
hive_local/holiday/set {until, temperature?, entry_id?}  away until `until` (every receiver without entry_id)
hive_local/holiday/cancel {entry_id?}               back to the previous modes now
Rooms are house-wide, so these don't take an entry_id:
hive_local/rooms/subscribe                         -> pushes {"receivers", "rooms"} on any room/valve/sensor/battery change
hive_local/rooms/candidates                        -> {"valves", "sensors", "receivers"} for the room editor
hive_local/rooms/valves                            -> {"valves": every Hive valve with state, battery, area, room and identify} for the Devices tab
hive_local/rooms/suggest                           -> {"rooms": a room per area with free Hive valves, "receivers"} for first-time setup
hive_local/rooms/identify {entity_id}              -> presses the valve's Identify button (it flashes its light)
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
    PREHEAT_MAX_LEAD_MAX,
    PREHEAT_MAX_LEAD_MIN,
    BOOST_MIN_TEMP,
    FROST_MAX,
    FROST_MIN,
    CHANNEL_HEAT,
    CHANNEL_WATER,
    CONF_TRANSPORT,
    CONF_Z2M_MODEL,
    DOMAIN,
    HEAT_MAX,
    HEAT_MIN,
    MAX_TRANSITIONS,
    SIGNAL_STATUS,
    TRANSPORT_Z2M,
    WATER_OFF,
    WATER_ON,
)
from .data import HiveConfigEntry
from .room_manager import DATA_ROOMS, SIGNAL_ROOMS, RoomManager
from .settings import DATA_SETTINGS, HouseSettings, SettingsError
from .schedule import ScheduleError, validate
from .history import async_outdoor, async_samples, channel_entity_id
from .stats import summarise
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
        ws_preheat,
        ws_defaults,
        ws_settings,
        ws_settings_set,
        ws_holiday_set,
        ws_holiday_cancel,
        ws_stats,
        ws_rooms_subscribe,
        ws_rooms_candidates,
        ws_rooms_valves,
        ws_rooms_suggest,
        ws_rooms_identify,
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
                **({"preheat": data.preheat.as_dict()} if channel == CHANNEL_HEAT else {}),
                "holiday": data.holiday.as_dict(channel),
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
                    "transport": e.data.get(CONF_TRANSPORT, TRANSPORT_Z2M),
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
    entry.runtime_data.preheat.schedule_seen(msg["channel"], schedule)
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
    entry.runtime_data.preheat.schedule_seen(msg["channel"], clean)
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
    await entry.runtime_data.async_set_mode(msg["channel"], msg["mode"], msg.get("setpoint"))
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


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_local/preheat",
        vol.Optional("enabled"): bool,
        vol.Optional("max_lead"): vol.All(vol.Coerce(int), vol.Range(PREHEAT_MAX_LEAD_MIN, PREHEAT_MAX_LEAD_MAX)),
    }
    | ENTRY
    | CHANNEL  # the panel sends a channel with every command; pre-heat is heating only
)
@websocket_api.async_response
@_with_entry
async def ws_preheat(hass: HomeAssistant, connection, msg: dict[str, Any], entry: HiveConfigEntry) -> None:
    """Change pre-heat settings through its switch and number, so they're restored after a restart."""
    if msg["channel"] != CHANNEL_HEAT or not entry.runtime_data.preheat.available:
        raise ScheduleError("This receiver has no heating")
    registry = er.async_get(hass)
    if "enabled" in msg:
        entity_id = registry.async_get_entity_id("switch", DOMAIN, f"{entry.entry_id}_{CHANNEL_HEAT}_preheat")
        if entity_id is None:
            raise ScheduleError("The pre-heat switch is missing")
        await hass.services.async_call(
            "switch", "turn_on" if msg["enabled"] else "turn_off", {"entity_id": entity_id}, blocking=True
        )
    if "max_lead" in msg:
        entity_id = registry.async_get_entity_id("number", DOMAIN, f"{entry.entry_id}_{CHANNEL_HEAT}_preheat_max_lead")
        if entity_id is None:
            raise ScheduleError("The pre-heat limit is missing")
        await hass.services.async_call(
            "number", "set_value", {"entity_id": entity_id, "value": msg["max_lead"]}, blocking=True
        )
    connection.send_result(msg["id"], entry.runtime_data.preheat.as_dict())


# The Settings tab's boost and frost fields -> our number entities (so they're restored).
DEFAULTS = {
    "boost_minutes": "boost_minutes",
    "boost_temperature": "boost_temperature",
    "frost_temperature": "frost_temperature",
}


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_local/defaults",
        vol.Optional("boost_minutes"): vol.All(vol.Coerce(int), vol.Range(1, BOOST_MAX_MINUTES)),
        vol.Optional("boost_temperature"): vol.All(vol.Coerce(float), vol.Range(BOOST_MIN_TEMP, HEAT_MAX)),
        vol.Optional("frost_temperature"): vol.All(vol.Coerce(float), vol.Range(FROST_MIN, FROST_MAX)),
    }
    | ENTRY
    | CHANNEL
)
@websocket_api.async_response
@_with_entry
async def ws_defaults(hass: HomeAssistant, connection, msg: dict[str, Any], entry: HiveConfigEntry) -> None:
    """Change a channel's boost defaults or frost protection through its number entities."""
    registry = er.async_get(hass)
    for field, key in DEFAULTS.items():
        if field not in msg:
            continue
        entity_id = registry.async_get_entity_id("number", DOMAIN, f"{entry.entry_id}_{msg['channel']}_{key}")
        if entity_id is None:
            raise ScheduleError("That setting isn't available on this channel")
        await hass.services.async_call("number", "set_value", {"entity_id": entity_id, "value": msg[field]}, blocking=True)
    d = entry.runtime_data.boost_defaults(msg["channel"])
    connection.send_result(msg["id"], {"boost_minutes": d.minutes, "boost_temperature": d.temperature, "frost_temperature": d.frost})


@websocket_api.websocket_command({vol.Required("type"): "hive_local/settings"})
@websocket_api.async_response
async def ws_settings(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    connection.send_result(msg["id"], await hass.data[DATA_SETTINGS].async_as_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_local/settings/set",
        vol.Optional("outdoor_entity"): vol.Any(str, None),
        vol.Optional("boiler_kw"): vol.Any(vol.Coerce(float), None),
        vol.Optional("price_source"): vol.Any(str, None),
        vol.Optional("fixed_price"): vol.Any(vol.Coerce(float), None),
        vol.Optional("gas_meter"): vol.Any(str, None),
    }
)
@websocket_api.async_response
async def ws_settings_set(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    settings: HouseSettings = hass.data[DATA_SETTINGS]
    try:
        if "outdoor_entity" in msg:
            await settings.async_set_outdoor(msg["outdoor_entity"])
        if "gas_meter" in msg:
            await settings.async_set_gas_meter(msg["gas_meter"])
        if "boiler_kw" in msg:
            await settings.async_set_boiler_kw(msg["boiler_kw"])
        if "price_source" in msg or "fixed_price" in msg:
            await settings.async_set_price(msg.get("price_source", settings.price_source), msg.get("fixed_price"))
    except SettingsError as err:
        connection.send_error(msg["id"], "invalid", str(err))
        return
    connection.send_result(msg["id"], await settings.async_as_dict())


def _holiday_entries(hass: HomeAssistant, msg: dict[str, Any]) -> list[HiveConfigEntry]:
    entries = _entries(hass)
    if entry_id := msg.get("entry_id"):
        entries = [e for e in entries if e.entry_id == entry_id]
    if not entries:
        raise ScheduleError("Unknown receiver")
    return entries


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_local/holiday/set",
        vol.Required("until"): str,
        vol.Optional("temperature"): vol.All(vol.Coerce(float), vol.Range(BOOST_MIN_TEMP, HEAT_MAX)),
        vol.Optional("entry_id"): str,
        vol.Optional("channel"): str,  # ignored: a holiday covers the whole receiver
    }
)
@websocket_api.async_response
async def ws_holiday_set(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    until = dt_util.parse_datetime(msg["until"])
    if until is None:
        connection.send_error(msg["id"], "invalid", "Not a date and time")
        return
    if until.tzinfo is None:
        until = until.replace(tzinfo=dt_util.get_default_time_zone())
    try:
        for entry in _holiday_entries(hass, msg):
            await entry.runtime_data.async_set_holiday(until, msg.get("temperature"))
    except ScheduleError as err:
        connection.send_error(msg["id"], "invalid", str(err))
        return
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_local/holiday/cancel",
        vol.Optional("entry_id"): str,
        vol.Optional("channel"): str,
    }
)
@websocket_api.async_response
async def ws_holiday_cancel(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    try:
        for entry in _holiday_entries(hass, msg):
            await entry.runtime_data.holiday.async_cancel()
    except ScheduleError as err:
        connection.send_error(msg["id"], "invalid", str(err))
        return
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


@websocket_api.websocket_command({vol.Required("type"): "hive_local/rooms/suggest"})
@websocket_api.async_response
@_rooms_handler
async def ws_rooms_suggest(hass, connection, msg: dict[str, Any], rooms: RoomManager) -> None:
    connection.send_result(msg["id"], {"rooms": rooms.suggestions(), "receivers": rooms.receivers()})


@websocket_api.websocket_command({vol.Required("type"): "hive_local/rooms/identify", vol.Required("entity_id"): str})
@websocket_api.async_response
@_rooms_handler
async def ws_rooms_identify(hass, connection, msg: dict[str, Any], rooms: RoomManager) -> None:
    await rooms.async_identify(msg["entity_id"])
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command({vol.Required("type"): "hive_local/rooms/valves"})
@websocket_api.async_response
@_rooms_handler
async def ws_rooms_valves(hass, connection, msg: dict[str, Any], rooms: RoomManager) -> None:
    connection.send_result(msg["id"], {"valves": rooms.valves()})


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
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_local/stats",
        vol.Optional("days", default=7): vol.In(list(STATS_BUCKETS)),
        vol.Optional("offset", default=0): vol.All(vol.Coerce(int), vol.Range(0, 400)),
    }
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
    entity_id = channel_entity_id(hass, entry.entry_id, channel)
    if entity_id is None:
        connection.send_error(msg["id"], "not_found", "This receiver has no entity for that channel")
        return

    now = dt_util.now()
    # offset 0 is the period up to now; 1 the one before it, and so on.
    offset = msg["offset"]
    last_day = dt_util.start_of_local_day(now) - timedelta(days=days * offset)
    # Local calendar days, so "Today" starts at midnight. Wall-clock arithmetic keeps DST right.
    day_starts = [last_day - timedelta(days=i) for i in range(days - 1, -1, -1)]
    start, period_end = day_starts[0], last_day + timedelta(days=1)
    end = min(now, period_end)
    step = STATS_BUCKETS[days]
    buckets, b = [], start
    while b < period_end:
        buckets.append(b)
        b += step
    # The same stretch of the previous period, for "vs last week" and so on.
    prev_start, prev_end = start - timedelta(days=days), end - timedelta(days=days)

    samples = await async_samples(hass, channel, entity_id, prev_start, end)
    # The house's optional outdoor temperature (a weather entity or a sensor), from Settings.
    settings: HouseSettings = hass.data[DATA_SETTINGS]
    outdoor_id = settings.outdoor_entity
    outdoor = await async_outdoor(hass, outdoor_id, prev_start, end) if outdoor_id else None

    def ts(d: datetime) -> float:
        return dt_util.as_utc(d).timestamp()

    result = summarise(
        samples,
        ts(start),
        end.timestamp(),
        day_starts=[ts(d) for d in day_starts],
        bucket_starts=[ts(d) for d in buckets],
        period_end=ts(period_end),
        previous=(ts(prev_start), ts(prev_end)),
        outdoor=outdoor,
    )
    # The estimated cost (heating only: hot water shares the boiler, and would count it twice).
    # The panel multiplies the boiler's time on by `per_hour`.
    estimate = await settings.async_cost() if channel == CHANNEL_HEAT else None
    connection.send_result(msg["id"], {**result, "entity_id": entity_id, "outdoor_entity": outdoor_id, "cost": estimate, "period": days, "offset": offset, "period_end": ts(period_end)})
