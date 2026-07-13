"""Compose Meta ad images with Arabic text + VORLAY logo."""

from __future__ import annotations

import math
from pathlib import Path

import arabic_reshaper
from bidi.algorithm import get_display
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
TMP = Path(__file__).resolve().parent / "ad-tmp"
OUT = ROOT / "public" / "images" / "products"

IMG_LIFESTYLE = TMP / "lifestyle.png"
IMG_COMPARE = TMP / "compare.png"
LOGO_SRC = TMP / "logo.png"

FONT_BOLD = r"C:\Windows\Fonts\tahomabd.ttf"
FONT_REG = r"C:\Windows\Fonts\tahoma.ttf"

GOLD = (201, 162, 39)
GREEN = (34, 197, 94)
WHITE = (255, 255, 255)
TEAL = (15, 118, 110)


def ar(text: str) -> str:
    return get_display(arabic_reshaper.reshape(text))


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def text_size(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0], box[3] - box[1]


def make_logo_transparent(logo: Image.Image, threshold: int = 35) -> Image.Image:
    logo = logo.convert("RGBA")
    pixels = logo.load()
    w, h = logo.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r < threshold and g < threshold and b < threshold:
                pixels[x, y] = (r, g, b, 0)
    return logo


def resize_logo(logo: Image.Image, target_width: int) -> Image.Image:
    ratio = target_width / logo.width
    return logo.resize((target_width, max(1, int(logo.height * ratio))), Image.Resampling.LANCZOS)


def draw_shadow_text(
    base: Image.Image,
    xy: tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    anchor: str = "mm",
    shadow: tuple[int, int, int] = (0, 0, 0),
    offset: int = 3,
) -> None:
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    draw.text((xy[0] + offset, xy[1] + offset), text, font=font, fill=(*shadow, 210), anchor=anchor)
    draw.text(xy, text, font=font, fill=(*fill, 255), anchor=anchor)
    base.alpha_composite(layer)


def draw_gradient_bar(
    base: Image.Image,
    y0: int,
    height: int,
    color: tuple[int, int, int],
    alpha_top: int,
    alpha_bottom: int,
) -> None:
    bar = Image.new("RGBA", (base.width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(bar)
    for y in range(height):
        t = y / max(height - 1, 1)
        alpha = int(alpha_top + (alpha_bottom - alpha_top) * t)
        draw.line([(0, y), (base.width, y)], fill=(*color, alpha))
    base.alpha_composite(bar, (0, y0))


def paste_logo(base: Image.Image, logo: Image.Image, x: int, y: int) -> None:
    base.alpha_composite(logo, (x, y))


def fit_square(img: Image.Image, size: int = 1080) -> Image.Image:
    w, h = img.size
    scale = size / max(w, h)
    nw, nh = int(w * scale), int(h * scale)
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 255))
    canvas.paste(resized, ((size - nw) // 2, (size - nh) // 2))
    return canvas


def compose_lifestyle_ad() -> Image.Image:
    img = Image.open(IMG_LIFESTYLE).convert("RGBA")
    img = fit_square(img, 1080)

    logo = resize_logo(make_logo_transparent(Image.open(LOGO_SRC)), 220)

    # Top gradient for headline readability
    draw_gradient_bar(img, 0, 200, (0, 0, 0), 170, 0)

    # Bottom gradient for CTA
    draw_gradient_bar(img, 880, 200, (0, 0, 0), 0, 200)

    f_head = load_font(FONT_BOLD, 46)
    f_sub = load_font(FONT_BOLD, 34)
    f_price = load_font(FONT_BOLD, 38)

    draw_shadow_text(img, (540, 78), ar("كتسوق ساعات والظهر كيعيوك؟"), f_head, WHITE)
    draw_shadow_text(img, (540, 940), ar("طقم 2 في 1 — رقبة + ظهر"), f_sub, WHITE)
    draw_shadow_text(img, (540, 1000), ar("199 د.م · الدفع عند الاستلام"), f_price, GOLD)

    paste_logo(img, logo, 36, 24)
    return img


def compose_compare_ad() -> Image.Image:
    img = Image.open(IMG_COMPARE).convert("RGBA")
    img = fit_square(img, 1080)

    logo = resize_logo(make_logo_transparent(Image.open(LOGO_SRC)), 200)

    draw_gradient_bar(img, 0, 180, (0, 0, 0), 200, 0)
    draw_gradient_bar(img, 900, 180, (0, 0, 0), 0, 220)

    f_head = load_font(FONT_BOLD, 44)
    f_label = load_font(FONT_BOLD, 36)
    f_sub = load_font(FONT_BOLD, 32)
    f_price = load_font(FONT_BOLD, 38)

    draw_shadow_text(img, (540, 72), ar("كتسوق ساعات والظهر كيعيوك؟"), f_head, WHITE)

    # Panel labels
    draw_shadow_text(img, (270, 170), ar("قبل"), f_label, (180, 180, 180))
    draw_shadow_text(img, (810, 170), ar("بعد"), f_label, TEAL)

    draw_shadow_text(img, (540, 930), ar("طقم 2 في 1 — رقبة + ظهر"), f_sub, WHITE)
    draw_shadow_text(img, (540, 990), ar("199 د.م · الدفع عند الاستلام"), f_price, GOLD)

    paste_logo(img, logo, 36, 20)
    return img


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    lifestyle = compose_lifestyle_ad()
    compare = compose_compare_ad()

    lifestyle_path = OUT / "wisada-ad-lifestyle-car-text.png"
    compare_path = OUT / "wisada-ad-compare-text.png"

    lifestyle.convert("RGB").save(lifestyle_path, quality=95)
    compare.convert("RGB").save(compare_path, quality=95)

    print(f"Saved: {lifestyle_path}")
    print(f"Saved: {compare_path}")


if __name__ == "__main__":
    main()
