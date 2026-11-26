"""Schedules on the Hive radiator valves (#5) end to end.

ZHA: a real zigpy Device with Thermostat and Time clusters on endpoint 1 and a fake radio
that decodes every ZCL frame and answers like a Danfoss Ally (Hive UK7004240): one
get_weekly_schedule_response per day (all with the request's TSN), a default response
to each set_weekly_schedule, and a clock that's an hour behind in summer (what ZHA's
Danfoss quirk leaves it at, without DST). Zigbee2MQTT: mocked MQTT, the valve found by
its IEEE address in bridge/devices, and its `schedule_<day>` keys.
"""

from __future__ import annotations

import asyncio
import contextvars
import json
from collections import defaultdict
from datetime import UTC, datetime, timedelta
from unittest.mock import MagicMock, patch

import pytest
import zigpy.device
import zigpy.endpoint
import zigpy.listeners
import zigpy.types as t
import zigpy.zdo.types as zdo_t
from zigpy.zcl import foundation
from zigpy.zcl.clusters.general import Time
from zigpy.zcl.clusters.hvac import Thermostat

from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.setup import async_setup_component
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_mqtt_message, async_fire_time_changed

from custom_components.hive_local.transports import zha_valve
from custom_components.hive_local.trv import time_attributes, zcl_time

IEEE = t.EUI64.convert("00:15:8d:00:01:23:45:67")
NWK = 0x4321
EP = 1
NOW = "2026-07-01 11:00:00+00:00"  # summer: London is on BST (UTC+1)
ZCL_DAYS = ("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday")
WEEK = ("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday")
# A day as the valve reports it: 6 transitions, padded with repeats of the last.
DAY = [360, 2100, 510, 1700, 990, 2100, 1320, 1700, 1320, 1700, 1320, 1700]
DAY_READ = [
    {"time": "06:00", "setpoint": 21.0},
    {"time": "08:30", "setpoint": 17.0},
    {"time": "16:30", "setpoint": 21.0},
    {"time": "22:00", "setpoint": 17.0},
]
# The writes' pacing is patched out (asyncio.sleep); the test's own waits need the real one.
real_sleep = asyncio.sleep
VALVE = "climate.lounge_valve"
Z2M_VALVE = "climate.lounge_window_valve"
Z2M_TOPIC = "zigbee2mqtt/Lounge window valve"


class FakeValve:
    """The radio, answering for a Danfoss Ally on endpoint 1."""

    def __init__(self) -> None:
        now = dt_util.utcnow()  # NOW where the clock is frozen
        # Its clock: UTC with no time zone or DST, so an hour behind London in summer.
        self.time_attrs = {
            "time": zcl_time(now), "time_status": 0x02, "time_zone": 0,
            "dst_start": 0xFFFFFFFF, "dst_end": 0xFFFFFFFF, "dst_shift": 0,
        }
        self.thermostat_attrs = {"programing_oper_mode": 0}
        self.refuse_time = False
        self.time_writes: list[dict[str, int]] = []
        self.thermostat_writes: list[dict[str, int]] = []
        self.schedule_requests: list[dict] = []
        self.schedule_writes: list[dict] = []
        self.device: zigpy.device.Device | None = None
        self.clusters: dict[int, object] = {}

    async def request(self, *, device, profile, cluster, src_ep, dst_ep, sequence, data, expect_reply, **kwargs):
        assert dst_ep == EP and cluster in (Thermostat.cluster_id, Time.cluster_id)
        hdr, rest = foundation.ZCLHeader.deserialize(data)
        if hdr.frame_control.is_general:
            self._general(cluster, hdr, rest)
            return
        assert cluster == Thermostat.cluster_id
        command = Thermostat.ServerCommandDefs
        if hdr.command_id == command.get_weekly_schedule.id:
            req, _ = command.get_weekly_schedule.schema.deserialize(rest)
            self.schedule_requests.append({"days": int(req.days_to_return), "expect_reply": expect_reply})
            for bit, _day in enumerate(ZCL_DAYS):
                self._reply_cluster(
                    hdr, Thermostat.ClientCommandDefs.get_weekly_schedule_response,
                    num_transitions_for_sequence=6, day_of_week_for_sequence=1 << bit, mode_for_sequence=1, values=DAY,
                )
        elif hdr.command_id == command.set_weekly_schedule.id:
            req, _ = command.set_weekly_schedule.schema.deserialize(rest)
            self.schedule_writes.append({
                "num_transitions_for_sequence": int(req.num_transitions_for_sequence),
                "day_of_week_for_sequence": int(req.day_of_week_for_sequence),
                "mode_for_sequence": int(req.mode_for_sequence),
                "values": [int(v) for v in req.values],
                "disable_default_response": hdr.frame_control.disable_default_response,
            })
            self._reply_general(cluster, hdr, foundation.GeneralCommand.Default_Response,
                                command_id=hdr.command_id, status=foundation.Status.SUCCESS)
        else:
            raise AssertionError(f"unexpected cluster command {hdr.command_id}")

    def _general(self, cluster_id: int, hdr, rest) -> None:
        defs = self.clusters[cluster_id].attributes
        attrs = self.time_attrs if cluster_id == Time.cluster_id else self.thermostat_attrs
        schema = foundation.GENERAL_COMMANDS[hdr.command_id].schema
        req, _ = schema.deserialize(rest)
        if hdr.command_id == foundation.GeneralCommand.Read_Attributes:
            records = []
            for attrid in req.attribute_ids:
                attr = defs[attrid]
                if attr.name not in attrs:  # e.g. local_time
                    records.append(foundation.ReadAttributeRecord(attrid=attrid, status=foundation.Status.UNSUPPORTED_ATTRIBUTE))
                    continue
                type_id = foundation.DataType.from_python_type(attr.type).type_id
                records.append(foundation.ReadAttributeRecord(
                    attrid=attrid, status=foundation.Status.SUCCESS,
                    value=foundation.TypeValue(type=type_id, value=attr.type(attrs[attr.name])),
                ))
            self._reply_general(cluster_id, hdr, foundation.GeneralCommand.Read_Attributes_rsp, status_records=records)
        elif hdr.command_id == foundation.GeneralCommand.Write_Attributes:
            written = {defs[a.attrid].name: int(a.value.value) for a in req.attributes}
            refused = cluster_id == Time.cluster_id and self.refuse_time
            (self.time_writes if cluster_id == Time.cluster_id else self.thermostat_writes).append(written)
            if not refused:
                attrs.update(written)
            status = foundation.Status.READ_ONLY if refused else foundation.Status.SUCCESS
            self._reply_general(cluster_id, hdr, foundation.GeneralCommand.Write_Attributes_rsp,
                                status_records=[foundation.WriteAttributesStatusRecord(status=status, attrid=0)])
        else:
            raise AssertionError(f"unexpected general command {hdr.command_id}")

    def _send(self, cluster_id: int, hdr: foundation.ZCLHeader, payload) -> None:
        packet = t.ZigbeePacket(
            src=t.AddrModeAddress(addr_mode=t.AddrMode.NWK, address=NWK), src_ep=EP,
            dst=t.AddrModeAddress(addr_mode=t.AddrMode.NWK, address=0x0000), dst_ep=1,
            tsn=hdr.tsn, profile_id=260, cluster_id=cluster_id,
            data=t.SerializableBytes(hdr.serialize() + payload.serialize()), lqi=255, rssi=-40,
        )
        asyncio.get_running_loop().call_soon(self.device.packet_received, packet)

    def _reply_general(self, cluster_id: int, req, general_id, **fields) -> None:
        hdr = foundation.ZCLHeader.general(tsn=req.tsn, command_id=general_id, direction=foundation.Direction.Server_to_Client)
        self._send(cluster_id, hdr, foundation.GENERAL_COMMANDS[general_id].schema(**fields))

    def _reply_cluster(self, req, command_def, **fields) -> None:
        hdr = foundation.ZCLHeader.cluster(tsn=req.tsn, command_id=command_def.id, direction=foundation.Direction.Server_to_Client)
        self._send(Thermostat.cluster_id, hdr, command_def.schema(**fields))


@pytest.fixture
def valve():
    radio = FakeValve()
    app = MagicMock()
    app.request = radio.request
    app._req_listeners = defaultdict(list)
    app._req_listeners[zigpy.listeners.ANY_DEVICE] = []
    app.get_sequence = MagicMock(side_effect=iter(range(1, 255)))
    app._packet_priority_var = contextvars.ContextVar("priority", default=t.PacketPriority.NORMAL)
    device = zigpy.device.Device(app, IEEE, NWK)
    # A sleepy end device, like the valve.
    device.node_desc = zdo_t.NodeDescriptor(
        logical_type=zdo_t.LogicalType.EndDevice, mac_capability_flags=0x80, manufacturer_code=0x1246
    )
    endpoint = device.add_endpoint(EP)
    endpoint.profile_id = 260
    endpoint.status = zigpy.endpoint.Status.ZDO_INIT
    thermostat = endpoint.add_input_cluster(Thermostat.cluster_id)
    time_cluster = endpoint.add_input_cluster(Time.cluster_id)
    radio.device = device
    radio.clusters = {Thermostat.cluster_id: thermostat, Time.cluster_id: time_cluster}
    radio.device_id = None

    def find_valve(hass, device_id):
        if device_id != radio.device_id:
            raise LookupError(device_id)
        return thermostat, time_cluster

    with patch.object(zha_valve, "find_valve", find_valve):
        yield radio


@pytest.fixture
async def let_mqtt_settle(hass: HomeAssistant):
    """Let MQTT's once-a-second housekeeping run at the end, so it stops (see test_z2m_e2e)."""
    yield
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=2))
    await hass.async_block_till_done()


def add_valve(hass: HomeAssistant, entry: MockConfigEntry, object_id: str, identifiers: set, model: str) -> str:
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=entry.entry_id, identifiers=identifiers, manufacturer="Danfoss", model=model,
        name=object_id.replace("_", " ").capitalize(),
    )
    climate = er.async_get(hass).async_get_or_create(
        "climate", entry.domain, f"{object_id}-climate", device_id=device.id, suggested_object_id=object_id,
        config_entry=entry,
    )
    hass.states.async_set(climate.entity_id, "heat", {"friendly_name": object_id.replace("_", " ").capitalize(),
                                                      "current_temperature": 19, "temperature": 20})
    return climate.entity_id


async def _setup(hass: HomeAssistant, hass_storage, valve: FakeValve | None, *, z2m: bool = False) -> list[str]:
    await hass.config.async_set_time_zone("Europe/London")
    # Not the zha/mqtt domains: hive_local would wait for them (after_dependencies).
    other = MockConfigEntry(domain="zigbee_a", title="Zigbee")
    other.add_to_hass(hass)
    valves = []
    if valve is not None:
        valves.append(add_valve(hass, other, "lounge_valve", {("zha", str(IEEE))}, "TRV001"))
        valve.device_id = er.async_get(hass).async_get(valves[-1]).device_id
    if z2m:
        valves.append(add_valve(hass, other, "lounge_window_valve", {("mqtt", "zigbee2mqtt_0x00158d00aabbccdd")}, "UK7004240"))
    hass_storage["hive_local.rooms"] = {"version": 1, "key": "hive_local.rooms", "data": {"rooms": [
        {"id": "lounge", "name": "Lounge", "valves": valves, "sensor": None, "receiver": "receiver"}]}}
    assert await async_setup_component(hass, "hive_local", {})
    await hass.async_block_till_done()
    return valves


@pytest.mark.freeze_time(NOW)
async def test_zha_valve_read_and_write(hass: HomeAssistant, hass_storage, hass_ws_client, valve) -> None:
    await _setup(hass, hass_storage, valve)
    client = await hass_ws_client(hass)

    await client.send_json({"id": 1, "type": "hive_local/rooms/schedule/get", "room_id": "lounge"})
    msg = await client.receive_json()
    assert msg["success"], msg
    result = msg["result"]
    # Sent without waiting for a reply, so every day's response reaches the listener.
    assert valve.schedule_requests == [{"days": 0x7F, "expect_reply": False}]
    assert result["complete"] is True and result["differs"] == []
    assert result["schedule"] == {day: DAY_READ for day in WEEK}
    # "Off" on the valves is the heating's frost protection (12° by default): they can't switch off.
    assert result["limits"] == {"max_transitions": 6, "heat_min": 5.0, "heat_max": 32.0, "frost": 12.0}
    [info] = result["valves"]
    assert info["entity_id"] == VALVE and info["transport"] == "zha" and info["days"] == 7
    # Its clock is an hour behind (no DST), and reading doesn't change it.
    assert info["clock"] == {"offset": -3600, "ok": False, "set": False}
    assert valve.time_writes == []
    assert info["schedule_mode"] is False

    # A schedule the valve can't hold is refused before anything is sent.
    await client.send_json({"id": 2, "type": "hive_local/rooms/schedule/set", "room_id": "lounge",
                            "schedule": {"monday": [{"time": "07:00", "setpoint": 3}]}})
    msg = await client.receive_json()
    assert not msg["success"] and msg["error"]["code"] == "invalid"
    assert valve.schedule_writes == [] and valve.time_writes == []

    # Write two days: the clock first, then one command per day, padded to 6, each
    # waiting for the valve's default response.
    new = [{"time": "07:00", "setpoint": 20.5}, {"time": "22:30", "setpoint": 5}]
    with patch("asyncio.sleep"):
        await client.send_json({"id": 3, "type": "hive_local/rooms/schedule/set", "room_id": "lounge",
                                "schedule": {"saturday": new, "monday": new}})
        msg = await client.receive_json()
    assert msg["success"], msg
    expected_time = time_attributes(dt_util.utcnow(), dt_util.get_default_time_zone())
    assert valve.time_writes == [expected_time]
    assert expected_time["time_zone"] == 0 and expected_time["dst_shift"] == 3600
    assert expected_time["dst_start"] == zcl_time(datetime(2026, 3, 29, 1, tzinfo=UTC))
    # Only the day's own transitions, as Zigbee2MQTT sends them to the Ally (no padding to 6:
    # repeated times may be refused).
    values = [420, 2050, 1350, 500]
    assert valve.schedule_writes == [
        {"num_transitions_for_sequence": 2, "day_of_week_for_sequence": 0x02, "mode_for_sequence": 1, "values": values, "disable_default_response": False},
        {"num_transitions_for_sequence": 2, "day_of_week_for_sequence": 0x40, "mode_for_sequence": 1, "values": values, "disable_default_response": False},
    ]
    result = msg["result"]
    assert result["commands"] == 2 and result["failed"] == []
    assert result["schedule"] == {"monday": [{"time": "07:00", "setpoint": 20.5}, {"time": "22:30", "setpoint": 5.0}],
                                  "saturday": [{"time": "07:00", "setpoint": 20.5}, {"time": "22:30", "setpoint": 5.0}]}
    assert result["valves"][0]["clock"] == {"offset": 0, "ok": True, "set": True, "was": -3600}

    # The clock's right now: a second write leaves it alone.
    with patch("asyncio.sleep"):
        await client.send_json({"id": 4, "type": "hive_local/rooms/schedule/set", "room_id": "lounge",
                                "schedule": {"sunday": new}})
        msg = await client.receive_json()
    assert msg["success"] and len(valve.time_writes) == 1 and len(valve.schedule_writes) == 3
    assert msg["result"]["valves"][0]["clock"] == {"offset": 0, "ok": True, "set": False}

    # The room on Schedule: the valves follow their schedule.
    await client.send_json({"id": 5, "type": "hive_local/rooms/mode", "room_id": "lounge", "mode": "schedule"})
    msg = await client.receive_json()
    assert msg["success"] and msg["result"] == {"failed": []}
    assert valve.thermostat_writes == [{"programing_oper_mode": 1}]

    # An unknown room.
    await client.send_json({"id": 6, "type": "hive_local/rooms/schedule/get", "room_id": "nope"})
    msg = await client.receive_json()
    assert not msg["success"] and msg["error"]["code"] == "invalid"


@pytest.mark.freeze_time(NOW)
async def test_zha_valve_clock_refused(hass: HomeAssistant, hass_storage, hass_ws_client, valve) -> None:
    """A valve whose clock can't be set isn't written: it would run at the wrong times."""
    await _setup(hass, hass_storage, valve)
    valve.refuse_time = True
    client = await hass_ws_client(hass)
    with patch("asyncio.sleep"):
        await client.send_json({"id": 1, "type": "hive_local/rooms/schedule/set", "room_id": "lounge",
                                "schedule": {"monday": [{"time": "07:00", "setpoint": 20}]}})
        msg = await client.receive_json()
    assert not msg["success"]
    assert "clock" in msg["error"]["message"]
    assert len(valve.time_writes) == 1 and valve.schedule_writes == []


# Not frozen: mocked MQTT subscribes after a cooldown timer. Valve clock right (UTC = winter London).
@pytest.mark.freeze_time("2026-11-25 12:00:00+00:00", tick=True)
async def test_room_with_zha_and_z2m_valves(hass: HomeAssistant, hass_storage, hass_ws_client, valve, mqtt_mock, let_mqtt_settle) -> None:
    await _setup(hass, hass_storage, valve, z2m=True)
    client = await hass_ws_client(hass)
    bridge = [{"friendly_name": "Coordinator", "ieee_address": "0x00124b0000000000"},
              {"friendly_name": "Lounge window valve", "ieee_address": "0x00158d00aabbccdd"}]
    # This valve has a different Monday.
    z2m_state = {f"schedule_{day}": "06:00/21 08:30/17 16:30/21 22:00/17 22:00/17 22:00/17" for day in WEEK} | {
        "schedule_monday": "07:00/19", "programming_operation_mode": "schedule", "local_temperature": 19}

    async def answer(msg_id: int, payload: dict) -> dict:
        """Send a command, answering for Z2M (mocked MQTT only reaches current subscribers)."""
        await client.send_json({"id": msg_id, **payload})
        task = asyncio.ensure_future(client.receive_json())
        for _ in range(3000):
            if task.done():
                break
            async_fire_mqtt_message(hass, "zigbee2mqtt/bridge/devices", json.dumps(bridge), retain=True)
            if any(c.args[0] == f"{Z2M_TOPIC}/get" for c in mqtt_mock.async_publish.call_args_list):
                async_fire_mqtt_message(hass, Z2M_TOPIC, json.dumps(z2m_state))
            await real_sleep(0.01)
        return await task

    msg = await answer(1, {"type": "hive_local/rooms/schedule/get", "room_id": "lounge"})
    assert msg["success"], msg
    result = msg["result"]
    gets = [json.loads(c.args[1]) for c in mqtt_mock.async_publish.call_args_list if c.args[0] == f"{Z2M_TOPIC}/get"]
    assert gets[0] == {f"schedule_{day}": "" for day in WEEK} | {"programming_operation_mode": ""}
    # The first valve's schedule, and the day they disagree on.
    assert result["schedule"] == {day: DAY_READ for day in WEEK}
    assert result["differs"] == ["monday"]
    zha_info, z2m_info = result["valves"]
    assert z2m_info["transport"] == "z2m" and z2m_info["days"] == 7 and z2m_info["schedule_mode"] is True
    assert z2m_info["clock"] == {"offset": None, "ok": True, "set": False, "managed": "z2m"}
    assert zha_info["clock"]["ok"] is True

    new = [{"time": "07:00", "setpoint": 20.5}, {"time": "22:30", "setpoint": 5}]
    with patch("asyncio.sleep"):
        msg = await answer(2, {"type": "hive_local/rooms/schedule/set", "room_id": "lounge",
                               "schedule": {"tuesday": new}})
    assert msg["success"], msg
    sets = [json.loads(c.args[1]) for c in mqtt_mock.async_publish.call_args_list if c.args[0] == f"{Z2M_TOPIC}/set"]
    assert sets == [{"schedule_tuesday": "07:00/20.5 22:30/5"}]
    assert [w["day_of_week_for_sequence"] for w in valve.schedule_writes] == [0x04]
    assert msg["result"]["commands"] == 2 and msg["result"]["failed"] == []


async def test_requests_to_a_sleeping_valve_are_tried_again():
    """A valve that's asleep misses the request (a delivery failure); keep trying until it wakes."""
    from zigpy.exceptions import DeliveryError

    from custom_components.hive_local.transports.zha import send_when_awake

    calls = []

    async def request(*args, **kwargs):
        calls.append((args, kwargs))
        if len(calls) < 3:
            raise DeliveryError("Failed to deliver message: <sl_Status.FAIL: 1>")
        return "answered"

    with patch("custom_components.hive_local.transports.zha.asyncio.sleep") as sleep:
        assert await send_when_awake(request, 1, wake_wait=60, label="Valve", expect_reply=False) == "answered"
    assert len(calls) == 3 and calls[0] == ((1,), {"expect_reply": False}) and sleep.await_count == 2

    calls.clear()
    with pytest.raises(DeliveryError):
        await send_when_awake(request, wake_wait=0)  # without a wait: the first failure stands
    assert len(calls) == 1
