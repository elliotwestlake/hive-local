import importlib.util, pathlib, sys

import pytest

spec = importlib.util.spec_from_file_location(
    "cost", pathlib.Path(__file__).parents[1] / "custom_components/hive_local/cost.py")
c = importlib.util.module_from_spec(spec); sys.modules["cost"] = c; spec.loader.exec_module(c)


@pytest.mark.parametrize(
    "value, unit, expected",
    [
        (0.07, "GBP/kWh", 0.07),
        ("0.07", None, 0.07),
        (7.0, "p/kWh", 0.07),
        (70, "EUR/MWh", 0.07),
        (0.784, "GBP/m³", 0.07),
        (0.784, "GBP/m3", 0.07),
    ],
)
def test_price_per_kwh(value, unit, expected):
    assert c.price_per_kwh(value, unit) == pytest.approx(expected)


@pytest.mark.parametrize(
    "value, unit",
    [("unknown", "GBP/kWh"), (0.07, "GBP"), (0.07, "GBP/L"), (-1, "GBP/kWh"), (float("nan"), None), (True, None), (500, "GBP/kWh")],
)
def test_price_per_kwh_rejects(value, unit):
    assert c.price_per_kwh(value, unit) is None


def test_ft3_and_ccf():
    assert c.price_per_kwh(1.0, "USD/CCF") == pytest.approx(1 / (c.KWH_PER_M3 * 2.83168))
    assert c.price_per_kwh(1.0, "USD/ft³") == pytest.approx(100 * c.price_per_kwh(1.0, "USD/CCF"))


def test_boiler_kw():
    assert c.boiler_kw("24") == 24
    assert c.boiler_kw(0.5) is None
    assert c.boiler_kw(None) is None


def test_estimate():
    # 90 minutes of a 24 kW boiler at 7p/kWh.
    assert c.estimate(90, 24, 0.07) == pytest.approx(2.52)
    assert c.per_hour(24, 0.07) == pytest.approx(1.68)
    assert c.estimate(90, None, 0.07) is None
    assert c.estimate(None, 24, 0.07) is None
