"""Recolor treatment artwork to the Elara brand duotone.

Maps each image's luminance to:
  dark  -> PERCH   #363D32  (54, 61, 50)
  light -> SILENCE #F7EDE5  (247, 237, 229)

Preserves grain/detail via a soft per-pixel map (no hard threshold).
Auto-detects inverted artwork (light background) and flips it so every
file ends up with a dark Perch background + cream Silence line-art.

Usage:
  python scripts/recolor-treatments.py
"""
import os
from PIL import Image, ImageFilter, ImageOps, ImageStat

PERCH = (54, 61, 50)        # dark green-gray
SILENCE = (247, 237, 229)   # warm cream

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIG_DIR = os.path.join(BASE, "public", "treatments.orig")
TARGET_DIR = os.path.join(BASE, "public", "treatments")


def build_channel_luts(dark, light):
    luts = []
    for c in range(3):
        span = light[c] - dark[c]
        luts.append([round(dark[c] + span * (v / 255.0)) for v in range(256)])
    return luts


def recolor_one(src, luts, dst):
    img = Image.open(src).convert("RGB")
    gray = img.convert("L")

    mean = ImageStat.Stat(gray).mean[0]
    w, h = gray.size
    band = 12
    edge_crop = gray.crop((0, 0, w, band))
    edge_mean = ImageStat.Stat(edge_crop).mean[0]
    left_mean = ImageStat.Stat(gray.crop((0, 0, band, h))).mean[0]
    edge_bright = max(edge_mean, left_mean)
    inverted = (mean > 128.0) or (edge_bright > mean + 25.0)

    if inverted:
        # Filled-silhouette artwork (hydro_jelly_mask): the bright figure
        # touches the frame. Mask it out, darken the background toward
        # Perch, then recombine so it reads dark-bg + light figure like
        # the rest of the set. The mask is kept away from the frame edges
        # so no light halo leaks along the borders.
        blurred = gray.filter(ImageFilter.GaussianBlur(3))
        figure_mask = blurred.point(lambda v: 255 if v > 140 else 0)
        figure_mask = figure_mask.filter(ImageFilter.GaussianBlur(2))
        # Push mask to background near the frame border.
        interior = Image.new("L", gray.size, 255)
        bx, by = 14, 14
        interior_bg = Image.new("L", gray.size, 0)
        interior_bg.paste(interior.crop((bx, by, w - bx, h - by)), (bx, by))
        interior_bg = interior_bg.filter(ImageFilter.GaussianBlur(4))
        figure_mask = Image.composite(figure_mask, Image.new("L", gray.size, 0), interior_bg)
        bg = gray.point(lambda v: round(33 + (v / 140.0) * 27) if v < 140 else 60)
        dark_figure = ImageOps.invert(gray)
        dark_figure = ImageOps.autocontrast(dark_figure, cutoff=1)
        gray = Image.composite(
            dark_figure.point(lambda v: round(v * 0.75 + 45)),
            bg,
            figure_mask,
        )
        # Clean frame: force the outer border to the background tone so
        # no light halo leaks along the edges. The figure touches the
        # frame here, so extend the silence past the figure outline.
        bg_val = int(ImageStat.Stat(bg).median[0])
        bord = 30
        gray.paste(bg_val, (0, 0, w, bord))
        gray.paste(bg_val, (0, h - bord, w, h))
        gray.paste(bg_val, (0, 0, bord, h))
        gray.paste(bg_val, (w - bord, 0, w, h))

    # Gentle contrast stretch so line-art separates from background
    # without crushing the paper grain.
    gray = ImageOps.autocontrast(gray, cutoff=1)

    r = gray.point(luts[0])
    g = gray.point(luts[1])
    b = gray.point(luts[2])
    out = Image.merge("RGB", (r, g, b))
    out.save(dst, "JPEG", quality=92, optimize=True)
    return mean, edge_bright, inverted


def main():
    luts = build_channel_luts(PERCH, SILENCE)
    # Always read from the pristine originals so reruns are idempotent.
    files = sorted(f for f in os.listdir(ORIG_DIR) if f.lower().endswith(".jpg"))
    if not files:
        print("No .jpg files found in", TARGET_DIR)
        return
    for name in files:
        src = os.path.join(ORIG_DIR, name)
        dst = os.path.join(TARGET_DIR, name)
        mean, edge, inverted = recolor_one(src, luts, dst)
        print(f"{name}: mean={mean:.1f} edge={edge:.1f} inverted={inverted}")
    print(f"Done. {len(files)} files recolored.")


if __name__ == "__main__":
    main()
