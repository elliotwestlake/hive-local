"""hive_local.test_timed_hold: does the receiver end a manual hold by itself?

Temporary, for the holiday fail-safe (#6). Sends a manual hold with a hold duration in
one write, reads the hold back every 30 s until a few minutes past the duration, and
says what happened in a notification. Puts the heating back to its previous mode if
the hold is still on at the end.
"""

from __future__ import annotations

import asyncio
import logging
import time
from typing import Any

from homeassistant.components import persistent_notification
from homeassistant.core import HomeAssistant

from .const import CHANNEL_HEAT
from .data import HiveConfigEntry
from .z2m import MODE_MANUAL

_LOGGER = logging.getLogger(__name__)

NOTIFICATION = "hive_local_timed_hold_test"
POLL_SECONDS = 30
EXTRA_MINUTES = 4


def _held(reading: dict[str, Any]) -> bool:
    return reading.get("hold") in (1, True, "1", "true")


def _line(seconds: float, reading: dict[str, Any] | None, error: str | None = None) -> str:
    at = f"{int(seconds // 60)}:{int(seconds % 60):02d}"
    if error:
        return f"| {at} | – | – | {error} |"
    return f"| {at} | {reading.get('hold')} | {reading.get('duration')} | {reading.get('system_mode')} |"


async def async_run(hass: HomeAssistant, entry: HiveConfigEntry, temperature: float, minutes: int) -> None:
    transport = entry.runtime_data.transport
    status = transport.status(CHANNEL_HEAT) or {}
    restore = transport.resume_state(CHANNEL_HEAT) if status.get("mode") == "boost" else (status.get("mode") or "schedule", status.get("setpoint"))
    persistent_notification.async_create(
        hass,
        f"Holding {temperature}° for {minutes} min with a hold duration. Results in about {minutes + EXTRA_MINUTES} min.",
        "Hive Local: timed hold test running",
        NOTIFICATION,
    )
    lines = ["| Time | Hold | Duration | System mode |", "|---|---|---|---|"]
    start = time.monotonic()
    ended_at: float | None = None
    try:
        await transport.async_timed_hold(CHANNEL_HEAT, temperature, minutes)
    except Exception as err:  # noqa: BLE001 - report it
        persistent_notification.async_create(
            hass, f"The receiver didn't accept the write: {err}", "Hive Local: timed hold test", NOTIFICATION
        )
        return
    await asyncio.sleep(3)
    deadline = start + (minutes + EXTRA_MINUTES) * 60
    while True:
        elapsed = time.monotonic() - start
        try:
            reading = await transport.async_read_hold(CHANNEL_HEAT)
        except Exception as err:  # noqa: BLE001 - keep going
            lines.append(_line(elapsed, None, f"read failed: {err}"))
        else:
            _LOGGER.info("Timed hold test at %.0f s: %s", elapsed, reading)
            lines.append(_line(elapsed, reading))
            if not _held(reading):
                ended_at = elapsed
                break
        if time.monotonic() >= deadline:
            break
        await asyncio.sleep(POLL_SECONDS)

    if ended_at is None:
        verdict = (
            f"**No.** Still on a manual hold after {minutes + EXTRA_MINUTES} min, so the receiver ignores the "
            f"duration on a manual hold. Putting the heating back to {restore[0]}."
        )
        try:
            await transport.async_set_mode(CHANNEL_HEAT, restore[0], restore[1] if restore[0] == MODE_MANUAL else None)
        except Exception as err:  # noqa: BLE001
            verdict += f" That failed ({err}): set it back yourself."
    elif ended_at < 60:
        verdict = f"**Inconclusive.** The hold was gone {ended_at:.0f} s after the write: the receiver didn't keep it."
    elif abs(ended_at - minutes * 60) <= 3 * 60:
        verdict = f"**Yes.** The receiver ended the hold by itself after {ended_at / 60:.1f} min (asked for {minutes})."
    else:
        verdict = f"**Unclear.** The hold ended after {ended_at / 60:.1f} min, but {minutes} were asked for. Did something else change it?"
    persistent_notification.async_create(
        hass, verdict + "\n\n" + "\n".join(lines), "Hive Local: timed hold test", NOTIFICATION
    )
