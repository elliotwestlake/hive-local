"""A climate entity per room, with the same controls as the heating's.

auto = the valves follow their own weekly schedule (#5), heat = they hold the
room's target, off = they go to their lowest (5 °C; a Hive valve can't switch off) and get
their targets back when it's turned on again. Boost is a preset: a room boost (the valves
for a while, and the boiler), with the receiver's heating boost length and temperature.

Rooms are house-wide; each receiver adds the rooms it heats (`receiver`), and adds or
removes them as rooms change. Each room is its own device, linked to the receiver, so it
can go in an area.
"""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.components.climate import (
    ATTR_HVAC_MODE,
    PRESET_BOOST,
    PRESET_NONE,
    ClimateEntity,
    ClimateEntityFeature,
    HVACAction,
    HVACMode,
)
from homeassistant.const import ATTR_TEMPERATURE, UnitOfTemperature
from homeassistant.core import Event, EventStateChangedData, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers import device_registry as dr, entity_registry as er
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.helpers.event import async_track_state_change_event

from .const import CHANNEL_HEAT, DOMAIN
from .data import HiveConfigEntry
from .room_boost import VALVE_MAX, VALVE_MIN, RoomBoostError
from .room_boost_controller import DATA_ROOM_BOOSTS, RoomBoosts
from .room_manager import (
    DATA_ROOMS,
    ROOM_MANUAL,
    ROOM_OFF,
    ROOM_SCHEDULE,
    SIGNAL_ROOMS,
    RoomManager,
)
from .rooms import RoomError, summarise

TO_HVAC = {ROOM_SCHEDULE: HVACMode.AUTO, ROOM_MANUAL: HVACMode.HEAT, ROOM_OFF: HVACMode.OFF}
FROM_HVAC = {v: k for k, v in TO_HVAC.items()}


def _ours(hass: HomeAssistant, entry: HiveConfigEntry, room: dict[str, Any]) -> bool:
    """This receiver heats the room (a room without one belongs to the first receiver)."""
    if room.get("receiver"):
        return room["receiver"] == entry.entry_id
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    return bool(entries) and entries[0].entry_id == entry.entry_id


@callback
def async_setup_rooms(hass: HomeAssistant, entry: HiveConfigEntry, add: AddConfigEntryEntitiesCallback) -> None:
    """Add a climate entity for each room this receiver heats, now and as rooms are added."""
    rooms: RoomManager = hass.data[DATA_ROOMS]
    known: set[str] = set()

    @callback
    def _add_new(*_args: Any) -> None:
        new = [r for r in rooms.rooms if r["id"] not in known and _ours(hass, entry, r)]
        known.update(r["id"] for r in new)
        if new:
            add([RoomClimate(entry, rooms, r["id"], known) for r in new])

    _add_new()
    entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_ROOMS, _add_new))


class RoomClimate(ClimateEntity):
    _attr_has_entity_name = True
    _attr_name = None  # the room's device name
    _attr_should_poll = False
    _attr_hvac_modes = list(TO_HVAC.values())
    _attr_supported_features = (
        ClimateEntityFeature.TARGET_TEMPERATURE
        | ClimateEntityFeature.PRESET_MODE
        | ClimateEntityFeature.TURN_ON
        | ClimateEntityFeature.TURN_OFF
    )
    _attr_preset_modes = [PRESET_NONE, PRESET_BOOST]
    _attr_temperature_unit = UnitOfTemperature.CELSIUS
    _attr_target_temperature_step = 0.5
    _attr_min_temp = VALVE_MIN
    _attr_max_temp = VALVE_MAX

    def __init__(self, entry: HiveConfigEntry, rooms: RoomManager, room_id: str, known: set[str]) -> None:
        self._entry = entry
        self._rooms = rooms
        self._room_id = room_id
        self._known = known
        self._unsub_states: Callable[[], None] | None = None
        room = rooms._room(room_id)  # noqa: SLF001
        self._attr_unique_id = f"room_{room_id}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, f"room_{room_id}")},
            name=room["name"],
            manufacturer="Hive Local",
            model="Room",
            via_device=(DOMAIN, entry.entry_id),
        )

    # -- the room -------------------------------------------------------------------------

    @property
    def _room(self) -> dict[str, Any] | None:
        return next((r for r in self._rooms.rooms if r["id"] == self._room_id), None)

    @property
    def _boosts(self) -> RoomBoosts:
        return self.hass.data[DATA_ROOM_BOOSTS]

    def _summary(self) -> dict[str, Any]:
        room = self._room
        if room is None:
            return {}
        valves = [self._rooms._valve(v) for v in room["valves"]]  # noqa: SLF001
        sensor = self.hass.states.get(room["sensor"]) if room.get("sensor") else None
        return summarise(valves, sensor.state if sensor else None)

    @property
    def available(self) -> bool:
        summary = self._summary()
        return bool(summary) and len(summary.get("unavailable", [])) < len(self._room["valves"])  # type: ignore[index]

    # -- state ---------------------------------------------------------------------------------

    @property
    def hvac_mode(self) -> HVACMode | None:
        return TO_HVAC.get(self._rooms.mode(self._room_id)) if self._room else None

    @property
    def hvac_action(self) -> HVACAction | None:
        if self.hvac_mode == HVACMode.OFF and self._boosts.get(self._room_id) is None:
            return HVACAction.OFF
        return HVACAction.HEATING if self._summary().get("heating") else HVACAction.IDLE

    @property
    def preset_mode(self) -> str:
        return PRESET_BOOST if self._boosts.get(self._room_id) else PRESET_NONE

    @property
    def current_temperature(self) -> float | None:
        return self._summary().get("current_temperature")

    @property
    def target_temperature(self) -> float | None:
        if boost := self._boosts.get(self._room_id):
            return boost.temperature
        if self.hvac_mode == HVACMode.OFF:
            return None
        summary = self._summary()
        if summary.get("target") is not None:
            return summary["target"]
        spread = summary.get("target_range")
        return spread[1] if spread else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        summary, boost = self._summary(), self._boosts.as_dict(self._room_id)
        return {
            "valves": list(self._room["valves"]) if self._room else [],
            "target_range": summary.get("target_range"),
            "boost_until": boost["until"] if boost else None,
            "boost_remaining": boost["remaining"] if boost else None,
        }

    # -- controls ------------------------------------------------------------------------------

    async def async_set_temperature(self, **kwargs: Any) -> None:
        """Boosting: the boost's temperature (keeping the time left). Off: turns it on (heat).
        Otherwise every valve's target (on auto, until the valves' next scheduled change)."""
        if (hvac_mode := kwargs.get(ATTR_HVAC_MODE)) is not None and (
            hvac_mode == HVACMode.OFF or kwargs.get(ATTR_TEMPERATURE) is None
        ):
            await self.async_set_hvac_mode(hvac_mode)
            return
        if (temperature := kwargs.get(ATTR_TEMPERATURE)) is None:
            return
        if hvac_mode is None and self._boosts.get(self._room_id):
            await self._run(self._boosts.async_set_temperature(self._room_id, temperature))
            return
        mode = hvac_mode or self.hvac_mode
        if mode == HVACMode.OFF:
            mode = HVACMode.HEAT
        if mode != self.hvac_mode:
            await self.async_set_hvac_mode(mode)
        await self._run(self._rooms.async_set_target(self._room_id, temperature))

    async def async_set_hvac_mode(self, hvac_mode: HVACMode) -> None:
        await self._run(self._rooms.async_set_mode(self._room_id, FROM_HVAC[hvac_mode]))

    async def async_set_preset_mode(self, preset_mode: str) -> None:
        if preset_mode == PRESET_BOOST:
            defaults = self._entry.runtime_data.boost_defaults(CHANNEL_HEAT)
            await self._run(self._boosts.async_boost(self._room_id, max(15, defaults.minutes), defaults.temperature))
        elif self._boosts.get(self._room_id):
            await self._boosts.async_cancel(self._room_id)

    async def async_turn_on(self) -> None:
        await self.async_set_hvac_mode(HVACMode.HEAT)

    async def async_turn_off(self) -> None:
        await self.async_set_hvac_mode(HVACMode.OFF)

    async def _run(self, coro) -> None:
        try:
            failed = await coro
        except (RoomError, RoomBoostError) as err:
            raise ServiceValidationError(str(err)) from err
        if failed:
            raise HomeAssistantError(f"Not every valve took it: {', '.join(failed)}")

    # -- keeping up ------------------------------------------------------------------------------

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(async_dispatcher_connect(self.hass, SIGNAL_ROOMS, self._rooms_changed))
        self.async_on_remove(self._stop_tracking)
        self._track()

    @callback
    def _stop_tracking(self) -> None:
        if self._unsub_states:
            self._unsub_states()
            self._unsub_states = None

    @callback
    def _track(self) -> None:
        """Follow the room's valves and sensor."""
        self._stop_tracking()
        room = self._room
        if room is None:
            return
        entities = list(room["valves"]) + ([room["sensor"]] if room.get("sensor") else [])

        @callback
        def _changed(_event: Event[EventStateChangedData]) -> None:
            self.async_write_ha_state()

        self._unsub_states = async_track_state_change_event(self.hass, entities, _changed)

    @callback
    def _rooms_changed(self, *_args: Any) -> None:
        room = self._room
        if room is None or not _ours(self.hass, self._entry, room):
            # Deleted, or now heated by another receiver: that one adds it.
            self._known.discard(self._room_id)
            self.hass.async_create_task(self._async_remove_room(deleted=room is None))
            return
        device = self._device()
        if device and device.name != room["name"]:
            dr.async_get(self.hass).async_update_device(device.id, name=room["name"])
        self._track()
        self.async_write_ha_state()

    def _device(self) -> dr.DeviceEntry | None:
        """The room's device, through this entity's registry entry (works on every HA version)."""
        entry = er.async_get(self.hass).async_get(self.entity_id) if self.entity_id else None
        return dr.async_get(self.hass).async_get(entry.device_id) if entry and entry.device_id else None

    async def _async_remove_room(self, *, deleted: bool) -> None:
        device = self._device()
        registry = er.async_get(self.hass)
        if self.entity_id and registry.async_get(self.entity_id):
            registry.async_remove(self.entity_id)
        else:
            await self.async_remove()
        if deleted and device:
            dr.async_get(self.hass).async_remove_device(device.id)
