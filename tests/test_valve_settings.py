import importlib, pathlib, sys, types

pkg = types.ModuleType("hl"); pkg.__path__ = [str(pathlib.Path(__file__).parents[1] / "custom_components/hive_local")]
sys.modules.setdefault("hl", pkg)
v = importlib.import_module("hl.valve_settings")

IEEE = "84:fd:27:ff:fe:00:00:01"


def test_finds_zha_and_z2m_entities():
    role = v.entity_role
    assert role("select", f"{IEEE}-1-513-control_algorithm_scale_factor", "setpoint_response_time", "select.x") == v.RESPONSE
    assert role("number", "0x84fd27fffe000001_control_algorithm_scale_factor_zigbee2mqtt", None, "number.x") == v.RESPONSE
    assert role("switch", f"{IEEE}-1-513-radiator_covered", "prioritize_external_temperature_sensor", "switch.x") == v.COVERED
    assert role("switch", "0x84fd_adaptation_run_settings_zigbee2mqtt", None, "switch.x") == v.ADAPTATION
    assert role("select", f"{IEEE}-1-513-adaptation_run_control", "adaptation_run_command", "select.x") == v.ADAPTATION_RUN
    assert role("sensor", "0x84fd_adaptation_run_status_zigbee2mqtt", None, "sensor.x") == v.ADAPTATION_STATUS
    assert role("select", "something_else", None, "select.bedroom_valve_orientation") is None
    assert role("sensor", f"{IEEE}-1-513-control_algorithm_scale_factor", None, "sensor.x") is None  # wrong domain


def test_reads_the_response_time_in_minutes():
    assert v.read(v.RESPONSE, "select", "moderate 30min", {}) == 30
    assert v.read(v.RESPONSE, "select", "quick open disabled", {}) is None
    assert v.read(v.RESPONSE, "number", "10", {}) == 80
    assert v.read(v.RESPONSE, "number", "2.5", {}) is None
    assert v.read(v.RESPONSE, "number", "unavailable", {}) is None


def test_reads_switches_and_the_adaptation_status():
    assert v.read(v.COVERED, "switch", "on", {}) is True
    assert v.read(v.ADAPTATION, "switch", "off", {}) is False
    assert v.read(v.ADAPTATION, "switch", "unknown", {}) is None
    zha = {"In_progress": False, "Valve_characteristic_found": True, "Valve_characteristic_lost": False}
    assert v.read(v.ADAPTATION_STATUS, "sensor", "Valve_characteristic_found", zha) == v.FOUND
    assert v.read(v.ADAPTATION_STATUS, "sensor", "unknown", zha | {"In_progress": True}) == v.IN_PROGRESS
    assert v.read(v.ADAPTATION_STATUS, "sensor", "lost", {}) == v.LOST  # Z2M
    assert v.read(v.ADAPTATION_STATUS, "sensor", "something", {}) is None


def test_service_calls():
    zha_options = ["quick 5min", "moderate 30min", "slow 80min"]
    assert v.call(v.RESPONSE, "select", 80, zha_options) == ("select", "select_option", {"option": "slow 80min"})
    assert v.call(v.RESPONSE, "select", 40, zha_options) is None  # not an option on this entity
    assert v.call(v.RESPONSE, "number", 40) == ("number", "set_value", {"value": 6})
    assert v.call(v.RESPONSE, "number", 33) is None
    assert v.call(v.COVERED, "switch", True) == ("switch", "turn_on", {})
    assert v.call(v.ADAPTATION, "switch", False) == ("switch", "turn_off", {})
    assert v.call(v.ADAPTATION, "switch", 1) is None
    assert v.call(v.ADAPTATION_RUN, "select", None, ["Nothing", "Initiate", "Cancel"]) == ("select", "select_option", {"option": "Initiate"})
    assert v.call(v.ADAPTATION_RUN, "select", None, ["none", "initiate_adaptation"]) == ("select", "select_option", {"option": "initiate_adaptation"})
    assert v.call(v.ADAPTATION_RUN, "select", None, ["none"]) is None


def test_combine_across_valves():
    assert v.combine([]) == (None, False)
    assert v.combine([None, 30]) == (30, False)
    assert v.combine([30, 80, 80]) == (80, True)
    assert v.combine([True, False]) == (True, True)
