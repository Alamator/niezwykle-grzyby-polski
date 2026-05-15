"""Generate the Open Graph / Twitter Card share image (1200x630).

Run from the project root: `python scripts/generate-og-image.py`.
Writes `assets/og-image.png`. Re-run after brand tweaks (palette, copy).
Mirrors the hero badge mosaic so the share preview matches the live site.
"""

from __future__ import annotations

import os
import sys
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

BG_TOP = (246, 240, 229)
BG_BOTTOM = (239, 229, 212)
INK = (16, 32, 24)
MUTED = (88, 103, 93)
ACCENT = (200, 86, 45)
ACCENT_GOLD = (217, 157, 54)
ACCENT_FOREST = (46, 107, 69)

TILES = [
    ((46, 107, 69), (16, 32, 24), "G"),
    ((217, 157, 54), (109, 61, 19), "O"),
    ((181, 75, 104), (46, 107, 69), "K"),
    ((47, 143, 157), (22, 61, 82), "R"),
    ((255, 250, 240), (217, 157, 54), "A"),
    ((79, 124, 191), (122, 74, 36), "P"),
    ((79, 139, 69), (91, 59, 31), "D"),
    ((123, 138, 143), (75, 58, 42), "M"),
    ((159, 122, 78), (70, 80, 90), "F"),
]

FONT_CANDIDATES_BOLD = [
    "C:\\Windows\\Fonts\\segoeuib.ttf",
    "C:\\Windows\\Fonts\\arialbd.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
]
FONT_CANDIDATES_REGULAR = [
    "C:\\Windows\\Fonts\\segoeui.ttf",
    "C:\\Windows\\Fonts\\arial.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/Library/Fonts/Arial.ttf",
]


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = FONT_CANDIDATES_BOLD if bold else FONT_CANDIDATES_REGULAR
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)


def paint_background(draw: ImageDraw.ImageDraw) -> None:
    for y in range(H):
        t = y / (H - 1)
        r = lerp(BG_TOP[0], BG_BOTTOM[0], t)
        g = lerp(BG_TOP[1], BG_BOTTOM[1], t)
        b = lerp(BG_TOP[2], BG_BOTTOM[2], t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))


def paint_corner_glow(img: Image.Image) -> None:
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for radius, color in [(720, ACCENT + (32,)), (520, ACCENT_FOREST + (28,))]:
        cx, cy = (0, 0) if radius == 720 else (W, 0)
        od.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=color)
    img.alpha_composite(overlay)


def draw_rounded_tile(draw, x, y, size, color1, color2, letter, font, text_color):
    draw.rounded_rectangle(
        [x, y, x + size, y + size], radius=20, fill=color1, outline=color2, width=3
    )
    bbox = draw.textbbox((0, 0), letter, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(
        (x + (size - tw) // 2 - bbox[0], y + (size - th) // 2 - bbox[1]),
        letter,
        font=font,
        fill=text_color,
    )


def main() -> int:
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    paint_background(draw)
    paint_corner_glow(img)

    title_font = load_font(96, bold=True)
    subtitle_font = load_font(28, bold=True)
    domain_font = load_font(24, bold=True)
    signature_font = load_font(20, bold=False)
    tile_font = load_font(56, bold=True)
    center_tile_font = load_font(70, bold=True)

    draw.text((80, 110), "Atlas", font=title_font, fill=INK)
    draw.text((80, 220), "Osobliwości", font=title_font, fill=ACCENT)
    draw.text((80, 330), "Polski", font=title_font, fill=INK)

    subtitle_lines = [
        "grzyby · owady · kwiaty · ryby · ptaki · ssaki · płazy i gady",
        "drzewa · minerały · formacje skalne · architektura drewniana",
        "podziemia · cuda inżynierii · twierdze · Memento Mori",
        "skamieniałości · atmosfera i astronomia · rekordy krajobrazu",
    ]
    for i, line in enumerate(subtitle_lines):
        draw.text((80, 450 + i * 32), line, font=subtitle_font, fill=MUTED)

    draw.text((80, H - 50), "Made by Robert Oroloko", font=signature_font, fill=MUTED)
    draw.text(
        (W - 80 - draw.textlength("niezwykle-grzyby-polski.vercel.app", font=domain_font),
         H - 50),
        "niezwykle-grzyby-polski.vercel.app",
        font=domain_font,
        fill=ACCENT,
    )

    tile_size = 116
    gap = 16
    mosaic_w = tile_size * 3 + gap * 2
    mosaic_x = W - mosaic_w - 80
    mosaic_y = (H - mosaic_w) // 2 - 30

    for i, (c1, c2, letter) in enumerate(TILES):
        row, col = i // 3, i % 3
        x = mosaic_x + col * (tile_size + gap)
        y = mosaic_y + row * (tile_size + gap)
        is_center = i == 4
        font = center_tile_font if is_center else tile_font
        text_color = INK if is_center else (255, 250, 240)
        draw_rounded_tile(draw, x, y, tile_size, c1, c2, letter, font, text_color)

    out_dir = os.path.dirname(__file__).replace("scripts", "assets")
    out_path = os.path.join(out_dir, "og-image.png")
    img.convert("RGB").save(out_path, "PNG", optimize=True)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"Saved {out_path} ({size_kb:.1f} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
