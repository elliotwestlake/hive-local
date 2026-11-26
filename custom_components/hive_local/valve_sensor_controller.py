"""Push each room's sensor reading into its Hive valves (issue #3).

House-wide, one per HA (hass.data[DATA_VALVE_SENSORS]), next to the RoomManager. Every
minute, and whenever a room sensor changes, each valve in a room with a sensor (and the
room's "Use room sensor on valves" on) gets the reading in its external room sensor number
entity, at the rate valve_sensor.decide allows for its radiator_covered mode. When the
sensor goes unavailable, or the room stops pushing, the valve is cleared once (-80 °C, "not
used") so it falls back to its own sensor. What was sent is kept in memory only: after a
restart it's simply sent again.
"""

from __future__ import annotations

import asyncio
from datetime import datetime, timedelta
import logging
from typing import Any

from homeassistant.const import (
    ATTR_UNIT_OF_MEASUREMENT,
    EVENT_HOMEASSISTANT_STOP,
    STATE_OFF,
    STATE_ON,
    STATE_UNAVAILABLE,
    UnitOfTemperature,
)
from homeassistant.core import CALLBACK_TYPE, Event, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send
from homeassistant.helpers.event import async_track_state_change_event, async_track_time_interval
from homeassistant.helpers.start import async_at_started
from homeassistant.util import dt as dt_util
from homeassistant.util.unit_conversion import TemperatureConverter

from . import valve_sensor as vs
from .const import DOMAIN
from .room_manager import SIGNAL_ROOMS, RoomManager

_LOGGER = logging.getLogger(__name__)

DATA_VALVE_SENSORS = f"{DOMAIN}_valve_sensors"
# Fired when what a valve uses changes (the rooms subscription re-sends).
SIGNAL_VALVE_SENSORS = f"{DOMAIN}_valve_sensors"
CHECK_INTERVAL = timedelta(minutes=1)


class ValveSensors:
    def __init__(self, hass: HomeAssistant, rooms: RoomManager) -> None:
        self.hass = hass
        self.rooms = rooms
        self._sent: dict[str, vs.Sent] = {}
        self._errors: dict[str, str] = {}
        self._lock = asyncio.Lock()
        self._unsubs: list[CALLBACK_TYPE] = []
        self._unsub_sensors: CALLBACK_TYPE | None = None

    @callback
    def start(self) -> None:
        self._unsubs.append(async_track_time_interval(self.hass, self._tick, CHECK_INTERVAL))
        self._unsubs.append(async_dispatcher_connect(self.hass, SIGNAL_ROOMS, self._rooms_changed))
        self._unsubs.append(async_at_started(self.hass, self._started))
        self._track_sensors()
        # House-wide, so nothing unloads it: stop when HA stops.
        self.hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, self._stop)

    @callback
    def _stop(self, _event: Event | None = None) -> None:
        for unsub in self._unsubs:
            unsub()
        self._unsubs.clear()
        if self._unsub_sensors:
            self._unsub_sensors()
            self._unsub_sensors = None

    @callback
    def _track_sensors(self) -> None:
        if self._unsub_sensors:
            self._unsub_sensors()
        sensors = sorted({room["sensor"] for room in self.rooms.rooms if room.get("sensor")})
        self._unsub_sensors = async_track_state_change_event(self.hass, sensors, self._tick)

    @callback
    def _rooms_changed(self) -> None:
        self._track_sensors()
        self._tick()

    async def _started(self, _hass: HomeAssistant) -> None:
        await self.async_check()

    @callback
    def _tick(self, *_args: Any) -> None:
        self.hass.async_create_background_task(self.async_check(), f"{DOMAIN} valve sensors")

    # --- what each valve should have ---------------------------------------------

    def entities(self, valve: str) -> tuple[str | None, str | None]:
        """The valve device's external room sensor number and radiator_covered switch."""
        registry = er.async_get(self.hass)
        entry = registry.async_get(valve)
        number = switch = None
        if entry and entry.device_id:
            for other in er.async_entries_for_device(registry, entry.device_id):
                role = vs.entity_role(other.domain, other.unique_id, other.translation_key, other.entity_id)
                if role == vs.EXTERNAL and number is None:
                    number = other.entity_id
                elif role == vs.COVERED and switch is None:
                    switch = other.entity_id
        return number, switch

    def _room_of(self, valve: str) -> dict[str, Any] | None:
        return next((room for room in self.rooms.rooms if valve in room["valves"]), None)

    @staticmethod
    def _wanted(room: dict[str, Any] | None) -> bool:
        return bool(room and room.get("sensor") and room.get("sensor_on_valves", True))

    def _temperature(self, room: dict[str, Any] | None) -> float | None:
        """The room sensor's reading, when this room pushes it and it has one."""
        if not self._wanted(room):
            return None
        state = self.hass.states.get(room["sensor"])  # type: ignore[index]
        value = vs.to_float(state.state) if state else None
        if value is None or state is None:
            return None
        unit = state.attributes.get(ATTR_UNIT_OF_MEASUREMENT)
        if unit == UnitOfTemperature.FAHRENHEIT:  # the valve takes °C
            value = TemperatureConverter.convert(value, unit, UnitOfTemperature.CELSIUS)
        return value

    def _covered(self, switch: str | None) -> bool | None:
        state = self.hass.states.get(switch) if switch else None
        if state is None or state.state not in (STATE_ON, STATE_OFF):
            return None
        return state.state == STATE_ON

    # --- writing ---------------------------------------------------------------------

    async def async_check(self) -> None:
        async with self._lock:
            now = dt_util.utcnow()
            valves = {v for room in self.rooms.rooms for v in room["valves"]} | set(self._sent)
            results = await asyncio.gather(*(self._async_valve(v, now) for v in sorted(valves)))
        if any(results):
            async_dispatcher_send(self.hass, SIGNAL_VALVE_SENSORS)

    async def _async_valve(self, valve: str, now: datetime) -> bool:
        """Write to one valve if it's due. True if what it uses changed."""
        number, switch = self.entities(valve)
        if number is None:
            self._sent.pop(valve, None)
            return False
        state = self.hass.states.get(number)
        if state is None or state.state == STATE_UNAVAILABLE:
            return False  # gone for now: try again next time
        last = self._sent.get(valve)
        value = vs.decide(last, self._temperature(self._room_of(valve)), self._covered(switch), now)
        if value is None:
            return False
        native = vs.native(value, state.attributes.get("min"), state.attributes.get("max"))
        try:
            await self.hass.services.async_call(
                "number", "set_value", {"entity_id": number, "value": native}, blocking=True
            )
        except (HomeAssistantError, ValueError) as err:
            if self._errors.get(valve) != str(err):
                _LOGGER.warning("Couldn't give %s the room temperature (%s): %s", valve, number, err)
            self._errors[valve] = str(err)
            return False
        self._errors.pop(valve, None)
        if value == vs.NOT_USED:
            self._sent.pop(valve, None)
            _LOGGER.debug("%s: room sensor cleared, the valve uses its own", valve)
        else:
            self._sent[valve] = vs.Sent(value, now)
            _LOGGER.debug("%s: room temperature %.1f °C sent to %s", valve, value, number)
        return True

    # --- status ------------------------------------------------------------------------

    @callback
    def valve_status(self, valve: str) -> dict[str, Any]:
        """For the panel: whether the valve uses its room's sensor, and what it was given."""
        number, switch = self.entities(valve)
        room = self._room_of(valve)
        last = self._sent.get(valve)
        state = self.hass.states.get(number) if number else None
        return {
            "external_sensor": vs.valve_status(
                wanted=self._wanted(room),
                supported=number is not None,
                last=last,
                covered=self._covered(switch),
                now=dt_util.utcnow(),
            ),
            "external_sensor_sent": last.value if last else None,
            "external_sensor_reported": vs.celsius(state.state, state.attributes.get("min"), state.attributes.get("max"))
            if state
            else None,
            "radiator_covered": self._covered(switch),
        }

    def diagnostics(self) -> dict[str, Any]:
        out = {}
        for valve in sorted({v for room in self.rooms.rooms for v in room["valves"]} | set(self._sent)):
            number, switch = self.entities(valve)
            last = self._sent.get(valve)
            state = self.hass.states.get(number) if number else None
            out[valve] = {
                "number": number,
                "number_state": state.state if state else None,
                "number_range": [state.attributes.get("min"), state.attributes.get("max")] if state else None,
                "switch": switch,
                "covered": self._covered(switch),
                "sent": last.value if last else None,
                "sent_at": last.at.isoformat() if last else None,
                "error": self._errors.get(valve),
                "status": self.valve_status(valve)["external_sensor"],
            }
        return out
