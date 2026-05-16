"""Generate PNG favicon and PWA icon variants from the master AOP logo.

Run from the project root: `python scripts/generate-favicons.py`.
Reads `assets/aop-logo.png` (512x512) and writes resized PNG copies for
browser favicons and the PWA manifest. Pure brand renderer — no project
state read.
"""

from __future__ import annotations

import os
import sys
from PIL import Image

SIZES = [16, 32, 48, 64, 192, 256]


def main() -> int:
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    src_path = os.path.join(project_root, "assets", "aop-logo.png")
    if not os.path.exists(src_path):
        print(f"error: {src_path} not found", file=sys.stderr)
        return 1

    src = Image.open(src_path).convert("RGBA")
    for size in SIZES:
        resized = src.resize((size, size), Image.LANCZOS)
        out_path = os.path.join(project_root, "assets", f"icon-{size}x{size}.png")
        resized.save(out_path, "PNG", optimize=True)
        kb = os.path.getsize(out_path) / 1024
        print(f"  icon-{size}x{size}.png — {kb:.1f} KB")
    print(f"Wrote {len(SIZES)} favicon variants to assets/.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
