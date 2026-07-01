"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { TrustTicker } from "@/components/layout/trust-ticker";
import { Button } from "@/components/ui/button";
import { getListedProducts } from "@/config/products";
import { useCartStore } from "@/store/cart-store";

const staticLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/collections", label: "المجموعة" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

const productLinks = getListedProducts().map((product) => ({
  href: `/products/${product.slug}`,
  label: product.nameAr,
}));

const links = [
  staticLinks[0],
  staticLinks[1],
  ...productLinks,
  staticLinks[2],
  staticLinks[3],
];

export function Header() {
  const itemCount = useCartStore((state) => state.items.length);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-primary/10 bg-white/88 backdrop-blur-xl">
      <div className="bg-brand-primary py-2.5">
        <TrustTicker variant="announcement" />
      </div>
      <div className="container flex items-center justify-between gap-4 py-4">
        <BrandLogo />
        <nav className="hidden items-center gap-5 text-sm font-semibold text-brand-ink lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="relative px-4" onClick={openCart} aria-label="فتح السلّة">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-brand-gold text-xs text-white">
                {itemCount}
              </span>
            )}
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
