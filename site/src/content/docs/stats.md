---
title: Stats and heating cost
description: How long the boiler ran, compared with the period before and the weather, and an estimated cost.
section: Using Snug
order: 4
---

The **Stats** tab is your heating history, with a tab per receiver. Hot water history is on the hot water page's **History** tab.

Stats are worked out from Home Assistant's recorder history of Snug's own entities, so they start from when you installed Snug and go back as far as your recorder keeps history.

## Reading the stats

- **D / W / M:** a day, a week or a month. The ‹ date › pill steps back a period at a time.
- **Time or temperature:** boiler time, or the room temperature.
- **The summary** gives the total and how it compares with the same stretch of the period before, how often the boiler fired up, and any boosts.
- **A row per day** (per hour on D): the boiler time, and that day's low and high room temperature.

Periods start at local midnight.

## Outside temperature

Pick a weather entity or an outdoor temperature sensor in **Settings → Outside temperature**. Stats then show an Outside column and say how the weather compared, like "6° outside, 3° colder than the period before".

## Heating cost

Set it up in **Settings → Heating cost**, and Stats gets a third toggle with a cost estimate.

The receiver calling for heat isn't the same as the boiler burning flat out: a modulating boiler often runs at a fraction of its rating. So Snug needs to know what your boiler really uses:

- **With a gas meter** (your Energy dashboard's gas source, or a gas sensor), Snug learns your boiler's average output. It compares the gas used each day over the last 14 days with the hours the heating was on. This is much more accurate.
- **Without one**, enter the boiler's rating and Snug assumes it averages 40% of that.

And the price:

- **From the Energy dashboard:** the gas price you set there.
- **A unit rate:** your price per kWh, in pence or cents.
- **A price entity:** any sensor with a unit like `GBP/kWh` or `GBP/m³`.

The cost is an estimate, worked out at today's price.
