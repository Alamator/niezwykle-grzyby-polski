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


def main() -> int:
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    paint_background(draw)
    paint_corner_glow(img)

    title_font = load_font(96, bold=True)
    subtitle_font = load_font(28, bold=True)
    domain_font = load_font(24, bold=True)
    signature_font = load_font(20, bold=False)

    draw.text((80, 110), "Atlas", font=title_font, fill=INK)
    draw.text((80, 220), "Osobliwości", font=title_font, fill=ACCENT)
    draw.text((80, 330), "Polski", font=title_font, fill=INK)

    subtitle_lines = [
        "Przyroda — grzyby, kwiaty, drzewa, owady, ryby, płazy, ptaki, ssaki",
        "Ziemia i niebo — minerały, skały, skamieniałości, niebo, krajobraz",
        "Człowiek i kultura — architektura, podziemia, inżynieria, pamięć",
    ]
    for i, line in enumerate(subtitle_lines):
        draw.text((80, 460 + i * 32), line, font=subtitle_font, fill=MUTED)

    draw.text((80, H - 50), "Made by Robert Oroloko", font=signature_font, fill=MUTED)
    draw.text(
        (W - 80 - draw.textlength("niezwykle-grzyby-polski.vercel.app", font=domain_font),
         H - 50),
        "niezwykle-grzyby-polski.vercel.app",
        font=domain_font,
        fill=ACCENT,
    )

    out_dir = os.path.dirname(__file__).replace("scripts", "assets")

    logo_path = os.path.join(out_dir, "aop-logo.png")
    if os.path.exists(logo_path):
        logo_size = 400
        logo = Image.open(logo_path).convert("RGBA").resize((logo_size, logo_size), Image.LANCZOS)
        logo_x = W - logo_size - 80
        logo_y = (H - logo_size) // 2 - 15
        img.alpha_composite(logo, (logo_x, logo_y))
    else:
        print(f"warning: {logo_path} missing; og-image right panel will be empty")

    out_path = os.path.join(out_dir, "og-image.png")
    img.convert("RGB").save(out_path, "PNG", optimize=True)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"Saved {out_path} ({size_kb:.1f} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
