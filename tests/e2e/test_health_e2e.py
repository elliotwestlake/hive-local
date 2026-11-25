"""Repairs issues (health.py, #13): raised for common problems, cleared when they go away.

Z2M with mocked MQTT: no state at all (a wrong friendly name), pinging a quiet receiver,
then a silent one. ZHA with the fake radio from test_zha_e2e: ZHA losing the device, then
rebuilding it (as a ZHA reload does) and us moving over to the new cluster; the fix flow;
and a Hive thermostat going quiet. Valves: a low battery and one that stops responding.
"""

from __future__ import annotations

import json
from datetime import timedelta
from types import SimpleNamespace
from unittest.mock import patch

import pytest
import zigpy.device
import zigpy.endpoint
from zigpy.zcl import foundation
from zigpy.zcl.clusters.hvac import Thermostat

from homeassistant.components.repairs import repairs_flow_manager
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import issue_registry as ir
from homeassistant.setup import async_setup_component
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_mqtt_message,
    async_fire_time_changed,
)

from custom_components.hive_local.transports import zha as zha_mod

from test_z2m_e2e import SINGLE, TOPIC, gets, let_mqtt_settle  # noqa: F401
from test_zha_e2e import HEAT_EP, IEEE, NWK, _setup as zha_setup, receiver  # noqa: F401

DOMAIN = "hive_local"
START = "2026-11-25 12:00:00+00:00"


def issues(hass: HomeAssistant) -> dict[str, ir.IssueEntry]:
    return {i.issue_id: i for (d, _), i in ir.async_get(hass).issues.items() if d == DOMAIN}


async def minutes(hass: HomeAssistant, freezer, n: int) -> None:
    for _ in range(n):
        freezer.tick(timedelta(minutes=1))
        async_fire_time_changed(hass)
        await hass.async_block_till_done()


async def z2m_entry(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(domain=DOMAIN, title="Receiver", unique_id=TOPIC, data={
        "transport": "z2m", "device": "Receiver", "base_topic": "zigbee2mqtt", "model": "slr1",
        "z2m_model": "OTR1"})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


@pytest.mark.freeze_time(START)
async def test_z2m_no_state_then_silent(hass: HomeAssistant, mqtt_mock, freezer) -> None:
    entry = await z2m_entry(hass)
    no_state, silent = f"z2m_no_state_{entry.entry_id}", f"receiver_silent_{entry.entry_id}"

    await minutes(hass, freezer, 4)
    assert issues(hass) == {}
    await minutes(hass, freezer, 1)
    issue = issues(hass)[no_state]
    assert issue.translation_placeholders == {"name": "Receiver", "topic": "zigbee2mqtt/Receiver"}
    assert issue.severity == ir.IssueSeverity.ERROR and not issue.is_fixable and not issue.is_persistent

    # The receiver reports: cleared on the next check.
    async_fire_mqtt_message(hass, TOPIC, json.dumps(SINGLE))
    await minutes(hass, freezer, 1)
    assert issues(hass) == {}

    # Quiet for 10 minutes: we ask it for its state, every 10 minutes.
    asked = len(gets(mqtt_mock))
    await minutes(hass, freezer, 10)
    assert len(gets(mqtt_mock)) == asked + 1
    await minutes(hass, freezer, 10)
    assert len(gets(mqtt_mock)) == asked + 2
    assert issues(hass) == {}

    # 30 minutes without an answer.
    await minutes(hass, freezer, 10)
    assert list(issues(hass)) == [silent]

    async_fire_mqtt_message(hass, TOPIC, json.dumps(SINGLE))
    await minutes(hass, freezer, 1)
    assert issues(hass) == {}

    # Unloading clears what's raised.
    await minutes(hass, freezer, 30)
    assert list(issues(hass)) == [silent]
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert issues(hass) == {}


def new_cluster(radio) -> Thermostat:
    """What a ZHA reload leaves us with: a new zigpy device and cluster for the same receiver."""
    old = radio.device
    device = zigpy.device.Device(old._application, IEEE, NWK)
    device.node_desc = old.node_desc
    endpoint = device.add_endpoint(HEAT_EP)
    endpoint.profile_id = 260
    endpoint.status = zigpy.endpoint.Status.ZDO_INIT
    cluster = endpoint.add_input_cluster(Thermostat.cluster_id)
    radio.device, radio.cluster = device, cluster
    return cluster


def report_setpoint(radio, centi: int) -> None:
    radio.attrs["occupied_heating_setpoint"] = centi
    hdr = foundation.ZCLHeader.general(
        tsn=0x51, command_id=foundation.GeneralCommand.Report_Attributes,
        direction=foundation.Direction.Server_to_Client,
    )
    kind = Thermostat.AttributeDefs.occupied_heating_setpoint.type
    type_id = foundation.DataType.from_python_type(kind).type_id
    radio._send(hdr, foundation.GENERAL_COMMANDS[foundation.GeneralCommand.Report_Attributes].schema(
        attribute_reports=[foundation.Attribute(0x0012, foundation.TypeValue(type=type_id, value=kind(centi)))]))


@pytest.mark.freeze_time(START)
async def test_zha_reload_reconnects(hass: HomeAssistant, receiver, freezer) -> None:  # noqa: F811
    entry = await zha_setup(hass)
    transport = entry.runtime_data.transport
    lost = f"zha_device_lost_{entry.entry_id}"
    zha_device = SimpleNamespace(ieee=IEEE, model="OTR1", manufacturer="Computime", device=receiver.device)
    current: dict = {"clusters": {"heat": receiver.cluster}}

    def find_receiver(hass, device_id):
        if current["clusters"] is None:
            raise LookupError("ZHA is reloading")
        return zha_device, current["clusters"]

    with patch.object(zha_mod, "find_receiver", find_receiver):
        # ZHA goes away for a while: said after 5 minutes, and not also "isn't responding".
        current["clusters"] = None
        await minutes(hass, freezer, 4)
        assert issues(hass) == {}
        await minutes(hass, freezer, 31)
        assert list(issues(hass)) == [lost]
        assert issues(hass)[lost].is_fixable

        # ZHA is back with a new device: we move over to it, and the issue clears.
        cluster = new_cluster(receiver)
        current["clusters"] = {"heat": cluster}
        await minutes(hass, freezer, 1)
        for _ in range(20):
            await hass.async_block_till_done()
        assert issues(hass) == {}
        assert transport._clusters["heat"] is cluster

        # Reports from the new cluster reach the entities.
        report_setpoint(receiver, 2150)
        for _ in range(20):
            await hass.async_block_till_done()
        assert hass.states.get("climate.receiver_heating").attributes["temperature"] == 21.5

        # The fix flow reloads the entry.
        current["clusters"] = None
        await minutes(hass, freezer, 6)
        assert list(issues(hass)) == [lost]
        assert await async_setup_component(hass, "repairs", {})
        manager = repairs_flow_manager(hass)
        flow = await manager.async_init(DOMAIN, data={"issue_id": lost})
        assert flow["step_id"] == "confirm"
        current["clusters"] = {"heat": cluster}
        with patch.object(hass.config_entries, "async_reload", return_value=True) as reload:
            flow = await manager.async_configure(flow["flow_id"], {})
        assert flow["type"] == "create_entry"
        reload.assert_called_once_with(entry.entry_id)

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert issues(hass) == {}


@pytest.mark.freeze_time(START)
async def test_thermostat_quiet(hass: HomeAssistant, receiver, freezer) -> None:  # noqa: F811
    entry = await zha_setup(hass)
    watcher = entry.runtime_data.transport.thermostats
    ieee = "00:1e:5e:09:02:00:00:01"
    # As if _ThermostatReporting.start had found one (the fixture has no ZHA gateway).
    watcher._mine.add(ieee)
    watcher.last_report[ieee] = dt_util.utcnow()
    other = MockConfigEntry(domain="other")
    other.add_to_hass(hass)
    dr.async_get(hass).async_get_or_create(
        config_entry_id=other.entry_id, connections={(dr.CONNECTION_ZIGBEE, ieee)}, name="Hallway thermostat")
    quiet = f"thermostat_quiet_{ieee}"

    # Not yet using our reporting (every 15 min from ZHA): allow 35 minutes.
    await minutes(hass, freezer, 34)
    assert quiet not in issues(hass)
    await minutes(hass, freezer, 1)
    assert issues(hass)[quiet].translation_placeholders == {"name": "Hallway thermostat"}

    # It reports and has taken our reporting: cleared, then quiet after 15 minutes.
    watcher._done[ieee] = dt_util.utcnow()
    watcher._on_report(ieee, None, None)
    await minutes(hass, freezer, 1)
    assert quiet not in issues(hass)
    await minutes(hass, freezer, 14)
    assert quiet in issues(hass)

    watcher._mine.discard(ieee)
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert issues(hass) == {}


@pytest.mark.freeze_time(START)
async def test_valves(hass: HomeAssistant, mqtt_mock, freezer) -> None:
    other = MockConfigEntry(domain="valves")
    other.add_to_hass(hass)
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=other.entry_id, identifiers={("valves", "lounge")}, name="Lounge valve",
        model="Radiator valve (UK7004240)")
    registry = er.async_get(hass)
    registry.async_get_or_create("climate", "valves", "lounge", device_id=device.id, suggested_object_id="lounge_valve")
    registry.async_get_or_create("sensor", "valves", "lounge_battery", device_id=device.id,
                                 original_device_class="battery", suggested_object_id="lounge_valve_battery")
    hass.states.async_set("climate.lounge_valve", "heat", {"friendly_name": "Lounge valve", "temperature": 20})
    hass.states.async_set("sensor.lounge_valve_battery", "15")
    entry = await z2m_entry(hass)
    async_fire_mqtt_message(hass, TOPIC, json.dumps(SINGLE))
    battery = "valve_battery_low_climate.lounge_valve"
    gone = "valve_unavailable_climate.lounge_valve"

    await minutes(hass, freezer, 5)
    assert issues(hass)[battery].translation_placeholders == {
        "name": "Lounge valve", "entity_id": "climate.lounge_valve", "battery": "15"}

    # New batteries; then it stops responding for half an hour.
    hass.states.async_set("sensor.lounge_valve_battery", "100")
    hass.states.async_set("climate.lounge_valve", "unavailable", {"friendly_name": "Lounge valve"})
    await minutes(hass, freezer, 5)
    assert battery not in issues(hass) and gone not in issues(hass)
    await minutes(hass, freezer, 30)
    assert gone in issues(hass)
    hass.states.async_set("climate.lounge_valve", "heat", {"friendly_name": "Lounge valve", "temperature": 20})
    await minutes(hass, freezer, 5)
    assert gone not in issues(hass)

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
