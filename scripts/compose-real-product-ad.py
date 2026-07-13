"""Scene + real product pillows composited only on pillow zones + branding."""

from __future__ import annotations

from pathlib import Path

import arabic_reshaper
from bidi.algorithm import get_display
from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFont

TMP = Path(__file__).resolve().parent / "ad-tmp"
OUT = Path(__file__).resolve().parents[1] / "public" / "images" / "products"

SCENE = TMP / "scene-before-after.png"
HERO = Path(__file__).resolve().parents[1] / "public" / "images" / "products" / "wisada-hero-white.png"
LOGO = TMP / "logo.png"

SIZE = 1080
FONT_BOLD = r"C:\Windows\Fonts\tahomabd.ttf"
GOLD = (201, 162, 39)
WHITE = (255, 255, 255)
TEAL = (15, 118, 110)
CHARCOAL = (18, 18, 20)


def ar(text: str) -> str:
    return get_display(arabic_reshaper.reshape(text))


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_BOLD, size)


def white_key(img: Image.Image, threshold: int = 238) -> Image.Image:
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                px[x, y] = (0, 0, 0, 0)
    return img


def trim_alpha(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def resize_w(img: Image.Image, width: int) -> Image.Image:
    ratio = width / img.width
    return img.resize((width, max(1, int(img.height * ratio))), Image.Resampling.LANCZOS)


def paste_in_ellipse(base: Image.Image, overlay: Image.Image, cx: int, cy: int, rx: int, ry: int) -> None:
    w, h = overlay.size
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse((w // 2 - rx, h // 2 - ry, w // 2 + rx, h // 2 + ry), fill=255)
    layer = overlay.copy()
    alpha = ImageChops.multiply(layer.split()[3], mask)
    layer.putalpha(alpha)
    base.alpha_composite(layer, (cx - w // 2, cy - h // 2))


def split_product(path: Path) -> tuple[Image.Image, Image.Image]:
    src = white_key(Image.open(path))
    w, h = src.size
    neck = trim_alpha(src.crop((int(w * 0.05), int(h * 0.02), int(w * 0.95), int(h * 0.48))))
    lumbar = trim_alpha(src.crop((int(w * 0.04), int(h * 0.44), int(w * 0.96), int(h * 0.98))))
    return neck, lumbar


def make_logo_transparent(logo: Image.Image, threshold: int = 35) -> Image.Image:
    logo = logo.convert("RGBA")
    px = logo.load()
    w, h = logo.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r < threshold and g < threshold and b < threshold:
                px[x, y] = (r, g, b, 0)
    return logo


def draw_text(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, fnt: ImageFont.FreeTypeFont, fill: tuple[int, int, int], anchor: str = "mm") -> None:
    draw.text((xy[0] + 2, xy[1] + 2), text, font=fnt, fill=(0, 0, 0, 220), anchor=anchor)
    draw.text(xy, text, font=fnt, fill=(*fill, 255), anchor=anchor)


def build() -> Image.Image:
    scene = Image.open(SCENE).convert("RGBA").resize((SIZE, SIZE), Image.Resampling.LANCZOS)
    neck_src, lumbar_src = split_product(HERO)

    panel = SIZE // 2
    rx0, ry0 = panel, panel

    neck = ImageEnhance.Brightness(resize_w(neck_src, 112)).enhance(0.88)
    lumbar = ImageEnhance.Brightness(resize_w(lumbar_src, 165)).enhance(0.86)

    # Pillow zones on happy-man panel (right-bottom)
    paste_in_ellipse(scene, neck, rx0 + 268, ry0 + 88, 52, 34)
    paste_in_ellipse(scene, lumbar, rx0 + 285, ry0 + 248, 78, 58)

    overlay = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)

    od.rectangle((8, panel - 2, panel - 8, SIZE - 8), outline=(*GOLD, 255), width=4)
    od.rectangle((panel + 8, panel - 2, SIZE - 8, SIZE - 8), outline=(*GOLD, 255), width=4)

    draw_text(od, (SIZE // 2, 118), ar("من التعب... للراحة"), font(50), WHITE)
    draw_text(od, (SIZE // 2, 182), ar("من أوّل رحلة"), font(50), GOLD)
    draw_text(od, (panel // 2, panel + 34), ar("قبل"), font(32), (190, 190, 190))

    pill = Image.new("RGBA", (175, 46), (0, 0, 0, 0))
    pd = ImageDraw.Draw(pill)
    pd.rounded_rectangle((0, 0, 174, 45), radius=22, fill=(*TEAL, 235))
    overlay.paste(pill, (panel + 18, panel + 12), pill)
    draw_text(od, (panel + 106, panel + 35), ar("مع VORLAY"), font(30), WHITE)

    od.rectangle((0, SIZE - 118, SIZE, SIZE), fill=(*CHARCOAL, 235))
    draw_text(od, (SIZE // 2 - 70, SIZE - 82), ar("طقم وسائد رقبة وظهر — دعم إرغونومي لكل رحلة"), font(26), WHITE)
    draw_text(od, (SIZE // 2, SIZE - 42), ar("199 د.م · الدفع عند الاستلام"), font(30), GOLD)

    logo = resize_w(make_logo_transparent(Image.open(LOGO)), 170)
    overlay.paste(logo, (SIZE - logo.width - 34, SIZE - logo.height - 20), logo)
    od.line([(SIZE - 215, SIZE - 98), (SIZE - 215, SIZE - 18)], fill=(255, 255, 255, 100), width=2)

    scene.alpha_composite(overlay)
    return scene


def main() -> None:
    out = OUT / "wisada-ad-before-after-fixed.png"
    build().convert("RGB").save(out, quality=95)
    print(f"Saved: {out}")


if __name__ == "__main__":
    main()
