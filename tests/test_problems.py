import importlib, pathlib, sys, types
from datetime import datetime, timedelta, timezone

pkg = types.ModuleType("hl"); pkg.__path__ = [str(pathlib.Path(__file__).parents[1] / "custom_components/hive_local")]
sys.modules.setdefault("hl", pkg)
p = importlib.import_module("hl.problems")

T0 = datetime(2026, 11, 25, 12, 0, tzinfo=timezone.utc)
MIN = timedelta(minutes=1)


def test_z2m_never_reported_is_a_naming_problem():
    assert p.receiver_problem(T0 + 4 * MIN, T0, None, z2m=True) is None
    assert p.receiver_problem(T0 + 5 * MIN, T0, None, z2m=True) == p.Z2M_NO_STATE
    # Once it has reported, only silence counts.
    assert p.receiver_problem(T0 + 5 * MIN, T0, T0 + MIN, z2m=True) is None


def test_silent_after_30_minutes():
    seen = T0 + 10 * MIN
    assert p.receiver_problem(seen + 29 * MIN, T0, seen, z2m=True) is None
    assert p.receiver_problem(seen + 30 * MIN, T0, seen, z2m=True) == p.RECEIVER_SILENT
    # ZHA that never answered counts from the start.
    assert p.receiver_problem(T0 + 29 * MIN, T0, None, z2m=False) is None
    assert p.receiver_problem(T0 + 30 * MIN, T0, None, z2m=False) == p.RECEIVER_SILENT
    # ZHA gave the device back (started moves on): silence counts from then.
    assert p.receiver_problem(T0 + 40 * MIN, T0 + 20 * MIN, T0, z2m=False) is None


def test_ping_every_10_quiet_minutes():
    assert not p.should_ping(T0 + 9 * MIN, T0, None, None)
    assert p.should_ping(T0 + 10 * MIN, T0, None, None)
    # Just asked: wait another 10 minutes.
    assert not p.should_ping(T0 + 15 * MIN, T0, None, T0 + 10 * MIN)
    assert p.should_ping(T0 + 20 * MIN, T0, None, T0 + 10 * MIN)
    # Heard from it recently: no need.
    assert not p.should_ping(T0 + 20 * MIN, T0, T0 + 15 * MIN, T0 + 10 * MIN)


def test_zha_lost_after_5_minutes():
    assert not p.lost_for(T0, None)
    assert not p.lost_for(T0 + 4 * MIN, T0)
    assert p.lost_for(T0 + 5 * MIN, T0)


def test_thermostat_quiet_depends_on_our_reporting():
    assert not p.thermostat_quiet(T0 + 14 * MIN, T0, configured=True)
    assert p.thermostat_quiet(T0 + 15 * MIN, T0, configured=True)
    # Still on ZHA's 15-minute reporting: allow two of those.
    assert not p.thermostat_quiet(T0 + 34 * MIN, T0, configured=False)
    assert p.thermostat_quiet(T0 + 35 * MIN, T0, configured=False)


def valve(entity_id, available=True, battery="80", name=None):
    return {"entity_id": entity_id, "name": name or entity_id, "available": available, "battery": battery}


def test_valve_battery_low():
    down = {}
    out = p.valve_problems([valve("climate.a", battery="20"), valve("climate.b", battery="21"),
                            valve("climate.c", battery="unknown"), valve("climate.d", battery=None)],
                           down, T0, 20)
    assert out == {(p.VALVE_BATTERY_LOW, "climate.a"): {"name": "climate.a", "entity_id": "climate.a", "battery": "20"}}


def test_valve_unavailable_for_30_minutes_then_back():
    down = {}
    gone = [valve("climate.a", available=False, battery="unavailable", name="Lounge valve")]
    assert p.valve_problems(gone, down, T0, 20) == {}
    assert down == {"climate.a": T0}
    assert p.valve_problems(gone, down, T0 + 29 * MIN, 20) == {}
    assert p.valve_problems(gone, down, T0 + 30 * MIN, 20) == {
        (p.VALVE_UNAVAILABLE, "climate.a"): {"name": "Lounge valve", "entity_id": "climate.a"}}
    # Back: cleared, and the clock starts again next time.
    assert p.valve_problems([valve("climate.a")], down, T0 + 31 * MIN, 20) == {}
    assert down == {}


def test_valve_removed_from_ha_is_forgotten():
    down = {"climate.gone": T0}
    assert p.valve_problems([], down, T0 + 60 * MIN, 20) == {}
    assert down == {}
