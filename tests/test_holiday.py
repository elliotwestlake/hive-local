import importlib, pathlib, sys, types

pkg = types.ModuleType("hl"); pkg.__path__ = [str(pathlib.Path(__file__).parents[1] / "custom_components/hive_local")]
sys.modules.setdefault("hl", pkg)
h = importlib.import_module("hl.holiday")

H = 3600
AWAY = h.Away(until=100 * H, temperature=12.0, restore_mode="schedule", restore_setpoint=None, lease_end=10 * H)
WATER = h.Away(until=100 * H, temperature=None, restore_mode="schedule", restore_setpoint=None)


def test_restore_point_keeps_the_current_mode():
    assert h.restore_point("schedule", 20.0, ("schedule", None)) == ("schedule", None)
    assert h.restore_point("manual", 19.5, ("manual", 19.5)) == ("manual", 19.5)
    assert h.restore_point("off", None, ("off", None)) == ("off", None)


def test_restore_point_skips_a_running_boost():
    # Boosting from a manual hold: go back to the hold, not the boost.
    assert h.restore_point("boost", 22.0, ("manual", 19.0)) == ("manual", 19.0)
    assert h.restore_point("boost", 22.0, ("schedule", 16.0)) == ("schedule", None)
    assert h.restore_point("boost", 22.0, ("boost", 22.0)) == ("schedule", None)


def test_lease_is_six_hours_then_ends_with_the_holiday():
    assert h.lease_minutes(0, 100 * H) == 360
    assert h.lease_minutes(0, 2 * H) == 120  # the receiver ends it on time by itself
    assert h.lease_minutes(0, 90) == 2
    assert h.lease_minutes(0, 10) == 1


def test_renews_after_an_hour():
    assert not h.needs_renewal(360, 360)
    assert not h.needs_renewal(301, 360)
    assert h.needs_renewal(299, 360)
    assert h.needs_renewal(None, 360)  # the receiver didn't say
    # The last stretch counts down with the holiday: nothing to renew.
    assert not h.needs_renewal(119, 120)
    # Running past the end (the holiday was moved earlier): renew to shorten it.
    assert h.needs_renewal(360, 120)


def test_is_our_boost():
    assert h.is_our_boost(AWAY, 12.0)
    assert h.is_our_boost(AWAY, 12.1)
    assert not h.is_our_boost(AWAY, 21.0)
    assert not h.is_our_boost(AWAY, None)
    assert not h.is_our_boost(WATER, 22)


def test_judge_heat():
    now = 5 * H
    assert h.judge("heat", AWAY, "boost", 12.0, now, False) == h.KEEP
    assert h.judge("heat", AWAY, "boost", 21.0, now, True) == h.KEEP  # a boost on top
    # A boost on top ended: put the holiday back.
    assert h.judge("heat", AWAY, "schedule", 20.0, now, True) == h.REASSERT
    # Ours ended early: someone changed it (thermostat, mode select).
    assert h.judge("heat", AWAY, "schedule", 20.0, now, False) == h.DROP
    assert h.judge("heat", AWAY, "manual", 21.0, now, False) == h.DROP
    # Ours ran out (HA was down, or a renewal failed): put it back.
    assert h.judge("heat", AWAY, "schedule", 20.0, 10 * H - 60, False) == h.REASSERT
    assert h.judge("heat", AWAY, "schedule", 20.0, 11 * H, False) == h.REASSERT
    no_lease = h.Away(until=100 * H, temperature=12.0, restore_mode="schedule", restore_setpoint=None)
    assert h.judge("heat", no_lease, "schedule", 20.0, now, False) == h.REASSERT


def test_judge_water():
    assert h.judge("water", WATER, "off", 22, 0, False) == h.KEEP
    assert h.judge("water", WATER, "boost", 22, 0, True) == h.KEEP
    assert h.judge("water", WATER, "schedule", 22, 0, True) == h.REASSERT
    assert h.judge("water", WATER, "manual", 22, 0, False) == h.DROP


def test_store_round_trip():
    assert h.Away.from_store(AWAY.as_store()) == AWAY
    manual = h.Away(until=5.0, temperature=10.5, restore_mode="manual", restore_setpoint=19.0)
    assert h.Away.from_store(manual.as_store()) == manual
    # Stored before lease_end existed.
    old = {"until": 5.0, "temperature": 12.0, "restore_mode": "schedule", "restore_setpoint": None}
    assert h.Away.from_store(old).lease_end is None


def test_store_rejects_junk():
    assert h.Away.from_store(None) is None
    assert h.Away.from_store({}) is None
    assert h.Away.from_store({"until": "soon", "restore_mode": "schedule"}) is None
    assert h.Away.from_store({"until": 1, "restore_mode": "boost"}) is None
