import importlib, pathlib, sys, types
from datetime import UTC, datetime, timezone
from zoneinfo import ZoneInfo

# trv.py imports its siblings, so load it as part of a bare package (skipping __init__.py).
pkg = types.ModuleType("hl"); pkg.__path__ = [str(pathlib.Path(__file__).parents[1] / "custom_components/hive_local")]
sys.modules.setdefault("hl", pkg)
v = importlib.import_module("hl.trv")

LONDON = ZoneInfo("Europe/London")
SYDNEY = ZoneInfo("Australia/Sydney")


def test_valve_address():
    assert v.valve_address({("zha", "00:1e:5e:09:02:a3:b4:c5")}) == ("zha", "00:1e:5e:09:02:a3:b4:c5")
    assert v.valve_address({("mqtt", "zigbee2mqtt_0x00158d0001234567")}) == ("z2m", "0x00158d0001234567")
    # Z2M's bridge isn't a device we'd schedule; nor is anything else.
    assert v.valve_address({("mqtt", "zigbee2mqtt_bridge_0x00124b00")}) is None
    assert v.valve_address({("zigbee_a", "x")}) is None


def test_z2m_friendly_name():
    devices = [{"friendly_name": "Coordinator"}, {"friendly_name": "Lounge valve", "ieee_address": "0x00158D0001234567"}]
    assert v.z2m_friendly_name(devices, "0x00158d0001234567") == "Lounge valve"
    assert v.z2m_friendly_name(devices, "0x1") is None
    assert v.z2m_friendly_name(None, "0x1") is None


def test_parse_z2m_day():
    # Padding repeats collapse, the day is sorted, and junk is skipped.
    assert v.parse_z2m_day("06:00/21 22:00/17 22:00/17 08:30/17.5 68:15/15 nonsense") == [
        {"time": "06:00", "setpoint": 21.0},
        {"time": "08:30", "setpoint": 17.5},
        {"time": "22:00", "setpoint": 17.0},
    ]
    # Below the valve's 5 °C minimum reads as 5 °C ("off"), so it can be written back.
    assert v.parse_z2m_day("07:00/0") == [{"time": "07:00", "setpoint": 5.0}]
    assert v.parse_z2m_day("") is None and v.parse_z2m_day(None) is None


def test_parse_z2m_state():
    state = {"schedule_monday": "06:00/21 22:00/17", "schedule_sunday": "08:00/20", "local_temperature": 19}
    assert v.parse_z2m_state(state) == {
        "monday": [{"time": "06:00", "setpoint": 21.0}, {"time": "22:00", "setpoint": 17.0}],
        "sunday": [{"time": "08:00", "setpoint": 20.0}],
    }


def test_z2m_payloads_one_per_day_not_padded():
    day = [{"time": "06:30", "setpoint": 20.5}, {"time": "22:00", "setpoint": 5.0}]
    assert v.z2m_payloads({"saturday": day, "monday": day}) == [
        {"schedule_monday": "06:30/20.5 22:00/5"},
        {"schedule_saturday": "06:30/20.5 22:00/5"},
    ]


def test_combine_reads():
    a = [{"time": "06:00", "setpoint": 20.0}]
    b = [{"time": "07:00", "setpoint": 19.0}]
    assert v.combine_reads([]) == ({}, [])
    # The first valve with the most days wins; the others fill in; disagreements listed.
    schedule, differs = v.combine_reads([{"monday": a}, {"monday": b, "tuesday": a}, {"wednesday": a}])
    assert schedule == {"monday": b, "tuesday": a, "wednesday": a}
    assert differs == ["monday"]


def test_zcl_time():
    assert v.zcl_time(datetime(2000, 1, 1, tzinfo=UTC)) == 0
    when = datetime(2026, 11, 25, 12, tzinfo=UTC)
    assert v.zcl_time(when) == int(when.timestamp()) - 946_684_800  # the Unix time of 2000-01-01


def test_dst_period_london():
    start, end, shift = v.dst_period(datetime(2026, 7, 1, tzinfo=UTC), LONDON)
    assert (start, end, shift) == (datetime(2026, 3, 29, 1, tzinfo=UTC), datetime(2026, 10, 25, 1, tzinfo=UTC), 3600)
    # In winter it's the next summer's.
    assert v.dst_period(datetime(2026, 11, 25, tzinfo=UTC), LONDON)[0] == datetime(2027, 3, 28, 1, tzinfo=UTC)
    assert v.dst_period(datetime(2026, 7, 1, tzinfo=UTC), timezone.utc) is None


def test_dst_period_southern_hemisphere():
    # Sydney's summer runs across the new year.
    start, end, shift = v.dst_period(datetime(2026, 1, 15, tzinfo=UTC), SYDNEY)
    assert start.year == 2025 and start.month == 10 and end.year == 2026 and end.month == 4 and shift == 3600


def test_time_attributes_and_offset_round_trip():
    for now, tz in [
        (datetime(2026, 7, 1, 12, tzinfo=UTC), LONDON),
        (datetime(2026, 11, 25, 12, tzinfo=UTC), LONDON),
        (datetime(2026, 1, 15, 3, tzinfo=UTC), SYDNEY),
        (datetime(2026, 7, 1, 12, tzinfo=UTC), ZoneInfo("Asia/Kolkata")),
    ]:
        attrs = v.time_attributes(now, tz)
        assert attrs["time"] == v.zcl_time(now) and attrs["time_status"] == 0x02
        # A valve given these attributes has HA's local time.
        assert v.clock_offset(attrs, now, tz) == 0, (now, tz, attrs)
    summer = v.time_attributes(datetime(2026, 7, 1, 12, tzinfo=UTC), LONDON)
    assert summer["time_zone"] == 0 and summer["dst_shift"] == 3600
    india = v.time_attributes(datetime(2026, 7, 1, 12, tzinfo=UTC), ZoneInfo("Asia/Kolkata"))
    assert india["time_zone"] == 19800 and india["dst_shift"] == 0 and india["dst_start"] == 0xFFFFFFFF


def test_clock_offset():
    now = datetime(2026, 7, 1, 12, tzinfo=UTC)
    good = v.time_attributes(now, LONDON)
    # The valve's own local_time wins when it has one.
    assert v.clock_offset({"local_time": v.zcl_time(now) + 3600 + 90}, now, LONDON) == 90
    # No DST set (what ZHA's Danfoss quirk writes): an hour behind all summer.
    assert v.clock_offset(good | {"dst_shift": 0}, now, LONDON) == -3600
    # Never set: unknown.
    assert v.clock_offset({"time": 0xFFFFFFFF}, now, LONDON) is None
    assert v.clock_offset({}, now, LONDON) is None
    assert v.clock_ok(120) and v.clock_ok(-60) and not v.clock_ok(121) and not v.clock_ok(None)
    # After the clocks go back, the same DST attributes no longer apply.
    winter = datetime(2026, 11, 25, 12, tzinfo=UTC)
    assert v.clock_offset(v.time_attributes(winter, LONDON) | {"time": v.zcl_time(winter)}, winter, LONDON) == 0
    assert v.clock_offset(good | {"time": v.zcl_time(winter)}, winter, LONDON) == 0
