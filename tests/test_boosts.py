"""Saved boost deadlines (boosts.py)."""

from __future__ import annotations

import importlib.util
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

_PATH = Path(__file__).parent.parent / "custom_components" / "hive_local" / "boosts.py"
_spec = importlib.util.spec_from_file_location("hive_boosts", _PATH)
boosts = importlib.util.module_from_spec(_spec)
sys.modules["hive_boosts"] = boosts
_spec.loader.exec_module(boosts)

T = datetime(2026, 11, 23, 18, 30, tzinfo=timezone.utc)


def test_round_trip():
    deadlines = {"heat": T, "water": T + timedelta(minutes=30)}
    resume = {"heat": ("manual", 19.5), "water": ("schedule", None)}
    data = boosts.encode(deadlines, resume)
    assert data["heat"] == {"deadline": "2026-11-23T18:30:00+00:00", "resume": ["manual", 19.5]}
    assert boosts.decode(data, ("heat", "water")) == (deadlines, resume)


def test_local_times_saved_as_utc():
    local = T.astimezone(timezone(timedelta(hours=1)))
    assert boosts.encode({"heat": local}, {})["heat"]["deadline"] == "2026-11-23T18:30:00+00:00"


def test_decode_skips_bad_and_unknown_channels():
    data = {
        "heat": {"deadline": "2026-11-23T18:30:00", "resume": ["boost", 21]},
        "water": {"deadline": "not a date"},
        "other": {"deadline": "2026-11-23T18:30:00+00:00"},
    }
    deadlines, resume = boosts.decode(data, ("heat", "water"))
    assert deadlines == {"heat": T}  # naive times are UTC
    assert resume == {}  # "boost" isn't something to go back to


def test_decode_nothing_saved():
    assert boosts.decode(None, ("heat",)) == ({}, {})
    assert boosts.decode([], ("heat",)) == ({}, {})
