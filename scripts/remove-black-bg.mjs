import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "../public/images/hero/hero-home-source.png");
const out = path.join(__dirname, "../public/images/hero/hero-home-transparent.png");

const THRESHOLD = 40;

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const px = new Uint8Array(data);
const bg = new Uint8Array(width * height);

function isBg(i) {
  const o = i * 4;
  return px[o] <= THRESHOLD && px[o + 1] <= THRESHOLD && px[o + 2] <= THRESHOLD;
}

const queue = [];
for (let x = 0; x < width; x++) {
  queue.push(x, (height - 1) * width + x);
}
for (let y = 0; y < height; y++) {
  queue.push(y * width, y * width + (width - 1));
}

let head = 0;
while (head < queue.length) {
  const idx = queue[head++];
  if (bg[idx] || !isBg(idx)) continue;
  bg[idx] = 1;
  const x = idx % width;
  const y = (idx / width) | 0;
  if (x > 0) queue.push(idx - 1);
  if (x < width - 1) queue.push(idx + 1);
  if (y > 0) queue.push(idx - width);
  if (y < height - 1) queue.push(idx + width);
}

for (let i = 0; i < width * height; i++) {
  if (bg[i]) px[i * 4 + 3] = 0;
}

await sharp(px, { raw: { width, height, channels: 4 } }).png().toFile(out);
console.log(`OK ${width}x${height} — edge flood-fill, threshold ${THRESHOLD}`);
