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
    --hide-scrollbars --virtual-time-budget=5000 "http://127.0.0.1:$PORT/harness.html?$3" >/dev/null 2>&1
}
compose() { # out WxH query
  "$CHROME" --screenshot="$WORK/$1.png" --window-size="$2" --force-device-scale-factor=2 \
    --hide-scrollbars --virtual-time-budget=4000 "http://127.0.0.1:$PORT/compose.html?$3" >/dev/null 2>&1
}

# Raw tabs (900 px wide CSS, captured at 2x).
shot overview 900,620 "tab=Overview"
shot schedule 900,680 "tab=Schedule"
shot controls 900,760 "tab=Overview&mode=manual&click=Boost%20options"
shot rooms 900,452 "tab=Rooms"
shot stats 900,900 "tab=Stats"
shot phone 400,820 "tab=Overview&narrow=1"
shot overview-dark 900,620 "tab=Overview&theme=dark"

# Framed versions, the hero and the social preview.
frame_h() { echo $((34 + $1 + 56 + 72)); }
compose frame-schedule "1028,$(frame_h 680)" "kind=frame&img=schedule.png&w=900"
compose frame-controls "1028,$(frame_h 760)" "kind=frame&img=controls.png&w=900"
compose frame-rooms "1028,$(frame_h 452)" "kind=frame&img=rooms.png&w=900"
compose frame-stats "1028,$(frame_h 900)" "kind=frame&img=stats.png&w=900"
compose frame-overview-dark "1028,$(frame_h 620)" "kind=frame&img=overview-dark.png&w=900&theme=night"
compose hero 1400,860 "kind=hero"
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
for raw in ("overview", "schedule", "controls", "rooms", "stats", "phone", "overview-dark"):
    Image.open(f"{work}/{raw}.png").convert("RGB").quantize(colors=256, method=Image.Quantize.FASTOCTREE).save(
        f"{docs}/screenshots/raw/{raw}.png", optimize=True)
for src, dst in (("hero", "hero"), ("frame-schedule", "schedule"), ("frame-controls", "controls"),
                 ("frame-rooms", "rooms"), ("frame-stats", "stats"), ("frame-overview-dark", "overview-dark")):
    dithered(src, f"{docs}/screenshots/{dst}.png")
Image.open(f"{work}/social.png").convert("RGB").resize((1280, 640), Image.LANCZOS).save(
    f"{docs}/logo/social-preview.png", optimize=True)
print("screenshots updated")
EOF
