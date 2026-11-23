import importlib, pathlib, sys, types

# preheat.py imports its siblings, so load it as part of a bare package (skipping __init__.py).
pkg = types.ModuleType("hl"); pkg.__path__ = [str(pathlib.Path(__file__).parents[1] / "custom_components/hive_local")]
sys.modules.setdefault("hl", pkg)
p = importlib.import_module("hl.preheat")
S = importlib.import_module("hl.stats").Sample
M = 60

DAY = [{"time": "06:30", "setpoint": 20.0}, {"time": "09:00", "setpoint": 16.0},
       {"time": "17:00", "setpoint": 21.0}, {"time": "22:30", "setpoint": 1.0}]
WEEK = {d: DAY for d in p.DAYS}


def warmup(t0, start=17.0, rate=2.0, minutes=60, target=20.0):
    """A boiler run from `start` rising at `rate` °C/h, then idle."""
    out = [S(t0 - 10 * M, "schedule", heating=False, current=start, target=target)]
    for k in range(0, minutes, 10):
        out.append(S(t0 + k * M, "schedule", heating=True, current=round(start + rate * k / 60, 2), target=target))
    out.append(S(t0 + minutes * M, "schedule", heating=False, current=start + rate * minutes / 60, target=target))
    return out


def test_learns_the_median_warmup_rate():
    samples = warmup(0, rate=1.5) + warmup(10_000, rate=2.0) + warmup(20_000, rate=3.0)
    rate = p.learn_rate(samples)
    assert rate.warmups == 3
    assert abs(rate.per_hour - 2.0) < 0.05


def test_needs_enough_warmups():
    rate = p.learn_rate(warmup(0) + warmup(10_000))
    assert rate == p.Rate(None, 2)


def test_ignores_short_runs_and_keeping_warm():
    samples = (
        warmup(0, minutes=10)  # too short
        + warmup(10_000, start=19.6, target=20.0)  # already near the target
        + warmup(20_000) + warmup(30_000) + warmup(40_000)
    )
    assert p.learn_rate(samples).warmups == 3


def test_plans_the_next_rise():
    # Monday 05:00, 17 °C, warming 2 °C/h: 3 °C to 20 °C is 90 min + margin.
    plan = p.plan(WEEK, weekday=0, minute=5 * 60, current=17.0, rate=2.0, max_lead=120)
    assert plan == p.Plan(minutes_until=90, setpoint=20.0, start_in=90 - 100, lead=100)


def test_waits_until_it_needs_to_start():
    plan = p.plan(WEEK, weekday=0, minute=16 * 60, current=19.0, rate=2.0, max_lead=120)
    assert plan.minutes_until == 60 and plan.lead == 70 and plan.start_in == -10
    plan = p.plan(WEEK, weekday=0, minute=15 * 60 + 30, current=20.0, rate=2.0, max_lead=120)
    assert plan.start_in == 90 - 40


def test_no_plan_for_drops_off_or_far_away():
    # 07:00 → next is 09:00 16 °C (a drop)
    assert p.plan(WEEK, weekday=0, minute=7 * 60, current=17.0, rate=2.0, max_lead=120) is None
    # 23:00 → next is 06:30 tomorrow, too far off
    assert p.plan(WEEK, weekday=0, minute=23 * 60, current=15.0, rate=2.0, max_lead=120) is None
    # Already warm
    assert p.plan(WEEK, weekday=0, minute=16 * 60, current=20.8, rate=2.0, max_lead=120) is None
    # Not learned yet
    assert p.plan(WEEK, weekday=0, minute=16 * 60, current=17.0, rate=None, max_lead=120) is None


def test_lead_is_capped_and_wraps_to_tomorrow():
    # Sunday 05:00 (after Saturday's 22:30 off), very cold: capped at max_lead.
    plan = p.plan(WEEK, weekday=6, minute=5 * 60, current=10.0, rate=1.0, max_lead=120)
    assert plan.lead == 120 and plan.start_in == -30
    # Sunday 23:00 → Monday 06:30 is 450 min away
    plan = p.plan(WEEK, weekday=6, minute=23 * 60, current=10.0, rate=1.0, max_lead=480)
    assert plan.minutes_until == 450


def test_missing_days_mean_no_plan():
    assert p.plan({"monday": DAY}, weekday=0, minute=5 * 60, current=17.0, rate=2.0, max_lead=120) is None
    assert p.plan({"tuesday": DAY}, weekday=0, minute=5 * 60, current=17.0, rate=2.0, max_lead=120) is None
