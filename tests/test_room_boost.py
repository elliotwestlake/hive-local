import importlib, pathlib, sys, types

import pytest

pkg = types.ModuleType("hl"); pkg.__path__ = [str(pathlib.Path(__file__).parents[1] / "custom_components/hive_local")]
sys.modules.setdefault("hl", pkg)
rb = importlib.import_module("hl.room_boost")

T0 = 1_800_000_000.0


def test_check_limits_and_rounds():
    assert rb.check(60, 21.3) == (60, 21.5)
    assert rb.check("30", "20") == (30, 20.0)
    for bad in ((10, 21), (400, 21), (60, 4), (60, 33), (None, 21), (60, "warm")):
        with pytest.raises(rb.RoomBoostError):
            rb.check(*bad)


def test_start_keeps_the_targets_from_before_the_first_boost():
    first = rb.start("a1", {"climate.bay": 19.0, "climate.door": None}, 60, 22.0, T0)
    assert (first.until, first.temperature) == (T0 + 3600, 22.0)
    assert first.previous == {"climate.bay": 19.0, "climate.door": None}
    # Boosting again while it runs: the valves now read 22°, but 19° is what goes back.
    again = rb.start("a1", {"climate.bay": 22.0, "climate.new": 18.0}, 30, 23.0, T0 + 600, first)
    assert again.started == T0 and again.until == T0 + 600 + 1800
    assert again.previous == {"climate.bay": 19.0, "climate.door": None, "climate.new": 18.0}


def test_remaining_and_over():
    boost = rb.start("a1", {}, 60, 22.0, T0)
    assert boost.remaining(T0) == 60
    assert boost.remaining(T0 + 3599) == 1
    assert not boost.over(T0 + 3599) and boost.over(T0 + 3600)
    assert boost.remaining(T0 + 9999) == 0


def test_restore_only_valves_still_in_the_room_with_a_target():
    boost = rb.start("a1", {"climate.bay": 19.0, "climate.door": None, "climate.gone": 18.0}, 60, 22.0, T0)
    assert rb.restore(boost, ["climate.bay", "climate.door"]) == {"climate.bay": 19.0}


def test_store_round_trip():
    boost = rb.start("a1", {"climate.bay": 19.0, "climate.door": None}, 60, 22.0, T0)
    assert rb.Boost.from_store(boost.as_store()) == boost
    assert rb.Boost.from_store({"room_id": "a1"}) is None
    assert rb.Boost.from_store(None) is None
