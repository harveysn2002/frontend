"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/config/products";
import { formatMad } from "@/lib/currency";
import { useProductPurchase } from "@/hooks/use-product-purchase";

export function ProductQuickAdd({ product }: { product: Product }) {
  const offer = product.offers.find((item) => item.recommended) || product.offers[0];
  const { addToCart } = useProductPurchase(product);

  return (
    <Button className="w-full" onClick={() => addToCart(offer)}>
      <ShoppingBag className="ml-2 h-5 w-5" />
      زيد للسلّة · {formatMad(offer.priceMad)}
    </Button>
  );
}
