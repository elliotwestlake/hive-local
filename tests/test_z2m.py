import importlib.util, pathlib, pytest

spec = importlib.util.spec_from_file_location(
    "z2m", pathlib.Path(__file__).parents[1] / "custom_components/hive_local/z2m.py")
z = importlib.util.module_from_spec(spec); spec.loader.exec_module(z)

# Real SLR1 state from Elliot's receiver, following its schedule.
SLR1 = {"linkquality": 104, "local_temperature": 20.05, "occupied_heating_setpoint": 1,
        "running_state": "idle", "system_mode": "heat", "temperature_setpoint_hold": False,
        "temperature_setpoint_hold_duration": 0}

def test_status_schedule():
    assert z.channel_status(SLR1, None) == {"mode": "schedule", "boost_remaining": 0,
        "current_temperature": 20.05, "setpoint": 1, "heating": False}

@pytest.mark.parametrize("patch, mode", [
    ({"system_mode": "off", "temperature_setpoint_hold": 0}, "off"),
    ({"temperature_setpoint_hold": True, "temperature_setpoint_hold_duration": 65535}, "manual"),
    ({"system_mode": "emergency_heating", "temperature_setpoint_hold": True}, "boost"),
])
def test_status_modes(patch, mode):
    assert z.channel_status(SLR1 | patch, None)["mode"] == mode

def test_boost_remaining():
    boosting = SLR1 | {"system_mode": "emergency_heating", "temperature_setpoint_hold_duration": 42}
    assert z.channel_status(boosting, None)["boost_remaining"] == 42
    unknown = boosting | {"temperature_setpoint_hold_duration": 65535}
    assert z.channel_status(unknown, None)["boost_remaining"] is None

def test_status_multi_endpoint():
    state = {"system_mode_heat": "heat", "running_state_heat": "heat", "system_mode_water": "off"}
    assert z.channel_status(state, "heat")["heating"] is True
    assert z.channel_status(state, "water")["mode"] == "off"
    assert z.channel_status(SLR1, "water") is None
    assert z.channel_status("nope", None) is None

def test_payloads():
    assert z.mode_payload(None, "schedule") == {"system_mode": "heat", "temperature_setpoint_hold": False}
    assert z.mode_payload("heat", "manual", 20) == {"system_mode_heat": "heat",
        "temperature_setpoint_hold_heat": 1, "occupied_heating_setpoint_heat": 20}
    assert z.boost_payload("water", 30) == {"system_mode_water": "emergency_heating",
        "temperature_setpoint_hold_duration_water": 30, "temperature_setpoint_hold_water": 1}
    assert z.boost_payload(None, 60, 21)["occupied_heating_setpoint"] == 21
    with pytest.raises(ValueError):
        z.boost_payload(None, 0)
    with pytest.raises(ValueError):
        z.mode_payload(None, "boost")
