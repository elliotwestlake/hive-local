import importlib, pathlib, sys, types

pkg = types.ModuleType("hl"); pkg.__path__ = [str(pathlib.Path(__file__).parents[1] / "custom_components/hive_local")]
sys.modules.setdefault("hl", pkg)
h = importlib.import_module("hl.holiday")

AWAY = h.Away(until=1_000.0, temperature=12.0, restore_mode="schedule", restore_setpoint=None)


def test_restore_point_keeps_the_current_mode():
    assert h.restore_point("schedule", 20.0, ("schedule", None)) == ("schedule", None)
    assert h.restore_point("manual", 19.5, ("manual", 19.5)) == ("manual", 19.5)
    assert h.restore_point("off", None, ("off", None)) == ("off", None)


def test_restore_point_skips_a_running_boost():
    # Boosting from a manual hold: go back to the hold, not the boost.
    assert h.restore_point("boost", 22.0, ("manual", 19.0)) == ("manual", 19.0)
    assert h.restore_point("boost", 22.0, ("schedule", 16.0)) == ("schedule", None)
    assert h.restore_point("boost", 22.0, ("boost", 22.0)) == ("schedule", None)


def test_holding():
    assert h.holding("heat", AWAY) == ("manual", 12.0)
    assert h.holding("water", AWAY) == ("off", None)


def test_is_ours_heat():
    assert h.is_ours("heat", AWAY, "manual", 12.0)
    assert h.is_ours("heat", AWAY, "manual", 12.1)
    assert h.is_ours("heat", AWAY, "boost", 21.0)  # a boost on top goes back to the hold
    assert not h.is_ours("heat", AWAY, "manual", 20.0)  # someone turned it up
    assert not h.is_ours("heat", AWAY, "schedule", 12.0)
    assert not h.is_ours("heat", AWAY, "off", None)
    assert not h.is_ours("heat", AWAY, "manual", None)


def test_is_ours_water():
    water = h.Away(until=1_000.0, temperature=None, restore_mode="manual", restore_setpoint=None)
    assert h.is_ours("water", water, "off", 22)
    assert h.is_ours("water", water, "boost", 22)
    assert not h.is_ours("water", water, "schedule", 22)
    assert not h.is_ours("water", water, "manual", 22)


def test_store_round_trip():
    assert h.Away.from_store(AWAY.as_store()) == AWAY
    manual = h.Away(until=5.0, temperature=10.5, restore_mode="manual", restore_setpoint=19.0)
    assert h.Away.from_store(manual.as_store()) == manual


def test_store_rejects_junk():
    assert h.Away.from_store(None) is None
    assert h.Away.from_store({}) is None
    assert h.Away.from_store({"until": "soon", "restore_mode": "schedule"}) is None
    assert h.Away.from_store({"until": 1, "restore_mode": "boost"}) is None
