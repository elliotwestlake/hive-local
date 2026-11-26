#!/usr/bin/env bash
# Retake every README screenshot and the social preview from the built panel.
#
#   CHROME=/path/to/chrome-headless-shell PYTHON=python3-with-pillow docs/screenshots/harness/shoot.sh
#
# Needs icons.json next to this script (node build_icons.mjs ../../../frontend/src icons.json,
# with @mdi/js installed). Uses a throwaway work folder and a local web server on $PORT.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../../.." && pwd)"
CHROME="${CHROME:?set CHROME to a headless Chrome binary}"
PYTHON="${PYTHON:-python3}"
PORT="${PORT:-8791}"
WORK="$(mktemp -d)"
trap 'kill "$SERVER" 2>/dev/null || true; rm -rf "$WORK"' EXIT

cp "$HERE"/harness.html "$HERE"/harness.js "$HERE"/compose.html "$HERE"/icons.json "$WORK"/
cp "$REPO/custom_components/hive_local/frontend/hive-local-panel.js" "$WORK"/
python3 -m http.server "$PORT" --bind 127.0.0.1 -d "$WORK" >/dev/null 2>&1 &
SERVER=$!
sleep 1

shot() { # name WxH query
  "$CHROME" --screenshot="$WORK/$1.png" --window-size="$2" --force-device-scale-factor=2 \
    --hide-scrollbars --virtual-time-budget=12000 "http://127.0.0.1:$PORT/harness.html?$3" >/dev/null 2>&1
}
compose() { # out WxH query
  "$CHROME" --screenshot="$WORK/$1.png" --window-size="$2" --force-device-scale-factor=2 \
    --hide-scrollbars --virtual-time-budget=4000 "http://127.0.0.1:$PORT/compose.html?$3" >/dev/null 2>&1
}

# Raw tabs (900 px wide CSS, captured at 2x).
shot overview 900,760 "tab=Overview"
shot schedule 900,860 "tab=Overview&open=1&click=Schedule"
shot controls 900,760 "tab=Overview&click=Boost"
shot rooms 900,760 "tab=Overview&room=Lounge"
shot room-schedule 900,900 "tab=Overview&room=Lounge&click=Schedule%20on%20the%20valves"
# Rooms call for heat (#4): the card, its sheet, the device page and the Settings rows.
shot demand 900,760 "tab=Overview&demand=1"
shot demand-sheet 900,760 "tab=Overview&demand=1&click=For%20rooms"
shot demand-page 900,660 "tab=Overview&demand=1&open=1"
shot demand-settings 900,1350 "tab=Settings&demand=on"
shot stats 900,780 "tab=Stats"
shot stats-cost 900,780 "tab=Stats&click=Estimated%20cost"
shot settings 900,640 "tab=Settings"
shot settings-fixed-price 900,760 "tab=Settings&price=fixed"
shot holiday 900,640 "tab=Overview&holiday=1"
shot holiday-sheet 900,700 "tab=Overview&click=Away%20until%E2%80%A6"
shot holiday-page 900,560 "tab=Overview&holiday=1&open=1"
# A 390×844 phone screen, less the status bar (50) and home indicator (24) drawn by compose.html.
shot phone 390,770 "tab=Overview&narrow=1"
shot overview-dark 900,760 "tab=Overview&theme=dark"
shot devices 900,700 "tab=Devices"
shot heating 900,660 "tab=Overview&open=1"
shot phone-schedule 390,770 "tab=Overview&narrow=1&open=1&click=Schedule"
shot phone-room 390,770 "tab=Overview&narrow=1&room=Lounge"
shot phone-boost 390,770 "tab=Overview&narrow=1&click=Boost"
# Tidy up duplicate entities (Settings → Entities), before and after.
shot tidy 900,1400 "tab=Settings"
shot tidy-done 900,1400 "tab=Settings&tidy=done"
# Room boost: a boosted room card, and the boost sheet opened from a room card.
shot room-boost 900,640 "tab=Overview&roomboost=1"
shot room-boost-sheet 900,800 "tab=Overview&roomclick=Lounge"
shot phone-room-boost 390,770 "tab=Overview&narrow=1&roomboost=1&room=Lounge"
# Room sensor on the valves (#3): the room sheet, two other states and the editor's toggle.
shot room-sensor 900,760 "tab=Overview&room=Lounge"
shot room-sensor-partly 900,760 "tab=Overview&room=Lounge&valvesensor=partly"
shot room-sensor-lost 900,760 "tab=Overview&room=Lounge&valvesensor=lost"
shot room-editor-sensor 900,900 "tab=Overview&room=Lounge&click=Edit%20room"

# Framed versions, the hero and the social preview.
frame_h() { echo $((34 + $1 + 56 + 72)); }
compose frame-schedule "1028,$(frame_h 860)" "kind=frame&img=schedule.png&w=900"
compose frame-controls "1028,$(frame_h 760)" "kind=frame&img=controls.png&w=900"
compose frame-rooms "1028,$(frame_h 760)" "kind=frame&img=rooms.png&w=900"
compose frame-stats "1028,$(frame_h 780)" "kind=frame&img=stats.png&w=900"
compose frame-stats-cost "1028,$(frame_h 780)" "kind=frame&img=stats-cost.png&w=900"
compose frame-settings "1028,$(frame_h 640)" "kind=frame&img=settings.png&w=900"
compose frame-overview-dark "1028,$(frame_h 760)" "kind=frame&img=overview-dark.png&w=900&theme=night"
compose frame-devices "1028,$(frame_h 700)" "kind=frame&img=devices.png&w=900"
compose frame-heating "1028,$(frame_h 660)" "kind=frame&img=heating.png&w=900"
compose frame-holiday "1028,$(frame_h 700)" "kind=frame&img=holiday-sheet.png&w=900"
compose hero 1400,860 "kind=hero"
compose phones 1400,900 "kind=phones&imgs=phone-schedule.png,phone-room.png,phone-boost.png"
cp "$REPO/docs/logo/logo.svg" "$WORK/"
compose social 1280,640 "kind=social&logo=logo.svg"

"$PYTHON" - "$WORK" "$REPO/docs" <<'EOF'
import sys
from PIL import Image
work, docs = sys.argv[1], sys.argv[2]
def dithered(src, dst):
    img = Image.open(f"{work}/{src}.png").convert("RGB")
    pal = img.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
    img.quantize(palette=pal, dither=Image.Dither.FLOYDSTEINBERG).save(dst, optimize=True)
for raw in ("overview", "schedule", "controls", "rooms", "stats", "stats-cost", "settings", "phone", "overview-dark",
            "devices", "heating", "phone-schedule", "phone-room", "phone-boost"):
    Image.open(f"{work}/{raw}.png").convert("RGB").quantize(colors=256, method=Image.Quantize.FASTOCTREE).save(
        f"{docs}/screenshots/raw/{raw}.png", optimize=True)
for src, dst in (("hero", "hero"), ("frame-schedule", "schedule"), ("frame-controls", "controls"),
                 ("frame-rooms", "rooms"), ("frame-stats", "stats"), ("frame-stats-cost", "stats-cost"),
                 ("frame-settings", "settings"), ("frame-overview-dark", "overview-dark"),
                 ("frame-devices", "devices"), ("frame-heating", "heating"), ("frame-holiday", "holiday"),
                 ("phones", "phones")):
    dithered(src, f"{docs}/screenshots/{dst}.png")
# Only for a PR, unquantized: 256 colours lose the light grey boxes.
for pr in ("settings-fixed-price", "holiday", "holiday-sheet", "holiday-page",
           "room-sensor", "room-sensor-partly", "room-sensor-lost", "room-editor-sensor",
           "demand", "demand-sheet", "demand-page", "demand-settings", "room-schedule",
           "room-boost", "room-boost-sheet", "phone-room-boost", "tidy", "tidy-done"):
    Image.open(f"{work}/{pr}.png").convert("RGB").save(f"{docs}/screenshots/raw/{pr}.png", optimize=True)
Image.open(f"{work}/social.png").convert("RGB").resize((1280, 640), Image.LANCZOS).save(
    f"{docs}/logo/social-preview.png", optimize=True)
print("screenshots updated")
EOF
