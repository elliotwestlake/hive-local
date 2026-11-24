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


class _S:
    def __init__(self, t, heating):
        self.t, self.heating = t, heating


H = 3600


def test_heating_intervals_and_hours_per_day():
    a = [_S(0, False), _S(6 * H, True), _S(8 * H, False), _S(23 * H, True)]
    b = [_S(0, False), _S(7 * H, True), _S(9 * H, False)]  # a second receiver, overlapping
    ivs = c.heating_intervals(a, 48 * H) + c.heating_intervals(b, 48 * H)
    # Day 1: 06:00–09:00 (merged) + 23:00–24:00; day 2: 00:00–24:00 (still heating at the end).
    assert c.hours_per_day(ivs, [0, 24 * H], 48 * H) == pytest.approx([4.0, 24.0])


def test_fit_output_with_a_baseline():
    # 9 kW while on, plus 6 kWh a day of hot water and cooking.
    days = [(h, 9 * h + 6) for h in (7.8, 5, 9, 3, 6)]
    fit = c.fit_output(days)
    assert fit.kw == pytest.approx(9.0)
    assert fit.baseline == pytest.approx(6.0)
    assert fit.days == 5


def test_fit_output_through_zero_when_days_are_alike():
    fit = c.fit_output([(7.8, 70), (7.5, 68), (8, 72), (7.9, 70)])
    assert fit.kw == pytest.approx(8.97, abs=0.01)
    assert fit.baseline == 0


def test_fit_output_skips_missing_days_and_needs_enough():
    # None: no reading yet; 0 kWh with heating on: the supplier's data hadn't arrived.
    assert c.fit_output([(7, 63), (6, 54), (5, None), (8, 0)]) is None
    assert c.fit_output([(0.5, 5), (0.5, 5), (0.5, 5), (0.5, 5)]) is None  # 2 h of heating in all
    # A fitted baseline below zero falls back to a fit through zero.
    fit = c.fit_output([(2, 10), (4, 30), (6, 50), (8, 70)])
    assert fit.baseline == 0 and fit.kw == pytest.approx(1000 / 120)


def test_kwh_per_unit():
    assert c.kwh_per_unit("m³") == c.KWH_PER_M3
    assert c.kwh_per_unit("kWh") == 1
    assert c.kwh_per_unit("L") is None
