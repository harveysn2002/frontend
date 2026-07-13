import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src =
  "C:/Users/harve/.cursor/projects/d-OneDrive-Documents-New-folder/assets/c__Users_harve_AppData_Roaming_Cursor_User_workspaceStorage_efc8674a470a374a548dd578fe459564_images_pillow-591ec5d4-75ae-4e59-8e35-c1657f913adf.png";
const out = path.join(
  __dirname,
  "..",
  "public/images/products/real-product-set-clean.png",
);

const { data, info } = await sharp(src)
  .resize(2000, null, { fit: "inside" })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = new Uint8ClampedArray(data);
for (let i = 0; i < pixels.length; i += 4) {
  const lum =
    0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
  const boosted = Math.min(255, lum * 2.8 + 15);
  pixels[i] = pixels[i + 1] = pixels[i + 2] = boosted;
  pixels[i + 3] = lum < 18 ? 0 : Math.min(255, (lum - 10) * 3.2);
}

await sharp(Buffer.from(pixels), {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .flatten({ background: { r: 242, g: 242, b: 242 } })
  .sharpen({ sigma: 0.8 })
  .png()
  .toFile(out);

console.log("saved", out, `${info.width}x${info.height}`);
