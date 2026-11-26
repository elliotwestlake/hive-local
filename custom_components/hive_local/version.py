"""Our version and whether the Marketplace (formerly HACS) offers a newer one. Pure: no HA imports.

The Marketplace keeps an `update` entity per downloaded repository (platform `hacs`), titled with
the repository's name from `hacs.json` ("Hive Local"). Its state is "on" while a newer release
is available (and not skipped).
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

NAMES = ("hive local", "hive-local", "hive_local")


@dataclass(frozen=True)
class UpdateEntity:
    """An `update` entity as the entity registry and state machine see it."""

    entity_id: str
    platform: str
    state: str | None
    attributes: dict[str, Any]


def is_ours(entity: UpdateEntity) -> bool:
    """The Marketplace's update entity for Hive Local."""
    if entity.platform != "hacs":
        return False
    title = str(entity.attributes.get("title") or "").strip().lower()
    return title in NAMES or any(n.replace(" ", "_") in entity.entity_id for n in NAMES)


def update_info(entities: list[UpdateEntity]) -> dict[str, Any] | None:
    """What the panel shows about updates, or None when the Marketplace isn't tracking us."""
    for entity in entities:
        if not is_ours(entity):
            continue
        attrs = entity.attributes
        latest = attrs.get("latest_version")
        return {
            "entity_id": entity.entity_id,
            "available": entity.state == "on" and bool(latest),
            "installed_version": attrs.get("installed_version"),
            "latest_version": latest,
            "release_url": attrs.get("release_url"),
        }
    return None
