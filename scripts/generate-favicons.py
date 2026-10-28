"""Generate the favicon (SVG) and the PNG icons for browsers and the PWA manifest.

Run from the project root: `python scripts/generate-favicons.py` (needs Pillow).
The mark is the italic "A" of Instrument Serif (SIL Open Font License, fonts/OFL-instrument-serif.txt)
in the amber of the site on the dark background of the cabinet. The SVG keeps the letter as a path,
copied from glyph "A" of fonts/instrument-serif-latin-400-italic.woff2 (1000 units per em), so it
looks the same without the web font; the PNG icons are drawn from the same font file.
"""

from __future__ import annotations

import os
import sys
from PIL import Image, ImageDraw, ImageFont

SIZES = [16, 32, 48, 64, 192, 256, 512]
BACKGROUND = "#0c110f"
AMBER = "#e9a43b"

# Layout on a 64 x 64 grid: corner radius, letter origin (left end of the baseline) and cap height.
CORNER = 13
ORIGIN_X, BASELINE = 22.6, 52
CAP_HEIGHT = 40
GLYPH_HEIGHT = 730  # font units from the baseline to the apex of the "A"
GLYPH_A = (
    "M-62 0Q-74 0 -74 10Q-74 19 -58 23L-42 26Q-22 30 -7.5 45.5Q7 61 20 89L319 714Q324 724 329.0 727.0Q334 730 338 730Q343 730 346.5 727.0Q350 724 350 714L361 80Q362 52 368.0 41.5Q374 31 393 26L406 23Q418 20 418 11Q418 0 401 0H236Q223 0 223 10Q223 21 243 23L263 25Q280 27 286.5 36.0Q293 45 293 67L291 222Q291 248 264 248H157Q131 248 118 222L53 88Q26 31 71 25L85 23Q100 21 100 11Q100 0 83 0ZM161 278H273Q290 278 290 295L288 568H283L152 295Q148 288 151.0 283.0Q154 278 161 278Z"
)


def svg() -> str:
    scale = CAP_HEIGHT / GLYPH_HEIGHT
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n'
        f'  <rect width="64" height="64" rx="{CORNER}" fill="{BACKGROUND}"/>\n'
        f'  <path fill="{AMBER}" transform="translate({ORIGIN_X} {BASELINE}) scale({scale:.5f} {-scale:.5f})" d="{GLYPH_A}"/>\n'
        "</svg>\n"
    )


def png(size: int, font_path: str) -> Image.Image:
    # Drawn four times larger and scaled down, for smooth edges at small sizes.
    big = size * 4
    unit = big / 64
    image = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle([0, 0, big - 1, big - 1], radius=CORNER * unit, fill=BACKGROUND)
    font = ImageFont.truetype(font_path, round(CAP_HEIGHT * unit * 1000 / GLYPH_HEIGHT))
    draw.text((ORIGIN_X * unit, BASELINE * unit), "A", font=font, fill=AMBER, anchor="ls")
    return image.resize((size, size), Image.LANCZOS)


def main() -> int:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    font_path = os.path.join(root, "fonts", "instrument-serif-latin-400-italic.woff2")
    if not os.path.exists(font_path):
        print(f"error: {font_path} not found", file=sys.stderr)
        return 1
    with open(os.path.join(root, "assets", "favicon.svg"), "w", encoding="utf-8") as handle:
        handle.write(svg())
    print("  favicon.svg")
    for size in SIZES:
        out_path = os.path.join(root, "assets", f"icon-{size}x{size}.png")
        png(size, font_path).save(out_path, "PNG", optimize=True)
        print(f"  icon-{size}x{size}.png — {os.path.getsize(out_path) / 1024:.1f} KB")
    print(f"Wrote favicon.svg and {len(SIZES)} PNG icons to assets/.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
