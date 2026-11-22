import importlib.util, pathlib, sys

spec = importlib.util.spec_from_file_location(
    "stats", pathlib.Path(__file__).parents[1] / "custom_components/hive_local/stats.py")
st = importlib.util.module_from_spec(spec); sys.modules["stats"] = st; spec.loader.exec_module(st)
S = st.Sample
H = 3600


def run(samples, start=0, end=4 * H, **kw):
    kw.setdefault("day_starts", [start])
    kw.setdefault("bucket_starts", [start])
    kw.setdefault("period_end", end)
    return st.summarise(samples, start, end, **kw)


def test_heating_time_modes_and_cycles():
    samples = [
        S(-H, "schedule", heating=True, current=18.0, target=20.0),  # carried in: not a new cycle
        S(1 * H, "schedule", heating=False, current=20.0, target=20.0),
        S(2 * H, "boost", heating=True, current=20.0, target=22.0),
        S(3 * H, "off", heating=False, current=22.0),
    ]
    s = run(samples)
    assert s["heating_minutes"] == 120
    assert s["cycles"] == 1 and s["boosts"] == 1
    assert s["mode_minutes"] == {"schedule": 120, "manual": 0, "off": 60, "boost": 60}
    assert s["temperature"] == {"avg": 20.0, "min": 18.0, "max": 22.0}
    # Off doesn't count towards the average target.
    assert s["target_avg"] == 20.7


def test_unavailable_and_gaps_count_for_nothing():
    samples = [S(H, None), S(2 * H, "manual", heating=True, current=19.0)]
    s = run(samples)
    assert s["unknown_minutes"] == 60 and s["known_minutes"] == 120 and s["heating_minutes"] == 120
    assert s["has_data"]
    assert not run([])["has_data"]
    # Coming back from unavailable while heating is a new cycle.
    assert s["cycles"] == 1


def test_days_buckets_and_future():
    samples = [S(0, "schedule", heating=True, current=19.0, target=20.0), S(H, "schedule", current=20.0)]
    s = run(samples, end=2 * H, day_starts=[0, 3 * H], bucket_starts=[0, H, 2 * H, 3 * H], period_end=4 * H)
    assert [d["heating_minutes"] for d in s["days"]] == [60, None]
    assert [b["heating"] for b in s["series"]] == [1.0, 0.0, None, None]
    assert [b["current"] for b in s["series"]][:2] == [19.0, 20.0]


def test_previous_period():
    samples = [S(-4 * H, "schedule", heating=True), S(-3 * H, "schedule"), S(0, "off")]
    s = run(samples, previous=(-4 * H, 0))
    assert s["previous"]["heating_minutes"] == 60 and s["heating_minutes"] == 0


def test_sample_from_state():
    c = st.sample_from_state("heat", 5, "auto", {"preset_mode": "boost", "hvac_action": "heating",
                                                 "current_temperature": 19.5, "temperature": 21})
    assert c == S(5, "boost", True, 19.5, 21.0)
    assert st.sample_from_state("heat", 5, "unavailable", {}).mode is None
    assert st.sample_from_state("heat", 5, "heat", {"hvac_action": "idle"}).mode == "manual"
    w = st.sample_from_state("water", 5, "on", {"heating": True})
    assert w.mode == "manual" and w.heating
    assert not st.sample_from_state("water", 5, "off", {"heating": True}).heating


def test_days_have_temperature_range():
    samples = [S(0, "schedule", current=18.0), S(H, "schedule", current=20.5), S(2 * H, "schedule", current=19.0)]
    s = run(samples, end=3 * H, day_starts=[0], period_end=3 * H)
    assert (s["days"][0]["temp_min"], s["days"][0]["temp_max"]) == (18.0, 20.5)
