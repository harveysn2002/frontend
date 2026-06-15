import { readFile } from "node:fs/promises";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const localImages: Record<string, string> = {
  "car-back-support":
    "C:\\Users\\harve\\.cursor\\projects\\d-OneDrive-Documents-New-folder\\assets\\c__Users_harve_AppData_Roaming_Cursor_User_workspaceStorage_efc8674a470a374a548dd578fe459564_images_image-50aee6d2-e813-4778-b8b3-d84b791dc2f1.png",
  "posture-belt-front":
    "C:\\Users\\harve\\.cursor\\projects\\d-OneDrive-Documents-New-folder\\assets\\c__Users_harve_AppData_Roaming_Cursor_User_workspaceStorage_efc8674a470a374a548dd578fe459564_images_image-1a39fe43-9c72-4598-9c4a-7f43b9dd345e.png",
  "posture-belt-back":
    "C:\\Users\\harve\\.cursor\\projects\\d-OneDrive-Documents-New-folder\\assets\\c__Users_harve_AppData_Roaming_Cursor_User_workspaceStorage_efc8674a470a374a548dd578fe459564_images_image-b7b01c90-f588-4b02-9c76-db0e731e4792.png",
  "seat-back-cushion":
    "C:\\Users\\harve\\.cursor\\projects\\d-OneDrive-Documents-New-folder\\assets\\c__Users_harve_AppData_Roaming_Cursor_User_workspaceStorage_efc8674a470a374a548dd578fe459564_images_image-d2adad20-8e95-4f8d-a5a1-8a32d42b5c3a.png",
};

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") || "";
  const filePath = localImages[name];

  if (filePath) {
    try {
      const file = await readFile(filePath);
      return new Response(file, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch {
      // Fall back below when local Cursor assets are not available in production.
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
