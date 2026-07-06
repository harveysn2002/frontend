"use client";

import { Zap } from "lucide-react";
import type { Product } from "@/config/products";
import { useProductPurchase } from "@/hooks/use-product-purchase";
import { cn } from "@/lib/cn";

export function ImageBuyNowCta({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { buyNow } = useProductPurchase(product);
  const offer = product.offers.find((item) => item.recommended) || product.offers[0];

  return (
    <div className={cn("flex justify-center pt-2.5", className)}>
      <button
        type="button"
        onClick={() => buyNow(offer)}
        className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-4 py-2 text-xs font-black text-white shadow-sm transition hover:bg-brand-dark active:scale-[0.98] sm:px-5 sm:py-2.5 sm:text-sm"
      >
        <Zap className="h-3.5 w-3.5" aria-hidden />
        اطلب دابا
      </button>
    </div>
  );
}
