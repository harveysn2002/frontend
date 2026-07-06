import Image from "next/image";
import Link from "next/link";
import { ImageBuyNowCta } from "@/components/product/image-buy-now-cta";
import { ProductQuickAdd } from "@/components/product/product-quick-add";
import { RatingStars } from "@/components/product/rating-stars";
import { Button } from "@/components/ui/button";
import type { Product } from "@/config/products";
import { siteConfig } from "@/config/site";
import { formatMad, offerPriceScopeLabel, offerQuantityBadge } from "@/lib/currency";

export function ProductCard({ product }: { product: Product }) {
  const offer = product.offers.find((item) => item.recommended) || product.offers[0];
  const unit = product.quantityUnit ?? "piece";
  const contain = product.heroImageFit === "contain";
  const productHref = `/products/${product.slug}`;

  return (
    <article className="glass-card overflow-hidden rounded-[2rem]">
      <div>
        <Link
          href={productHref}
          className={`relative block transition hover:opacity-95 ${contain ? "bg-white" : "aspect-[4/5] bg-brand-soft/30 sm:aspect-square"}`}
        >
          {contain ? (
            <Image
              src={product.image}
              alt={product.nameAr}
              width={800}
              height={600}
              quality={90}
              sizes="(max-width: 768px) 100vw, 400px"
              className="h-auto w-full object-contain"
            />
          ) : (
            <Image
              src={product.image}
              alt={product.nameAr}
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          )}
        </Link>
        <ImageBuyNowCta product={product} className="pb-1 pt-2" />
      </div>
      <div className="space-y-4 p-6">
        <div>
          <RatingStars />
          <Link href={productHref} className="group block">
            <h3 className="mt-3 text-2xl font-black text-brand-ink transition group-hover:text-brand-primary">
              {product.nameAr}
            </h3>
            <p className="mt-2 text-brand-muted">{product.cardSubheading}</p>
          </Link>
        </div>
        <ul className="space-y-2 text-sm text-brand-muted">
          {product.benefits.slice(0, 3).map((benefit) => (
            <li key={benefit}>• {benefit}</li>
          ))}
        </ul>
        <div className="rounded-2xl bg-brand-soft/35 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-xs font-black text-brand-primary">{offer.badge}</div>
            {offerQuantityBadge(offer.quantity, unit) ? (
              <div className="rounded-full bg-brand-primary px-2 py-0.5 text-xs font-black text-white">
                {offerQuantityBadge(offer.quantity, unit)}
              </div>
            ) : null}
          </div>
          <div className="mt-1 text-2xl font-black">{formatMad(offer.priceMad)}</div>
          <p className="mt-1 text-sm font-bold text-brand-ink">{offerPriceScopeLabel(offer.quantity, unit)}</p>
          <p className="mt-1 text-xs font-semibold text-brand-primary">
            {siteConfig.priceIncludesShippingNote}
          </p>
        </div>
        <ProductQuickAdd product={product} />
        <Link href={`${productHref}#order`}>
          <Button variant="secondary" className="w-full">
            شوف التفاصيل والعروض
          </Button>
        </Link>
      </div>
    </article>
  );
}
