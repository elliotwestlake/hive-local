---
title: Pre-heat
description: Start the heating early, so the house is warm by the time the schedule says.
section: Using Hive Local
order: 5
---

A schedule that says 20° at 07:00 normally *starts* warming up at 07:00. Pre-heat starts early instead, so it's 20° by 07:00.

Turn it on with the **Pre-heat** card on the heating page's Control tab (or the Pre-heat switch entity).

## How it works

- **It learns how fast your home warms up** from 14 days of your own history: times the boiler ran for at least 20 minutes from at least 1° below target. It needs three of those to be confident, and re-learns every six hours.
- **It plans only the next change**, and only if it's a rise.
- **The lead time** is the climb divided by your warm-up rate, plus 10 minutes, but never more than **Starts at most** (120 minutes unless you change it; 15 to 240).
- When the time comes, on Schedule, it **boosts** to the new temperature until the scheduled time. A boost ends by itself, so if Home Assistant stops, the heating doesn't stay on.

While it runs, the panel says **Pre-heating for 06:30** instead of Boosting. Home Assistant's own climate card still shows the boost preset.

## Changing your mind

- **Stop pre-heating** (in the boost sheet), Manual or Off skips that change. Pre-heat starts again once the heating goes back to Schedule, or when you turn pre-heat on again.
- Choosing **Schedule** while it's pre-heating does nothing: the pre-heat *is* the schedule, starting early.
- If you edit the schedule and the change it was heading for moves or goes, it stops and plans again. If only the temperature changed, it heads for the new one.
- Pre-heat is paused while the heating is [away](/docs/holiday/).

## Checking it

The Pre-heat switch entity has `warm_up_rate` and `warm_ups_seen` attributes, so you can see what it has learned.
