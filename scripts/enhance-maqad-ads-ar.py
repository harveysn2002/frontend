"""Enhance maqad seat cushion ad images: upscale, Arabic labels, no logos."""

from __future__ import annotations

from pathlib import Path

import arabic_reshaper
from bidi.algorithm import get_display
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "products"

ASSETS = Path(
    r"C:\Users\harve\.cursor\projects\d-OneDrive-Documents-New-folder\assets"
)

BEFORE_AFTER_SRC = ASSETS / (
    "c__Users_harve_AppData_Roaming_Cursor_User_workspaceStorage_efc8674a470a374a548dd578fe459564_"
    "images_image-c9ff817e-a45a-476f-bd5f-ded9c359e520.png"
)
FEATURES_SRC = ASSETS / (
    "c__Users_harve_AppData_Roaming_Cursor_User_workspaceStorage_efc8674a470a374a548dd578fe459564_"
    "images_image-7dfa4804-2043-49f1-a734-140579a6f58e.png"
)

FONT_BOLD = r"C:\Windows\Fonts\tahomabd.ttf"
FONT_REG = r"C:\Windows\Fonts\tahoma.ttf"
DARK = (45, 45, 48)
WHITE = (255, 255, 255)
BLUE = (30, 100, 180)


def ar(text: str) -> str:
    return get_display(arabic_reshaper.reshape(text))


def fnt(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size)


def enhance(img: Image.Image, scale: float = 2.5) -> Image.Image:
    w, h = img.size
    nw, nh = int(w * scale), int(h * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    img = ImageEnhance.Contrast(img).enhance(1.08)
    img = ImageEnhance.Color(img).enhance(1.05)
    img = ImageEnhance.Sharpness(img).enhance(1.35)
    return img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=120, threshold=3))


def fit_square(img: Image.Image, size: int) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    scale = size / max(w, h)
    nw, nh = int(w * scale), int(h * scale)
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    canvas.paste(resized, ((size - nw) // 2, (size - nh) // 2))
    return canvas


def draw_ar_label(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    size: int,
    fill: tuple[int, int, int] = DARK,
    anchor: str = "mm",
) -> None:
    font = fnt(size)
    draw.text(xy, ar(text), font=font, fill=fill, anchor=anchor)


def cover_rect(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], fill=WHITE) -> None:
    draw.rectangle(box, fill=fill)


def build_before_after() -> Image.Image:
    img = enhance(Image.open(BEFORE_AFTER_SRC).convert("RGB"), scale=2.55)
    return fit_square(img, 1080)


def build_features() -> Image.Image:
    src = Image.open(FEATURES_SRC).convert("RGB")
    sw, sh = src.size
    img = enhance(src, scale=2.0)
    scale = img.width / sw
    w, h = img.size
    draw = ImageDraw.Draw(img)

    def sx(v: float) -> int:
        return int(v * scale)

    col_x = [sx(100), sx(300), sx(500), sx(700)]
    row1_y, row2_y = sx(558), sx(735)
    box_w = sx(185)

    labels_row1 = ["وضعية مثالية", "دعم الورك", "محاذاة العمود الفقري", "راحة المقعدة"]
    labels_row2 = ["تقليل آلام الظهر", "تحسين الدورة الدموية", "راحة من البواسير", "تهوية"]
    sizes_row1 = [26, 26, 20, 24]
    sizes_row2 = [20, 18, 18, 26]

    for x in col_x:
        cover_rect(draw, (x - box_w // 2, sx(505), x + box_w // 2, sx(612)))
        cover_rect(draw, (x - box_w // 2, sx(698), x + box_w // 2, sx(778)))

    for x, label, size in zip(col_x, labels_row1, sizes_row1):
        draw_ar_label(draw, (x, row1_y), label, size=size)

    for x, label, size in zip(col_x, labels_row2, sizes_row2):
        draw_ar_label(draw, (x, row2_y), label, size=size)

    return fit_square(img.convert("RGBA"), 1080)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    before_after = build_before_after()
    features = build_features()

    out1 = OUT / "maqad-before-after-ar.jpg"
    out2 = OUT / "maqad-features-ar.jpg"

    before_after.convert("RGB").save(out1, quality=95, optimize=True)
    features.convert("RGB").save(out2, quality=95, optimize=True)

    print(f"Saved: {out1} ({before_after.size})")
    print(f"Saved: {out2} ({features.size})")


if __name__ == "__main__":
    main()
