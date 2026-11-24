"""Zigbee2MQTT end to end: HA core with mocked MQTT.

Covers the config flow (menu, base topic, the receiver dropdown from Z2M's retained
bridge/devices), entities from state messages, the exact payloads for boost, cancel and
modes on single- and multi-endpoint receivers, and reading and writing the schedule
through the panel's websocket API.
"""

from __future__ import annotations

import asyncio
import json
from datetime import timedelta
from unittest.mock import patch

import pytest

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_mqtt_message,
    async_fire_time_changed,
)

TOPIC = "zigbee2mqtt/Receiver"
DAYS = ("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday")

BRIDGE_DEVICES = [
    {"friendly_name": "Coordinator", "type": "Coordinator"},
    {
        "friendly_name": "Receiver",
        "definition": {"vendor": "Hive", "model": "SLR2c", "exposes": [
            {"type": "climate", "endpoint": "heat"}, {"type": "climate", "endpoint": "water"}]},
    },
    {
        "friendly_name": "Boiler",
        "definition": {"vendor": "Hive", "model": "OTR1", "exposes": [{"type": "climate"}]},
    },
    {
        "friendly_name": "Hallway thermostat",
        "definition": {"vendor": "Hive", "model": "SLT3d", "exposes": [{"type": "numeric"}]},
    },
]

SINGLE = {
    "system_mode": "heat", "temperature_setpoint_hold": False, "temperature_setpoint_hold_duration": 0,
    "occupied_heating_setpoint": 20, "local_temperature": 19.5, "running_state": "heat",
}
DUAL = {
    "system_mode_heat": "heat", "temperature_setpoint_hold_heat": False, "temperature_setpoint_hold_duration_heat": 0,
    "occupied_heating_setpoint_heat": 20, "local_temperature_heat": 19.5, "running_state_heat": "idle",
    "system_mode_water": "off", "temperature_setpoint_hold_water": False, "temperature_setpoint_hold_duration_water": 0,
    "occupied_heating_setpoint_water": 22, "local_temperature_water": 21, "running_state_water": "idle",
}


@pytest.fixture(autouse=True)
async def let_mqtt_settle(hass: HomeAssistant):
    """MQTT runs its client's housekeeping every second. Let it run once at the end: with
    the mocked client it then stops, instead of being left as a lingering timer."""
    yield
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=2))
    await hass.async_block_till_done()


def sets(mqtt_mock, topic=TOPIC) -> list[dict]:
    return [json.loads(c.args[1]) for c in mqtt_mock.async_publish.call_args_list if c.args[0] == f"{topic}/set"]


def gets(mqtt_mock, topic=TOPIC) -> list[dict]:
    return [json.loads(c.args[1]) for c in mqtt_mock.async_publish.call_args_list if c.args[0] == f"{topic}/get"]


async def _with_bridge(hass: HomeAssistant, flow_id: str, user_input: dict):
    """Submit the base topic step, with Z2M's retained bridge/devices arriving once the
    flow has subscribed (mocked MQTT only delivers to current subscribers)."""
    task = hass.async_create_task(hass.config_entries.flow.async_configure(flow_id, user_input))
    for _ in range(100):
        if task.done():
            break
        async_fire_mqtt_message(hass, "zigbee2mqtt/bridge/devices", json.dumps(BRIDGE_DEVICES), retain=True)
        await asyncio.sleep(0.01)
    return await task


async def _setup(hass: HomeAssistant, model: str, z2m_model: str, **data) -> MockConfigEntry:
    entry = MockConfigEntry(domain="hive_local", title="Receiver", unique_id=TOPIC, data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": model,
        "z2m_model": z2m_model, **data})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_config_flow(hass: HomeAssistant, mqtt_mock) -> None:
    result = await hass.config_entries.flow.async_init("hive_local", context={"source": "user"})
    assert result["type"] == "menu"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "z2m"})
    assert result["step_id"] == "z2m"

    # Nothing retained on that topic.
    with patch("custom_components.hive_local.config_flow.DEVICES_TIMEOUT", 0.01):
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"base_topic": "wrong"})
    assert result["errors"] == {"base": "no_bridge"}

    result = await _with_bridge(hass, result["flow_id"], {"base_topic": " zigbee2mqtt/ "})
    assert result["step_id"] == "device"
    # Receivers only (not the thermostat), sorted by name.
    options = result["data_schema"].schema["device"].config["options"]
    assert [o["value"] for o in options] == ["Boiler", "Receiver"]

    with patch("custom_components.hive_local.async_setup_entry", return_value=True):
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"device": "Receiver"})
    assert result["type"] == "create_entry"
    assert result["result"].unique_id == TOPIC
    assert result["data"] == {"transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt",
                              "model": "slr2", "z2m_model": "SLR2c"}

    # Next time only the receiver that isn't set up yet is offered.
    result = await hass.config_entries.flow.async_init("hive_local", context={"source": "user"})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "z2m"})
    result = await _with_bridge(hass, result["flow_id"], {"base_topic": "zigbee2mqtt"})
    options = result["data_schema"].schema["device"].config["options"]
    assert [o["value"] for o in options] == ["Boiler"]


async def test_single_endpoint(hass: HomeAssistant, mqtt_mock) -> None:
    # An entry from before the ZHA transport, without "transport": still Z2M.
    entry = MockConfigEntry(domain="hive_local", title="Receiver", unique_id=TOPIC, data={
        "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr1", "z2m_model": "OTR1"})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    # It asks for the state (Z2M doesn't retain it), with plain keys.
    refresh = gets(mqtt_mock)
    assert refresh and all(not k.endswith(("_heat", "_water")) for k in refresh[0])
    assert hass.states.get("climate.receiver_heating").state == "unavailable"

    async_fire_mqtt_message(hass, TOPIC, json.dumps(SINGLE))
    await hass.async_block_till_done()
    climate = hass.states.get("climate.receiver_heating")
    assert climate.state == "auto"
    assert climate.attributes["current_temperature"] == 19.5
    assert climate.attributes["temperature"] == 20
    assert climate.attributes["hvac_action"] == "heating"
    assert hass.states.async_all("water_heater") == []

    mqtt_mock.async_publish.reset_mock()
    await hass.services.async_call("hive_local", "boost_heating", {"minutes": 30, "temperature": 21}, blocking=True)
    assert sets(mqtt_mock) == [{"system_mode": "emergency_heating", "temperature_setpoint_hold_duration": 30,
                                "temperature_setpoint_hold": 1, "occupied_heating_setpoint": 21.0}]
    async_fire_mqtt_message(hass, TOPIC, json.dumps({**SINGLE, "system_mode": "emergency_heating",
        "temperature_setpoint_hold": True, "temperature_setpoint_hold_duration": 30, "occupied_heating_setpoint": 21}))
    await hass.async_block_till_done()
    assert hass.states.get("climate.receiver_heating").attributes["preset_mode"] == "boost"
    assert hass.states.get("sensor.receiver_heating_boost_remaining").state == "30"

    mqtt_mock.async_publish.reset_mock()
    await hass.services.async_call("hive_local", "cancel_boost_heating", {}, blocking=True)
    assert sets(mqtt_mock) == [{"system_mode": "heat", "temperature_setpoint_hold": False}]
    async_fire_mqtt_message(hass, TOPIC, json.dumps(SINGLE))
    await hass.async_block_till_done()

    mqtt_mock.async_publish.reset_mock()
    await hass.services.async_call("climate", "set_hvac_mode",
        {"entity_id": "climate.receiver_heating", "hvac_mode": "off"}, blocking=True)
    assert sets(mqtt_mock) == [{"system_mode": "off", "temperature_setpoint_hold": 0}]

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_multi_endpoint(hass: HomeAssistant, mqtt_mock, hass_ws_client) -> None:
    entry = await _setup(hass, "slr2", "SLR2c")
    async_fire_mqtt_message(hass, TOPIC, json.dumps(DUAL))
    await hass.async_block_till_done()
    assert hass.states.get("climate.receiver_heating").state == "auto"
    water = hass.states.async_all("water_heater")
    assert len(water) == 1 and water[0].attributes["operation_mode"] == "off"

    # Hot water boost: suffixed keys, no setpoint.
    mqtt_mock.async_publish.reset_mock()
    await hass.services.async_call("hive_local", "boost_water", {"minutes": 60}, blocking=True)
    assert sets(mqtt_mock) == [{"system_mode_water": "emergency_heating", "temperature_setpoint_hold_duration_water": 60,
                                "temperature_setpoint_hold_water": 1}]

    # Modes from the panel.
    client = await hass_ws_client(hass)
    mqtt_mock.async_publish.reset_mock()
    await client.send_json({"id": 1, "type": "hive_local/mode", "entry_id": entry.entry_id, "channel": "heat",
                            "mode": "manual", "setpoint": 21.5})
    assert (await client.receive_json())["success"]
    await client.send_json({"id": 2, "type": "hive_local/mode", "entry_id": entry.entry_id, "channel": "water",
                            "mode": "schedule"})
    assert (await client.receive_json())["success"]
    assert sets(mqtt_mock) == [
        {"system_mode_heat": "heat", "temperature_setpoint_hold_heat": 1, "occupied_heating_setpoint_heat": 21.5},
        {"system_mode_water": "heat", "temperature_setpoint_hold_water": False},
    ]

    # Read the heating schedule: one reply per day, padded to 6 transitions with 1 °C.
    mqtt_mock.async_publish.reset_mock()
    await client.send_json({"id": 3, "type": "hive_local/get", "entry_id": entry.entry_id, "channel": "heat"})
    for _ in range(100):  # until the request has gone out (it comes in over a socket)
        if gets(mqtt_mock):
            break
        await asyncio.sleep(0.01)
    assert gets(mqtt_mock) == [{"weekly_schedule_heat": ""}]
    padded = [{"time": 390, "heating_setpoint": 20}, {"time": 540, "heating_setpoint": 16},
              {"time": 1020, "heating_setpoint": 21}, {"time": 1320, "heating_setpoint": 1},
              {"time": 1320, "heating_setpoint": 1}, {"time": 1320, "heating_setpoint": 1}]
    for day in DAYS:
        async_fire_mqtt_message(hass, TOPIC, json.dumps(
            {**DUAL, "weekly_schedule_heat": {"days": [day], "transitions": padded}}))
        await hass.async_block_till_done()
    msg = await client.receive_json()
    assert msg["success"], msg
    assert msg["result"]["complete"] is True
    tidy = [{"time": "06:30", "setpoint": 20.0}, {"time": "09:00", "setpoint": 16.0},
            {"time": "17:00", "setpoint": 21.0}, {"time": "22:00", "setpoint": 1.0}]
    assert msg["result"]["schedule"] == {day: tidy for day in DAYS}

    # Write one day back changed: one payload per day.
    changed = [{"time": "07:00", "setpoint": 20.5}, *tidy[1:]]
    mqtt_mock.async_publish.reset_mock()
    with patch("custom_components.hive_local.transports.z2m.asyncio.sleep"):
        await client.send_json({"id": 4, "type": "hive_local/set", "entry_id": entry.entry_id, "channel": "heat",
                                "schedule": {"tuesday": changed, "thursday": changed}})
        msg = await client.receive_json()
    assert msg["success"], msg
    assert msg["result"]["commands"] == 2
    # Padded to 6 transitions with repeats of the last, as the receiver reads back.
    transitions = [{"heatSetpoint": t["setpoint"], "transitionTime": t["time"]} for t in changed + changed[-1:] * 2]
    assert [p["weekly_schedule_heat"]["dayofweek"] for p in sets(mqtt_mock)] == [["tuesday"], ["thursday"]]
    assert all(p["weekly_schedule_heat"]["transitions"] == transitions for p in sets(mqtt_mock))

    # A schedule the receiver can't hold is refused before anything is sent.
    mqtt_mock.async_publish.reset_mock()
    await client.send_json({"id": 5, "type": "hive_local/set", "entry_id": entry.entry_id, "channel": "heat",
                            "schedule": {"monday": [{"time": "25:00", "setpoint": 20}]}})
    msg = await client.receive_json()
    assert not msg["success"]
    assert sets(mqtt_mock) == []

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
