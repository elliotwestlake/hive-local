"""House-wide settings (not per receiver), stored in .storage/hive_local.settings.

The outdoor temperature shown in the heating history (a weather entity or an outdoor
temperature sensor), and what an estimated heating cost needs: the boiler's output and a
gas price (from HA's energy settings, a price entity, or a number typed in). One
HouseSettings per HA, in hass.data[DATA_SETTINGS].
"""

from __future__ import annotations

import logging
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import area_registry as ar
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store

from . import cost
from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

STORAGE_VERSION = 1
DATA_SETTINGS = f"{DOMAIN}_settings"
# Fired when the settings change.
SIGNAL_SETTINGS = f"{DOMAIN}_settings"
# Where the gas price comes from: HA's energy settings, a number typed in, or else an entity id.
PRICE_ENERGY = "energy"
PRICE_FIXED = "fixed"
_PRICE_DOMAINS = ("sensor", "number", "input_number")


class SettingsError(ValueError):
    """Raised for an invalid setting (shown to the user)."""


class HouseSettings:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, f"{DOMAIN}.settings")
        self.outdoor_entity: str | None = None
        self.boiler_kw: float | None = None
        self.price_source: str | None = None
        self.fixed_price: float | None = None

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.outdoor_entity = data.get("outdoor_entity") or None
        self.boiler_kw = cost.boiler_kw(data.get("boiler_kw"))
        self.price_source = data.get("price_source") or None
        self.fixed_price = cost.price_per_kwh(data.get("fixed_price"), None)

    async def _async_save(self) -> None:
        await self._store.async_save(
            {
                "outdoor_entity": self.outdoor_entity,
                "boiler_kw": self.boiler_kw,
                "price_source": self.price_source,
                "fixed_price": self.fixed_price,
            }
        )
        async_dispatcher_send(self.hass, SIGNAL_SETTINGS)

    def _area(self, entity_id: str) -> str | None:
        entry = er.async_get(self.hass).async_get(entity_id)
        area_id = entry.area_id if entry else None
        if not area_id and entry and entry.device_id:
            device = dr.async_get(self.hass).async_get(entry.device_id)
            area_id = device.area_id if device else None
        area = ar.async_get(self.hass).async_get_area(area_id) if area_id else None
        return area.name if area else None

    @callback
    def outdoor_candidates(self) -> list[dict[str, Any]]:
        """Weather entities, then temperature sensors (not our own), for the outdoor temperature."""
        registry = er.async_get(self.hass)

        def ours(entity_id: str) -> bool:
            entry = registry.async_get(entity_id)
            return entry is not None and entry.platform == DOMAIN

        out = [
            {"entity_id": s.entity_id, "name": s.name, "area": None, "kind": "weather"}
            for s in self.hass.states.async_all("weather")
        ]
        out += [
            {"entity_id": s.entity_id, "name": s.name, "area": self._area(s.entity_id), "kind": "sensor"}
            for s in self.hass.states.async_all("sensor")
            if s.attributes.get("device_class") == "temperature" and not ours(s.entity_id)
        ]
        return sorted(out, key=lambda c: (c["kind"] != "weather", c["name"].lower()))

    @callback
    def price_candidates(self) -> list[dict[str, Any]]:
        """Sensors and numbers holding a price per kWh or per gas volume (e.g. GBP/kWh)."""
        out = []
        for domain in _PRICE_DOMAINS:
            for s in self.hass.states.async_all(domain):
                unit = s.attributes.get("unit_of_measurement")
                if isinstance(unit, str) and "/" in unit and cost.price_unit(unit) is not None:
                    out.append({"entity_id": s.entity_id, "name": s.name, "area": self._area(s.entity_id), "unit": unit})
        return sorted(out, key=lambda c: c["name"].lower())

    def _entity_price(self, entity_id: str, fallback_unit: str | None = None) -> float | None:
        state = self.hass.states.get(entity_id)
        if state is None:
            return None
        unit = state.attributes.get("unit_of_measurement")
        if not (isinstance(unit, str) and "/" in unit) and fallback_unit:
            unit = fallback_unit
        return cost.price_per_kwh(state.state, unit if isinstance(unit, str) else None)

    async def _async_energy_price(self) -> float | None:
        """The gas price from HA's energy settings (the first gas source with one), per kWh."""
        if "energy" not in self.hass.config.components:
            return None
        try:
            from homeassistant.components.energy.data import async_get_manager  # noqa: PLC0415

            prefs = (await async_get_manager(self.hass)).data or {}
        except Exception:  # noqa: BLE001 - the energy integration's internals may change
            _LOGGER.debug("Couldn't read the energy settings", exc_info=True)
            return None
        currency = self.hass.config.currency
        for source in prefs.get("energy_sources", []):
            if source.get("type") != "gas":
                continue
            # The meter's unit (kWh, m³, ft³, CCF) is what a fixed price is per.
            meter = self.hass.states.get(source.get("stat_energy_from") or "")
            meter_unit = meter.attributes.get("unit_of_measurement") if meter else None
            per = f"{currency}/{meter_unit}" if isinstance(meter_unit, str) else None
            if source.get("entity_energy_price"):
                price = self._entity_price(source["entity_energy_price"], per)
            else:
                price = cost.price_per_kwh(source.get("number_energy_price"), per)
            if price is not None:
                return price
        return None

    async def async_price(self) -> float | None:
        """The gas price in use, per kWh in HA's currency, or None if it isn't set or readable."""
        if self.price_source == PRICE_ENERGY:
            return await self._async_energy_price()
        if self.price_source == PRICE_FIXED:
            return self.fixed_price
        if self.price_source:
            return self._entity_price(self.price_source)
        return None

    async def async_cost(self) -> dict[str, Any] | None:
        """What the heating history needs to estimate a cost, or None if it isn't set up."""
        price = await self.async_price()
        rate = cost.per_hour(self.boiler_kw, price)
        if rate is None:
            return None
        return {"boiler_kw": self.boiler_kw, "price": price, "per_hour": rate, "currency": self.hass.config.currency, "source": self.price_source}

    async def async_as_dict(self) -> dict[str, Any]:
        return {
            "outdoor_entity": self.outdoor_entity,
            "outdoor_candidates": self.outdoor_candidates(),
            "boiler_kw": self.boiler_kw,
            "price_source": self.price_source,
            "fixed_price": self.fixed_price,
            "price_candidates": self.price_candidates(),
            "energy_price": await self._async_energy_price(),
            "price": await self.async_price(),
            "currency": self.hass.config.currency,
        }

    async def async_set_outdoor(self, entity_id: str | None) -> None:
        entity_id = entity_id or None
        if entity_id is not None and entity_id not in {c["entity_id"] for c in self.outdoor_candidates()}:
            raise SettingsError("Pick a weather entity or a temperature sensor")
        self.outdoor_entity = entity_id
        await self._async_save()

    async def async_set_boiler_kw(self, value: float | None) -> None:
        kw = cost.boiler_kw(value) if value is not None else None
        if value is not None and kw is None:
            raise SettingsError(f"The boiler's output should be {cost.BOILER_KW_MIN:g}–{cost.BOILER_KW_MAX:g} kW")
        self.boiler_kw = kw
        await self._async_save()

    async def async_set_price(self, source: str | None, fixed: float | None = None) -> None:
        """source: "energy", "fixed" (with `fixed`, per kWh), a price entity, or None."""
        source = source or None
        if source not in (None, PRICE_ENERGY, PRICE_FIXED) and source not in {c["entity_id"] for c in self.price_candidates()}:
            raise SettingsError("Pick a sensor or number with a price per kWh or per m³")
        if fixed is not None:
            price = cost.price_per_kwh(fixed, None)
            if price is None:
                raise SettingsError("Enter the gas price per kWh")
            self.fixed_price = price
        self.price_source = source
        await self._async_save()
