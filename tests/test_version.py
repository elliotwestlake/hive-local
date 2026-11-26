import importlib, pathlib, sys, types

pkg = types.ModuleType("hl"); pkg.__path__ = [str(pathlib.Path(__file__).parents[1] / "custom_components/hive_local")]
sys.modules.setdefault("hl", pkg)
v = importlib.import_module("hl.version")


def entity(entity_id="update.hive_local_update", platform="hacs", state="on", **attrs):
    return v.UpdateEntity(entity_id, platform, state, {"title": "Hive Local", "installed_version": "v0.10.0",
                                                       "latest_version": "v0.11.0", "release_url": "https://example/r", **attrs})


def test_finds_the_marketplace_entity_by_title_or_entity_id():
    assert v.is_ours(entity())
    assert v.is_ours(entity("update.renamed", title="Hive Local"))
    assert v.is_ours(entity("update.hive_local_update", title=None))
    assert not v.is_ours(entity("update.other", title="Hive"))  # HA's cloud Hive isn't us
    assert not v.is_ours(entity(platform="zha"))


def test_update_available_only_when_on():
    info = v.update_info([entity("update.other", title="Other"), entity()])
    assert info == {"entity_id": "update.hive_local_update", "available": True, "installed_version": "v0.10.0",
                    "latest_version": "v0.11.0", "release_url": "https://example/r"}
    assert v.update_info([entity(state="off")])["available"] is False
    assert v.update_info([entity(state="unavailable")])["available"] is False


def test_not_tracked_without_the_marketplace():
    assert v.update_info([]) is None
    assert v.update_info([entity(platform="mqtt")]) is None
