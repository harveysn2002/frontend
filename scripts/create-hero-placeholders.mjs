import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const heroDir = path.join(__dirname, "..", "public", "images", "hero");
const pillowSrc = path.join(__dirname, "..", "public", "images", "products", "wisada-dahr-hero.webp");

await mkdir(heroDir, { recursive: true });
await copyFile(pillowSrc, path.join(heroDir, "hero-pillow.webp"));

async function mk(name, label, sub) {
  const svg = `
    <svg width="900" height="900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stop-color="#C9A24A" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="900" height="900" fill="url(#g)"/>
      <rect x="220" y="280" width="460" height="340" rx="48" fill="#1a1a1a" stroke="#C9A24A" stroke-width="3" opacity="0.9"/>
      <text x="450" y="430" text-anchor="middle" font-family="Arial" font-size="52" font-weight="700" fill="#C9A24A">VORLAY</text>
      <text x="450" y="500" text-anchor="middle" font-family="Arial" font-size="34" fill="#ffffff">${label}</text>
      <text x="450" y="550" text-anchor="middle" font-family="Arial" font-size="22" fill="#999999">${sub}</text>
    </svg>
  `;
  await sharp(Buffer.from(svg)).png().toFile(path.join(heroDir, name));
}

await mk("hero-belt.png", "حزام الظهر", "ارفع PNG");
await mk("hero-bundle.png", "طقم الظهر", "ارفع PNG");
console.log("Hero images ready in public/images/hero/");
