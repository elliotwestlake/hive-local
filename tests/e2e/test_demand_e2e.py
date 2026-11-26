"""Rooms call for heat, end to end: HA core + mocked MQTT (a Z2M OTR1) and a Hive valve
from "another integration" (registry entries and states, as in test_rooms_e2e.py).

The request is a 30 min boost, renewed while the room wants heat, and cancelled (back to
the schedule) once it's warm.
"""
import json
from datetime import datetime, timedelta
from unittest.mock import AsyncMock

import pytest
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.util import dt as dt_util
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
OUTSIDE = "switch.receiver_rooms_can_heat_outside_the_schedule"


def boosting(temp=20, left=30, **extra):
    return {**SCHEDULE, "system_mode": "emergency_heating", "temperature_setpoint_hold": True,
            "temperature_setpoint_hold_duration": left, "occupied_heating_setpoint": temp, "running_state": "heat", **extra}


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


def valve(hass, current, target=20.0, action="idle"):
    hass.states.async_set(VALVE, "heat", {"friendly_name": "Bedroom valve", "current_temperature": current,
                                          "temperature": target, "hvac_action": action})


async def setup(hass, freezer, t0):
    await hass.config.async_set_time_zone("UTC")
    freezer.move_to(t0)
    entry = MockConfigEntry(domain="hive_local", title="Receiver", data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr1", "z2m_model": "OTR1"})
    entry.add_to_hass(hass)
    # A Hive valve from a stand-in for ZHA (not "zha": we'd wait for it to set up).
    zha = MockConfigEntry(domain="zigbee_a", title="ZHA")
    zha.add_to_hass(hass)
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=zha.entry_id, identifiers={("zigbee_a", "bedroom")}, manufacturer="Danfoss", model="TRV001")
    er.async_get(hass).async_get_or_create("climate", "zigbee_a", "bedroom-climate", device_id=device.id,
                                           suggested_object_id="bedroom_valve", config_entry=zha)
    valve(hass, 18.0)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    await hass.data["hive_local_rooms"].async_save_room({"name": "Bedroom", "valves": [VALVE]})
    data = entry.runtime_data
    data.preheat.schedule_seen("heat", WEEK)
    data.transport.async_read = AsyncMock(return_value=(WEEK, True))  # no waiting on a frozen clock
    await report(hass, SCHEDULE)
    return entry


@pytest.mark.freeze_time("2026-11-30 10:00:00")  # a Monday; before hass starts, so timers and tokens agree
async def test_rooms_call_for_heat(hass, mqtt_mock, freezer, hass_ws_client):
    t0 = datetime(2026, 11, 30, 10, 0, 0)
    entry = await setup(hass, freezer, t0)
    demand = entry.runtime_data.demand
    client = await hass_ws_client(hass)

    # Off by default: a cold room does nothing.
    assert hass.states.get(SWITCH).state == "off"
    assert hass.states.get(OUTSIDE).state == "off"
    await tick(hass, freezer, t0 + timedelta(minutes=1))
    assert sets(mqtt_mock) == []

    # On from the panel: the bedroom is 2° below its target, so the heating boosts to 20°
    # (above the schedule's 16°) for 30 min.
    await client.send_json({"id": 1, "type": "hive_local/demand", "entry_id": entry.entry_id, "enabled": True})
    msg = await client.receive_json()
    assert msg["success"], msg
    await hass.async_block_till_done()
    assert hass.states.get(SWITCH).state == "on"
    assert sets(mqtt_mock) == [boost(30, 20.0)]
    await report(hass, boosting())
    assert demand.is_active
    climate = hass.states.get("climate.receiver_heating")
    assert climate.attributes["room_demand"] == ["Bedroom"]
    assert climate.attributes["preset_mode"] == "boost"
    await client.send_json({"id": 2, "type": "hive_local/subscribe"})
    assert (await client.receive_json())["success"]
    info = (await client.receive_json())["event"]["status"][entry.entry_id]["heat"]["demand"]
    assert info["active"] is True and info["rooms"] == ["Bedroom"] and info["setpoint"] == 20.0
    await client.close()

    # Choosing Schedule while the rooms are heating does nothing (it's the schedule, topped up).
    mqtt_mock.async_publish.reset_mock()
    await entry.runtime_data.async_set_mode("heat", "schedule")
    assert sets(mqtt_mock) == []

    # Renewed once it's run down to under 20 min.
    await tick(hass, freezer, t0 + timedelta(minutes=10))
    await report(hass, boosting(left=20))
    await tick(hass, freezer, t0 + timedelta(minutes=11))
    assert sets(mqtt_mock) == []
    await report(hass, boosting(left=19))
    await tick(hass, freezer, t0 + timedelta(minutes=12))
    assert sets(mqtt_mock) == [boost(30, 20.0)]
    await report(hass, boosting())

    # Warm (within 0.2°): the boost is cancelled, back to the schedule.
    mqtt_mock.async_publish.reset_mock()
    valve(hass, 19.9)
    await tick(hass, freezer, t0 + timedelta(minutes=13))
    assert sets(mqtt_mock) == [BACK_TO_SCHEDULE]
    await report(hass, SCHEDULE)
    assert demand.run is None and hass.states.get("climate.receiver_heating").attributes["room_demand"] is None

    # Cold again 5 min later: the boiler stays off at least 10 min.
    valve(hass, 19.0)
    await tick(hass, freezer, t0 + timedelta(minutes=18))
    assert sets(mqtt_mock) == [BACK_TO_SCHEDULE]
    await tick(hass, freezer, t0 + timedelta(minutes=24))
    assert sets(mqtt_mock)[-1] == boost(30, 20.0)
    await report(hass, boosting())

    # Someone cancels it (after our 30 s settle): leave it until the room is warm.
    mqtt_mock.async_publish.reset_mock()
    await tick(hass, freezer, t0 + timedelta(minutes=26))
    await report(hass, SCHEDULE)
    assert demand.run is None and demand.suppressed
    await tick(hass, freezer, t0 + timedelta(minutes=40))
    assert sets(mqtt_mock) == []
    valve(hass, 20.0)
    await tick(hass, freezer, t0 + timedelta(minutes=41))
    assert not demand.suppressed

    # A valve heating calls for heat too, while the room's below its target.
    valve(hass, 19.9, action="heating")
    await tick(hass, freezer, t0 + timedelta(minutes=42))
    assert sets(mqtt_mock) == [boost(30, 20.0)]
    await report(hass, boosting())

    # The receiver already heating on its own: nothing to add. Mode changes are someone's
    # choice: Off stops it, and nothing starts while it's off.
    mqtt_mock.async_publish.reset_mock()
    await tick(hass, freezer, t0 + timedelta(minutes=44))
    await report(hass, {**SCHEDULE, "system_mode": "off", "temperature_setpoint_hold": 0})
    assert demand.run is None
    valve(hass, 17.0)
    await tick(hass, freezer, t0 + timedelta(minutes=60))
    assert sets(mqtt_mock) == []
    await report(hass, {**SCHEDULE, "running_state": "heat"})  # back on schedule, and it's heating
    await tick(hass, freezer, t0 + timedelta(minutes=61))
    assert sets(mqtt_mock) == []
    await report(hass, SCHEDULE)

    # A stale valve (nothing for over an hour) is ignored.
    await tick(hass, freezer, t0 + timedelta(minutes=125))
    assert sets(mqtt_mock) == []
    assert demand.as_dict()["reason"] == "no_rooms"

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


@pytest.mark.freeze_time("2026-11-30 22:00:00")
async def test_schedule_off_holiday_and_restart(hass, mqtt_mock, freezer):
    t0 = datetime(2026, 11, 30, 22, 0, 0)
    entry = await setup(hass, freezer, t0)
    demand = entry.runtime_data.demand
    await report(hass, {**SCHEDULE, "occupied_heating_setpoint": 21})
    await hass.services.async_call("switch", "turn_on", {"entity_id": SWITCH}, blocking=True)
    await hass.async_block_till_done()
    # The schedule turns off at 22:30, so the boost ends then (if HA stops, it ends on time).
    assert sets(mqtt_mock) == [boost(30, 23.0)]
    await report(hass, boosting(temp=23))

    # At 22:30 the schedule is off: the request ends, and nothing starts until it's allowed.
    mqtt_mock.async_publish.reset_mock()
    await tick(hass, freezer, t0 + timedelta(minutes=30))
    assert sets(mqtt_mock) == [BACK_TO_SCHEDULE]
    await report(hass, {**SCHEDULE, "occupied_heating_setpoint": 1})
    valve(hass, 17.0)
    await tick(hass, freezer, t0 + timedelta(minutes=45))
    assert sets(mqtt_mock) == [BACK_TO_SCHEDULE]
    assert demand.as_dict()["reason"] == "schedule_off"
    await hass.services.async_call("switch", "turn_on", {"entity_id": OUTSIDE}, blocking=True)
    await hass.async_block_till_done()
    assert sets(mqtt_mock)[-1] == boost(30, 20.0)
    await report(hass, boosting(temp=20))

    # A holiday wins: its boost replaces ours (no cancel), and the rooms stay out of it.
    mqtt_mock.async_publish.reset_mock()
    await tick(hass, freezer, t0 + timedelta(minutes=50))
    await entry.runtime_data.async_set_holiday(dt_util.utcnow() + timedelta(days=2))
    await hass.async_block_till_done()
    assert sets(mqtt_mock) == [boost(360, 12.0)]
    await report(hass, boosting(temp=12, left=360))
    assert demand.run is None
    assert entry.runtime_data.holiday.away["heat"].restore_mode == "schedule"
    await tick(hass, freezer, t0 + timedelta(minutes=70))
    assert sets(mqtt_mock) == [boost(360, 12.0)]
    assert demand.as_dict()["reason"] == "holiday"
    await entry.runtime_data.holiday.async_cancel()
    await hass.async_block_till_done()
    await report(hass, {**SCHEDULE, "occupied_heating_setpoint": 1})

    # Ten minutes on the rooms ask again; then HA restarts mid-way and picks it up.
    await tick(hass, freezer, t0 + timedelta(minutes=82))
    assert sets(mqtt_mock)[-1] == boost(30, 20.0)
    await report(hass, boosting(temp=20, left=30))
    await tick(hass, freezer, t0 + timedelta(minutes=82, seconds=5))  # flush the store
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    freezer.move_to(t0 + timedelta(minutes=85))
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    demand = entry.runtime_data.demand
    assert demand.run is not None and demand.run.rooms == ("Bedroom",)
    assert demand.enabled and demand.outside_schedule  # the switches are restored
    valve(hass, 17.0)
    await report(hass, boosting(temp=20, left=27))
    assert demand.is_active
    assert hass.states.get("climate.receiver_heating").attributes["room_demand"] == ["Bedroom"]

    # The receiver ends our boost by itself after HA was away past the lease: picked up as lapsed, and asked again.
    mqtt_mock.async_publish.reset_mock()
    await tick(hass, freezer, t0 + timedelta(minutes=113))
    await report(hass, {**SCHEDULE, "occupied_heating_setpoint": 1})
    assert demand.run is None and not demand.suppressed
    await tick(hass, freezer, t0 + timedelta(minutes=124))
    assert sets(mqtt_mock)[-1] == boost(30, 20.0)

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


@pytest.mark.freeze_time("2026-11-30 15:30:00")
async def test_preheat_wins(hass, mqtt_mock, freezer):
    from custom_components.hive_local.preheat import Rate

    t0 = datetime(2026, 11, 30, 15, 30, 0)
    entry = await setup(hass, freezer, t0)
    data = entry.runtime_data
    await hass.services.async_call("switch", "turn_on", {"entity_id": SWITCH}, blocking=True)
    await hass.async_block_till_done()
    assert sets(mqtt_mock) == [boost(30, 20.0)]
    await report(hass, boosting())

    # Pre-heat for 17:00 (21°) starts over the rooms' boost; the rooms step aside without cancelling it.
    mqtt_mock.async_publish.reset_mock()
    data.preheat.rate = Rate(2.0, 3)
    await hass.services.async_call("switch", "turn_on", {"entity_id": "switch.receiver_pre_heat"}, blocking=True)
    await hass.async_block_till_done()
    assert sets(mqtt_mock) == [boost(90, 21.0)]
    assert data.demand.run is None
    await report(hass, boosting(temp=21, left=90))
    assert data.preheat.is_active and not data.demand.is_active
    await tick(hass, freezer, t0 + timedelta(minutes=5))
    assert sets(mqtt_mock) == [boost(90, 21.0)]
    assert data.demand.as_dict()["reason"] == "preheat"
    attributes = hass.states.get("climate.receiver_heating").attributes
    assert attributes["preheat"] is True and attributes["room_demand"] is None

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


@pytest.mark.freeze_time("2026-11-30 10:00:00")
async def test_turning_the_valve_down_ends_the_request(hass, mqtt_mock, freezer):
    """A valve turned down keeps saying "heating" while it closes; that mustn't keep the boiler on."""
    t0 = datetime(2026, 11, 30, 10, 0, 0)
    entry = await setup(hass, freezer, t0)
    demand = entry.runtime_data.demand
    valve(hass, 18.0, action="heating")
    await hass.services.async_call("switch", "turn_on", {"entity_id": SWITCH}, blocking=True)
    await hass.async_block_till_done()
    assert sets(mqtt_mock) == [boost(30, 20.0)]
    await report(hass, boosting())
    assert demand.is_active

    # Turned down below the room's temperature, still reporting heating: cancelled once the
    # minimum on time has run.
    mqtt_mock.async_publish.reset_mock()
    valve(hass, 18.0, target=16.0, action="heating")
    await tick(hass, freezer, t0 + timedelta(minutes=5))
    assert sets(mqtt_mock) == []  # still inside the 10 min minimum on
    await tick(hass, freezer, t0 + timedelta(minutes=10, seconds=30))
    assert sets(mqtt_mock) == [BACK_TO_SCHEDULE]
    await report(hass, SCHEDULE)
    assert demand.run is None


@pytest.mark.freeze_time("2026-11-30 10:00:00")
async def test_overshoot_is_recorded(hass, mqtt_mock, freezer):
    """After the rooms are warm we keep watching them, and record how far past the target they go."""
    t0 = datetime(2026, 11, 30, 10, 0, 0)
    entry = await setup(hass, freezer, t0)
    demand = entry.runtime_data.demand
    await hass.services.async_call("switch", "turn_on", {"entity_id": SWITCH}, blocking=True)
    await hass.async_block_till_done()
    assert sets(mqtt_mock) == [boost(30, 20.0)]
    await report(hass, boosting())

    # Warming, then warm at 19.9°: stopped.
    for minute, current in ((5, 18.5), (10, 19.0), (15, 19.5)):
        valve(hass, current)
        await tick(hass, freezer, t0 + timedelta(minutes=minute))
    mqtt_mock.async_publish.reset_mock()
    valve(hass, 19.9)
    await tick(hass, freezer, t0 + timedelta(minutes=20))
    assert sets(mqtt_mock) == [BACK_TO_SCHEDULE]
    await report(hass, SCHEDULE)
    assert list(demand.coasts) == ["Bedroom"]
    assert demand.coasts["Bedroom"].rate == 5.6  # °C/h: 18.5 → 19.9 over the last 15 min

    # The radiator's still hot: it climbs to 20.6°, then cools.
    for minute, current in ((25, 20.3), (30, 20.6), (35, 20.5)):
        valve(hass, current)
        await tick(hass, freezer, t0 + timedelta(minutes=minute))
    assert demand.overshoot == {}
    valve(hass, 20.3)
    await tick(hass, freezer, t0 + timedelta(minutes=40))
    assert demand.coasts == {}
    [run] = demand.overshoot["Bedroom"]
    assert run["overshoot"] == 0.6 and run["rise"] == 0.7 and run["minutes_to_peak"] == 10 and run["why"] == "warm"
    assert not run["receiver_heated"] and not run["cut_short"]
    assert sets(mqtt_mock) == [BACK_TO_SCHEDULE]  # recording only: nothing else sent
    climate = hass.states.get("climate.receiver_heating")
    assert climate.attributes["room_overshoot"] == {"Bedroom": {"median": None, "runs": 1}}
    diag = demand.diagnostics()["overshoot"]["Bedroom"]
    assert diag["median"] is None and diag["runs"][0]["stopped"] == "2026-11-30T10:20:00+00:00"

    # Kept across a restart.
    await tick(hass, freezer, t0 + timedelta(minutes=40, seconds=5))  # flush the store
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.runtime_data.demand.overshoot["Bedroom"] == [run]

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
