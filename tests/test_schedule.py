import importlib.util, pathlib, pytest

spec = importlib.util.spec_from_file_location(
    "schedule", pathlib.Path(__file__).parents[1] / "custom_components/hive_local/schedule.py")
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

def test_payloads_one_per_day():
    sched = s.validate({d: WEEKDAY for d in s.DAYS[:5]} |
                       {"saturday": [{"time": "08:00", "setpoint": 19}], "sunday": [{"time": "08:00", "setpoint": 19}]}, **LIM)
    payloads = s.to_z2m_payloads(sched, "heat")
    # One command per day, even for identical days.
    assert [p["weekly_schedule_heat"]["dayofweek"] for p in payloads] == [[d] for d in s.DAYS]
    first = payloads[0]["weekly_schedule_heat"]
    assert first["transitions"][0] == {"heatSetpoint": 16.0, "transitionTime": "00:00"}
    # Every day is padded to 6 transitions by repeating the last one.
    sunday = payloads[-1]["weekly_schedule_heat"]["transitions"]
    assert sunday == [{"heatSetpoint": 19.0, "transitionTime": "08:00"}] * 6
    assert "weekly_schedule" in s.to_z2m_payloads(sched, None)[0]

def test_parse_drops_padding_repeats():
    # A day written with 3 events reads back padded to 6, repeating the last time.
    reply = {"days": ["monday"], "transitions": [
        {"time": 390, "heating_setpoint": 20}, {"time": 510, "heating_setpoint": 16},
        {"time": 1320, "heating_setpoint": 1}, {"time": 1320, "heating_setpoint": 1},
        {"time": 1320, "heating_setpoint": 1}, {"time": 1320, "heating_setpoint": 1}]}
    day = s.parse_z2m_reply(reply)["monday"]
    assert [t["time"] for t in day] == ["06:30", "08:30", "22:00"]
    # ...and it can be written straight back (validate rejects duplicate times).
    s.validate({"monday": day}, max_transitions=6, min_setpoint=1, max_setpoint=32)

def test_parse_drops_impossible_times():
    reply = {"days": ["monday"], "transitions": [
        {"time": 420, "heating_setpoint": 20}, {"time": 4095, "heating_setpoint": 15},
        {"time": 1440, "heating_setpoint": 15}]}
    assert s.parse_z2m_reply(reply)["monday"] == [{"time": "07:00", "setpoint": 20.0}]

def test_pad_transitions():
    day = [{"time": "07:00", "setpoint": 20.0}, {"time": "22:00", "setpoint": 1.0}]
    padded = s.pad_transitions(day)
    assert len(padded) == 6 and padded[:2] == day and padded[2:] == [day[-1]] * 4
    assert s.tidy_transitions([dict(t) for t in padded]) == day
    assert s.pad_transitions([]) == []

def test_tidy_keeps_first_entry_per_time():
    t = s.tidy_transitions([{"time": "22:00", "setpoint": 18.0}, {"time": "06:30", "setpoint": 20.0},
                            {"time": "22:00", "setpoint": 1.0}])
    assert t == [{"time": "06:30", "setpoint": 20.0}, {"time": "22:00", "setpoint": 18.0}]

def test_read_edit_write_with_zero_degree_off():
    # The receiver can report an "off" period as 0 °C. Read -> remove an event -> write must work.
    reply = {"days": ["monday"], "transitions": [
        {"time": 390, "heating_setpoint": 20}, {"time": 510, "heating_setpoint": 0},
        {"time": 1020, "heating_setpoint": 21}, {"time": 1320, "heating_setpoint": 0}]}
    day = s.parse_z2m_reply(reply)["monday"]
    assert [t["setpoint"] for t in day] == [20.0, 1.0, 21.0, 1.0]
    edited = {"monday": [t for t in day if t["time"] != "17:00"]}
    s.validate(edited, max_transitions=6, min_setpoint=s.HEAT_MIN, max_setpoint=s.HEAT_MAX)

def test_tidy_drops_impossible_setpoints():
    t = s.tidy_transitions([{"time": "06:30", "setpoint": 20.0}, {"time": "07:00", "setpoint": 327.67}])
    assert t == [{"time": "06:30", "setpoint": 20.0}]

def test_validate_error_names_day_and_time():
    with pytest.raises(s.ScheduleError, match=r"Monday 08:30: 0 °C is outside 1–32 °C"):
        s.validate({"monday": [{"time": "08:30", "setpoint": 0}]}, max_transitions=6,
                   min_setpoint=1.0, max_setpoint=32.0)
