#!/usr/bin/env python3
"""Convert original artwork into the two WebP sizes the site uses.

    pip install pillow
    python3 tools/optimize-images.py path/to/original.jpg my-image-name [more pairs...]

Writes assets/<name>.webp (full size, max 1800px) and
assets/thumbs/<name>.webp (grid size, fits 960x1200). Then reference
"<name>" in data/projects.mjs and run `node tools/build.mjs`.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SIZES = {"": ((1800, 1800), 82), "thumbs/": ((960, 1200), 78)}


def convert(source, name):
    image = ImageOps.exif_transpose(Image.open(source))
    image = image.convert("RGBA" if image.mode in ("RGBA", "LA", "P") else "RGB")
    for folder, (box, quality) in SIZES.items():
        out = ROOT / "assets" / f"{folder}{name}.webp"
        out.parent.mkdir(parents=True, exist_ok=True)
        copy = image.copy()
        copy.thumbnail(box, Image.LANCZOS)
        copy.save(out, "WEBP", quality=quality, method=6)
        print(f"{out.relative_to(ROOT)}  {copy.width}x{copy.height}  {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args or len(args) % 2:
        sys.exit(__doc__)
    for source, name in zip(args[::2], args[1::2]):
        convert(source, name)
