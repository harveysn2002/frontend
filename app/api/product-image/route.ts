import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const allowedNames = new Set([
  "car-back-support",
  "posture-belt-front",
  "posture-belt-back",
  "seat-back-cushion",
]);

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") || "";

  if (allowedNames.has(name)) {
    const filePath = path.join(
      process.cwd(),
      "public",
      "images",
      "products",
      `${name}.png`,
    );

    try {
      const file = await readFile(filePath);
      return new Response(file, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch {
      // Fall back to SVG placeholder when image is not uploaded yet.
    }
  }

  const label = name.replace(/-/g, " ") || "vorlay product";
  const svg = `
    <svg width="900" height="900" viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="900" rx="56" fill="#FFF7ED"/>
      <circle cx="720" cy="180" r="190" fill="#CCFBF1"/>
      <circle cx="190" cy="740" r="220" fill="#F7E7B4"/>
      <rect x="180" y="250" width="540" height="360" rx="48" fill="white" stroke="#0F766E" stroke-width="8"/>
      <text x="450" y="455" text-anchor="middle" font-size="42" font-family="Arial" fill="#1F2933">VORLAY</text>
      <text x="450" y="525" text-anchor="middle" font-size="28" font-family="Arial" fill="#667085">${label}</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
