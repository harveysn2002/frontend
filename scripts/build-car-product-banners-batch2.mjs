import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(path.resolve(__dirname, ".."), "public/images/products");

const SOURCE =
  "C:/Users/harve/.cursor/projects/d-OneDrive-Documents-New-folder/assets/c__Users_harve_AppData_Roaming_Cursor_User_workspaceStorage_efc8674a470a374a548dd578fe459564_images_coussin-de-soutien-de-voiture-6bdf493b-808f-45c3-8de2-6e1b79c61b45.png";
const CAR_SOURCE =
  "C:/Users/harve/.cursor/projects/d-OneDrive-Documents-New-folder/assets/car-set-real-installed-car.png";

const PRICE = "199";
const COMPARE = "289";
const font = "Segoe UI, Tahoma, Arial, sans-serif";

function badge(x, y, w, h, fill, text, textColor = "#FFF7ED", size = 20) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}"/>
    <text x="${x + w / 2}" y="${y + h / 2 + size * 0.35}" text-anchor="middle" font-family="${font}" font-size="${size}" font-weight="700" fill="${textColor}" direction="rtl">${text}</text>
  `;
}

function overlayTikTok(w, h) {
  return Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${w}" height="140" fill="#0F766E" opacity="0.9"/>
      <text x="${w/2}" y="52" text-anchor="middle" font-family="${font}" font-size="30" font-weight="800" fill="#FFF7ED" direction="rtl">كتسوق بزاف؟</text>
      <text x="${w/2}" y="92" text-anchor="middle" font-family="${font}" font-size="24" fill="#CCFBF1" direction="rtl">هاد الطقم غادي يعاونك</text>
      <text x="${w/2}" y="128" text-anchor="middle" font-family="${font}" font-size="20" fill="#F7E7B4" direction="rtl">رقبة + ظهر — 2 في 1</text>
      <rect x="0" y="${h-260}" width="${w}" height="260" fill="#1F2933" opacity="0.9"/>
      ${badge(32, h-236, w-64, 44, "#C9A24A", "الدفع عند الاستلام", "#1F2933", 20)}
      ${badge(32, h-182, w-64, 44, "#115E59", "الثمن يشمل التوصيل", "#FFF7ED", 20)}
      ${badge(32, h-128, w-64, 44, "#115E59", "توصيل لجميع مدن المغرب", "#FFF7ED", 20)}
      <text x="${w/2}" y="${h-48}" text-anchor="middle" font-family="${font}" font-size="44" font-weight="800" fill="#C9A24A" direction="rtl">${PRICE} د.م</text>
    </svg>
  `);
}

function overlayMinimal(w, h) {
  return Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      ${badge(24, 24, 220, 44, "#C9A24A", "طقم 2 في 1", "#1F2933", 20)}
      <rect x="0" y="${h-88}" width="${w}" height="88" fill="#0F766E" opacity="0.92"/>
      <text x="${w/2}" y="${h-48}" text-anchor="middle" font-family="${font}" font-size="36" font-weight="800" fill="#C9A24A" direction="rtl">${PRICE} د.م — شامل التوصيل</text>
    </svg>
  `);
}

function overlayMarketplace(w, h) {
  return Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${w}" height="${h}" fill="#FFFFFF"/>
      ${badge(w-260, 20, 240, 40, "#067647", "COD — الدفع عند الاستلام", "#FFF7ED", 16)}
      <rect x="0" y="${h-110}" width="${w}" height="110" fill="#F5EFE6"/>
      <text x="${w/2}" y="${h-68}" text-anchor="middle" font-family="${font}" font-size="32" font-weight="800" fill="#0F766E" direction="rtl">طقم وسائد السيارة — رقبة + ظهر</text>
      <text x="${w/2}" y="${h-32}" text-anchor="middle" font-family="${font}" font-size="28" font-weight="700" fill="#C9A24A" direction="rtl">${PRICE} د.م</text>
    </svg>
  `);
}

function overlayAdStrip(w, h) {
  return Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${w}" height="72" fill="#115E59" opacity="0.93"/>
      <text x="${w/2}" y="46" text-anchor="middle" font-family="${font}" font-size="28" font-weight="800" fill="#FFF7ED" direction="rtl">عرض VORLAY — ${PRICE} د.م شامل التوصيل</text>
      <rect x="${w-200}" y="88" width="176" height="176" rx="16" fill="#0F766E" opacity="0.9"/>
      <text x="${w-112}" y="168" text-anchor="middle" font-family="${font}" font-size="22" font-weight="700" fill="#CCFBF1" direction="rtl">2 في 1</text>
      <text x="${w-112}" y="204" text-anchor="middle" font-family="${font}" font-size="18" fill="#F7E7B4" direction="rtl">رقبة + ظهر</text>
      <rect x="0" y="${h-64}" width="${w}" height="64" fill="#1F2933" opacity="0.88"/>
      <text x="${w/2}" y="${h-22}" text-anchor="middle" font-family="${font}" font-size="22" fill="#FFF7ED" direction="rtl">الدفع عند الاستلام • تأكيد بالهاتف • توصيل للمغرب</text>
    </svg>
  `);
}

function overlayCarStory(w, h) {
  return Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${w}" height="100" fill="#0F766E" opacity="0.88"/>
      <text x="${w/2}" y="42" text-anchor="middle" font-family="${font}" font-size="26" font-weight="700" fill="#FFF7ED" direction="rtl">ركّبهم و حس براحة</text>
      <text x="${w/2}" y="78" text-anchor="middle" font-family="${font}" font-size="20" fill="#CCFBF1" direction="rtl">الموضع الصحيح — رقبة + lombaire</text>
      <rect x="0" y="${h-180}" width="${w}" height="180" fill="#1F2933" opacity="0.9"/>
      <text x="${w/2}" y="${h-120}" text-anchor="middle" font-family="${font}" font-size="40" font-weight="800" fill="#C9A24A" direction="rtl">${PRICE} د.م</text>
      <text x="${w/2}" y="${h-78}" text-anchor="middle" font-family="${font}" font-size="20" fill="#CCFBF1" direction="rtl"><tspan text-decoration="line-through">${COMPARE} د.م</tspan></text>
      <text x="${w/2}" y="${h-40}" text-anchor="middle" font-family="${font}" font-size="18" fill="#FFF7ED" direction="rtl">الدفع عند الاستلام — الثمن يشمل التوصيل</text>
    </svg>
  `);
}

async function buildBanner({ name, width, height, productScale, productLeft, productTop, overlayFn, bg = "#F5EFE6", source = SOURCE }) {
  const maxW = Math.round(width * productScale);
  const maxH = height - 16;
  const product = await sharp(source).resize(maxW, maxH, { fit: "inside" }).toBuffer();
  const meta = await sharp(product).metadata();
  const pw = meta.width ?? maxW;
  const ph = meta.height ?? maxW;
  const left = Math.min(productLeft, Math.max(0, width - pw - 8));
  const top = Math.min(productTop, Math.max(0, height - ph - 8));
  const overlayPng = await sharp(overlayFn(width, height)).resize(width, height).png().toBuffer();
  await sharp({ create: { width, height, channels: 3, background: bg } })
    .composite([{ input: product, left, top }, { input: overlayPng, left: 0, top: 0 }])
    .png()
    .toFile(path.join(OUT_DIR, name));
  console.log(`OK ${name}`);
}

async function buildFull({ name, source, width, height, overlayFn }) {
  const base = await sharp(source).resize(width, height, { fit: "cover", position: "centre" }).toBuffer();
  const overlayPng = await sharp(overlayFn(width, height)).resize(width, height).png().toBuffer();
  await sharp(base).composite([{ input: overlayPng, left: 0, top: 0 }]).png().toFile(path.join(OUT_DIR, name));
  console.log(`OK ${name}`);
}

async function buildClean(name, source, width, height, bg = "#FFF7ED") {
  const maxW = Math.round(width * 0.85);
  const maxH = Math.round(height * 0.85);
  const product = await sharp(source).resize(maxW, maxH, { fit: "inside" }).toBuffer();
  const meta = await sharp(product).metadata();
  const left = Math.round((width - (meta.width ?? maxW)) / 2);
  const top = Math.round((height - (meta.height ?? maxH)) / 2);
  await sharp({ create: { width, height, channels: 3, background: bg } })
    .composite([{ input: product, left, top }])
    .png()
    .toFile(path.join(OUT_DIR, name));
  console.log(`OK ${name}`);
}

await buildBanner({ name: "car-set-tiktok-ad.png", width: 1080, height: 1920, productScale: 0.92, productLeft: 54, productTop: 180, overlayFn: overlayTikTok, bg: "#F5EFE6" });
await buildBanner({ name: "car-set-minimal-price.png", width: 1080, height: 1080, productScale: 0.9, productLeft: 54, productTop: 60, overlayFn: overlayMinimal, bg: "#FFF7ED" });
await buildBanner({ name: "car-set-marketplace.png", width: 1000, height: 1000, productScale: 0.82, productLeft: 100, productTop: 80, overlayFn: overlayMarketplace, bg: "#FFFFFF" });
await buildBanner({ name: "car-set-ad-strip.png", width: 1200, height: 628, productScale: 0.72, productLeft: 40, productTop: 90, overlayFn: overlayAdStrip, bg: "#F5EFE6" });
await buildFull({ name: "car-set-installed-story.png", source: CAR_SOURCE, width: 1080, height: 1350, overlayFn: overlayCarStory });
await buildFull({ name: "car-set-installed-square.png", source: CAR_SOURCE, width: 1080, height: 1080, overlayFn: overlayMinimal });
await buildClean("car-set-real-clean.png", SOURCE, 1200, 1200);
await buildClean("car-set-real-white-bg.png", SOURCE, 1000, 1000, "#FFFFFF");

console.log("Batch 2 done.");
