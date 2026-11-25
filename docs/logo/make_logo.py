"""Generate the Snug logo SVGs (icon, logo, logo-dark).

The mark is a house with a flame inside (local heating). The wordmark is Figtree
(SIL Open Font License), "Snug" in bold, converted to outlines so the SVGs don't
depend on fonts (Snug was called Hive Local until 2026-11; the mark is unchanged):

    pip install fonttools
    curl -L -o Figtree.ttf "https://github.com/google/fonts/raw/main/ofl/figtree/Figtree%5Bwght%5D.ttf"
    python docs/logo/make_logo.py Figtree.ttf

PNGs (the integration's brand/ images, the social preview) are rendered from these
SVGs with headless Chrome; see the README's Development section.
"""

from __future__ import annotations

import math
import sys
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

HERE = Path(__file__).parent
FONT = sys.argv[1] if len(sys.argv) > 1 else "Figtree.ttf"  # the variable Figtree[wght]

# Material Design Icons "fire" (Apache 2.0), 24x24.
FIRE = (
    "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7."
    "26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13."
    "32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8"
    ".08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5"
    ".06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 "
    "20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.2"
    "2 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17."
    "94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12."
    "26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8"
    "C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z"
)

AMBER, ORANGE = "#FFB547", "#FF5A1F"
INK, PAPER = "#1F2328", "#F2F2F2"


def mark(prefix: str = "hl") -> str:
    """The icon: a house (amber to orange, corners rounded) with a white flame, in a 512 box."""
    return (
        f'<defs><linearGradient id="{prefix}g" x1="0" y1="0" x2="0.35" y2="1">'
        f'<stop offset="0" stop-color="{AMBER}"/><stop offset="1" stop-color="{ORANGE}"/>'
        f"</linearGradient></defs>"
        f'<polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#{prefix}g)" '
        f'stroke="url(#{prefix}g)" stroke-width="56" stroke-linejoin="round"/>'
        f'<path d="{FIRE}" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>'
    )


def text_path(runs: list[tuple[str, int]], size: float, tracking: float) -> tuple[str, float]:
    """SVG path data for runs of (text, weight) set in FONT at size px (baseline y=0), and the width."""
    pen = None
    x = 0.0
    commands = []
    for text, weight in runs:
        font = instantiateVariableFont(TTFont(FONT), {"wght": weight})
        glyphs = font.getGlyphSet()
        cmap = font.getBestCmap()
        scale = size / font["head"].unitsPerEm
        pen = SVGPathPen(glyphs)
        for ch in text:
            name = cmap[ord(ch)]
            glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, 0)))
            x += glyphs[name].width * scale + tracking
        commands.append(pen.getCommands())
    return " ".join(commands), x - tracking


def logo(text_colour: str, prefix: str) -> str:
    """Icon + wordmark, 512 high."""
    d, width = text_path([("Snug", 700)], 200, -4)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {int(560 + width + 24)} 512">'
        f"<title>Snug</title>"
        f'<g transform="translate(16 16) scale(0.9375)">{mark(prefix)}</g>'
        f'<path d="{d}" fill="{text_colour}" transform="translate(560 330)"/>'
        f"</svg>\n"
    )


def main() -> None:
    (HERE / "icon.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Snug</title>{mark()}</svg>\n'
    )
    (HERE / "logo.svg").write_text(logo(INK, "hll"))
    (HERE / "logo-dark.svg").write_text(logo(PAPER, "hld"))
    print("wrote icon.svg, logo.svg, logo-dark.svg")


if __name__ == "__main__":
    main()
