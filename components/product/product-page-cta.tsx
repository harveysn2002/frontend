"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/config/products";
import { formatMad, offerPriceScopeLabel, offerQuantityLabel } from "@/lib/currency";
import { useProductPurchase } from "@/hooks/use-product-purchase";

export function ProductPageCta({
  product,
  title,
  subtitle,
}: {
  product: Product;
  title: string;
  subtitle?: string;
}) {
  const offer = product.offers.find((item) => item.recommended) || product.offers[0];
  const { addToCart, buyNow } = useProductPurchase(product);

  return (
    <div className="rounded-[2rem] bg-gradient-to-l from-brand-primary to-brand-dark p-6 text-white md:p-8">
      <h3 className="text-2xl font-black md:text-3xl">{title}</h3>
      {subtitle ? <p className="mt-3 max-w-2xl leading-8 text-white/85">{subtitle}</p> : null}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
          {offer.title} · {offerQuantityLabel(offer.quantity)} · {formatMad(offer.priceMad)}
        </span>
        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
          {offerPriceScopeLabel(offer.quantity)}
        </span>
        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
          الدفع عند الاستلام
        </span>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button
          className="w-full bg-white text-brand-primary hover:bg-brand-soft"
          onClick={() => addToCart(offer)}
        >
          <ShoppingBag className="ml-2 h-5 w-5" />
          زيد للسلّة ديالي
        </Button>
        <Button
          variant="secondary"
          className="w-full border-white/30 bg-transparent text-white hover:bg-white/10"
          onClick={() => buyNow(offer)}
        >
          اطلب دابا
        </Button>
      </div>
    </div>
  );
}
