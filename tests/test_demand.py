import importlib, pathlib, sys, types

pkg = types.ModuleType("hl"); pkg.__path__ = [str(pathlib.Path(__file__).parents[1] / "custom_components/hive_local")]
sys.modules.setdefault("hl", pkg)
d = importlib.import_module("hl.demand")

MIN = 60
DAY = [{"time": "06:30", "setpoint": 20.0}, {"time": "09:00", "setpoint": 1.0},
       {"time": "17:00", "setpoint": 21.0}, {"time": "22:30", "setpoint": 1.0}]
WEEK = {day: DAY for day in ("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday")}


def test_valve_reading_ignores_unusable_valves():
    attrs = {"current_temperature": 18.5, "temperature": 20, "hvac_action": "idle"}
    assert d.valve_reading("heat", attrs, 5) == d.Reading(18.5, 20.0, False)
    assert d.valve_reading("unavailable", attrs, 5) is None
    assert d.valve_reading("unknown", attrs, 5) is None
    assert d.valve_reading("off", attrs, 5) is None  # an off valve wants nothing
    assert d.valve_reading("heat", attrs, 61) is None  # stale
    assert d.valve_reading("heat", attrs, None) is None


def test_valve_heating_from_hvac_action_or_pi_demand():
    assert d.valve_reading("heat", {"hvac_action": "heating"}, 1).heating
    assert d.valve_reading("heat", {"pi_heating_demand": 40}, 1).heating
    assert not d.valve_reading("heat", {"pi_heating_demand": 5}, 1).heating
    assert not d.valve_reading("heat", {"pi_heating_demand": True}, 1).heating


def test_room_need_prefers_the_sensor_and_takes_the_highest_target():
    valves = [d.Reading(18.0, 20.0, False), d.Reading(19.0, 21.0, False)]
    assert d.room_need("Lounge", valves) == d.Need("Lounge", 18.5, 21.0, False)
    assert d.room_need("Lounge", valves, sensor=17.2).current == 17.2
    assert d.room_need("Lounge", valves, sensor=17.2).deficit == 3.8


def test_room_without_usable_readings_is_ignored():
    assert d.room_need("Hall", []) is None
    assert d.room_need("Hall", [d.Reading(None, 20.0, False)]) is None
    # No temperature, but the valve says it's heating: that still counts.
    assert d.room_need("Hall", [d.Reading(None, 20.0, True)]).heating


def test_hysteresis():
    cold = d.Need("Bed", 19.6, 20.0, False)  # 0.4 below
    colder = d.Need("Bed", 19.5, 20.0, False)  # 0.5 below
    close = d.Need("Bed", 19.8, 20.0, False)  # 0.2 below
    assert d.calling([cold], running=False) == []
    assert d.calling([colder], running=False) == [colder]
    assert d.calling([cold], running=True) == [cold]  # keeps going until within 0.2
    assert d.calling([close], running=True) == []
    heating = d.Need("Bed", 19.9, 20.0, True)
    assert d.calling([heating], running=False) == [heating]  # a valve heating counts below the target
    unknown = d.Need("Bed", None, 20.0, True)
    assert d.calling([unknown], running=False) == [unknown]
    # Turned down: the valve still says heating while it closes, but the room's above target.
    turned_down = d.Need("Bed", 21.0, 17.0, True)
    assert d.calling([turned_down], running=False) == []
    assert d.calling([turned_down], running=True) == []
    at_target = d.Need("Bed", 20.0, 20.0, True)
    assert d.calling([at_target], running=True) == []
    assert d.calling([colder], running=False, start_below=1.0) == []


def decide(**kw):
    args = dict(running=False, wanted=True, mode="schedule", schedule_off=False, outside_schedule=False,
                receiver_heating=False, now=100 * MIN, started=None, last_end=None)
    return d.decide(**(args | kw))


def test_start_only_from_the_schedule_when_the_receiver_is_idle():
    assert decide() == d.START
    assert decide(wanted=False) == d.IDLE
    assert decide(mode="off") == d.IDLE
    assert decide(mode="manual") == d.IDLE
    assert decide(mode="boost") == d.IDLE  # someone's boost
    assert decide(receiver_heating=True) == d.IDLE
    assert decide(suppressed=True) == d.IDLE
    assert decide(lease=3) == d.IDLE  # the schedule turns off in 3 min


def test_schedule_off_periods_are_respected_unless_allowed():
    assert decide(schedule_off=True) == d.IDLE
    assert decide(schedule_off=True, outside_schedule=True) == d.START
    assert decide(running=True, started=99 * MIN, schedule_off=True) == d.STOP  # at once, despite min on
    assert decide(running=True, started=99 * MIN, schedule_off=True, outside_schedule=True) == d.KEEP


def test_minimum_on_and_off_times():
    assert decide(last_end=95 * MIN) == d.IDLE  # off for 5 min
    assert decide(last_end=90 * MIN) == d.START
    assert decide(last_end=95 * MIN, min_off=0) == d.START
    assert decide(running=True, wanted=False, started=95 * MIN) == d.KEEP  # on for 5 min
    assert decide(running=True, wanted=False, started=90 * MIN) == d.STOP
    assert decide(running=True, wanted=True, started=0) == d.KEEP


def test_boost_setpoint_fires_the_receiver():
    needs = [d.Need("Bed", 18.0, 21.0, False)]
    assert d.boost_setpoint(needs, scheduled=20.0, receiver_current=20.4) == 22.0
    assert d.boost_setpoint(needs, scheduled=20.0, receiver_current=21.6) == 23.0  # above its own reading
    assert d.boost_setpoint([d.Need("Bed", 18.0, 23.2, False)], scheduled=20.0, receiver_current=19) == 23.5
    assert d.boost_setpoint(needs, scheduled=1.0, receiver_current=None) == 21.0  # schedule off: the room's target
    assert d.boost_setpoint([d.Need("Bed", 18.0, 40.0, False)], 31.0, 31.0) == 32.0
    assert d.boost_setpoint([], None, None) == 5.0


def test_schedule_now_and_until_off():
    monday = 0
    assert d.scheduled_now(WEEK, weekday=monday, minute=7 * 60) == 20.0
    assert d.scheduled_now(WEEK, weekday=monday, minute=10 * 60) == 1.0
    assert d.scheduled_now(WEEK, weekday=monday, minute=5 * 60) == 1.0  # yesterday's last
    assert d.scheduled_now({}, weekday=monday, minute=0) is None
    assert d.minutes_until_off(WEEK, weekday=monday, minute=8 * 60) == 60
    assert d.minutes_until_off(WEEK, weekday=monday, minute=23 * 60) == 600  # tomorrow 09:00
    assert d.minutes_until_off({}, weekday=monday, minute=0) is None


def test_lease_ends_when_the_schedule_turns_off():
    assert d.lease_minutes(None, False) == 30
    assert d.lease_minutes(12, False) == 12
    assert d.lease_minutes(12, True) == 30
    assert d.lease_minutes(0, False) == 1


def test_renewal():
    assert not d.needs_renewal(25, 30)
    assert d.needs_renewal(19, 30)
    assert d.needs_renewal(None, 30)
    assert d.needs_renewal(30, 12)  # runs past the schedule's off: shorten it
    assert not d.needs_renewal(12, 12)


def test_ours_and_store():
    assert d.is_ours(22.0, "boost", 22)
    assert not d.is_ours(22.0, "boost", 21)
    assert not d.is_ours(22.0, "schedule", 22)
    assert not d.is_ours(None, "boost", 22)
    run = d.Run(started=1.0, lease_end=1801.0, setpoint=22.0, rooms=("Bed",))
    assert d.Run.from_store(run.as_store()) == run
    assert d.Run.from_store({"started": 1}) is None
    assert d.Run.from_store(None) is None
