"""Room boosts (house-wide): a room's valves at a temperature for a while, then back.

`room_boost.py` decides; this sets the valves through their climate entities, keeps the
boosts in `.storage/hive_local.room_boost` (so a restart still ends them on time and puts
the targets back), and pokes each receiver's rooms demand, which fires the boiler for a
boosted room even when "Rooms call for heat" is off.
"""

from __future__ import annotations

import logging
from collections.abc import Callable
from datetime import datetime, timedelta
from typing import TYPE_CHECKING, Any

from homeassistant.const import ATTR_TEMPERATURE, EVENT_HOMEASSISTANT_STOP
from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from . import room_boost as rb
from .const import DOMAIN, SIGNAL_STATUS

if TYPE_CHECKING:
    from .room_manager import RoomManager

_LOGGER = logging.getLogger(__name__)

DATA_ROOM_BOOSTS = f"{DOMAIN}_room_boosts"
STORE_VERSION = 1
TICK = timedelta(seconds=30)
# Give up putting a valve's target back after this long (it's gone, or never comes back).
RESTORE_GIVE_UP = 6 * 3600


class RoomBoosts:
    def __init__(self, hass: HomeAssistant, rooms: RoomManager) -> None:
        self.hass = hass
        self.rooms = rooms
        self.boosts: dict[str, rb.Boost] = {}
        # Targets still to put back (a valve was unavailable when its boost ended): room → entity → (target, since).
        self.pending: dict[str, dict[str, tuple[float, float]]] = {}
        self._store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, f"{DOMAIN}.room_boost")
        self._unsub: Callable[[], None] | None = None

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        for raw in data.get("boosts") or []:
            if boost := rb.Boost.from_store(raw):
                self.boosts[boost.room_id] = boost
        for room_id, targets in (data.get("pending") or {}).items():
            self.pending[room_id] = {e: (float(t), float(s)) for e, (t, s) in targets.items()}

    @callback
    def start(self) -> None:
        self._unsub = async_track_time_interval(self.hass, self._tick, TICK)
        # House-wide, so nothing unloads it: stop when HA stops.
        self.hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, self.stop)

    @callback
    def stop(self, _event: Event | None = None) -> None:
        if self._unsub:
            self._unsub()
            self._unsub = None

    # -- what the rest asks ---------------------------------------------------------

    def get(self, room_id: str) -> rb.Boost | None:
        return self.boosts.get(room_id)

    def active_rooms(self, entry_id: str) -> list[str]:
        """Names of the boosted rooms this receiver heats (rooms with no receiver count for any)."""
        names = []
        for room in self.rooms.rooms:
            if room["id"] in self.boosts and room.get("receiver") in (entry_id, None):
                names.append(room.get("name") or room["id"])
        return names

    def as_dict(self, room_id: str) -> dict[str, Any] | None:
        boost = self.boosts.get(room_id)
        if boost is None:
            return None
        now = dt_util.utcnow().timestamp()
        return {
            "until": dt_util.as_local(dt_util.utc_from_timestamp(boost.until)).isoformat(),
            "temperature": boost.temperature,
            "remaining": boost.remaining(now),
        }

    # -- starting and ending -----------------------------------------------------------

    async def async_boost(self, room_id: str, minutes: Any, temperature: Any) -> list[str]:
        """Boost a room (or change a running boost). Returns the valves that refused."""
        minutes, temperature = rb.check(minutes, temperature)
        room = self.rooms._room(room_id)  # noqa: SLF001 - raises RoomError if it's gone
        now = dt_util.utcnow().timestamp()
        running = self.boosts.get(room_id)
        targets = {e: self._target(e) for e in room["valves"]}
        # A target still waiting to go back from an earlier boost is the real one.
        for entity_id, (target, _since) in self.pending.pop(room_id, {}).items():
            if entity_id in targets:
                targets[entity_id] = target
        boost = rb.start(room_id, targets, minutes, temperature, now, running)
        self.boosts[room_id] = boost
        _LOGGER.info("Boosting %s to %s °C for %s min", room.get("name"), temperature, minutes)
        failed = await self._async_set(room["valves"], temperature)
        self._save()
        for entry in self.hass.config_entries.async_loaded_entries(DOMAIN):
            if (demand := getattr(entry.runtime_data, "demand", None)) is not None:
                demand.room_boosted()
        self._changed()
        return failed

    async def async_set_temperature(self, room_id: str, temperature: float) -> list[str]:
        """The room's target changed while boosting: boost to that instead, keeping the time left."""
        boost = self.boosts[room_id]
        boost.temperature = temperature
        self._save()
        failed = await self._async_set(self.rooms._room(room_id)["valves"], temperature)  # noqa: SLF001
        self._changed()
        return failed

    async def async_cancel(self, room_id: str, why: str = "stopped") -> None:
        boost = self.boosts.pop(room_id, None)
        if boost is None:
            return
        try:
            valves = self.rooms._room(room_id)["valves"]  # noqa: SLF001
        except Exception:  # noqa: BLE001 - the room was deleted
            valves = []
        _LOGGER.info("Room boost over (%s): putting the valves' targets back", why)
        now = dt_util.utcnow().timestamp()
        for entity_id, target in rb.restore(boost, valves).items():
            if not await self._async_set_one(entity_id, target):
                self.pending.setdefault(room_id, {})[entity_id] = (target, now)
        self._save()
        self._changed()

    @callback
    def room_deleted(self, room_id: str) -> None:
        if self.boosts.pop(room_id, None) or self.pending.pop(room_id, None):
            self._save()
            self._changed()

    # -- the clock -------------------------------------------------------------------------

    async def _tick(self, _now: datetime | None = None) -> None:
        now = dt_util.utcnow().timestamp()
        for room_id, boost in list(self.boosts.items()):
            if boost.over(now):
                await self.async_cancel(room_id, "time's up")
        if self.pending:
            await self._async_retry(now)
        if self.boosts:
            self._changed(rooms_only=True)  # the time left counts down

    async def _async_retry(self, now: float) -> None:
        changed = False
        for room_id, targets in list(self.pending.items()):
            for entity_id, (target, since) in list(targets.items()):
                if await self._async_set_one(entity_id, target) or now - since > RESTORE_GIVE_UP:
                    del targets[entity_id]
                    changed = True
            if not targets:
                del self.pending[room_id]
        if changed:
            self._save()

    # -- valves -------------------------------------------------------------------------------

    def _target(self, entity_id: str) -> float | None:
        state = self.hass.states.get(entity_id)
        value = state.attributes.get(ATTR_TEMPERATURE) if state else None
        return float(value) if isinstance(value, (int, float)) and not isinstance(value, bool) else None

    async def _async_set(self, valves: list[str], temperature: float) -> list[str]:
        return [e for e in valves if not await self._async_set_one(e, temperature)]

    async def _async_set_one(self, entity_id: str, temperature: float) -> bool:
        state = self.hass.states.get(entity_id)
        if state is None or state.state in ("unavailable", "unknown"):
            return False
        try:
            await self.hass.services.async_call(
                "climate", "set_temperature", {"entity_id": entity_id, ATTR_TEMPERATURE: temperature}, blocking=True
            )
        except HomeAssistantError:
            _LOGGER.warning("Couldn't set %s to %s °C", entity_id, temperature)
            return False
        return True

    # -- telling the rest ---------------------------------------------------------------------

    @callback
    def _save(self) -> None:
        self._store.async_delay_save(
            lambda: {
                "boosts": [b.as_store() for b in self.boosts.values()],
                "pending": {r: {e: list(v) for e, v in t.items()} for r, t in self.pending.items()},
            },
            1,
        )

    @callback
    def _changed(self, rooms_only: bool = False) -> None:
        from .room_manager import SIGNAL_ROOMS  # noqa: PLC0415 - avoid an import cycle

        async_dispatcher_send(self.hass, SIGNAL_ROOMS)
        if rooms_only:
            return
        # Each receiver's rooms demand acts on it at once rather than at its next minute.
        for entry in self.hass.config_entries.async_loaded_entries(DOMAIN):
            if (demand := getattr(entry.runtime_data, "demand", None)) is not None:
                demand.poke()
        async_dispatcher_send(self.hass, SIGNAL_STATUS)

    def diagnostics(self) -> dict[str, Any]:
        return {
            "boosts": [b.as_store() for b in self.boosts.values()],
            "pending": {r: {e: list(v) for e, v in t.items()} for r, t in self.pending.items()},
        }
