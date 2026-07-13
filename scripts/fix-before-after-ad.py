"""Fix before/after ad: keep happy man exactly, darken grey pillows to black, update text."""

from __future__ import annotations

from pathlib import Path

import arabic_reshaper
from bidi.algorithm import get_display
from PIL import Image, ImageDraw, ImageEnhance, ImageFont

TMP = Path(__file__).resolve().parent / "ad-tmp"
OUT = Path(__file__).resolve().parents[1] / "public" / "images" / "products"

SRC = TMP / "before-after-human.png"
LOGO = TMP / "logo.png"

SIZE = 1080
FONT_BOLD = r"C:\Windows\Fonts\tahomabd.ttf"
GOLD = (201, 162, 39)
WHITE = (255, 255, 255)
CHARCOAL = (18, 18, 20)


def ar(text: str) -> str:
    return get_display(arabic_reshaper.reshape(text))


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_BOLD, size)


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


def resize_w(img: Image.Image, width: int) -> Image.Image:
    ratio = width / img.width
    return img.resize((width, max(1, int(img.height * ratio))), Image.Resampling.LANCZOS)


def draw_text(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, fnt: ImageFont.FreeTypeFont, fill: tuple[int, int, int], anchor: str = "mm") -> None:
    draw.text((xy[0] + 2, xy[1] + 2), text, font=fnt, fill=(0, 0, 0, 220), anchor=anchor)
    draw.text(xy, text, font=fnt, fill=(*fill, 255), anchor=anchor)


def darken_grey_pillows(img: Image.Image, box: tuple[int, int, int, int]) -> None:
    """Turn grey pillow pixels inside box to matte black."""
    region = img.crop(box)
    px = region.load()
    w, h = region.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            spread = max(abs(r - g), abs(g - b), abs(r - b))
            avg = (r + g + b) / 3
            # skip skin / beige coat
            if r > g + 10 and r > b + 8:
                continue
            if spread < 28 and 55 < avg < 205:
                px[x, y] = (18, 18, 20, a)
            elif spread < 35 and 40 < avg < 230:
                px[x, y] = (24, 24, 26, a)
    img.paste(region, box)


def build() -> Image.Image:
    src = Image.open(SRC).convert("RGBA")
    sw, sh = src.size
    scale = SIZE / sw
    scaled_h = int(sh * scale)

    canvas = src.resize((SIZE, scaled_h), Image.Resampling.LANCZOS)
    y_off = (SIZE - scaled_h) // 2

    square = Image.new("RGBA", (SIZE, SIZE), (*CHARCOAL, 255))
    square.paste(canvas, (0, y_off), canvas)
    canvas = square

    # Right panel pillow zones in 1024x682 source coords
    sx = scale
    def map_box(x0: int, y0: int, x1: int, y1: int) -> tuple[int, int, int, int]:
        return (
            int(x0 * sx),
            int(y0 * sx) + y_off,
            int(x1 * sx),
            int(y1 * sx) + y_off,
        )

    darken_grey_pillows(canvas, map_box(700, 95, 910, 210))   # neck pillow
    darken_grey_pillows(canvas, map_box(720, 245, 900, 400))  # lumbar pillow

    overlay = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)

    # Cover original headline area completely
    od.rectangle((0, 0, SIZE, 248), fill=(*CHARCOAL, 255))
    od.rectangle((0, SIZE - 158, SIZE, SIZE), fill=(*CHARCOAL, 255))

    draw_text(od, (SIZE // 2, 58), ar("من التعب... للراحة"), font(46), WHITE)
    draw_text(od, (SIZE // 2, 118), ar("من أوّل رحلة"), font(46), GOLD)

    draw_text(od, (SIZE // 2 - 70, SIZE - 92), ar("طقم وسائد رقبة وظهر — دعم إرغونومي لكل رحلة"), font(25), WHITE)
    draw_text(od, (SIZE // 2, SIZE - 50), ar("199 د.م · الدفع عند الاستلام"), font(29), GOLD)

    logo = resize_w(make_logo_transparent(Image.open(LOGO)), 165)
    overlay.paste(logo, (SIZE - logo.width - 32, SIZE - logo.height - 22), logo)
    od.line([(SIZE - 210, SIZE - 108), (SIZE - 210, SIZE - 20)], fill=(255, 255, 255, 100), width=2)

    canvas.alpha_composite(overlay)
    return canvas


def main() -> None:
    out = OUT / "wisada-ad-before-after-fixed.png"
    build().convert("RGB").save(out, quality=95)
    print(f"Saved: {out}")


if __name__ == "__main__":
    main()
