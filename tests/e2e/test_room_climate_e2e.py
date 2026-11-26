"""A room's climate entity, end to end: HA core + mocked MQTT (a Z2M OTR1) and Hive valves from
"another integration". Same controls as the heating's: auto / heat / off, a target and boost.
"""
import json
from datetime import datetime, timedelta
from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.core import ServiceCall
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_mqtt_message, async_fire_time_changed

TOPIC = "zigbee2mqtt/Receiver"
SCHEDULE = {"system_mode": "heat", "temperature_setpoint_hold": False, "temperature_setpoint_hold_duration": 0,
            "occupied_heating_setpoint": 16, "local_temperature": 17, "running_state": "idle"}
BED, BED2, STUDY = "climate.bedroom_valve", "climate.bedroom_window_valve", "climate.study_valve"


def valve(hass, entity_id, current, target, action="idle"):
    hass.states.async_set(entity_id, "heat", {"friendly_name": entity_id, "current_temperature": current,
                                              "temperature": target, "hvac_action": action})


async def setup(hass):
    await hass.config.async_set_time_zone("UTC")
    entry = MockConfigEntry(domain="hive_local", title="Receiver", data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr1", "z2m_model": "OTR1"})
    entry.add_to_hass(hass)
    zha = MockConfigEntry(domain="zigbee_a", title="ZHA")
    zha.add_to_hass(hass)
    for key, entity_id in (("bed", BED), ("bed2", BED2), ("study", STUDY)):
        device = dr.async_get(hass).async_get_or_create(
            config_entry_id=zha.entry_id, identifiers={("zigbee_a", key)}, manufacturer="Danfoss", model="TRV001")
        er.async_get(hass).async_get_or_create("climate", "zigbee_a", key, device_id=device.id,
                                               suggested_object_id=entity_id.split(".")[1], config_entry=zha)
    valve(hass, BED, 18.0, 19.0, "heating")
    valve(hass, BED2, 18.4, 19.0)
    valve(hass, STUDY, 20.0, 18.0)
    calls: list[ServiceCall] = []

    async def set_temperature(call: ServiceCall) -> None:
        entity_ids = call.data["entity_id"]
        entity_id = entity_ids[0] if isinstance(entity_ids, list) else entity_ids
        if entity_id not in (BED, BED2, STUDY):
            # One of ours (a room): its own entity handles it.
            entity = hass.data["entity_components"]["climate"].get_entity(entity_id)
            await entity.async_set_temperature(**{k: v for k, v in call.data.items() if k != "entity_id"})
            return
        calls.append(call)
        state = hass.states.get(entity_id)
        hass.states.async_set(state.entity_id, state.state, {**state.attributes, "temperature": call.data["temperature"]})

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    hass.services.async_register("climate", "set_temperature", set_temperature)  # after climate has loaded
    async_fire_mqtt_message(hass, TOPIC, json.dumps(SCHEDULE))
    await hass.async_block_till_done()
    return entry, calls


def targets(calls):
    return [(c.data["entity_id"], c.data["temperature"]) for c in calls]


@pytest.mark.freeze_time("2026-11-30 10:00:00")  # before hass starts, so timers agree
async def test_room_climate_entity(hass, mqtt_mock, freezer, hass_ws_client):
    entry, calls = await setup(hass)
    rooms = hass.data["hive_local_rooms"]
    room = await rooms.async_save_room({"name": "Bedroom", "valves": [BED, BED2]})
    await hass.async_block_till_done()

    # Added as soon as the room is, as its own device under the receiver.
    state = hass.states.get("climate.bedroom")
    assert state is not None, hass.states.async_entity_ids("climate")
    assert state.state == "heat" and state.attributes["current_temperature"] == 18.2
    assert state.attributes["temperature"] == 19.0 and state.attributes["hvac_action"] == "heating"
    assert state.attributes["preset_mode"] == "none"
    device = dr.async_get(hass).async_get(er.async_get(hass).async_get("climate.bedroom").device_id)
    receiver = dr.async_get(hass).async_get(er.async_get(hass).async_get("climate.receiver_heating").device_id)
    assert device.name == "Bedroom" and device.via_device_id == receiver.id

    # A target goes to every valve; the valves' readings update the entity.
    await hass.services.async_call("climate", "set_temperature", {"entity_id": "climate.bedroom", "temperature": 21}, blocking=True)
    assert targets(calls) == [(BED, 21.0), (BED2, 21.0)]
    valve(hass, BED, 19.0, 21.0)
    await hass.async_block_till_done()
    assert hass.states.get("climate.bedroom").attributes["hvac_action"] == "idle"

    # Off: the valves go to their lowest, and get their own targets back when turned on.
    calls.clear()
    await hass.services.async_call("climate", "set_hvac_mode", {"entity_id": "climate.bedroom", "hvac_mode": "off"}, blocking=True)
    state = hass.states.get("climate.bedroom")
    assert state.state == "off" and state.attributes["temperature"] is None and state.attributes["hvac_action"] == "off"
    assert targets(calls) == [(BED, 5.0), (BED2, 5.0)]
    calls.clear()
    await hass.services.async_call("climate", "turn_on", {"entity_id": "climate.bedroom"}, blocking=True)
    assert hass.states.get("climate.bedroom").state == "heat"
    assert targets(calls) == [(BED, 21.0), (BED2, 21.0)]

    # A temperature while off turns it back on.
    await hass.services.async_call("climate", "set_hvac_mode", {"entity_id": "climate.bedroom", "hvac_mode": "off"}, blocking=True)
    calls.clear()
    await hass.services.async_call("climate", "set_temperature", {"entity_id": "climate.bedroom", "temperature": 20}, blocking=True)
    assert hass.states.get("climate.bedroom").state == "heat"
    assert targets(calls)[-2:] == [(BED, 20.0), (BED2, 20.0)]

    # Auto: the valves follow their own schedule (and stop when it's back on heat).
    mode = AsyncMock(return_value={"failed": []})
    with patch("custom_components.hive_local.valve_schedule.async_set_room_schedule_mode", mode):
        await hass.services.async_call("climate", "set_hvac_mode", {"entity_id": "climate.bedroom", "hvac_mode": "auto"}, blocking=True)
        assert hass.states.get("climate.bedroom").state == "auto"
        assert mode.await_args.args[2:] == (room["id"], True)
        await hass.services.async_call("climate", "set_hvac_mode", {"entity_id": "climate.bedroom", "hvac_mode": "heat"}, blocking=True)
        assert mode.await_args.args[2:] == (room["id"], False)
    assert hass.states.get("climate.bedroom").state == "heat"

    # Boost preset: a room boost with the heating's boost defaults (30 min at 21°); cleared, the targets go back.
    calls.clear()
    await hass.services.async_call("climate", "set_preset_mode", {"entity_id": "climate.bedroom", "preset_mode": "boost"}, blocking=True)
    await hass.async_block_till_done()
    state = hass.states.get("climate.bedroom")
    assert state.attributes["preset_mode"] == "boost" and state.attributes["temperature"] == 21.0
    assert state.attributes["boost_remaining"] == 30
    assert targets(calls) == [(BED, 21.0), (BED2, 21.0)]
    await hass.services.async_call("climate", "set_temperature", {"entity_id": "climate.bedroom", "temperature": 22}, blocking=True)
    assert hass.data["hive_local_room_boosts"].get(room["id"]).temperature == 22.0
    calls.clear()
    await hass.services.async_call("climate", "set_preset_mode", {"entity_id": "climate.bedroom", "preset_mode": "none"}, blocking=True)
    await hass.async_block_till_done()
    assert hass.states.get("climate.bedroom").attributes["preset_mode"] == "none"
    assert targets(calls) == [(BED, 20.0), (BED2, 20.0)]

    # The panel's Schedule / Manual / Off (the room's page) is the same mode as the entity's.
    client = await hass_ws_client(hass)
    calls.clear()
    await client.send_json({"id": 1, "type": "hive_local/rooms/mode", "room_id": room["id"], "mode": "off"})
    msg = await client.receive_json()
    assert msg["success"] and msg["result"]["failed"] == [], msg
    await hass.async_block_till_done()
    assert hass.states.get("climate.bedroom").state == "off"
    assert targets(calls) == [(BED, 5.0), (BED2, 5.0)]
    await client.send_json({"id": 2, "type": "hive_local/rooms/mode", "room_id": room["id"], "mode": "manual"})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    assert hass.states.get("climate.bedroom").state == "heat"
    assert rooms.status()["rooms"][0]["mode"] == "manual"
    # A room's history needs the recorder (not loaded here), and says so.
    await client.send_json({"id": 3, "type": "hive_local/rooms/stats", "room_id": room["id"]})
    msg = await client.receive_json()
    assert not msg["success"] and msg["error"]["code"] == "no_recorder"
    await client.close()

    # Renaming the room renames its device; another room gets its own entity; deleting removes it.
    await rooms.async_save_room({"name": "Main bedroom", "valves": [BED, BED2]}, room["id"])
    await hass.async_block_till_done()
    assert dr.async_get(hass).async_get(device.id).name == "Main bedroom"
    study = await rooms.async_save_room({"name": "Study", "valves": [STUDY]})
    await hass.async_block_till_done()
    assert hass.states.get("climate.study").attributes["temperature"] == 18.0
    study_device = er.async_get(hass).async_get("climate.study").device_id
    await rooms.async_delete_room(study["id"])
    await hass.async_block_till_done()
    assert hass.states.get("climate.study") is None
    assert er.async_get(hass).async_get("climate.study") is None
    assert dr.async_get(hass).async_get(study_device) is None

    # Let the integrations' periodic timers run before the test ends.
    freezer.tick(timedelta(minutes=1))
    async_fire_time_changed(hass)
    await hass.async_block_till_done()
