"""Holiday end to end: HA core + mocked MQTT, a Z2M SLR2 (heating + hot water).

Heating is held with a renewed boost (the fail-safe), hot water is off.
"""
import json
from datetime import datetime, timedelta

from homeassistant.util import dt as dt_util
import pytest
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_mqtt_message,
    async_fire_time_changed,
)

TOPIC = "zigbee2mqtt/Receiver"
SCHEDULE = {
    "system_mode_heat": "heat", "temperature_setpoint_hold_heat": False, "temperature_setpoint_hold_duration_heat": 0,
    "occupied_heating_setpoint_heat": 20, "local_temperature_heat": 19, "running_state_heat": "idle",
    "system_mode_water": "heat", "temperature_setpoint_hold_water": False, "temperature_setpoint_hold_duration_water": 0,
    "occupied_heating_setpoint_water": 22, "local_temperature_water": 21, "running_state_water": "idle",
}
SCHEDULE_HEAT = {"system_mode_heat": "heat", "temperature_setpoint_hold_heat": False}
SCHEDULE_WATER = {"system_mode_water": "heat", "temperature_setpoint_hold_water": False}


def away(temp=12, left=360, **extra):
    return {**SCHEDULE, "system_mode_heat": "emergency_heating", "temperature_setpoint_hold_heat": True,
            "temperature_setpoint_hold_duration_heat": left, "occupied_heating_setpoint_heat": temp,
            "system_mode_water": "off", **extra}


def boost(minutes, temp):
    return {"system_mode_heat": "emergency_heating", "temperature_setpoint_hold_duration_heat": minutes,
            "temperature_setpoint_hold_heat": 1, "occupied_heating_setpoint_heat": temp}


def sets(mqtt_mock):
    return [json.loads(c.args[1]) for c in mqtt_mock.async_publish.call_args_list if c.args[0] == f"{TOPIC}/set"]


async def report(hass, state):
    async_fire_mqtt_message(hass, TOPIC, json.dumps(state))
    await hass.async_block_till_done()


async def tick(hass, freezer, when):
    freezer.move_to(when)
    async_fire_time_changed(hass, when)
    await hass.async_block_till_done()


async def restart(hass, freezer, entry, when):
    now = dt_util.utcnow().replace(tzinfo=None)
    await tick(hass, freezer, now + timedelta(seconds=5))  # flush the store
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    freezer.move_to(when)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry.runtime_data.holiday


@pytest.mark.freeze_time("2026-11-30 10:00:00")  # before hass starts, so its timers and tokens agree
async def test_holiday(hass, mqtt_mock, freezer, hass_ws_client):
    await hass.config.async_set_time_zone("UTC")
    entry = MockConfigEntry(domain="hive_local", title="Receiver", data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr2", "z2m_model": "SLR2c"})
    t0 = datetime(2026, 11, 30, 10, 0, 0)  # a Monday
    freezer.move_to(t0)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)
    await report(hass, SCHEDULE)
    holiday = entry.runtime_data.holiday

    # In the past: refused.
    await client.send_json({"id": 1, "type": "hive_local/holiday/set", "until": "2026-11-20T10:00:00Z"})
    msg = await client.receive_json()
    assert not msg["success"] and "future" in msg["error"]["message"]

    # Away until Thursday 14:00: heating boosts to 12° for 6 h, hot water off.
    mqtt_mock.async_publish.reset_mock()
    await client.send_json({"id": 2, "type": "hive_local/holiday/set", "until": "2026-12-03T14:00:00"})
    msg = await client.receive_json()
    assert msg["success"], msg
    await hass.async_block_till_done()
    s = sets(mqtt_mock)
    assert boost(360, 12.0) in s, s
    assert any(p.get("system_mode_water") == "off" for p in s), s

    await report(hass, SCHEDULE)  # the old state, late: ignored
    assert set(holiday.away) == {"heat", "water"}
    await report(hass, away())
    climate = hass.states.get("climate.receiver_heating")
    assert climate.attributes["preset_mode"] == "away"
    assert climate.attributes["holiday_until"].startswith("2026-12-03T14:00:00")
    await client.send_json({"id": 3, "type": "hive_local/subscribe"})
    assert (await client.receive_json())["success"]
    status = (await client.receive_json())["event"]["status"][entry.entry_id]
    assert status["heat"]["holiday"]["holding"] is True and status["heat"]["holiday"]["temperature"] == 12.0

    # After an hour the boost is renewed (the dead man's switch).
    mqtt_mock.async_publish.reset_mock()
    await tick(hass, freezer, t0 + timedelta(minutes=30))
    await report(hass, away(left=330))
    await tick(hass, freezer, t0 + timedelta(minutes=35))
    assert [p for p in sets(mqtt_mock) if "system_mode_heat" in p] == []
    await report(hass, away(left=299))
    await tick(hass, freezer, t0 + timedelta(minutes=65))
    assert sets(mqtt_mock)[-1] == boost(360, 12.0)
    await report(hass, away())

    # Someone boosts on top; when it ends, the holiday comes back.
    await tick(hass, freezer, t0 + timedelta(minutes=70))
    await report(hass, away(temp=21, left=60))
    assert hass.states.get("climate.receiver_heating").attributes["preset_mode"] == "boost"
    mqtt_mock.async_publish.reset_mock()
    await report(hass, {**away(), "system_mode_heat": "heat", "temperature_setpoint_hold_heat": False,
                        "occupied_heating_setpoint_heat": 20})
    assert sets(mqtt_mock)[-1] == boost(360, 12.0)
    assert set(holiday.away) == {"heat", "water"}
    await report(hass, away())

    # − / + while away changes the holiday temperature.
    await tick(hass, freezer, t0 + timedelta(minutes=75))
    await entry.runtime_data.async_set_target("heat", 14)
    await hass.async_block_till_done()
    assert sets(mqtt_mock)[-1] == boost(360, 14.0)
    await report(hass, away(temp=14))
    assert holiday.away["heat"].temperature == 14 and holiday.is_holding("heat")
    await hass.services.async_call("climate", "set_temperature",
        {"entity_id": "climate.receiver_heating", "temperature": 12}, blocking=True)
    assert sets(mqtt_mock)[-1] == boost(360, 12.0)
    await report(hass, away())

    # HA down for 8 h (past the 6 h lease): the receiver went back to schedule by itself.
    # Back up, the holiday is put back.
    lease_end = holiday.away["heat"].lease_end
    holiday = await restart(hass, freezer, entry, t0 + timedelta(hours=9))
    assert holiday.away["heat"].lease_end == lease_end
    mqtt_mock.async_publish.reset_mock()
    await report(hass, {**SCHEDULE, "system_mode_water": "off"})  # within the settle window: ignored
    assert sets(mqtt_mock) == []
    await tick(hass, freezer, t0 + timedelta(hours=9, minutes=1))
    await report(hass, {**SCHEDULE, "system_mode_water": "off"})
    assert sets(mqtt_mock)[-1] == boost(360, 12.0)
    await report(hass, away())

    # The last stretch: renewals shorten the boost so it ends with the holiday.
    end = datetime(2026, 12, 3, 14, 0)
    mqtt_mock.async_publish.reset_mock()
    await tick(hass, freezer, end - timedelta(hours=5))
    await report(hass, away(left=200))
    await tick(hass, freezer, end - timedelta(hours=5) + timedelta(minutes=5))
    assert sets(mqtt_mock)[-1] == boost(295, 12.0)
    await report(hass, away(left=295))

    # HA down over the end time: back up, it ends (both back to schedule) once the receiver reports.
    holiday = await restart(hass, freezer, entry, end + timedelta(hours=2))
    mqtt_mock.async_publish.reset_mock()
    await report(hass, {**SCHEDULE, "system_mode_water": "off"})
    s = sets(mqtt_mock)
    assert SCHEDULE_HEAT in s and SCHEDULE_WATER in s, s
    assert holiday.away == {}
    await report(hass, SCHEDULE)
    assert hass.states.get("climate.receiver_heating").attributes["preset_mode"] == "none"

    # From a manual hold at 19: a short holiday's boost ends with it, then back to 19.
    t1 = end + timedelta(hours=3)
    freezer.move_to(t1)
    await report(hass, {**SCHEDULE, "temperature_setpoint_hold_heat": True, "occupied_heating_setpoint_heat": 19})
    mqtt_mock.async_publish.reset_mock()
    await hass.services.async_call("hive_local", "set_holiday", {"until": t1 + timedelta(hours=2)}, blocking=True)
    assert boost(120, 12.0) in sets(mqtt_mock), sets(mqtt_mock)
    await report(hass, away(temp=12, left=120))
    assert holiday.away["heat"].restore_mode == "manual" and holiday.away["heat"].restore_setpoint == 19
    mqtt_mock.async_publish.reset_mock()
    await tick(hass, freezer, t1 + timedelta(hours=2, seconds=1))
    s = sets(mqtt_mock)
    assert {"system_mode_heat": "heat", "temperature_setpoint_hold_heat": 1, "occupied_heating_setpoint_heat": 19} in s, s
    assert holiday.away == {}

    # Someone sets the thermostat to manual mid-holiday: heating's holiday ends, nothing sent.
    await report(hass, SCHEDULE)
    t2 = t1 + timedelta(hours=3)
    freezer.move_to(t2)
    await hass.services.async_call("hive_local", "set_holiday", {"until": t2 + timedelta(days=2)}, blocking=True)
    await report(hass, away())
    await tick(hass, freezer, t2 + timedelta(minutes=1))
    mqtt_mock.async_publish.reset_mock()
    await report(hass, {**away(), "system_mode_heat": "heat", "occupied_heating_setpoint_heat": 21})
    assert "heat" not in holiday.away and "water" in holiday.away
    assert sets(mqtt_mock) == []
    await hass.services.async_call("hive_local", "cancel_holiday", {}, blocking=True)
    assert sets(mqtt_mock)[-1] == SCHEDULE_WATER
    assert holiday.away == {}

    # Ending from the climate preset.
    await report(hass, SCHEDULE)
    await hass.services.async_call("hive_local", "set_holiday", {"until": t2 + timedelta(days=2)}, blocking=True)
    await report(hass, away())
    await hass.services.async_call("climate", "set_preset_mode",
        {"entity_id": "climate.receiver_heating", "preset_mode": "none"}, blocking=True)
    assert holiday.away == {}
    assert await hass.config_entries.async_unload(entry.entry_id)
