"""Composite REAL product photo onto before/after ad — no AI-imagined pillows."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "products"

PRODUCT_SRC = Path(
    r"C:\Users\harve\.cursor\projects\d-OneDrive-Documents-New-folder\assets"
    r"\c__Users_harve_AppData_Roaming_Cursor_User_workspaceStorage_efc8674a470a374a548dd578fe459564_images_5.2-117bae1a-8b13-45f8-9fa3-f7e172fc027b.png"
)
SCENE_SRC = Path(
    r"C:\Users\harve\.cursor\projects\d-OneDrive-Documents-New-folder\assets\vorlay-ad-compare-man-v2.png"
)


def extract_alpha(img: Image.Image, lum_cut: float = 20.0) -> Image.Image:
    rgba = img.convert("RGBA")
    arr = np.array(rgba, dtype=np.float32)
    lum = 0.299 * arr[..., 0] + 0.587 * arr[..., 1] + 0.114 * arr[..., 2]
    alpha = np.clip((lum - 6) * 5.0, 0, 255).astype(np.uint8)
    alpha[lum < lum_cut] = 0
    arr[..., 3] = alpha
    return Image.fromarray(arr.astype(np.uint8), "RGBA")


def crop_nontransparent(img: Image.Image, pad: int = 6) -> Image.Image:
    arr = np.array(img)
    mask = arr[..., 3] > 12
    if not mask.any():
        return img
    ys, xs = np.where(mask)
    x0, x1 = max(0, xs.min() - pad), min(img.width, xs.max() + pad)
    y0, y1 = max(0, ys.min() - pad), min(img.height, ys.max() + pad)
    return img.crop((x0, y0, x1, y1))


def split_pillows(img: Image.Image) -> tuple[Image.Image, Image.Image]:
    arr = np.array(img)
    h = arr.shape[0]
    row_alpha = arr[..., 3].sum(axis=1)
    mid_start, mid_end = int(h * 0.34), int(h * 0.50)
    gap_y = mid_start + int(np.argmin(row_alpha[mid_start:mid_end]))
    return (
        crop_nontransparent(Image.fromarray(arr[:gap_y].copy(), "RGBA")),
        crop_nontransparent(Image.fromarray(arr[gap_y:].copy(), "RGBA")),
    )


def resize_to_width(img: Image.Image, width: int) -> Image.Image:
    ratio = width / img.width
    return img.resize((width, max(1, int(img.height * ratio))), Image.Resampling.LANCZOS)


def prep_layer(img: Image.Image) -> Image.Image:
    r, g, b, a = img.split()
    a = a.filter(ImageFilter.GaussianBlur(0.6))
    img = Image.merge("RGBA", (r, g, b, a))
    return ImageEnhance.Brightness(img).enhance(0.92)


def build() -> Image.Image:
    cutout = crop_nontransparent(extract_alpha(Image.open(PRODUCT_SRC)))
    neck, lumbar = split_pillows(cutout)

    OUT.mkdir(parents=True, exist_ok=True)
    neck.save(OUT / "vorlay-real-neck-cutout.png")
    lumbar.save(OUT / "vorlay-real-lumbar-cutout.png")

    scene = Image.open(SCENE_SRC).convert("RGBA")
    w, _ = scene.size
    half = w // 2

    # Real product layers — sized to fully cover AI pillows underneath
    lumbar_placed = prep_layer(resize_to_width(lumbar, 258))
    lw, lh = lumbar_placed.size
    lumbar_placed = lumbar_placed.resize((lw, int(lh * 0.80)), Image.Resampling.LANCZOS)

    neck_placed = prep_layer(resize_to_width(neck, 172))

    scene.alpha_composite(lumbar_placed, (half + 108, 348))
    scene.alpha_composite(neck_placed, (half + 136, 152))

    return scene


def main() -> None:
    out = OUT / "vorlay-ad-compare-man.png"
    build().convert("RGB").save(out, quality=95)
    print(f"Saved: {out}")


if __name__ == "__main__":
    main()
