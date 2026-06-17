import Image from "next/image";
import Link from "next/link";
import { ProductQuickAdd } from "@/components/product/product-quick-add";
import { RatingStars } from "@/components/product/rating-stars";
import { Button } from "@/components/ui/button";
import type { Product } from "@/config/products";
import { siteConfig } from "@/config/site";
import { formatMad } from "@/lib/currency";

export function ProductCard({ product }: { product: Product }) {
  const offer = product.offers.find((item) => item.recommended) || product.offers[0];

  return (
    <article className="glass-card overflow-hidden rounded-[2rem]">
      <div className="relative aspect-square bg-brand-soft/30">
        <Image src={product.image} alt={product.nameAr} fill className="object-cover" />
      </div>
      <div className="space-y-4 p-6">
        <div>
          <RatingStars />
          <h3 className="mt-3 text-2xl font-black text-brand-ink">{product.nameAr}</h3>
          <p className="mt-2 text-brand-muted">{product.cardSubheading}</p>
        </div>
        <ul className="space-y-2 text-sm text-brand-muted">
          {product.benefits.slice(0, 3).map((benefit) => (
            <li key={benefit}>• {benefit}</li>
          ))}
        </ul>
        <div className="rounded-2xl bg-brand-soft/35 p-4">
          <div className="text-xs font-black text-brand-primary">{offer.badge}</div>
          <div className="mt-1 text-2xl font-black">{formatMad(offer.priceMad)}</div>
          <p className="mt-1 text-xs font-semibold text-brand-primary">
            {siteConfig.priceIncludesShippingNote}
          </p>
        </div>
        <ProductQuickAdd product={product} />
        <Link href={`/products/${product.slug}#order`}>
          <Button variant="secondary" className="w-full">
            شوف التفاصيل والعروض
          </Button>
        </Link>
      </div>
    </article>
  );
}
