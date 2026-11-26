"""hive_local/version: our version from the manifest, and the Marketplace's update entity for us."""
import json
import pathlib

from homeassistant.helpers import entity_registry as er
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

MANIFEST = json.loads((pathlib.Path(__file__).parents[2] / "custom_components/hive_local/manifest.json").read_text())


async def test_version_and_update(hass, hass_ws_client):
    assert await async_setup_component(hass, "hive_local", {})
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    # Not installed through the Marketplace: no update entity.
    await client.send_json({"id": 1, "type": "hive_local/version"})
    msg = await client.receive_json()
    assert msg["success"], msg
    assert msg["result"] == {"version": MANIFEST["version"], "update": None}

    # The Marketplace's update entity (from a stand-in config entry, as hacs isn't loaded here).
    hacs = MockConfigEntry(domain="hacs_stand_in")
    hacs.add_to_hass(hass)
    er.async_get(hass).async_get_or_create("update", "hacs", "123456", suggested_object_id="hive_local_update", config_entry=hacs)
    er.async_get(hass).async_get_or_create("update", "hacs", "999", suggested_object_id="other_update", config_entry=hacs)
    hass.states.async_set("update.other_update", "on", {"title": "Other", "latest_version": "v2.0.0"})
    hass.states.async_set("update.hive_local_update", "on", {
        "title": "Hive Local", "installed_version": "v0.10.0", "latest_version": "v0.11.0",
        "release_url": "https://github.com/elliotwestlake/hive-local/releases/v0.11.0"})
    await client.send_json({"id": 2, "type": "hive_local/version"})
    update = (await client.receive_json())["result"]["update"]
    assert update == {"entity_id": "update.hive_local_update", "available": True, "installed_version": "v0.10.0",
                      "latest_version": "v0.11.0", "release_url": "https://github.com/elliotwestlake/hive-local/releases/v0.11.0"}

    # Up to date (or the update skipped): off.
    hass.states.async_set("update.hive_local_update", "off", {"title": "Hive Local", "installed_version": "v0.11.0", "latest_version": "v0.11.0"})
    await client.send_json({"id": 3, "type": "hive_local/version"})
    assert (await client.receive_json())["result"]["update"]["available"] is False
