"""Scratch e2e for issue #1: _ThermostatReporting against a real zigpy Cluster.

The only fake is the radio (endpoint.request): it decodes each ZCL frame the cluster
sends and answers like a Hive SLT6b. Temperature reports go in through the cluster's
real handle_message, so zigpy emits its own AttributeReportedEvent.
"""

from __future__ import annotations

import logging
from datetime import timedelta
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import pytest
import zigpy.types as t
from freezegun.api import FrozenDateTimeFactory
from zigpy.zcl import foundation
from zigpy.zcl.clusters.measurement import TemperatureMeasurement

from homeassistant.core import HomeAssistant

from custom_components.hive_local.transports import zha as zha_mod

IEEE = t.EUI64.convert("00:0d:6f:00:11:22:33:44")
CONFIGURE = foundation.GeneralCommand.Configure_Reporting
REPORT = foundation.GeneralCommand.Report_Attributes
# zigpy 2.x: DataTypeId.int16; zigpy 0.x: DataType.from_python_type(int16s).type_id
INT16 = getattr(foundation, "DataTypeId", None) and foundation.DataTypeId.int16 or foundation.DataType.from_python_type(t.int16s).type_id


class FakeRadio:
    """Decodes Configure Reporting frames and answers from a queue of replies."""

    def __init__(self) -> None:
        self.sent: list[foundation.AttributeReportingConfig] = []
        self.replies: list = []  # "ok", a Status, or an exception

    async def request(self, *, cluster, sequence, data, command_id, **kwargs):
        hdr, rest = foundation.ZCLHeader.deserialize(data)
        assert cluster == 0x0402 and hdr.command_id == CONFIGURE
        schema = foundation.GENERAL_COMMANDS[CONFIGURE].schema
        req, _ = schema.deserialize(rest)
        self.sent.extend(req.config_records)
        reply = self.replies.pop(0) if self.replies else "ok"
        if isinstance(reply, Exception):
            raise reply
        rsp_schema = foundation.GENERAL_COMMANDS[
            foundation.GeneralCommand.Configure_Reporting_rsp
        ].schema
        if reply == "ok":
            # What a device sends when everything succeeded: one record, no attrid.
            records = [foundation.ConfigureReportingResponseRecord(status=foundation.Status.SUCCESS)]
        else:
            records = [
                foundation.ConfigureReportingResponseRecord(
                    status=reply, direction=foundation.ReportingDirection.SendReports, attrid=0x0000
                )
            ]
        return rsp_schema(status_records=records)


@pytest.fixture
def thermostat():
    radio = FakeRadio()
    endpoint = MagicMock()
    endpoint.endpoint_id = 9
    endpoint.device.ieee = IEEE
    endpoint.request = radio.request
    cluster = TemperatureMeasurement(endpoint)
    device = SimpleNamespace(
        ieee=IEEE,
        manufacturer="Computime",
        model="SLT6b",
        device=SimpleNamespace(
            endpoints={0: SimpleNamespace(in_clusters={}), 9: SimpleNamespace(in_clusters={0x0402: cluster})}
        ),
    )
    gateway = SimpleNamespace(devices={IEEE: device})
    with patch.object(zha_mod, "get_zha_gateway", return_value=gateway):
        yield cluster, radio


def report(cluster, centi: int) -> None:
    hdr = foundation.ZCLHeader.general(
        tsn=1, command_id=REPORT, direction=foundation.Direction.Server_to_Client
    )
    attr = foundation.Attribute(
        0x0000, foundation.TypeValue(type=INT16, value=t.int16s(centi))
    )
    schema = foundation.GENERAL_COMMANDS[REPORT].schema
    cluster.handle_message(hdr, schema(attribute_reports=[attr]))


def errors(caplog) -> list[logging.LogRecord]:
    return [r for r in caplog.records if r.levelno >= logging.ERROR]


async def test_accepted_once_then_refreshed_daily(
    hass: HomeAssistant, thermostat, caplog, freezer: FrozenDateTimeFactory
) -> None:
    cluster, radio = thermostat
    caplog.set_level(logging.DEBUG, logger="custom_components.hive_local")
    watcher = zha_mod._ThermostatReporting(hass)
    watcher.start()
    await hass.async_block_till_done()

    assert len(radio.sent) == 1
    cfg = radio.sent[0]
    assert (cfg.attrid, cfg.min_interval, cfg.max_interval, cfg.reportable_change) == (0, 5, 120, 50)
    assert "now reports temperature at least every 120 s" in caplog.text
    assert not errors(caplog)

    # The bug: every report re-sent configure_reporting. Now it mustn't.
    for centi in (2050, 2051, 2049):
        freezer.tick(timedelta(seconds=120))
        report(cluster, centi)
        await hass.async_block_till_done()
    assert len(radio.sent) == 1
    assert cluster.get("measured_value") == 2049  # the reports really went through zigpy

    # A day later it's applied again, without logging the confirmation twice.
    freezer.tick(zha_mod.THERMOSTAT_REPORTING_REFRESH)
    report(cluster, 2052)
    await hass.async_block_till_done()
    assert len(radio.sent) == 2
    assert caplog.text.count("now reports temperature") == 1
    assert not errors(caplog)
    watcher.stop()


async def test_asleep_then_retried(hass: HomeAssistant, thermostat, caplog) -> None:
    cluster, radio = thermostat
    caplog.set_level(logging.DEBUG, logger="custom_components.hive_local")
    radio.replies = [TimeoutError()]
    watcher = zha_mod._ThermostatReporting(hass)
    watcher.start()
    await hass.async_block_till_done()
    assert len(radio.sent) == 1
    assert "asleep, will retry" in caplog.text
    assert "now reports temperature" not in caplog.text

    report(cluster, 2050)
    await hass.async_block_till_done()
    assert len(radio.sent) == 2
    assert "now reports temperature" in caplog.text
    assert not errors(caplog)
    watcher.stop()


async def test_refused_warns_and_retries(hass: HomeAssistant, thermostat, caplog) -> None:
    cluster, radio = thermostat
    radio.replies = [foundation.Status.UNREPORTABLE_ATTRIBUTE]
    watcher = zha_mod._ThermostatReporting(hass)
    watcher.start()
    await hass.async_block_till_done()
    assert "refused the reporting change" in caplog.text
    assert "UNREPORTABLE_ATTRIBUTE" in caplog.text
    assert not errors(caplog)

    report(cluster, 2050)
    await hass.async_block_till_done()
    assert len(radio.sent) == 2
    assert "now reports temperature" in caplog.text
    watcher.stop()
