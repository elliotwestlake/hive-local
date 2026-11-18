"""Websocket API used by the sidebar panel.

hive_local/devices                                  -> configured receivers + limits
hive_local/subscribe                                -> pushes {"status": {entry_id: {...}}} on every change
hive_local/get   {entry_id, channel}                -> {"schedule": {day: [...]}, "complete": bool}
hive_local/set   {entry_id, channel, schedule}
hive_local/mode  {entry_id, channel, mode, setpoint?}   mode = schedule | manual | off
hive_local/boost {entry_id, channel, minutes?, temperature?}
hive_local/cancel_boost {entry_id, channel}
"""

from __future__ import annotations

from collections.abc import Awaitable, Callable
from functools import wraps
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

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
from .schedule import ScheduleError, validate
from .z2m import BOOST_MAX_MINUTES, MODE_MANUAL, MODE_OFF, MODE_SCHEDULE

CHANNEL = {vol.Optional("channel", default=CHANNEL_HEAT): vol.In([CHANNEL_HEAT, CHANNEL_WATER])}
ENTRY = {vol.Required("entry_id"): str}


@callback
def async_register(hass: HomeAssistant) -> None:
    for command in (ws_devices, ws_subscribe, ws_get, ws_set, ws_mode, ws_boost, ws_cancel_boost):
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


@websocket_api.websocket_command({vol.Required("type"): "hive_local/cancel_boost"} | ENTRY | CHANNEL)
@websocket_api.async_response
@_with_entry
async def ws_cancel_boost(hass: HomeAssistant, connection, msg: dict[str, Any], entry: HiveConfigEntry) -> None:
    await entry.runtime_data.transport.async_cancel_boost(msg["channel"])
    connection.send_result(msg["id"], {"ok": True})
