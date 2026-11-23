import importlib, pathlib, sys, types, pytest

# zcl.py imports its siblings, so load it as part of a bare package (skipping __init__.py,
# which needs Home Assistant).
pkg = types.ModuleType("hl"); pkg.__path__ = [str(pathlib.Path(__file__).parents[1] / "custom_components/hive_local")]
sys.modules.setdefault("hl", pkg)
z = importlib.import_module("hl.zcl")

# The SLR1 state from test_z2m.py, as raw ZCL attributes.
SLR1 = {"system_mode": 0x04, "temp_setpoint_hold": 0, "temp_setpoint_hold_duration": 0,
        "occupied_heating_setpoint": 100, "local_temperature": 2005, "running_state": 0}

def test_status_schedule():
    assert z.channel_status(SLR1) == {"mode": "schedule", "boost_remaining": 0,
        "current_temperature": 20.05, "setpoint": 1.0, "heating": False}

def test_status_unknown():
    assert z.channel_status({}) is None
    assert z.channel_status(SLR1 | {"local_temperature": -0x8000})["current_temperature"] is None

@pytest.mark.parametrize("patch, mode", [
    ({"system_mode": 0x00}, "off"),
    ({"temp_setpoint_hold": 1, "temp_setpoint_hold_duration": 0xFFFF}, "manual"),
    ({"system_mode": 0x05, "temp_setpoint_hold": 1}, "boost"),
])
def test_status_modes(patch, mode):
    assert z.channel_status(SLR1 | patch)["mode"] == mode

def test_status_heating_and_boost_remaining():
    boosting = SLR1 | {"system_mode": 0x05, "temp_setpoint_hold_duration": 42, "running_state": 0x0001}
    status = z.channel_status(boosting)
    assert status["boost_remaining"] == 42 and status["heating"] is True
    assert z.channel_status(boosting | {"temp_setpoint_hold_duration": 0xFFFF})["boost_remaining"] is None

def test_mode_attributes():
    assert z.mode_attributes("schedule") == {"system_mode": 4, "temp_setpoint_hold": 0}
    assert z.mode_attributes("off") == {"system_mode": 0, "temp_setpoint_hold": 0}
    assert z.mode_attributes("manual", 19.5) == {
        "system_mode": 4, "temp_setpoint_hold": 1, "occupied_heating_setpoint": 1950}
    with pytest.raises(ValueError):
        z.mode_attributes("boost")

def test_setpoint_attributes():
    assert z.setpoint_attributes(19.5) == {"occupied_heating_setpoint": 1950}

def test_boost_attributes():
    attrs = z.boost_attributes(30, 21)
    assert attrs == {"system_mode": 5, "temp_setpoint_hold_duration": 30,
                     "temp_setpoint_hold": 1, "occupied_heating_setpoint": 2100}
    assert list(attrs) == ["system_mode", "temp_setpoint_hold_duration",
                           "temp_setpoint_hold", "occupied_heating_setpoint"]
    assert "occupied_heating_setpoint" not in z.boost_attributes(60)
    with pytest.raises(ValueError):
        z.boost_attributes(0)

def test_schedule_commands():
    weekday = [{"time": "06:30", "setpoint": 20.0}, {"time": "22:00", "setpoint": 1.0}]
    weekend = [{"time": "08:00", "setpoint": 21.5}]
    schedule = {d: weekday for d in ("monday", "tuesday", "wednesday", "thursday", "friday")}
    schedule |= {"saturday": weekend, "sunday": weekend}
    commands = z.schedule_commands(schedule)
    # One command per day (Mon=0x02 ... Sat=0x40, Sun=0x01), never a multi-day bitmap.
    assert [c["day_of_week_for_sequence"] for c in commands] == [0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x01]
    assert commands[0] == {"num_transitions_for_sequence": 2, "day_of_week_for_sequence": 0x02,
                           "mode_for_sequence": 1, "values": [390, 2000, 1320, 100]}
    assert commands[-1] == {"num_transitions_for_sequence": 1, "day_of_week_for_sequence": 0x01,
                            "mode_for_sequence": 1, "values": [480, 2150]}

def test_parse_schedule_response():
    # One day per reply, padded to 6 transitions with 1 °C, like the Z2M replies.
    values = [390, 2000, 510, 1600, 1020, 2100, 1320, 100, 1320, 100, 1320, 100]
    parsed = z.parse_schedule_response(0x02, 0x01, values)
    assert list(parsed) == ["monday"]
    assert parsed["monday"][:2] == [{"time": "06:30", "setpoint": 20.0},
                                    {"time": "08:30", "setpoint": 16.0}]
    # The padding repeats 22:00 1 °C: one event, not three.
    assert parsed["monday"] == [{"time": "06:30", "setpoint": 20.0}, {"time": "08:30", "setpoint": 16.0},
                                {"time": "17:00", "setpoint": 21.0}, {"time": "22:00", "setpoint": 1.0}]

def test_parse_schedule_response_days_and_modes():
    assert list(z.parse_schedule_response(0x41 | 0x80, 0x01, [480, 2150])) == ["saturday", "sunday"]
    # Heat + cool: (time, heat, cool) triplets.
    assert z.parse_schedule_response(0x02, 0x03, [480, 2150, 2600]) == {
        "monday": [{"time": "08:00", "setpoint": 21.5}]}
    assert z.parse_schedule_response(0x02, 0x02, [480, 2600]) == {}

@pytest.mark.parametrize("model, eps, expected", [
    ("SLR1c", [5, 6], {"heat": 5}),          # single-channel, even if it lists endpoint 6
    ("OTR1", [5], {"heat": 5}),
    ("SLR2b", [5, 6], {"heat": 5, "water": 6}),
    ("SLR2", [5], {"heat": 5}),               # water endpoint missing: heating only
    (None, [5, 6], {"heat": 5, "water": 6}),  # unknown model: by endpoints
    ("Mystery", [1], {"heat": 1}),
    ("SLR1", [], {}),
])
def test_receiver_endpoints(model, eps, expected):
    assert z.receiver_endpoints(model, eps) == expected

@pytest.mark.parametrize("manufacturer, model, expected", [
    ("Computime", "SLT3d", True), ("Hive", "SLT6", True), (None, "SLT3", True),
    ("Computime", "SLR1c", False), ("Computime", "OTR1", False), ("Acme", "SLT-9000", False),
])
def test_is_hive_thermostat(manufacturer, model, expected):
    assert z.is_hive_thermostat(manufacturer, model) is expected

def test_parse_schedule_response_zero_is_off():
    parsed = z.parse_schedule_response(0x02, 0x01, [390, 2000, 1320, 0, 1320, 0])
    assert parsed["monday"] == [{"time": "06:30", "setpoint": 20.0}, {"time": "22:00", "setpoint": 1.0}]


class _Record:
    def __init__(self, status, attrid=None):
        self.status, self.attrid = status, attrid

def test_reporting_accepted_zigpy_0x_records():
    # zigpy 0.x: a list of ConfigureReportingResponseRecord.
    assert z.reporting_accepted([_Record(0)])
    assert not z.reporting_accepted([_Record(0x86, 0x0000)])
    assert not z.reporting_accepted([])

def test_reporting_accepted_zigpy_2x_dict():
    # zigpy 2.x: {ZCLAttributeDef: Status} (issue #1).
    attr = object()
    assert z.reporting_accepted({attr: 0})
    assert not z.reporting_accepted({attr: 0x86})
    assert not z.reporting_accepted({})
    assert z.reporting_statuses({attr: 0x8D}) == [0x8D]

def test_reporting_accepted_response_with_status_records():
    rsp = types.SimpleNamespace(status_records=[_Record(0), _Record(0)])
    assert z.reporting_accepted(rsp)
