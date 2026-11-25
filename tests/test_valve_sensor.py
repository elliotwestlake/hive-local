import importlib.util, pathlib, sys
from datetime import datetime, timedelta, timezone

import pytest

spec = importlib.util.spec_from_file_location(
    "hive_valve_sensor", pathlib.Path(__file__).parents[1] / "custom_components/hive_local/valve_sensor.py")
vs = importlib.util.module_from_spec(spec); sys.modules["hive_valve_sensor"] = vs; spec.loader.exec_module(vs)

T0 = datetime(2026, 11, 25, 12, 0, tzinfo=timezone.utc)
MIN = timedelta(minutes=1)


def sent(value, ago):
    return vs.Sent(value, T0 - ago)


@pytest.mark.parametrize("domain, unique_id, key, entity_id, role", [
    # ZHA (zha 2.x Danfoss Ally entities)
    ("number", "00:15:bc:00:1a:01:02:03-1-external_measured_room_sensor", "external_temperature_sensor",
     "number.lounge_valve_external_temperature_sensor", vs.EXTERNAL),
    ("switch", "00:15:bc:00:1a:01:02:03-1-radiator_covered", "prioritize_external_temperature_sensor",
     "switch.lounge_valve_prioritize_external_temperature_sensor", vs.COVERED),
    # Zigbee2MQTT discovery
    ("number", "0x0015bc001a010203_external_measured_room_sensor_zigbee2mqtt", None,
     "number.lounge_valve_external_measured_room_sensor", vs.EXTERNAL),
    ("switch", "0x0015bc001a010203_radiator_covered_zigbee2mqtt", None, "switch.lounge_valve_radiator_covered", vs.COVERED),
    # Renamed in HA, unique id still tells
    ("number", "0x01_external_measured_room_sensor_zigbee2mqtt", None, "number.my_box", vs.EXTERNAL),
    # Not ours
    ("number", "x-1-load_room_mean", "load_room_mean", "number.v_load_room_mean", None),
    ("sensor", "x-1-external_measured_room_sensor", None, "sensor.v_external_measured_room_sensor", None),
    ("switch", "x-1-window_open", None, "switch.v_window_open", None),
])
def test_entity_role(domain, unique_id, key, entity_id, role):
    assert vs.entity_role(domain, unique_id, key, entity_id) == role


def test_native_units():
    # ZHA: °C, -80..35
    assert vs.native(19.44, -80, 35) == 19.4
    assert vs.native(vs.NOT_USED, -80, 35) == -80
    # Z2M: centi-°C, -8000..3500
    assert vs.native(19.4, -8000, 3500) == 1940 and isinstance(vs.native(19.4, -8000, 3500), int)
    assert vs.native(vs.NOT_USED, -8000, 3500) == -8000
    assert vs.native(40, -8000, 3500) == 3500  # clamped
    assert vs.native(21.0) == 21.0  # no range: °C
    assert vs.celsius("1940", -8000, 3500) == 19.4 and vs.celsius("19.4", -80, 35) == 19.4
    assert vs.celsius("unknown", -80, 35) is None


def test_first_send_and_clear():
    assert vs.decide(None, 19.43, False, T0) == 19.4
    assert vs.decide(None, 19.43, None, T0) == 19.4
    # Sensor gone: clear once, then nothing.
    assert vs.decide(sent(19.4, MIN), None, False, T0) == vs.NOT_USED
    assert vs.decide(None, None, False, T0) is None
    assert vs.decide(sent(vs.NOT_USED, MIN), None, False, T0) is None
    # Back again: sent straight away, whatever the interval.
    assert vs.decide(sent(vs.NOT_USED, MIN), 19.0, False, T0) == 19.0


def test_auto_offset_rates():
    # At most every 30 min, even when the room moves a lot.
    assert vs.decide(sent(19.0, 29 * MIN), 21.0, False, T0) is None
    assert vs.decide(sent(19.0, 30 * MIN), 21.0, False, T0) == 21.0
    # A small change waits for the refresh, which comes before 3 h.
    assert vs.decide(sent(19.0, 60 * MIN), 19.1, False, T0) is None
    assert vs.decide(sent(19.0, 174 * MIN), 19.0, False, T0) is None
    assert vs.decide(sent(19.0, 175 * MIN), 19.0, False, T0) == 19.0
    assert vs.decide(sent(19.0, 40 * MIN), 19.2, False, T0) == 19.2


def test_covered_rates():
    assert vs.decide(sent(19.0, 4 * MIN), 20.0, True, T0) is None
    assert vs.decide(sent(19.0, 5 * MIN), 20.0, True, T0) == 20.0
    assert vs.decide(sent(19.0, 10 * MIN), 19.1, True, T0) is None
    assert vs.decide(sent(19.0, 25 * MIN), 19.0, True, T0) == 19.0


def test_unknown_mode_keeps_to_the_shorter_limit():
    assert vs.decide(sent(19.0, 24 * MIN), 22.0, None, T0) is None
    assert vs.decide(sent(19.0, 25 * MIN), 19.0, None, T0) == 19.0


def test_valve_and_room_status():
    kw = dict(covered=False, now=T0)
    assert vs.valve_status(wanted=False, supported=True, last=None, **kw) == vs.OFF
    assert vs.valve_status(wanted=True, supported=False, last=None, **kw) == vs.UNSUPPORTED
    assert vs.valve_status(wanted=True, supported=True, last=None, **kw) == vs.WAITING
    assert vs.valve_status(wanted=True, supported=True, last=sent(19.0, 60 * MIN), **kw) == vs.USING
    # Not refreshed for over 3 h: the valve will have dropped it.
    assert vs.valve_status(wanted=True, supported=True, last=sent(19.0, 181 * MIN), **kw) == vs.WAITING
    assert vs.room_status([]) is None
    assert vs.room_status([vs.USING, vs.USING]) == vs.USING
    assert vs.room_status([vs.USING, vs.UNSUPPORTED]) == "partly"
    assert vs.room_status([vs.UNSUPPORTED]) == vs.UNSUPPORTED
    assert vs.room_status([vs.WAITING, vs.UNSUPPORTED]) == vs.WAITING
    assert vs.room_status([vs.OFF, vs.OFF]) == vs.OFF
