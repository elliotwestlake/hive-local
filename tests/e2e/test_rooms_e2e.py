"""Rooms end to end: Hive radiator valves that belong to other integrations.

The valves are a ZHA one (model TRV001, made by "Danfoss") and a Z2M one (UK7004240),
each with a battery sensor, plus a non-Hive valve that must never be offered. Rooms only
use their Home Assistant entities, so the valves are registry entries and states, and
`climate.set_temperature` / `button.press` are mocked services.
"""

from __future__ import annotations

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import area_registry as ar
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_mock_service

LOUNGE_ZHA = "climate.lounge_valve"
LOUNGE_Z2M = "climate.lounge_window_valve"
OTHER = "climate.other_valve"
BEDROOM_SENSOR = "sensor.bedroom_temperature"


def add_valve(hass, entry, object_id, *, model, model_id=None, manufacturer, area_id, current, target, battery, action="idle", identify=False):
    devices = dr.async_get(hass)
    device = devices.async_get_or_create(
        config_entry_id=entry.entry_id,
        identifiers={(entry.domain, object_id)},
        manufacturer=manufacturer,
        model=model,
        model_id=model_id,
        name=object_id.replace("_", " ").title(),
    )
    devices.async_update_device(device.id, area_id=area_id)
    entities = er.async_get(hass)
    climate = entities.async_get_or_create(
        "climate", entry.domain, f"{object_id}-climate", device_id=device.id, suggested_object_id=object_id,
        config_entry=entry,
    )
    hass.states.async_set(climate.entity_id, "heat", {
        "friendly_name": object_id.replace("_", " ").title(),
        "current_temperature": current, "temperature": target, "hvac_action": action,
    })
    if battery is not None:
        sensor = entities.async_get_or_create(
            "sensor", entry.domain, f"{object_id}-battery", device_id=device.id,
            suggested_object_id=f"{object_id}_battery", original_device_class="battery", config_entry=entry,
        )
        hass.states.async_set(sensor.entity_id, str(battery), {"device_class": "battery", "unit_of_measurement": "%"})
    if identify:
        entities.async_get_or_create(
            "button", entry.domain, f"{object_id}-identify", device_id=device.id,
            suggested_object_id=f"{object_id}_identify", original_device_class="identify", config_entry=entry,
        )
    return climate.entity_id


async def test_rooms(hass: HomeAssistant, hass_ws_client, hass_storage) -> None:
    receiver = MockConfigEntry(domain="hive_local", title="Receiver", data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr1", "z2m_model": "OTR1"})
    receiver.add_to_hass(hass)
    # A room kept per receiver by 0.3.0/0.3.1: imported once, then its store removed.
    hass_storage[f"hive_local.rooms.{receiver.entry_id}"] = {
        "version": 1, "key": f"hive_local.rooms.{receiver.entry_id}",
        "data": {"rooms": [{"id": "old123", "name": "Study", "valves": [], "sensor": None}]},
    }

    # Stand-ins for ZHA and Z2M. Not those domains: hive_local would wait for them to set
    # up (they're after_dependencies), and they can't without a radio or broker.
    zha = MockConfigEntry(domain="zigbee_a", title="ZHA")
    zha.add_to_hass(hass)
    z2m = MockConfigEntry(domain="zigbee_b", title="Zigbee2MQTT")
    z2m.add_to_hass(hass)
    lounge = ar.async_get(hass).async_create("Lounge")
    bedroom = ar.async_get(hass).async_create("Bedroom")
    assert add_valve(hass, zha, "lounge_valve", model="TRV001", manufacturer="Danfoss", area_id=lounge.id,
                     current=18.5, target=20, battery=80, identify=True) == LOUNGE_ZHA
    assert add_valve(hass, z2m, "lounge_window_valve", model="Radiator valve with thermostat",
                     model_id="UK7004240", manufacturer="Hive", area_id=lounge.id,
                     current=19.5, target=21, battery=15, action="heating") == LOUNGE_Z2M
    bedroom_valve = add_valve(hass, zha, "bedroom_valve", model="TRV003", manufacturer="Danfoss",
                              area_id=bedroom.id, current=17, target=18, battery=None)
    assert add_valve(hass, zha, "other_valve", model="eTRV0100", manufacturer="Danfoss", area_id=lounge.id,
                     current=20, target=20, battery=90) == OTHER
    sensor = er.async_get(hass).async_get_or_create(
        "sensor", "zigbee_a", "bedroom-temp", suggested_object_id="bedroom_temperature", config_entry=zha)
    er.async_get(hass).async_update_entity(sensor.entity_id, area_id=bedroom.id)
    hass.states.async_set(BEDROOM_SENSOR, "16.4", {"device_class": "temperature", "friendly_name": "Bedroom temperature"})

    assert await async_setup_component(hass, "hive_local", {})
    await hass.async_block_till_done()
    assert f"hive_local.rooms.{receiver.entry_id}" not in hass_storage
    client = await hass_ws_client(hass)

    async def ws(msg_id: int, **msg):
        await client.send_json({"id": msg_id, **msg})
        reply = await client.receive_json()
        while reply.get("type") == "event":
            reply = await client.receive_json()
        return reply

    # Only Hive valves, sorted by area; the valve's own temperature reading isn't offered.
    msg = await ws(1, type="hive_local/rooms/candidates")
    assert msg["success"], msg
    assert [v["entity_id"] for v in msg["result"]["valves"]] == [bedroom_valve, LOUNGE_ZHA, LOUNGE_Z2M]
    assert [s["entity_id"] for s in msg["result"]["sensors"]] == [BEDROOM_SENSOR]
    assert msg["result"]["receivers"] == [{"entry_id": receiver.entry_id, "name": "Receiver"}]

    # A suggestion per area with free valves (the imported Study has none).
    msg = await ws(2, type="hive_local/rooms/suggest")
    assert msg["result"]["rooms"] == [
        {"name": "Bedroom", "valves": [bedroom_valve], "sensor": BEDROOM_SENSOR},
        {"name": "Lounge", "valves": [LOUNGE_ZHA, LOUNGE_Z2M], "sensor": None},
    ]

    # Not a Hive valve: refused.
    msg = await ws(3, type="hive_local/rooms/save", name="Lounge", valves=[OTHER])
    assert not msg["success"] and msg["error"]["code"] == "invalid"

    # Live status follows the valves.
    await client.send_json({"id": 4, "type": "hive_local/rooms/subscribe"})
    assert (await client.receive_json())["success"]
    first = await client.receive_json()
    assert [r["name"] for r in first["event"]["rooms"]] == ["Study"]
    assert first["event"]["rooms"][0]["receiver"] == receiver.entry_id

    msg = await ws(5, type="hive_local/rooms/save", name="  Lounge ", valves=[LOUNGE_ZHA, LOUNGE_Z2M])
    assert msg["success"], msg
    room = msg["result"]["room"]
    assert room["name"] == "Lounge" and room["receiver"] == receiver.entry_id

    status = {r["name"]: r for r in hass.data["hive_local_rooms"].status()["rooms"]}["Lounge"]
    assert status["current_temperature"] == 19.0 and status["temperature_source"] == "valves"
    assert status["target"] is None and status["target_range"] == [20, 21]
    assert status["heating"] is True and status["heating_valves"] == [LOUNGE_Z2M]
    assert status["lowest_battery"] == 15 and status["battery_low"] is True

    # One valve stops responding: the subscription sends the change.
    hass.states.async_set(LOUNGE_Z2M, "unavailable")
    await hass.async_block_till_done()
    event = await client.receive_json()
    while not any(r["name"] == "Lounge" and r["unavailable"] for r in event["event"]["rooms"]):
        event = await client.receive_json()
    hass.states.async_set(LOUNGE_Z2M, "heat", {"current_temperature": 19.5, "temperature": 21, "hvac_action": "heating"})
    await hass.async_block_till_done()

    # Room target → every valve; one refusing is reported, not fatal.
    calls: list[ServiceCall] = []

    async def set_temperature(call: ServiceCall) -> None:
        calls.append(call)
        if call.data["entity_id"] == LOUNGE_Z2M:
            raise HomeAssistantError("asleep")

    hass.services.async_register("climate", "set_temperature", set_temperature)
    msg = await ws(6, type="hive_local/rooms/set_target", room_id=room["id"], temperature=21.5)
    assert msg["success"], msg
    assert msg["result"]["failed"] == [LOUNGE_Z2M]
    assert [(c.data["entity_id"], c.data["temperature"]) for c in calls] == [(LOUNGE_ZHA, 21.5), (LOUNGE_Z2M, 21.5)]

    # Identify: only where the valve has an Identify button.
    presses = async_mock_service(hass, "button", "press")
    msg = await ws(7, type="hive_local/rooms/identify", entity_id=LOUNGE_ZHA)
    assert msg["success"], msg
    assert [c.data["entity_id"] for c in presses] == ["button.lounge_valve_identify"]
    msg = await ws(8, type="hive_local/rooms/identify", entity_id=LOUNGE_Z2M)
    assert not msg["success"] and "Identify" in msg["error"]["message"]

    # Devices tab: every Hive valve with its room.
    msg = await ws(9, type="hive_local/rooms/valves")
    rooms_of = {v["entity_id"]: v["room"] for v in msg["result"]["valves"]}
    assert rooms_of == {bedroom_valve: None, LOUNGE_ZHA: "Lounge", LOUNGE_Z2M: "Lounge"}

    # Edit (add the sensor and a valve) and delete; both are stored.
    msg = await ws(10, type="hive_local/rooms/save", room_id=room["id"], name="Lounge",
                   valves=[LOUNGE_ZHA, LOUNGE_Z2M, bedroom_valve], sensor=BEDROOM_SENSOR)
    assert msg["success"], msg
    assert hass.data["hive_local_rooms"].status()["rooms"][1]["current_temperature"] == 16.4
    msg = await ws(11, type="hive_local/rooms/delete", room_id="old123")
    assert msg["success"]
    await hass.async_block_till_done()
    stored = hass_storage["hive_local.rooms"]["data"]["rooms"]
    assert [r["name"] for r in stored] == ["Lounge"]
    assert stored[0]["sensor"] == BEDROOM_SENSOR
