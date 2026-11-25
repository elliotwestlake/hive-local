"""Pre-heat end to end: HA core + mocked MQTT, a Z2M OTR1."""
import json
from unittest.mock import AsyncMock
from datetime import datetime, timedelta

import pytest
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_mqtt_message,
    async_fire_time_changed,
)

from custom_components.hive_local.preheat import Rate

TOPIC = "zigbee2mqtt/Receiver"
DAY = [{"time": "06:30", "setpoint": 20.0}, {"time": "09:00", "setpoint": 16.0},
       {"time": "17:00", "setpoint": 21.0}, {"time": "22:30", "setpoint": 1.0}]
DAYS = ("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday")
SCHEDULE = {"system_mode": "heat", "temperature_setpoint_hold": False, "temperature_setpoint_hold_duration": 0,
            "occupied_heating_setpoint": 1, "local_temperature": 17, "running_state": "idle"}


def boosts(mqtt_mock):
    out = []
    for call in mqtt_mock.async_publish.call_args_list:
        topic, payload = call.args[0], call.args[1]
        if topic == f"{TOPIC}/set" and "emergency_heating" in payload:
            out.append(json.loads(payload))
    return out


@pytest.mark.freeze_time("2026-11-23 05:00:00")  # before hass starts, so its timers and tokens agree
async def test_preheat(hass, mqtt_mock, freezer, hass_ws_client):
    await hass.config.async_set_time_zone("UTC")
    # A Monday, 05:00.
    monday = datetime(2026, 11, 23, 5, 0, 0)
    assert monday.weekday() == 0
    entry = MockConfigEntry(domain="hive_local", title="Receiver", data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr1", "z2m_model": "OTR1"})
    freezer.move_to(monday)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)
    async_fire_mqtt_message(hass, TOPIC, json.dumps(SCHEDULE))
    await hass.async_block_till_done()

    switch = "switch.receiver_pre_heat"
    number = "number.receiver_pre_heat_starts_at_most"
    assert hass.states.get(switch).state == "off"
    assert float(hass.states.get(number).state) == 120

    preheat = entry.runtime_data.preheat
    preheat.rate = Rate(2.0, 3)
    preheat.schedule_seen("heat", {d: DAY for d in DAYS})
    # The nightly re-read (03:17) would wait for replies on a frozen clock; answer it.
    read = AsyncMock(return_value=({d: DAY for d in DAYS}, True))
    entry.runtime_data.transport.async_read = read

    # Off: nothing happens.
    async_fire_time_changed(hass, monday + timedelta(minutes=1))
    await hass.async_block_till_done()
    assert boosts(mqtt_mock) == []

    # On, via the panel: 17 °C → 20 °C at 2 °C/h is 100 min with the margin, and 06:30 is 90 min off.
    await client.send_json({"id": 1, "type": "hive_local/preheat", "entry_id": entry.entry_id, "channel": "heat", "enabled": True})
    msg = await client.receive_json()
    assert msg["success"], msg
    assert msg["result"]["enabled"] is True
    await hass.async_block_till_done()
    assert hass.states.get(switch).state == "on"
    b = boosts(mqtt_mock)
    assert len(b) == 1, b
    assert b[0]["occupied_heating_setpoint"] == 20.0
    assert b[0]["temperature_setpoint_hold_duration"] == 90

    # The receiver reports the boost.
    async_fire_mqtt_message(hass, TOPIC, json.dumps({**SCHEDULE, "system_mode": "emergency_heating",
        "temperature_setpoint_hold": True, "temperature_setpoint_hold_duration": 90,
        "occupied_heating_setpoint": 20, "running_state": "heat"}))
    await hass.async_block_till_done()
    climate = hass.states.get("climate.receiver_heating") or next(
        s for s in hass.states.async_all("climate"))
    assert climate.attributes["preset_mode"] == "boost"
    assert climate.attributes["preheat"] is True
    assert preheat.as_dict()["active_for"] == "06:30"

    # Panel status carries it.
    await client.send_json({"id": 2, "type": "hive_local/subscribe"})
    assert (await client.receive_json())["success"]
    event = await client.receive_json()
    info = event["event"]["status"][entry.entry_id]["heat"]["preheat"]
    assert info["active_for"] == "06:30" and info["rate"] == 2.0

    # Another tick while pre-heating: no second boost.
    freezer.move_to(monday + timedelta(minutes=10))
    async_fire_time_changed(hass, monday + timedelta(minutes=10))
    await hass.async_block_till_done()
    assert len(boosts(mqtt_mock)) == 1

    # Someone cancels it at 05:20 (after our 30 s "starting" window): skipped, not restarted.
    freezer.move_to(monday + timedelta(minutes=20))
    async_fire_time_changed(hass, monday + timedelta(minutes=20))
    await hass.async_block_till_done()
    async_fire_mqtt_message(hass, TOPIC, json.dumps(SCHEDULE))
    await hass.async_block_till_done()
    assert preheat.as_dict()["active_for"] is None
    freezer.move_to(monday + timedelta(minutes=21))
    async_fire_time_changed(hass, monday + timedelta(minutes=21))
    await hass.async_block_till_done()
    assert len(boosts(mqtt_mock)) == 1

    # Max lead from the panel goes through the number (90 still starts at 05:00 tomorrow).
    # A new connection: moving the clock on 20 minutes timed out the last one's heartbeat.
    client = await hass_ws_client(hass)
    await client.send_json({"id": 3, "type": "hive_local/preheat", "entry_id": entry.entry_id, "channel": "heat", "max_lead": 90})
    msg = await client.receive_json()
    while msg.get("type") == "event":
        msg = await client.receive_json()
    assert msg["success"], msg
    assert float(hass.states.get(number).state) == 90

    # Hot water has no pre-heat.
    await client.send_json({"id": 4, "type": "hive_local/preheat", "entry_id": entry.entry_id, "channel": "water", "enabled": True})
    msg = await client.receive_json()
    while msg.get("type") == "event":
        msg = await client.receive_json()
    assert not msg["success"]

    await client.close()

    # Tuesday 05:00 it pre-heats again.
    tuesday = monday + timedelta(days=1)
    freezer.move_to(tuesday)
    async_fire_time_changed(hass, tuesday)
    await hass.async_block_till_done()
    assert len(boosts(mqtt_mock)) == 2
    read.assert_awaited_with("heat")  # the nightly re-read ran

    # Turning it off mid pre-heat cancels the boost (back to schedule).
    async_fire_mqtt_message(hass, TOPIC, json.dumps({**SCHEDULE, "system_mode": "emergency_heating",
        "temperature_setpoint_hold": True, "temperature_setpoint_hold_duration": 90, "occupied_heating_setpoint": 20}))
    await hass.async_block_till_done()
    mqtt_mock.async_publish.reset_mock()
    await hass.services.async_call("switch", "turn_off", {"entity_id": switch}, blocking=True)
    await hass.async_block_till_done()
    sets = [json.loads(c.args[1]) for c in mqtt_mock.async_publish.call_args_list if c.args[0] == f"{TOPIC}/set"]
    assert sets == [{"system_mode": "heat", "temperature_setpoint_hold": False}], sets

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


@pytest.mark.freeze_time("2026-11-23 05:00:00")  # before hass starts, so its timers and tokens agree
async def test_preheat_survives_restart(hass, mqtt_mock, freezer):
    await hass.config.async_set_time_zone("UTC")
    entry = MockConfigEntry(domain="hive_local", title="Receiver", data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr1", "z2m_model": "OTR1"})
    monday = datetime(2026, 11, 23, 5, 0, 0)
    freezer.move_to(monday)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    async_fire_mqtt_message(hass, TOPIC, json.dumps(SCHEDULE))
    await hass.async_block_till_done()
    preheat = entry.runtime_data.preheat
    preheat.rate = Rate(2.0, 3)
    preheat.schedule_seen("heat", {d: DAY for d in DAYS})
    await hass.services.async_call("switch", "turn_on", {"entity_id": "switch.receiver_pre_heat"}, blocking=True)
    await hass.async_block_till_done()
    assert len(boosts(mqtt_mock)) == 1
    BOOST = {**SCHEDULE, "system_mode": "emergency_heating", "temperature_setpoint_hold": True,
             "temperature_setpoint_hold_duration": 90, "occupied_heating_setpoint": 20, "running_state": "heat"}
    async_fire_mqtt_message(hass, TOPIC, json.dumps(BOOST))
    await hass.async_block_till_done()

    # "Restart": unload (flushes the store) and set up again, a minute later.
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    freezer.move_to(monday + timedelta(minutes=1))
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    preheat = entry.runtime_data.preheat
    assert preheat.as_dict()["active_for"] == "06:30"
    async_fire_mqtt_message(hass, TOPIC, json.dumps(BOOST))
    await hass.async_block_till_done()
    assert preheat.is_active
    assert hass.states.get("climate.receiver_heating").attributes["preheat"] is True
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
