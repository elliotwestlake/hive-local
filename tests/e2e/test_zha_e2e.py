"""ZHA end to end: a real zigpy Device and Thermostat cluster, with a fake radio.

The only fake is the application's `request` (the radio). It decodes every ZCL frame
zigpy sends and answers like a Hive OTR1 receiver, through the device's real
`packet_received`, so zigpy's own request matching runs. That's what guards reading the
schedule with `expect_reply=False`: the receiver answers with one response per day, all
with the request's TSN, and with `expect_reply=True` zigpy would take the first as the
request's reply and never show it to the cluster's listeners.
"""

from __future__ import annotations

import asyncio
import contextvars
from collections import defaultdict
from datetime import timedelta
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import pytest
import zigpy.device
import zigpy.listeners
import zigpy.types as t
import zigpy.zdo.types as zdo_t
from zigpy.zcl import foundation
from zigpy.zcl.clusters.hvac import Thermostat

from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_time_changed

from custom_components.hive_local.transports import zha as zha_mod

IEEE = t.EUI64.convert("00:1e:5e:09:02:a3:b4:c5")
NWK = 0x1234
HEAT_EP = 5
DAYS = ("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday")

# What the receiver holds: schedule mode, 20 °C, 19.5 °C in the room, boiler off.
STATE = {
    "system_mode": 0x04,
    "temp_setpoint_hold": 0,
    "temp_setpoint_hold_duration": 0,
    "occupied_heating_setpoint": 2000,
    "local_temperature": 1950,
    "running_state": 0,
}
# A day as the receiver reports it: always 6 transitions, padded with repeats of the last.
DAY = [390, 2000, 540, 1600, 1020, 2100, 1350, 100, 1350, 100, 1350, 100]


class FakeReceiver:
    """The radio: decodes what zigpy sends to the Thermostat cluster and answers it."""

    def __init__(self) -> None:
        self.attrs = dict(STATE)
        self.writes: list[dict[str, int]] = []
        self.schedule_writes: list[dict] = []
        self.schedule_requests: list[dict] = []
        self.device: zigpy.device.Device | None = None
        self.cluster: Thermostat | None = None

    async def request(self, *, device, profile, cluster, src_ep, dst_ep, sequence, data, expect_reply, **kwargs):
        assert cluster == Thermostat.cluster_id and dst_ep == HEAT_EP
        hdr, rest = foundation.ZCLHeader.deserialize(data)
        defs = self.cluster.attributes
        if hdr.frame_control.is_general:
            schema = foundation.GENERAL_COMMANDS[hdr.command_id].schema
            req, _ = schema.deserialize(rest)
            if hdr.command_id == foundation.GeneralCommand.Read_Attributes:
                records = []
                for attrid in req.attribute_ids:
                    attr = defs[attrid]
                    type_id = foundation.DataType.from_python_type(attr.type).type_id
                    records.append(
                        foundation.ReadAttributeRecord(
                            attrid=attrid,
                            status=foundation.Status.SUCCESS,
                            value=foundation.TypeValue(type=type_id, value=attr.type(self.attrs[attr.name])),
                        )
                    )
                self._reply_general(hdr, foundation.GeneralCommand.Read_Attributes_rsp, status_records=records)
            elif hdr.command_id == foundation.GeneralCommand.Write_Attributes:
                written = {defs[a.attrid].name: int(a.value.value) for a in req.attributes}
                self.writes.append(written)
                self.attrs.update(written)
                self._reply_general(
                    hdr,
                    foundation.GeneralCommand.Write_Attributes_rsp,
                    status_records=[foundation.WriteAttributesStatusRecord(status=foundation.Status.SUCCESS)],
                )
            else:
                raise AssertionError(f"unexpected general command {hdr.command_id}")
            return
        command = Thermostat.ServerCommandDefs
        if hdr.command_id == command.get_weekly_schedule.id:
            req, _ = command.get_weekly_schedule.schema.deserialize(rest)
            self.schedule_requests.append(
                {"days": int(req.days_to_return), "mode": int(req.mode_to_return), "expect_reply": expect_reply}
            )
            # One response per day, all with the request's TSN, as Elliot's receiver does.
            for bit, _day in enumerate(DAYS):
                self._reply_cluster(
                    hdr,
                    Thermostat.ClientCommandDefs.get_weekly_schedule_response,
                    num_transitions_for_sequence=6,
                    day_of_week_for_sequence=1 << bit,
                    mode_for_sequence=1,
                    values=DAY,
                )
        elif hdr.command_id == command.set_weekly_schedule.id:
            req, _ = command.set_weekly_schedule.schema.deserialize(rest)
            self.schedule_writes.append(
                {
                    "num_transitions_for_sequence": int(req.num_transitions_for_sequence),
                    "day_of_week_for_sequence": int(req.day_of_week_for_sequence),
                    "mode_for_sequence": int(req.mode_for_sequence),
                    "values": [int(v) for v in req.values],
                    "disable_default_response": hdr.frame_control.disable_default_response,
                }
            )
        else:
            raise AssertionError(f"unexpected cluster command {hdr.command_id}")

    def _send(self, hdr: foundation.ZCLHeader, payload) -> None:
        packet = t.ZigbeePacket(
            src=t.AddrModeAddress(addr_mode=t.AddrMode.NWK, address=NWK),
            src_ep=HEAT_EP,
            dst=t.AddrModeAddress(addr_mode=t.AddrMode.NWK, address=0x0000),
            dst_ep=1,
            tsn=hdr.tsn,
            profile_id=260,
            cluster_id=Thermostat.cluster_id,
            data=t.SerializableBytes(hdr.serialize() + payload.serialize()),
            lqi=255,
            rssi=-40,
        )
        # Arrives after the request has been sent, like a real reply.
        asyncio.get_running_loop().call_soon(self.device.packet_received, packet)

    def _reply_general(self, req: foundation.ZCLHeader, command_id, **fields) -> None:
        hdr = foundation.ZCLHeader.general(
            tsn=req.tsn, command_id=command_id, direction=foundation.Direction.Server_to_Client
        )
        self._send(hdr, foundation.GENERAL_COMMANDS[command_id].schema(**fields))

    def _reply_cluster(self, req: foundation.ZCLHeader, command_def, **fields) -> None:
        hdr = foundation.ZCLHeader.cluster(
            tsn=req.tsn, command_id=command_def.id, direction=foundation.Direction.Server_to_Client
        )
        self._send(hdr, command_def.schema(**fields))


@pytest.fixture
def receiver():
    radio = FakeReceiver()
    app = MagicMock()
    app.request = radio.request
    app._req_listeners = defaultdict(list)
    app._req_listeners[zigpy.listeners.ANY_DEVICE] = []
    app.get_sequence = MagicMock(side_effect=iter(range(1, 255)))
    app._packet_priority_var = contextvars.ContextVar("priority", default=t.PacketPriority.NORMAL)
    device = zigpy.device.Device(app, IEEE, NWK)
    device.node_desc = zdo_t.NodeDescriptor(
        logical_type=zdo_t.LogicalType.Router, mac_capability_flags=0x8E, manufacturer_code=0x1039
    )
    endpoint = device.add_endpoint(HEAT_EP)
    endpoint.profile_id = 260
    endpoint.status = zigpy.endpoint.Status.ZDO_INIT
    cluster = endpoint.add_input_cluster(Thermostat.cluster_id)
    radio.device, radio.cluster = device, cluster
    zha_device = SimpleNamespace(ieee=IEEE, model="OTR1", manufacturer="Computime", device=device)

    def find_receiver(hass, device_id):
        if device_id != "zha-receiver":
            raise LookupError(device_id)
        return zha_device, {"heat": cluster}

    with (
        patch.object(zha_mod, "find_receiver", find_receiver),
        # No ZHA gateway, so no Hive thermostats to look after (test_thermostat_reporting_e2e).
        patch.object(zha_mod, "get_zha_gateway", side_effect=ValueError),
    ):
        yield radio


async def _setup(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(
        domain="hive_local",
        title="Receiver",
        unique_id=f"zha:{IEEE}",
        data={"transport": "zha", "device_id": "zha-receiver", "model": "slr1", "z2m_model": "OTR1"},
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    # The first read runs in the background (setup doesn't wait for the radio).
    for _ in range(50):
        await hass.async_block_till_done()
        if entry.runtime_data.transport.status("heat"):
            break
        await asyncio.sleep(0)  # a loop turn, not time: some tests freeze the clock
    return entry


async def test_config_flow(hass: HomeAssistant, receiver) -> None:
    result = await hass.config_entries.flow.async_init("hive_local", context={"source": "user"})
    assert result["type"] == "menu" and result["menu_options"] == ["z2m", "zha"]

    # ZHA isn't set up: nothing to pick from.
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "zha"})
    assert result["type"] == "abort" and result["reason"] == "no_zha"

    hass.config.components.add("zha")
    result = await hass.config_entries.flow.async_init("hive_local", context={"source": "user"})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "zha"})
    assert result["type"] == "form" and result["step_id"] == "zha"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"device_id": "something-else"})
    assert result["errors"] == {"base": "not_hive"}

    with patch("custom_components.hive_local.async_setup_entry", return_value=True):
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"device_id": "zha-receiver"})
    assert result["type"] == "create_entry"
    assert result["title"] == "OTR1"
    assert result["result"].unique_id == f"zha:{IEEE}"
    assert result["data"] == {"transport": "zha", "device_id": "zha-receiver", "model": "slr1", "z2m_model": "OTR1"}

    # The same receiver again.
    result = await hass.config_entries.flow.async_init("hive_local", context={"source": "user"})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "zha"})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"device_id": "zha-receiver"})
    assert result["type"] == "abort" and result["reason"] == "already_configured"


async def test_state_modes_and_boost(hass: HomeAssistant, receiver) -> None:
    entry = await _setup(hass)

    # The initial read fills in the entities. Heating only (an OTR1), so no water heater.
    climate = hass.states.get("climate.receiver_heating")
    assert climate.state == "auto"
    assert climate.attributes["current_temperature"] == 19.5
    assert climate.attributes["temperature"] == 20
    assert hass.states.async_all("water_heater") == []

    # Boost: one Write Attributes, in the same order as the Z2M payload.
    await hass.services.async_call(
        "hive_local", "boost_heating", {"minutes": 45, "temperature": 22.5}, blocking=True
    )
    assert receiver.writes[-1] == {
        "system_mode": 0x05,
        "temp_setpoint_hold_duration": 45,
        "temp_setpoint_hold": 1,
        "occupied_heating_setpoint": 2250,
    }
    assert list(receiver.writes[-1]) == [
        "system_mode",
        "temp_setpoint_hold_duration",
        "temp_setpoint_hold",
        "occupied_heating_setpoint",
    ]
    await hass.async_block_till_done()
    assert hass.states.get("climate.receiver_heating").attributes["preset_mode"] == "boost"
    assert hass.states.get("sensor.receiver_heating_boost_remaining").state == "45"

    # Cancel: back to the schedule it was on.
    await hass.services.async_call("hive_local", "cancel_boost_heating", {}, blocking=True)
    assert receiver.writes[-1] == {"system_mode": 0x04, "temp_setpoint_hold": 0}

    # Manual at 21 °C, then off.
    await hass.services.async_call(
        "climate", "set_hvac_mode", {"entity_id": "climate.receiver_heating", "hvac_mode": "heat"}, blocking=True
    )
    assert receiver.writes[-1]["system_mode"] == 0x04 and receiver.writes[-1]["temp_setpoint_hold"] == 1
    await hass.services.async_call(
        "climate", "set_hvac_mode", {"entity_id": "climate.receiver_heating", "hvac_mode": "off"}, blocking=True
    )
    assert receiver.writes[-1] == {"system_mode": 0x00, "temp_setpoint_hold": 0}

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_report_rereads_hold(hass: HomeAssistant, receiver, freezer) -> None:
    """ZHA doesn't configure reporting for the hold attributes, so a reported mode
    change makes us read them."""
    entry = await _setup(hass)
    cluster = receiver.cluster
    # Someone boosts on the thermostat: the receiver reports system_mode, not the hold.
    receiver.attrs.update(system_mode=0x05, temp_setpoint_hold=1, temp_setpoint_hold_duration=30)
    hdr = foundation.ZCLHeader.general(
        tsn=0x50, command_id=foundation.GeneralCommand.Report_Attributes, direction=foundation.Direction.Server_to_Client
    )
    enum8 = foundation.DataType.from_python_type(Thermostat.AttributeDefs.system_mode.type).type_id
    receiver._send(
        hdr,
        foundation.GENERAL_COMMANDS[foundation.GeneralCommand.Report_Attributes].schema(
            attribute_reports=[
                foundation.Attribute(0x001C, foundation.TypeValue(type=enum8, value=Thermostat.SystemMode.Emergency_Heating))
            ]
        ),
    )
    await hass.async_block_till_done()
    assert cluster.get("system_mode") == Thermostat.SystemMode.Emergency_Heating
    # The hold attributes are re-read a few seconds later.
    freezer.tick(timedelta(seconds=5))
    async_fire_time_changed(hass)
    # The read runs as a background task; give its reply a few loop turns to arrive.
    for _ in range(20):
        await hass.async_block_till_done()
        if cluster.get("temp_setpoint_hold_duration") == 30:
            break
    assert cluster.get("temp_setpoint_hold_duration") == 30
    assert hass.states.get("sensor.receiver_heating_boost_remaining").state == "30"
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_read_and_write_schedule(hass: HomeAssistant, receiver, hass_ws_client) -> None:
    entry = await _setup(hass)
    client = await hass_ws_client(hass)

    await client.send_json({"id": 1, "type": "hive_local/get", "entry_id": entry.entry_id, "channel": "heat"})
    msg = await client.receive_json()
    assert msg["success"], msg
    # Sent without waiting for a reply, so every day's response reaches our listener.
    assert receiver.schedule_requests == [{"days": 0x7F, "mode": 1, "expect_reply": False}]
    assert msg["result"]["complete"] is True
    day = [
        {"time": "06:30", "setpoint": 20.0},
        {"time": "09:00", "setpoint": 16.0},
        {"time": "17:00", "setpoint": 21.0},
        {"time": "22:30", "setpoint": 1.0},
    ]
    assert msg["result"]["schedule"] == {d: day for d in ("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday")}

    # Write two days: one command per day, padded to 6 transitions with repeats of the
    # last (what the receiver reads back), without a default response.
    new = [{"time": "07:00", "setpoint": 19.5}, {"time": "23:00", "setpoint": 1.0}]
    with patch("asyncio.sleep"):
        await client.send_json(
            {
                "id": 2,
                "type": "hive_local/set",
                "entry_id": entry.entry_id,
                "channel": "heat",
                "schedule": {"monday": new, "saturday": new},
            }
        )
        msg = await client.receive_json()
    assert msg["success"], msg
    assert msg["result"]["commands"] == 2
    values = [420, 1950] + [1380, 100] * 5
    assert receiver.schedule_writes == [
        {"num_transitions_for_sequence": 6, "day_of_week_for_sequence": 0x02, "mode_for_sequence": 1, "values": values, "disable_default_response": True},
        {"num_transitions_for_sequence": 6, "day_of_week_for_sequence": 0x40, "mode_for_sequence": 1, "values": values, "disable_default_response": True},
    ]
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()


async def test_not_ready_without_zha(hass: HomeAssistant, receiver) -> None:
    entry = MockConfigEntry(
        domain="hive_local",
        title="Gone",
        data={"transport": "zha", "device_id": "missing", "model": "slr1", "z2m_model": "OTR1"},
    )
    entry.add_to_hass(hass)
    assert not await hass.config_entries.async_setup(entry.entry_id)
    assert entry.state.name == "SETUP_RETRY"
