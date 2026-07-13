import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(frontendRoot, "..");

const SOURCE =
  "C:/Users/harve/.cursor/projects/d-OneDrive-Documents-New-folder/assets/c__Users_harve_AppData_Roaming_Cursor_User_workspaceStorage_efc8674a470a374a548dd578fe459564_images_coussin-de-soutien-de-voiture-6bdf493b-808f-45c3-8de2-6e1b79c61b45.png";
const CAR_SOURCE =
  "C:/Users/harve/.cursor/projects/d-OneDrive-Documents-New-folder/assets/car-set-real-installed-car.png";
const OUT_DIR = path.join(frontendRoot, "public/images/products");

const PRICE = "199";
const COMPARE = "289";
const font = "Segoe UI, Tahoma, Arial, sans-serif";

function badge(x, y, w, h, fill, stroke, text, textColor = "#FFF7ED", size = 22) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" ${stroke ? `stroke="${stroke}" stroke-width="2"` : ""}/>
    <text x="${x + w / 2}" y="${y + h / 2 + size * 0.35}" text-anchor="middle" font-family="${font}" font-size="${size}" font-weight="700" fill="${textColor}" direction="rtl">${text}</text>
  `;
}

function overlayHero(width, height) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#FFF7ED" stop-opacity="0"/>
          <stop offset="55%" stop-color="#FFF7ED" stop-opacity="0.92"/>
          <stop offset="100%" stop-color="#FFF7ED" stop-opacity="0.98"/>
        </linearGradient>
      </defs>
      <rect x="${width * 0.42}" y="0" width="${width * 0.58}" height="${height}" fill="url(#panel)"/>
      ${badge(width * 0.52, 48, width * 0.42, 52, "#C9A24A", "#F7E7B4", "طقم 2 في 1 — رقبة + ظهر", "#1F2933", 24)}
      ${badge(width * 0.52, 118, width * 0.42, 48, "#0F766E", null, "الدفع عند الاستلام", "#FFF7ED", 22)}
      ${badge(width * 0.52, 180, width * 0.42, 48, "#115E59", null, "الثمن يشمل التوصيل", "#FFF7ED", 22)}
      ${badge(width * 0.52, 242, width * 0.42, 48, "#115E59", null, "توصيل لجميع مدن المغرب", "#FFF7ED", 22)}
      ${badge(width * 0.52, 304, width * 0.42, 48, "#115E59", null, "تأكيد الطلب بالهاتف", "#FFF7ED", 22)}
      <rect x="${width * 0.52}" y="${height - 130}" width="${width * 0.42}" height="88" rx="18" fill="#0F766E"/>
      <text x="${width * 0.73}" y="${height - 78}" text-anchor="middle" font-family="${font}" font-size="46" font-weight="800" fill="#C9A24A" direction="rtl">${PRICE} د.م</text>
      <text x="${width * 0.73}" y="${height - 42}" text-anchor="middle" font-family="${font}" font-size="22" fill="#CCFBF1" direction="rtl"><tspan text-decoration="line-through">${COMPARE} د.م</tspan></text>
      <text x="24" y="${height - 24}" font-family="${font}" font-size="16" fill="#667085">صورة المنتج الحقيقية — VORLAY</text>
    </svg>
  `);
}

function overlaySquare(width, height) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="${height - 200}" width="${width}" height="200" fill="#FFF7ED" opacity="0.95"/>
      ${badge(24, height - 180, width - 48, 44, "#C9A24A", "#F7E7B4", "طقم 2 في 1 — دعم الرقبة والظهر", "#1F2933", 20)}
      ${badge(24, height - 124, (width - 56) / 2, 40, "#0F766E", null, "الدفع عند الاستلام", "#FFF7ED", 18)}
      ${badge(32 + (width - 56) / 2, height - 124, (width - 56) / 2, 40, "#0F766E", null, "الثمن يشمل التوصيل", "#FFF7ED", 18)}
      <text x="${width / 2}" y="${height - 36}" text-anchor="middle" font-family="${font}" font-size="38" font-weight="800" fill="#0F766E" direction="rtl">${PRICE} د.م</text>
      <text x="${width - 24}" y="36" text-anchor="end" font-family="${font}" font-size="18" fill="#667085" direction="rtl"><tspan text-decoration="line-through">${COMPARE} د.م</tspan></text>
    </svg>
  `);
}

function overlayStory(width, height) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${width}" height="120" fill="#0F766E" opacity="0.92"/>
      <text x="${width / 2}" y="52" text-anchor="middle" font-family="${font}" font-size="28" font-weight="700" fill="#FFF7ED" direction="rtl">راحة فالسياقة الطويلة</text>
      <text x="${width / 2}" y="92" text-anchor="middle" font-family="${font}" font-size="22" fill="#CCFBF1" direction="rtl">طقم رقبة + ظهر — صورة حقيقية</text>
      <rect x="0" y="${height - 220}" width="${width}" height="220" fill="#1F2933" opacity="0.88"/>
      ${badge(24, height - 196, width - 48, 44, "#C9A24A", null, "الدفع عند الاستلام", "#1F2933", 20)}
      ${badge(24, height - 140, width - 48, 44, "#115E59", null, "توصيل لجميع مدن المغرب", "#FFF7ED", 20)}
      <text x="${width / 2}" y="${height - 56}" text-anchor="middle" font-family="${font}" font-size="42" font-weight="800" fill="#C9A24A" direction="rtl">${PRICE} د.م — شامل التوصيل</text>
    </svg>
  `);
}

async function buildBanner({ name, width, height, productScale, productLeft, productTop, overlayFn, bg = "#F5EFE6", source = SOURCE }) {
  const maxW = Math.round(width * productScale);
  const maxH = height - 16;
  const product = await sharp(source).resize(maxW, maxH, { fit: "inside" }).toBuffer();
  const productMeta = await sharp(product).metadata();
  const pw = productMeta.width ?? maxW;
  const ph = productMeta.height ?? maxW;
  const left = Math.min(productLeft, Math.max(0, width - pw - 8));
  const top = Math.min(productTop, Math.max(0, height - ph - 8));

  const overlaySvg = overlayFn(width, height);
  const overlayPng = await sharp(overlaySvg).resize(width, height).png().toBuffer();

  await sharp({ create: { width, height, channels: 3, background: bg } })
    .composite([
      { input: product, left, top },
      { input: overlayPng, left: 0, top: 0 },
    ])
    .png()
    .toFile(path.join(OUT_DIR, name));

  console.log(`OK ${name} (${pw}x${ph} @ ${left},${top})`);
}

await mkdir(OUT_DIR, { recursive: true });
await copyFile(SOURCE, path.join(OUT_DIR, "car-cushion-set-real.png"));

await buildBanner({ name: "car-set-real-hero.png", width: 1200, height: 675, productScale: 0.78, productLeft: 40, productTop: 30, overlayFn: overlayHero });
await buildBanner({ name: "car-set-real-square.png", width: 1080, height: 1080, productScale: 0.88, productLeft: 60, productTop: 80, overlayFn: overlaySquare });
await buildBanner({ name: "car-set-real-story.png", width: 1080, height: 1350, productScale: 0.82, productLeft: 90, productTop: 140, overlayFn: overlayStory });

async function buildFullPhotoBanner({ name, source, width, height, overlayFn }) {
  const resized = await sharp(source).resize(width, height, { fit: "cover", position: "centre" }).toBuffer();
  const overlayPng = await sharp(overlayFn(width, height)).resize(width, height).png().toBuffer();
  await sharp(resized)
    .composite([{ input: overlayPng, left: 0, top: 0 }])
    .png()
    .toFile(path.join(OUT_DIR, name));
  console.log(`OK ${name} (full photo overlay)`);
}

function overlayCarHero(width, height) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${width}" height="90" fill="#0F766E" opacity="0.85"/>
      <text x="${width/2}" y="38" text-anchor="middle" font-family="${font}" font-size="26" font-weight="700" fill="#FFF7ED" direction="rtl">طقم 2 في 1 — رقبة + ظهر</text>
      <text x="${width/2}" y="72" text-anchor="middle" font-family="${font}" font-size="18" fill="#CCFBF1" direction="rtl">الدفع عند الاستلام • الثمن يشمل التوصيل</text>
      <rect x="0" y="${height-72}" width="${width}" height="72" fill="#1F2933" opacity="0.88"/>
      <text x="${width/2}" y="${height-28}" text-anchor="middle" font-family="${font}" font-size="34" font-weight="800" fill="#C9A24A" direction="rtl">${PRICE} د.م</text>
    </svg>
  `);
}

await buildFullPhotoBanner({ name: "car-set-installed-hero.png", source: CAR_SOURCE, width: 1200, height: 675, overlayFn: overlayCarHero });
await copyFile(CAR_SOURCE, path.join(OUT_DIR, "car-set-installed-car.png")).catch(() => {});
await copyFile("C:/Users/harve/.cursor/projects/d-OneDrive-Documents-New-folder/assets/car-set-real-flatlay.png", path.join(OUT_DIR, "car-set-flatlay.png")).catch(() => {});
await copyFile("C:/Users/harve/.cursor/projects/d-OneDrive-Documents-New-folder/assets/car-set-real-studio-clone.png", path.join(OUT_DIR, "car-set-studio-alt.png")).catch(() => {});

console.log("Done — real product photo, exact angle preserved.");
