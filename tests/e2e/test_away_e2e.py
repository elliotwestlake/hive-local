"""Away until I'm back, end to end: HA core + mocked MQTT (a Z2M OTR1) and a room of Hive valves.

The Away switch holds the heating at frost protection with a renewed boost and every room's valves
at frost protection, with no end date, and puts it all back when it's turned off.
"""
import json
from datetime import datetime, timedelta

import pytest
from homeassistant.core import ServiceCall
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_mqtt_message, async_fire_time_changed

TOPIC = "zigbee2mqtt/Receiver"
SCHEDULE = {"system_mode": "heat", "temperature_setpoint_hold": False, "temperature_setpoint_hold_duration": 0,
            "occupied_heating_setpoint": 16, "local_temperature": 17, "running_state": "idle"}
BED = "climate.bedroom_valve"


def sets(mqtt_mock):
    return [json.loads(c.args[1]) for c in mqtt_mock.async_publish.call_args_list if c.args[0] == f"{TOPIC}/set"]


async def report(hass, state):
    async_fire_mqtt_message(hass, TOPIC, json.dumps(state))
    await hass.async_block_till_done()


@pytest.mark.freeze_time("2026-11-30 10:00:00")
async def test_away_switch(hass, mqtt_mock, freezer, hass_ws_client):
    await hass.config.async_set_time_zone("UTC")
    entry = MockConfigEntry(domain="hive_local", title="Receiver", data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr1", "z2m_model": "OTR1"})
    entry.add_to_hass(hass)
    other = MockConfigEntry(domain="zigbee_a", title="ZHA")
    other.add_to_hass(hass)
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=other.entry_id, identifiers={("zigbee_a", "bed")}, manufacturer="Danfoss", model="TRV001")
    er.async_get(hass).async_get_or_create("climate", "zigbee_a", "bed", device_id=device.id,
                                           suggested_object_id="bedroom_valve", config_entry=other)
    hass.states.async_set(BED, "heat", {"current_temperature": 18.0, "temperature": 20.0, "hvac_action": "idle"})
    calls: list[ServiceCall] = []

    async def set_temperature(call: ServiceCall) -> None:
        calls.append(call)
        state = hass.states.get(BED)
        hass.states.async_set(BED, state.state, {**state.attributes, "temperature": call.data["temperature"]})

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    hass.services.async_register("climate", "set_temperature", set_temperature)
    await report(hass, SCHEDULE)
    rooms = hass.data["hive_local_rooms"]
    room = await rooms.async_save_room({"name": "Bedroom", "valves": [BED]})
    await hass.async_block_till_done()

    switch = "switch.receiver_away"
    assert hass.states.get(switch).state == "off", hass.states.async_entity_ids("switch")

    # On: heating boosts to frost protection (a 6 h lease), the room's valves go to frost protection.
    await hass.services.async_call("switch", "turn_on", {"entity_id": switch}, blocking=True)
    await hass.async_block_till_done()
    assert sets(mqtt_mock)[-1] == {"system_mode": "emergency_heating", "temperature_setpoint_hold_duration": 360,
                                   "temperature_setpoint_hold": 1, "occupied_heating_setpoint": 12.0}
    assert [(c.data["entity_id"], c.data["temperature"]) for c in calls][-1:] == [(BED, 12.0)]
    assert hass.states.get(switch).state == "on"
    status = rooms.status()["rooms"][0]
    assert status["away"] and status["mode"] == "off"
    await report(hass, {**SCHEDULE, "system_mode": "emergency_heating", "temperature_setpoint_hold": True,
                        "temperature_setpoint_hold_duration": 360, "occupied_heating_setpoint": 12})
    assert entry.runtime_data.holiday.as_dict("heat")["until"] is None

    # No end: once the lease has run down an hour it's renewed, as often as it takes.
    for _ in range(3):
        mqtt_mock.async_publish.reset_mock()
        freezer.tick(timedelta(hours=1, minutes=5))
        await report(hass, {**SCHEDULE, "system_mode": "emergency_heating", "temperature_setpoint_hold": True,
                            "temperature_setpoint_hold_duration": 290, "occupied_heating_setpoint": 12})
        freezer.tick(timedelta(minutes=5))
        async_fire_time_changed(hass)
        await hass.async_block_till_done()
        assert any(p.get("temperature_setpoint_hold_duration") == 360 for p in sets(mqtt_mock)), sets(mqtt_mock)
        assert hass.states.get(switch).state == "on"

    # Off: the heating goes back to its schedule, the room back to Manual with its own target.
    calls.clear()
    mqtt_mock.async_publish.reset_mock()
    await hass.services.async_call("switch", "turn_off", {"entity_id": switch}, blocking=True)
    await hass.async_block_till_done()
    assert hass.states.get(switch).state == "off"
    assert {"system_mode": "heat", "temperature_setpoint_hold": False} in [
        {k: p[k] for k in ("system_mode", "temperature_setpoint_hold") if k in p} for p in sets(mqtt_mock)]
    assert [(c.data["entity_id"], c.data["temperature"]) for c in calls] == [(BED, 20.0)]
    status = rooms.status()["rooms"][0]
    assert not status["away"] and status["mode"] == "manual"
    assert room["id"] == status["id"]

    freezer.tick(timedelta(minutes=1))
    async_fire_time_changed(hass)
    await hass.async_block_till_done()
