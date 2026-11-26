"""Tidying up the entities Zigbee2MQTT / ZHA make that Hive Local's replace."""
import json
from datetime import timedelta

import pytest

from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_mqtt_message, async_fire_time_changed

TOPIC = "zigbee2mqtt/Receiver"
SCHEDULE = {"system_mode": "heat", "temperature_setpoint_hold": False, "temperature_setpoint_hold_duration": 0,
            "occupied_heating_setpoint": 16, "local_temperature": 17, "running_state": "idle"}
VALVE = "climate.bedroom_valve"
Z2M_THERMOSTAT = "climate.receiver_z2m"


@pytest.mark.freeze_time("2026-11-30 10:00:00")
async def test_tidy_up_and_undo(hass, mqtt_mock, hass_ws_client, freezer):
    entry = MockConfigEntry(domain="hive_local", title="Receiver", data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr1", "z2m_model": "OTR1"})
    entry.add_to_hass(hass)
    # Stand-ins for what Z2M's discovery makes (not "mqtt": we'd wait for it to set up).
    z2m = MockConfigEntry(domain="z2m_stand_in")
    z2m.add_to_hass(hass)
    devices, entities = dr.async_get(hass), er.async_get(hass)
    receiver = devices.async_get_or_create(config_entry_id=z2m.entry_id, identifiers={("mqtt", "zigbee2mqtt_0x00aa")},
                                           name="Receiver", manufacturer="Hive", model="OTR1")
    entities.async_get_or_create("climate", "mqtt", "0x00aa_climate", device_id=receiver.id,
                                 suggested_object_id="receiver_z2m", config_entry=z2m)
    entities.async_get_or_create("sensor", "mqtt", "0x00aa_linkquality", device_id=receiver.id, config_entry=z2m)
    valve = devices.async_get_or_create(config_entry_id=z2m.entry_id, identifiers={("mqtt", "zigbee2mqtt_0x00bb")},
                                        name="Bedroom valve", manufacturer="Hive", model="UK7004240")
    entities.async_get_or_create("climate", "mqtt", "0x00bb_climate", device_id=valve.id,
                                 suggested_object_id="bedroom_valve", config_entry=z2m)
    hass.states.async_set(VALVE, "heat", {"current_temperature": 18, "temperature": 19})
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    async_fire_mqtt_message(hass, TOPIC, json.dumps(SCHEDULE))
    await hass.async_block_till_done()
    await hass.data["hive_local_rooms"].async_save_room({"name": "Bedroom", "valves": [VALVE]})
    client = await hass_ws_client(hass)

    async def ws(n, type_):
        await client.send_json({"id": n, "type": type_})
        msg = await client.receive_json()
        assert msg["success"], msg
        return msg["result"]

    # Z2M's thermostat for the receiver, and the valve in a room; not its other entities, nor ours.
    status = await ws(1, "hive_local/tidy")
    assert [r["entity_id"] for r in status["receiver"]] == [Z2M_THERMOSTAT]
    assert [r["entity_id"] for r in status["valves"]] == [VALVE]
    assert status["pending"] == 2 and status["undoable"] == 0

    # Tidied: the receiver's is disabled, the valve's only hidden (rooms still use it).
    status = await ws(2, "hive_local/tidy/apply")
    assert entities.async_get(Z2M_THERMOSTAT).disabled_by == er.RegistryEntryDisabler.USER
    assert entities.async_get(VALVE).hidden_by == er.RegistryEntryHider.USER
    assert entities.async_get(VALVE).disabled_by is None
    assert entities.async_get("climate.receiver_heating").disabled_by is None
    assert status["pending"] == 0 and status["undoable"] == 2

    # Someone turns the receiver's back on in HA; Undo only puts back what's still as we left it.
    entities.async_update_entity(Z2M_THERMOSTAT, disabled_by=None)
    status = await ws(3, "hive_local/tidy/undo")
    assert entities.async_get(VALVE).hidden_by is None
    assert entities.async_get(Z2M_THERMOSTAT).disabled_by is None
    assert status["pending"] == 2 and status["undoable"] == 0
    assert hass.data["hive_local_tidy"].changed == {}

    # Let the integrations' periodic timers run before the test ends.
    freezer.tick(timedelta(minutes=1))
    async_fire_time_changed(hass)
    await hass.async_block_till_done()
