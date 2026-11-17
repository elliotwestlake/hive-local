"""Pick Hive receivers out of Z2M's bridge/devices list (no HA imports, so unit-testable).

bridge/devices is a retained JSON list. Each entry looks like:

    {"friendly_name": "Hive Receiver", "ieee_address": "0x...",
     "definition": {"vendor": "Hive", "model": "SLR2b",
                    "exposes": [{"type": "climate", "endpoint": "heat", ...}, ...]}}

Receivers expose a "climate" feature. SLR2-style receivers expose one per
endpoint (heat/water), which is exactly when Z2M suffixes keys with _heat/_water.
"""

from __future__ import annotations

from typing import Any


def hive_receivers(devices: Any) -> list[dict[str, Any]]:
    """Return [{"name", "model", "multi_endpoint"}] for each Hive receiver, sorted by name."""
    found = []
    for dev in devices if isinstance(devices, list) else []:
        if not isinstance(dev, dict) or not dev.get("friendly_name"):
            continue
        definition = dev.get("definition") or {}
        if definition.get("vendor") != "Hive":
            continue
        climates = [
            e
            for e in definition.get("exposes") or []
            if isinstance(e, dict) and e.get("type") == "climate"
        ]
        if not climates:
            continue  # thermostats, plugs, bulbs etc.
        found.append(
            {
                "name": dev["friendly_name"],
                "model": definition.get("model") or "Hive",
                "multi_endpoint": any(e.get("endpoint") for e in climates),
            }
        )
    return sorted(found, key=lambda d: d["name"].lower())
