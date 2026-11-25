---
title: Holiday
description: Hold frost protection and turn off the hot water until you're back, then put everything back as it was.
section: Using Snug
order: 6
---

**Away until…** keeps the house at a low temperature while you're away and puts everything back when you return.

Start it from the panel (the Away sheet), the climate entity's **Away** preset, or the `hive_local.set_holiday` action.

## What it does

- **Heating** is held at the holiday temperature: your **Frost protection** setting unless you choose another.
- **Hot water** is turned off.
- **At the end**, or when you cancel, each channel goes back to the mode it was in before (Schedule, Manual with its temperature, or Off).

The cards say **Away until Sat 14:00**, and the heating page has an **End** row.

## Why it's safe if Home Assistant stops

The receiver's only self-ending timer is a boost (a manual hold ignores its duration), so the heating is held with a boost of up to six hours, renewed every hour. If Home Assistant goes down while you're away, the boost runs out within six hours and the receiver goes back to what it was doing before. In the last six hours the boost ends exactly when the holiday does.

Hot water has no such fail-safe: a hot water boost means on, so it's simply set to Off.

## While you're away

- **Changing the heating target** changes the holiday temperature.
- **Boosting on top** (from the panel or the thermostat) is fine: when that boost ends, the holiday is put back.
- **Changing the mode** (Schedule, Manual, Off) ends the holiday for that channel.
- If Home Assistant was off when the holiday should have ended, it ends on the receiver's first report after Home Assistant starts.

With several receivers, the action covers all of them unless you name one.
