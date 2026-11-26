"""Boosting one room, end to end: HA core + mocked MQTT (a Z2M OTR1) and a Hive valve from
"another integration". The valves go to the boost temperature and back, and the boiler is
asked for heat even with "Rooms call for heat" off.
"""
import json
from datetime import datetime, timedelta
from unittest.mock import AsyncMock

import pytest
from homeassistant.core import ServiceCall
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_mqtt_message,
    async_fire_time_changed,
)

TOPIC = "zigbee2mqtt/Receiver"
DAY = [{"time": "06:30", "setpoint": 20.0}, {"time": "09:00", "setpoint": 16.0},
       {"time": "17:00", "setpoint": 21.0}, {"time": "22:30", "setpoint": 1.0}]
WEEK = {d: DAY for d in ("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday")}
SCHEDULE = {"system_mode": "heat", "temperature_setpoint_hold": False, "temperature_setpoint_hold_duration": 0,
            "occupied_heating_setpoint": 16, "local_temperature": 17, "running_state": "idle"}
BACK_TO_SCHEDULE = {"system_mode": "heat", "temperature_setpoint_hold": False}
VALVE = "climate.bedroom_valve"
SWITCH = "switch.receiver_rooms_call_for_heat"


def boosting(temp, left=30):
    return {**SCHEDULE, "system_mode": "emergency_heating", "temperature_setpoint_hold": True,
            "temperature_setpoint_hold_duration": left, "occupied_heating_setpoint": temp, "running_state": "heat"}


def boost(minutes, temp):
    return {"system_mode": "emergency_heating", "temperature_setpoint_hold_duration": minutes,
            "temperature_setpoint_hold": 1, "occupied_heating_setpoint": temp}


def sets(mqtt_mock):
    return [json.loads(c.args[1]) for c in mqtt_mock.async_publish.call_args_list if c.args[0] == f"{TOPIC}/set"]


async def report(hass, state):
    async_fire_mqtt_message(hass, TOPIC, json.dumps(state))
    await hass.async_block_till_done()


async def tick(hass, freezer, when):
    freezer.move_to(when)
    async_fire_time_changed(hass, when)
    await hass.async_block_till_done()


def valve(hass, current, target):
    hass.states.async_set(VALVE, "heat", {"friendly_name": "Bedroom valve", "current_temperature": current,
                                          "temperature": target, "hvac_action": "idle"})


async def setup(hass, freezer, t0, mode=SCHEDULE):
    await hass.config.async_set_time_zone("UTC")
    freezer.move_to(t0)
    entry = MockConfigEntry(domain="hive_local", title="Receiver", data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr1", "z2m_model": "OTR1"})
    entry.add_to_hass(hass)
    zha = MockConfigEntry(domain="zigbee_a", title="ZHA")
    zha.add_to_hass(hass)
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=zha.entry_id, identifiers={("zigbee_a", "bedroom")}, manufacturer="Danfoss", model="TRV001")
    er.async_get(hass).async_get_or_create("climate", "zigbee_a", "bedroom-climate", device_id=device.id,
                                           suggested_object_id="bedroom_valve", config_entry=zha)
    valve(hass, 18.0, 18.0)  # at its target: nothing calls on its own
    calls: list[ServiceCall] = []

    async def set_temperature(call: ServiceCall) -> None:
        calls.append(call)
        state = hass.states.get(call.data["entity_id"])
        hass.states.async_set(state.entity_id, state.state, {**state.attributes, "temperature": call.data["temperature"]})

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    hass.services.async_register("climate", "set_temperature", set_temperature)  # after climate has loaded
    room = await hass.data["hive_local_rooms"].async_save_room({"name": "Bedroom", "valves": [VALVE]})
    data = entry.runtime_data
    data.preheat.schedule_seen("heat", WEEK)
    data.transport.async_read = AsyncMock(return_value=(WEEK, True))
    await report(hass, mode)
    return entry, room, calls


def room_status(hass):
    return hass.data["hive_local_rooms"].status()["rooms"][0]


@pytest.mark.freeze_time("2026-11-30 10:00:00")  # a Monday, on the schedule's 16°
async def test_room_boost_heats_the_room_and_puts_it_back(hass, mqtt_mock, freezer, hass_ws_client):
    t0 = datetime(2026, 11, 30, 10, 0, 0)
    entry, room, calls = await setup(hass, freezer, t0)
    demand = entry.runtime_data.demand
    assert hass.states.get(SWITCH).state == "off"  # rooms calling for heat is off

    # Boost the bedroom to 22° for an hour: the valve goes to 22° and the boiler is asked for heat.
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "hive_local/rooms/boost", "room_id": room["id"], "minutes": 60, "temperature": 22})
    msg = await client.receive_json()
    assert msg["success"], msg
    assert msg["result"]["failed"] == []
    await hass.async_block_till_done()
    assert [c.data["temperature"] for c in calls] == [22.0]
    assert sets(mqtt_mock) == [boost(30, 22.0)]
    await report(hass, boosting(22))
    assert demand.is_active and demand.rooms_heating() == ["Bedroom"]
    assert room_status(hass)["boost"]["remaining"] == 60 and room_status(hass)["boost"]["temperature"] == 22.0

    # A target change mid-boost changes the boost's temperature.
    await client.send_json({"id": 2, "type": "hive_local/rooms/set_target", "room_id": room["id"], "temperature": 21})
    assert (await client.receive_json())["success"]
    assert calls[-1].data["temperature"] == 21.0 and room_status(hass)["boost"]["temperature"] == 21.0
    await client.close()
    await hass.async_block_till_done()
    assert sets(mqtt_mock)[-1] == boost(30, 21.0)  # the boiler's boost follows
    await report(hass, boosting(21))

    # Renewed while it runs, even though "Rooms call for heat" is off.
    mqtt_mock.async_publish.reset_mock()
    await tick(hass, freezer, t0 + timedelta(minutes=12))
    await report(hass, boosting(21, left=18))
    await tick(hass, freezer, t0 + timedelta(minutes=13))
    assert sets(mqtt_mock) == [boost(30, 21.0)]
    await report(hass, boosting(21))

    # Time's up: the valve's own 18° goes back, and the boiler's boost is cancelled.
    mqtt_mock.async_publish.reset_mock()
    await tick(hass, freezer, t0 + timedelta(minutes=60, seconds=30))
    await tick(hass, freezer, t0 + timedelta(minutes=61))
    assert calls[-1].data["temperature"] == 18.0
    assert room_status(hass)["boost"] is None
    assert sets(mqtt_mock) == [BACK_TO_SCHEDULE]
    await report(hass, SCHEDULE)
    assert demand.run is None


@pytest.mark.freeze_time("2026-11-30 23:00:00")  # the schedule has the heating off (1°) after 22:30
async def test_room_boost_heats_in_the_schedules_off_period_but_not_when_off(hass, mqtt_mock, freezer):
    t0 = datetime(2026, 11, 30, 23, 0, 0)
    entry, room, calls = await setup(hass, freezer, t0, {**SCHEDULE, "occupied_heating_setpoint": 1})
    boosts = hass.data["hive_local_room_boosts"]

    await boosts.async_boost(room["id"], 30, 21)
    await hass.async_block_till_done()
    assert sets(mqtt_mock) == [boost(30, 21.0)]
    await report(hass, boosting(21))

    # Stopping the room boost puts the valve back and ends the boiler's boost at once
    # (it's been on under the 10 min minimum, but there's nothing left to heat for).
    mqtt_mock.async_publish.reset_mock()
    await tick(hass, freezer, t0 + timedelta(minutes=11))
    await boosts.async_cancel(room["id"])
    await hass.async_block_till_done()
    assert calls[-1].data["temperature"] == 18.0
    assert sets(mqtt_mock) == [BACK_TO_SCHEDULE]
    await report(hass, {**SCHEDULE, "occupied_heating_setpoint": 1})

    # Heating Off is someone's choice: a room boost sets the valves but doesn't fire the boiler.
    await report(hass, {**SCHEDULE, "system_mode": "off", "temperature_setpoint_hold": 0})
    mqtt_mock.async_publish.reset_mock()
    await boosts.async_boost(room["id"], 30, 21)
    await tick(hass, freezer, t0 + timedelta(minutes=13))
    assert calls[-1].data["temperature"] == 21.0
    assert sets(mqtt_mock) == []
