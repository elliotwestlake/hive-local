"""The Hive valves' own settings, set per room, and a room's recorded overshoot in its status.

Two Hive valves from stand-ins for ZHA (a select for the response time, options as zha
names them) and Z2M (a number, 1–10), with the setting entities on their devices and the
services mocked, as in test_rooms_e2e.py.
"""

from __future__ import annotations

import pytest
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from datetime import timedelta

from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_time_changed, async_mock_service

IEEE = "84:fd:27:ff:fe:00:00:01"
ZHA_OPTIONS = ["quick 5min", "quick 10min", "quick 15min", "quick 25min", "moderate 30min", "moderate 40min",
               "moderate 50min", "moderate 60min", "moderate 70min", "slow 80min", "quick open disabled"]


def device(hass, entry, name, **kw):
    return dr.async_get(hass).async_get_or_create(
        config_entry_id=entry.entry_id, identifiers={(entry.domain, name)}, name=name, **kw)


def entity(hass, entry, dev, domain, unique_id, object_id, state, attributes=None, translation_key=None):
    reg = er.async_get(hass).async_get_or_create(
        domain, entry.domain, unique_id, device_id=dev.id, suggested_object_id=object_id, config_entry=entry,
        translation_key=translation_key)
    hass.states.async_set(reg.entity_id, state, attributes or {})
    return reg.entity_id


@pytest.mark.freeze_time("2026-11-30 10:00:00")  # as the other e2e tests: timers and tokens agree
async def test_valve_settings(hass: HomeAssistant, mqtt_mock, hass_ws_client) -> None:
    receiver = MockConfigEntry(domain="hive_local", title="Receiver", data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr1", "z2m_model": "OTR1"})
    receiver.add_to_hass(hass)
    zha = MockConfigEntry(domain="zigbee_a", title="ZHA")
    zha.add_to_hass(hass)
    z2m = MockConfigEntry(domain="zigbee_b", title="Zigbee2MQTT")
    z2m.add_to_hass(hass)

    a = device(hass, zha, "Bedroom valve", manufacturer="Danfoss", model="TRV001")
    valve_a = entity(hass, zha, a, "climate", f"{IEEE}-1", "bedroom_valve", "heat", {"current_temperature": 19, "temperature": 20})
    response_a = entity(hass, zha, a, "select", f"{IEEE}-1-513-control_algorithm_scale_factor", "bedroom_valve_response",
                        "moderate 30min", {"options": ZHA_OPTIONS}, "setpoint_response_time")
    covered_a = entity(hass, zha, a, "switch", f"{IEEE}-1-513-radiator_covered", "bedroom_valve_covered", "off",
                       translation_key="prioritize_external_temperature_sensor")
    entity(hass, zha, a, "switch", f"{IEEE}-1-513-adaptation_run_settings", "bedroom_valve_adaptation", "on",
           translation_key="adaptation_run_enabled")
    run_a = entity(hass, zha, a, "select", f"{IEEE}-1-513-adaptation_run_control", "bedroom_valve_run", "Nothing",
                   {"options": ["Nothing", "Initiate", "Cancel"]}, "adaptation_run_command")
    entity(hass, zha, a, "sensor", f"{IEEE}-1-513-adaptation_run_status", "bedroom_valve_adaptation_status", "unknown",
           {"In_progress": False, "Valve_characteristic_found": True, "Valve_characteristic_lost": False}, "adaptation_run_status")

    b = device(hass, z2m, "Bedroom window valve", manufacturer="Hive", model="Radiator valve", model_id="UK7004240")
    valve_b = entity(hass, z2m, b, "climate", "0x84fd27fffe000002_climate_zigbee2mqtt", "bedroom_window_valve", "heat",
                     {"current_temperature": 19.5, "temperature": 20})
    response_b = entity(hass, z2m, b, "number", "0x84fd27fffe000002_control_algorithm_scale_factor_zigbee2mqtt",
                        "bedroom_window_valve_scale", "10", {"min": 1, "max": 10})
    covered_b = entity(hass, z2m, b, "switch", "0x84fd27fffe000002_radiator_covered_zigbee2mqtt", "bedroom_window_valve_covered", "off")

    assert await hass.config_entries.async_setup(receiver.entry_id)
    await hass.async_block_till_done()
    # After setup: our own select, number and switch platforms register the real services.
    selects = async_mock_service(hass, "select", "select_option")
    numbers = async_mock_service(hass, "number", "set_value")
    switches = async_mock_service(hass, "switch", "turn_on")
    manager = hass.data["hive_local_rooms"]
    room = await manager.async_save_room({"name": "Bedroom", "valves": [valve_a, valve_b]})
    client = await hass_ws_client(hass)

    await client.send_json({"id": 1, "type": "hive_local/rooms/valve_settings", "room_id": room["id"]})
    msg = await client.receive_json()
    assert msg["success"], msg
    settings = msg["result"]["settings"]
    assert settings["response"] == {"value": 30, "mixed": True, "supported": 2}  # 30 min and 80 min
    assert settings["covered"] == {"value": False, "mixed": False, "supported": 2}
    assert settings["adaptation"] == {"value": True, "mixed": False, "supported": 1}
    assert settings["adaptation_status"]["value"] == "found"
    assert msg["result"]["count"] == 2

    # Response time: ZHA's option name on one, Z2M's scale factor on the other.
    await client.send_json({"id": 2, "type": "hive_local/rooms/valve_settings/set", "room_id": room["id"], "key": "response", "value": 80})
    msg = await client.receive_json()
    assert msg["success"] and msg["result"]["failed"] == [], msg
    assert [(c.data["entity_id"], c.data["option"]) for c in selects] == [(response_a, "slow 80min")]
    assert [(c.data["entity_id"], c.data["value"]) for c in numbers] == [(response_b, 10)]

    await client.send_json({"id": 3, "type": "hive_local/rooms/valve_settings/set", "room_id": room["id"], "key": "covered", "value": True})
    msg = await client.receive_json()
    assert msg["success"], msg
    assert sorted(c.data["entity_id"] for c in switches) == sorted([covered_a, covered_b])

    # An adaptation run: only the ZHA valve has the control.
    await client.send_json({"id": 4, "type": "hive_local/rooms/valve_settings/set", "room_id": room["id"], "key": "adaptation_run"})
    msg = await client.receive_json()
    assert msg["success"], msg
    assert (selects[-1].data["entity_id"], selects[-1].data["option"]) == (run_a, "Initiate")

    # A value that doesn't fit is refused.
    await client.send_json({"id": 5, "type": "hive_local/rooms/valve_settings/set", "room_id": room["id"], "key": "response", "value": 33})
    msg = await client.receive_json()
    assert not msg["success"] and msg["error"]["code"] == "invalid"

    # The overshoot Rooms call for heat records shows in the room's status.
    assert manager.status()["rooms"][0]["overshoot"] is None
    receiver.runtime_data.demand.overshoot["Bedroom"] = [
        {"why": "warm", "overshoot": o, "receiver_heated": False, "cut_short": False} for o in (0.4, 0.6, 0.9)]
    assert manager.status()["rooms"][0]["overshoot"] == {"median": 0.6, "runs": 3}

    assert await hass.config_entries.async_unload(receiver.entry_id)
    await hass.async_block_till_done()
    # MQTT's housekeeping runs every second: let it run once, so it stops (test_z2m_e2e.py).
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=2))
    await hass.async_block_till_done()
