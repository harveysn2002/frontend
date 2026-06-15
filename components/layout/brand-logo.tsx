import Link from "next/link";
import { siteConfig } from "@/config/site";

export function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="VORLAY home">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-primary text-xl font-black text-white shadow-soft">
        V
      </div>
      <div className="leading-tight">
        <div className="text-xl font-black text-brand-ink">{siteConfig.nameAr}</div>
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
          {siteConfig.nameEn}
        </div>
      </div>
    </Link>
  );
}
