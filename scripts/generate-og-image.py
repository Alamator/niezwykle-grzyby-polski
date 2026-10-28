"""Generate the Open Graph / Twitter Card share image (1200x630).

Run from the project root: `python scripts/generate-og-image.py` (needs Pillow).
Writes `assets/og-image.png` in the look of the start page: the headline in Instrument Serif and a map
of Poland drawn from the atlas's own map points. Fonts come from fonts/ (SIL Open Font License); the
points from data/places/*.places.js (Wikidata, CC0); the outline of Poland from Natural Earth 1:50m
admin-0 countries (public domain), simplified to three decimals. Photos stay out: a share preview
has no room for their credits.
"""

from __future__ import annotations

import glob
import math
import os
import re
import sys
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BACKGROUND = (12, 17, 15)
INK = (236, 230, 216)
INK_2 = (207, 200, 184)
MUTED = (163, 157, 144)
AMBER = (233, 164, 59)

POLAND = [[23.605,51.518],[23.659,51.449],[23.68,51.395],[23.658,51.352],[23.664,51.31],[23.712,51.265],[23.863,51.126],[23.938,50.993],[23.986,50.94],[24.096,50.873],[24.106,50.845],[24.062,50.82],[24.026,50.816],[23.997,50.809],[23.978,50.786],[24.007,50.76],[24.046,50.723],[24.095,50.617],[24.09,50.53],[24.053,50.508],[24.005,50.457],[23.973,50.41],[23.712,50.377],[23.649,50.327],[23.506,50.23],[23.409,50.174],[23.264,50.073],[23.036,49.899],[22.952,49.826],[22.891,49.766],[22.706,49.606],[22.649,49.539],[22.661,49.484],[22.72,49.354],[22.732,49.295],[22.722,49.241],[22.702,49.193],[22.706,49.171],[22.76,49.136],[22.847,49.081],[22.852,49.063],[22.84,49.039],[22.81,49.021],[22.701,49.04],[22.58,49.077],[22.539,49.073],[22.473,49.081],[22.203,49.153],[22.02,49.21],[22.002,49.246],[21.968,49.299],[21.89,49.343],[21.712,49.382],[21.64,49.412],[21.35,49.429],[21.225,49.429],[21.136,49.417],[21.079,49.418],[21.001,49.34],[20.947,49.317],[20.868,49.315],[20.8,49.329],[20.729,49.37],[20.616,49.392],[20.535,49.381],[20.475,49.39],[20.423,49.392],[20.405,49.384],[20.363,49.385],[20.303,49.366],[20.237,49.338],[20.164,49.316],[20.108,49.271],[20.058,49.181],[19.916,49.221],[19.869,49.204],[19.802,49.192],[19.757,49.204],[19.767,49.235],[19.788,49.27],[19.787,49.319],[19.774,49.372],[19.73,49.39],[19.664,49.396],[19.63,49.407],[19.627,49.424],[19.593,49.447],[19.535,49.505],[19.48,49.576],[19.442,49.598],[19.386,49.564],[19.302,49.525],[19.25,49.511],[19.149,49.4],[18.968,49.396],[18.957,49.448],[18.938,49.498],[18.832,49.511],[18.829,49.54],[18.807,49.614],[18.595,49.758],[18.569,49.818],[18.577,49.841],[18.562,49.879],[18.516,49.902],[18.348,49.93],[18.305,49.914],[18.266,49.93],[18.205,49.965],[18.099,49.993],[18.088,50.007],[18.05,50.032],[18.028,50.035],[18.015,50.02],[17.984,49.999],[17.875,49.972],[17.831,49.983],[17.792,50.007],[17.747,50.057],[17.681,50.101],[17.627,50.116],[17.596,50.14],[17.589,50.157],[17.709,50.194],[17.735,50.231],[17.72,50.299],[17.702,50.307],[17.655,50.284],[17.555,50.264],[17.462,50.255],[17.415,50.255],[17.152,50.378],[16.981,50.416],[16.88,50.427],[16.869,50.415],[16.915,50.345],[16.993,50.26],[16.99,50.237],[16.895,50.202],[16.842,50.187],[16.779,50.157],[16.725,50.116],[16.679,50.097],[16.639,50.102],[16.597,50.122],[16.488,50.248],[16.35,50.345],[16.334,50.367],[16.291,50.372],[16.231,50.394],[16.21,50.424],[16.241,50.455],[16.283,50.483],[16.357,50.5],[16.379,50.517],[16.392,50.542],[16.42,50.574],[16.413,50.585],[16.36,50.621],[16.282,50.656],[16.066,50.63],[16.007,50.612],[15.974,50.635],[15.949,50.67],[15.894,50.677],[15.819,50.709],[15.731,50.74],[15.644,50.749],[15.464,50.794],[15.395,50.796],[15.354,50.812],[15.313,50.846],[15.277,50.883],[15.259,50.959],[15.126,50.993],[14.994,51.014],[14.984,51.003],[14.99,50.927],[14.983,50.887],[14.896,50.861],[14.809,50.859],[14.814,50.872],[14.917,51.009],[14.964,51.095],[15.017,51.253],[14.953,51.377],[14.936,51.435],[14.906,51.463],[14.725,51.524],[14.711,51.545],[14.739,51.627],[14.725,51.662],[14.681,51.698],[14.624,51.771],[14.602,51.832],[14.675,51.905],[14.693,51.958],[14.725,52.031],[14.748,52.071],[14.753,52.082],[14.705,52.11],[14.692,52.15],[14.705,52.207],[14.68,52.25],[14.616,52.278],[14.574,52.314],[14.555,52.36],[14.57,52.431],[14.619,52.529],[14.514,52.646],[14.254,52.783],[14.129,52.878],[14.139,52.933],[14.194,52.982],[14.293,53.027],[14.369,53.106],[14.411,53.199],[14.412,53.217],[14.415,53.283],[14.299,53.556],[14.28,53.625],[14.266,53.707],[14.259,53.73],[14.488,53.672],[14.583,53.639],[14.572,53.676],[14.552,53.707],[14.565,53.754],[14.558,53.823],[14.351,53.859],[14.214,53.871],[14.198,53.919],[14.211,53.95],[14.249,53.932],[14.384,53.925],[14.716,54.018],[15.288,54.14],[15.9,54.254],[16.043,54.266],[16.186,54.29],[16.239,54.333],[16.292,54.362],[16.376,54.437],[16.56,54.554],[16.885,54.596],[17.007,54.652],[17.262,54.73],[17.843,54.817],[18.086,54.836],[18.323,54.838],[18.535,54.769],[18.759,54.685],[18.8,54.633],[18.678,54.665],[18.502,54.742],[18.436,54.745],[18.587,54.513],[18.67,54.431],[18.836,54.37],[18.976,54.349],[19.407,54.386],[19.56,54.435],[19.604,54.459],[19.644,54.447],[19.924,54.434],[20.208,54.421],[20.665,54.407],[21.141,54.392],[21.634,54.376],[22.168,54.36],[22.732,54.35],[22.766,54.357],[22.824,54.396],[22.894,54.391],[22.977,54.366],[23.016,54.348],[23.032,54.328],[23.042,54.304],[23.087,54.299],[23.17,54.281],[23.282,54.24],[23.37,54.2],[23.454,54.143],[23.481,54.079],[23.483,54.006],[23.478,53.959],[23.485,53.94],[23.599,53.599],[23.789,53.271],[23.859,53.112],[23.887,53.028],[23.909,52.905],[23.916,52.819],[23.915,52.77],[23.901,52.704],[23.845,52.664],[23.48,52.552],[23.411,52.516],[23.303,52.428],[23.204,52.338],[23.181,52.307],[23.175,52.287],[23.197,52.257],[23.327,52.208],[23.458,52.17],[23.501,52.14],[23.598,52.103],[23.633,52.07],[23.652,52.04],[23.651,51.973],[23.607,51.88],[23.626,51.809],[23.581,51.762],[23.545,51.71],[23.54,51.619],[23.605,51.518]]

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def fonts(name: str, size: int) -> dict:
    # Each family is split into a Latin and a Latin Extended file, like on the site.
    return {
        part: ImageFont.truetype(os.path.join(ROOT, "fonts", name.format(part=part)), size)
        for part in ("latin", "latin-ext")
    }


def part_of(char: str) -> str:
    code = ord(char)
    latin = code <= 0xFF or 0x2000 <= code <= 0x206F or code in (0x20AC, 0x2122, 0x2212)
    return "latin" if latin else "latin-ext"


def draw_text(draw: ImageDraw.ImageDraw, xy, text: str, family: dict, fill, tracking: float = 0) -> float:
    """Draws text run by run in the file that holds its letters; returns the x after the text."""
    x, y = xy
    if tracking:
        runs = [(char, part_of(char)) for char in text]
    else:
        runs = []
        for char in text:
            part = part_of(char)
            if runs and runs[-1][1] == part:
                runs[-1] = (runs[-1][0] + char, part)
            else:
                runs.append((char, part))
    for run, part in runs:
        draw.text((x, y), run, font=family[part], fill=fill, anchor="ls")
        x += family[part].getlength(run) + tracking
    return x


def polish_plural(count: int, one: str, few: str, many: str) -> str:
    if count == 1:
        return one
    if count % 10 in (2, 3, 4) and count % 100 not in (12, 13, 14):
        return few
    return many


def collection_count() -> int:
    with open(os.path.join(ROOT, "data", "collections.js"), encoding="utf-8") as handle:
        return len(re.findall(r"^\s+scripts: \[", handle.read(), re.M))


def place_points() -> list:
    seen = {}
    for path in sorted(glob.glob(os.path.join(ROOT, "data", "places", "*.places.js"))):
        with open(path, encoding="utf-8") as handle:
            for lat, lng, qid in re.findall(r"lat: ([\d.]+), lng: ([\d.]+), wikidata: \"(Q\d+)\"", handle.read()):
                seen[qid] = (float(lng), float(lat))
    return list(seen.values())


def projector(box):
    # Equirectangular projection squeezed by cos(52°), fitted into the box.
    squeeze = math.cos(math.radians(52))
    xs = [lng * squeeze for lng, _ in POLAND]
    ys = [-lat for _, lat in POLAND]
    left, top, right, bottom = box
    scale = min((right - left) / (max(xs) - min(xs)), (bottom - top) / (max(ys) - min(ys)))
    off_x = left + ((right - left) - (max(xs) - min(xs)) * scale) / 2
    off_y = top + ((bottom - top) - (max(ys) - min(ys)) * scale) / 2
    return lambda lng, lat: (off_x + (lng * squeeze - min(xs)) * scale, off_y + (-lat - min(ys)) * scale)


def main() -> int:
    image = Image.new("RGBA", (W, H), BACKGROUND + (255,))

    # Soft amber light from the top left, as on the start page.
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    for step in range(60, 0, -1):
        radius = step * 12
        alpha = int(26 * (1 - step / 60) ** 1.6)
        glow_draw.ellipse([-radius + 60, -radius + 20, radius + 60, radius + 20], fill=AMBER + (alpha,))
    image.alpha_composite(glow)

    # The map: outline and one amber point per place of the atlas.
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    map_draw = ImageDraw.Draw(overlay)
    project = projector((660, 70, 1140, 520))
    outline = [project(lng, lat) for lng, lat in POLAND]
    map_draw.polygon(outline, fill=(19, 27, 23, 255))
    map_draw.line(outline + [outline[0]], fill=INK + (110,), width=2, joint="curve")
    points = place_points()
    for lng, lat in points:
        x, y = project(lng, lat)
        map_draw.ellipse([x - 4.5, y - 4.5, x + 4.5, y + 4.5], fill=AMBER + (235,), outline=BACKGROUND + (255,), width=1)
    image.alpha_composite(overlay)

    draw = ImageDraw.Draw(image)
    mono = fonts("ibm-plex-mono-{part}-400-normal.woff2", 19)
    serif = fonts("instrument-serif-{part}-400-normal.woff2", 104)
    serif_italic = fonts("instrument-serif-{part}-400-italic.woff2", 104)
    mark = fonts("instrument-serif-{part}-400-normal.woff2", 34)
    mark_italic = fonts("instrument-serif-{part}-400-italic.woff2", 34)
    small = fonts("ibm-plex-mono-{part}-400-normal.woff2", 16)

    collections = collection_count()
    eyebrow = f"GABINET OSOBLIWOŚCI · {collections} {polish_plural(collections, 'KOLEKCJA', 'KOLEKCJE', 'KOLEKCJI')}"
    draw_text(draw, (80, 118), eyebrow, mono, AMBER, tracking=3)
    draw_text(draw, (76, 236), "Polska, jakiej", serif, INK)
    draw_text(draw, (76, 334), "nie pokazują", serif_italic, AMBER)
    draw_text(draw, (76, 432), "przewodniki.", serif, INK)

    x = draw_text(draw, (80, 548), "Atlas ", mark, INK)
    x = draw_text(draw, (x, 548), "Osobliwości", mark_italic, AMBER)
    draw_text(draw, (x, 548), " Polski", mark, INK)
    draw_text(draw, (80, 584), "niezwykle-grzyby-polski.vercel.app", small, MUTED, tracking=0.5)
    caption = f"{len(points)} {polish_plural(len(points), 'miejsce', 'miejsca', 'miejsc')} z atlasu · Wikidata · Natural Earth"
    right = 1140 - sum(small[part_of(c)].getlength(c) + 0.5 for c in caption)
    draw_text(draw, (right, 584), caption, small, MUTED, tracking=0.5)

    out_path = os.path.join(ROOT, "assets", "og-image.png")
    image.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"Saved {out_path} ({os.path.getsize(out_path) / 1024:.1f} KB, {len(points)} places)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
