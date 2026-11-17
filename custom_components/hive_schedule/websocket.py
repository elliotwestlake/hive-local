"""Websocket API used by the sidebar panel.

hive_schedule/devices                         -> configured receivers
hive_schedule/get  {entry_id, channel}        -> {"schedule": {day: [...]}, "complete": bool}
hive_schedule/set  {entry_id, channel, schedule}
hive_schedule/mode {entry_id, channel, mode="schedule"} -> follow onboard schedule
"""

from __future__ import annotations

import asyncio
import json
import logging
from typing import Any

import voluptuous as vol

from homeassistant.components import mqtt, websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import (
    CHANNEL_HEAT,
    CHANNEL_WATER,
    CONF_BASE_TOPIC,
    CONF_DEVICE,
    CONF_MODEL,
    DOMAIN,
    HEAT_MAX,
    HEAT_MIN,
    MAX_TRANSITIONS,
    MODEL_SLR2,
    READ_TIMEOUT,
    WATER_OFF,
    WATER_ON,
)
from .schedule import (
    DAYS,
    ScheduleError,
    parse_z2m_reply,
    schedule_key,
    to_z2m_payloads,
    validate,
)

_LOGGER = logging.getLogger(__name__)

CHANNEL_SCHEMA = vol.In([CHANNEL_HEAT, CHANNEL_WATER])


@callback
def async_register(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_devices)
    websocket_api.async_register_command(hass, ws_get)
    websocket_api.async_register_command(hass, ws_set)
    websocket_api.async_register_command(hass, ws_mode)


def _entry(hass: HomeAssistant, entry_id: str):
    return hass.data.get(DOMAIN, {}).get("entries", {}).get(entry_id)


def _channel(entry, channel: str) -> str | None:
    """SLR1 is single-endpoint (no suffix); SLR2 uses _heat/_water."""
    if entry.data[CONF_MODEL] == MODEL_SLR2:
        return channel
    if channel != CHANNEL_HEAT:
        raise ScheduleError("Hot water is only available on SLR2 receivers")
    return None


def _topic(entry, suffix: str = "") -> str:
    base = f"{entry.data[CONF_BASE_TOPIC]}/{entry.data[CONF_DEVICE]}"
    return f"{base}/{suffix}" if suffix else base


@websocket_api.websocket_command({vol.Required("type"): "hive_schedule/devices"})
@callback
def ws_devices(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    entries = hass.data.get(DOMAIN, {}).get("entries", {})
    connection.send_result(
        msg["id"],
        {
            "devices": [
                {
                    "entry_id": e.entry_id,
                    "name": e.title,
                    "model": e.data[CONF_MODEL],
                    "channels": [CHANNEL_HEAT, CHANNEL_WATER]
                    if e.data[CONF_MODEL] == MODEL_SLR2
                    else [CHANNEL_HEAT],
                }
                for e in entries.values()
            ],
            "limits": {
                "max_transitions": MAX_TRANSITIONS,
                "heat_min": HEAT_MIN,
                "heat_max": HEAT_MAX,
                "water_on": WATER_ON,
                "water_off": WATER_OFF,
            },
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_schedule/get",
        vol.Required("entry_id"): str,
        vol.Optional("channel", default=CHANNEL_HEAT): CHANNEL_SCHEMA,
    }
)
@websocket_api.async_response
async def ws_get(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    entry = _entry(hass, msg["entry_id"])
    if entry is None:
        connection.send_error(msg["id"], "not_found", "Unknown receiver")
        return
    try:
        key = schedule_key(_channel(entry, msg["channel"]))
    except ScheduleError as err:
        connection.send_error(msg["id"], "invalid", str(err))
        return

    if not await mqtt.async_wait_for_mqtt_client(hass):
        connection.send_error(msg["id"], "mqtt_unavailable", "MQTT is not connected")
        return

    collected: dict[str, list[dict[str, Any]]] = {}
    all_days = asyncio.Event()
    request_sent = False

    @callback
    def _on_state(message) -> None:
        # Ignore anything that arrives before our request (cached state).
        if not request_sent:
            return
        try:
            payload = json.loads(message.payload)
        except (ValueError, TypeError):
            return
        if not isinstance(payload, dict) or key not in payload:
            return
        # Z2M republishes the *last* reply on every state update, so merging by
        # day is safe; each getWeeklySchedule response covers one day group.
        collected.update(parse_z2m_reply(payload[key]))
        _LOGGER.debug("weekly_schedule reply: %s", payload[key])
        if all(day in collected for day in DAYS):
            all_days.set()

    unsub = await mqtt.async_subscribe(hass, _topic(entry), _on_state, qos=0)
    try:
        request_sent = True
        await mqtt.async_publish(hass, _topic(entry, "get"), json.dumps({key: ""}))
        try:
            await asyncio.wait_for(all_days.wait(), READ_TIMEOUT)
        except TimeoutError:
            pass
    finally:
        unsub()

    connection.send_result(
        msg["id"],
        {
            "schedule": {d: collected[d] for d in DAYS if d in collected},
            "complete": all(d in collected for d in DAYS),
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_schedule/set",
        vol.Required("entry_id"): str,
        vol.Optional("channel", default=CHANNEL_HEAT): CHANNEL_SCHEMA,
        vol.Required("schedule"): dict,
    }
)
@websocket_api.async_response
async def ws_set(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    entry = _entry(hass, msg["entry_id"])
    if entry is None:
        connection.send_error(msg["id"], "not_found", "Unknown receiver")
        return
    try:
        channel = _channel(entry, msg["channel"])
        clean = validate(
            msg["schedule"],
            max_transitions=MAX_TRANSITIONS,
            min_setpoint=HEAT_MIN,
            max_setpoint=HEAT_MAX,
        )
    except ScheduleError as err:
        connection.send_error(msg["id"], "invalid", str(err))
        return

    payloads = to_z2m_payloads(clean, channel)
    for payload in payloads:
        _LOGGER.debug("Publishing weekly_schedule: %s", payload)
        await mqtt.async_publish(hass, _topic(entry, "set"), json.dumps(payload))
        # Give the receiver a moment between commands; it's a sleepy-ish device.
        await asyncio.sleep(0.5)

    connection.send_result(msg["id"], {"commands": len(payloads), "schedule": clean})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hive_schedule/mode",
        vol.Required("entry_id"): str,
        vol.Optional("channel", default=CHANNEL_HEAT): CHANNEL_SCHEMA,
        vol.Required("mode"): vol.In(["schedule"]),
    }
)
@websocket_api.async_response
async def ws_mode(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """Put the receiver into schedule mode so it follows the onboard schedule."""
    entry = _entry(hass, msg["entry_id"])
    if entry is None:
        connection.send_error(msg["id"], "not_found", "Unknown receiver")
        return
    try:
        channel = _channel(entry, msg["channel"])
    except ScheduleError as err:
        connection.send_error(msg["id"], "invalid", str(err))
        return
    # Per Z2M docs, "schedule" mode is system_mode=heat with setpoint hold off.
    sfx = f"_{channel}" if channel else ""
    payload = {f"system_mode{sfx}": "heat", f"temperature_setpoint_hold{sfx}": False}
    await mqtt.async_publish(hass, _topic(entry, "set"), json.dumps(payload))
    connection.send_result(msg["id"], {"ok": True})
