"""Saving boost deadlines across restarts (pure, no HA imports).

Stored per receiver as {channel: {"deadline": ISO 8601 UTC, "resume": [mode, setpoint]}}.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

# What a boost can go back to; anything else in the store is ignored.
RESUME_MODES = ("schedule", "manual", "off")


def encode(
    deadlines: dict[str, datetime], resume: dict[str, tuple[str, float | None]]
) -> dict[str, Any]:
    """The store's contents for these running boosts."""
    out: dict[str, Any] = {}
    for channel, deadline in deadlines.items():
        item: dict[str, Any] = {"deadline": deadline.astimezone(timezone.utc).isoformat()}
        if channel in resume:
            mode, setpoint = resume[channel]
            item["resume"] = [mode, setpoint]
        out[channel] = item
    return out


def decode(
    data: Any, channels: tuple[str, ...]
) -> tuple[dict[str, datetime], dict[str, tuple[str, float | None]]]:
    """(deadlines, resume modes) from the store, skipping anything malformed."""
    deadlines: dict[str, datetime] = {}
    resume: dict[str, tuple[str, float | None]] = {}
    if not isinstance(data, dict):
        return deadlines, resume
    for channel in channels:
        item = data.get(channel)
        if not isinstance(item, dict):
            continue
        try:
            deadline = datetime.fromisoformat(item["deadline"])
        except (KeyError, TypeError, ValueError):
            continue
        if deadline.tzinfo is None:
            deadline = deadline.replace(tzinfo=timezone.utc)
        deadlines[channel] = deadline
        saved = item.get("resume")
        if (
            isinstance(saved, list)
            and len(saved) == 2
            and saved[0] in RESUME_MODES
            and (saved[1] is None or isinstance(saved[1], (int, float)))
        ):
            resume[channel] = (saved[0], saved[1])
    return deadlines, resume
