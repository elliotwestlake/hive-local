import importlib.util, pathlib, pytest

spec = importlib.util.spec_from_file_location(
    "schedule", pathlib.Path(__file__).parents[1] / "custom_components/hive_schedule/schedule.py")
s = importlib.util.module_from_spec(spec); spec.loader.exec_module(s)

LIM = dict(max_transitions=6, min_setpoint=1, max_setpoint=32)
WEEKDAY = [{"time": "06:30", "setpoint": 20}, {"time": "00:00", "setpoint": 16}]

def test_parse_reply():
    out = s.parse_z2m_reply({"days": ["monday", "tuesday"],
        "transitions": [{"time": 1080, "heating_setpoint": 21}, {"time": 390, "heating_setpoint": 20}]})
    assert out["monday"] == [{"time": "06:30", "setpoint": 20.0}, {"time": "18:00", "setpoint": 21.0}]
    assert set(out) == {"monday", "tuesday"}

def test_parse_ignores_vacation_and_junk():
    assert s.parse_z2m_reply({"days": ["away_or_vacation"], "transitions": []}) == {}
    assert s.parse_z2m_reply("nope") == {}

def test_validate_sorts_and_rounds():
    out = s.validate({"monday": [{"time": "18:00", "setpoint": 20.3}, {"time": "06:00", "setpoint": 16}]}, **LIM)
    assert out["monday"] == [{"time": "06:00", "setpoint": 16.0}, {"time": "18:00", "setpoint": 20.5}]

@pytest.mark.parametrize("bad", [
    {"funday": WEEKDAY},
    {"monday": []},
    {"monday": [{"time": "25:00", "setpoint": 20}]},
    {"monday": [{"time": "06:00", "setpoint": 40}]},
    {"monday": [{"time": "06:00", "setpoint": 20}, {"time": "06:00", "setpoint": 21}]},
    {"monday": [{"time": f"0{i}:00", "setpoint": 20} for i in range(7)]},
])
def test_validate_rejects(bad):
    with pytest.raises(s.ScheduleError):
        s.validate(bad, **LIM)

def test_grouping_and_payloads():
    sched = s.validate({d: WEEKDAY for d in s.DAYS[:5]} |
                       {"saturday": [{"time": "08:00", "setpoint": 19}], "sunday": [{"time": "08:00", "setpoint": 19}]}, **LIM)
    payloads = s.to_z2m_payloads(sched, "heat")
    assert len(payloads) == 2
    first = payloads[0]["weekly_schedule_heat"]
    assert first["dayofweek"] == ["monday", "tuesday", "wednesday", "thursday", "friday"]
    assert first["transitions"][0] == {"heatSetpoint": 16.0, "transitionTime": "00:00"}
    assert "weekly_schedule" in s.to_z2m_payloads(sched, None)[0]
