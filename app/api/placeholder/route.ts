import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const label = request.nextUrl.searchParams.get("label") || "VORLAY";
  const svg = `
    <svg width="900" height="900" viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="900" rx="56" fill="#FFF7ED"/>
      <circle cx="730" cy="160" r="180" fill="#CCFBF1"/>
      <circle cx="190" cy="730" r="220" fill="#F7E7B4"/>
      <rect x="170" y="220" width="560" height="430" rx="48" fill="white" stroke="#0F766E" stroke-width="8"/>
      <path d="M336 535C384 435 520 435 568 535" stroke="#0F766E" stroke-width="24" stroke-linecap="round"/>
      <path d="M450 302V548" stroke="#C9A24A" stroke-width="28" stroke-linecap="round"/>
      <circle cx="450" cy="285" r="48" fill="#0F766E"/>
      <text x="450" y="720" text-anchor="middle" font-size="44" font-family="Arial" fill="#1F2933" direction="rtl">${escapeXml(label)}</text>
      <text x="450" y="780" text-anchor="middle" font-size="30" font-family="Arial" fill="#667085">vorlay</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
