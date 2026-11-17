import importlib.util, pathlib

spec = importlib.util.spec_from_file_location(
    "devices", pathlib.Path(__file__).parents[1] / "custom_components/hive_local/devices.py")
d = importlib.util.module_from_spec(spec); spec.loader.exec_module(d)

def dev(name, vendor="Hive", model="SLR1c", exposes=None):
    return {"friendly_name": name, "definition": {"vendor": vendor, "model": model,
            "exposes": exposes if exposes is not None else [{"type": "climate"}]}}

def test_finds_receivers_and_detects_endpoints():
    out = d.hive_receivers([
        dev("Kitchen SLR2", model="SLR2b",
            exposes=[{"type": "climate", "endpoint": "heat"}, {"type": "climate", "endpoint": "water"}]),
        dev("Hive Receiver"),
    ])
    assert out == [
        {"name": "Hive Receiver", "model": "SLR1c", "multi_endpoint": False},
        {"name": "Kitchen SLR2", "model": "SLR2b", "multi_endpoint": True},
    ]

def test_skips_non_receivers_and_junk():
    assert d.hive_receivers([
        {"friendly_name": "Coordinator", "type": "Coordinator", "definition": None},
        dev("Hive thermostat", model="SLT3", exposes=[{"type": "numeric", "name": "battery"}]),
        dev("Other brand TRV", vendor="Sonoff"),
        {"definition": {"vendor": "Hive"}},
        "nope",
    ]) == []
    assert d.hive_receivers(None) == []
