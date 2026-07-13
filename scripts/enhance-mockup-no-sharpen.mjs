import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src =
  "C:/Users/harve/.cursor/projects/d-OneDrive-Documents-New-folder/assets/c__Users_harve_AppData_Roaming_Cursor_User_workspaceStorage_efc8674a470a374a548dd578fe459564_images_3-c1b57652-065b-456c-b65f-60e7c7547468.png";
const outDir = path.join(__dirname, "..", "public/images/products");

async function enhance(input, output, { scale, medianSize, contrast, brightness, saturation }) {
  const meta = await sharp(input).metadata();
  const width = Math.round((meta.width ?? 1024) * scale);

  await sharp(input)
    .resize(width, null, {
      fit: "inside",
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .median(medianSize)
    .normalize()
    .modulate({ brightness, saturation })
    .linear(contrast, -(128 * (contrast - 1) * 0.45))
    .gamma(1.02)
    .png({ compressionLevel: 6, quality: 100, effort: 10 })
    .toFile(output);
}

await enhance(src, path.join(outDir, "mockup-studio-enhanced-v1.png"), {
  scale: 1.75,
  medianSize: 3,
  contrast: 1.12,
  brightness: 1.03,
  saturation: 1.06,
});

await enhance(src, path.join(outDir, "mockup-studio-enhanced-v2.png"), {
  scale: 2,
  medianSize: 5,
  contrast: 1.08,
  brightness: 1.05,
  saturation: 1.04,
});

console.log("Done — no sharpening applied");
console.log(outDir);
