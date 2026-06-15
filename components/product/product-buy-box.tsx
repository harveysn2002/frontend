"use client";

import { useState } from "react";
import { OfferSelector } from "@/components/product/offer-selector";
import { RatingStars } from "@/components/product/rating-stars";
import { Button } from "@/components/ui/button";
import type { Offer, Product } from "@/config/products";
import { trackAddToCart } from "@/lib/tracking";
import { useCartStore } from "@/store/cart-store";

export function ProductBuyBox({ product }: { product: Product }) {
  const defaultOffer = product.offers.find((offer) => offer.recommended) || product.offers[0];
  const [selectedOffer, setSelectedOffer] = useState<Offer>(defaultOffer);
  const addOffer = useCartStore((state) => state.addOffer);

  function handleAdd() {
    const item = addOffer(product, selectedOffer);
    trackAddToCart({
      eventId: item.addToCartEventId,
      value: item.totalPriceMad,
      currency: "MAD",
      contents: [
        {
          id: product.id,
          quantity: selectedOffer.quantity,
          item_price: item.unitPriceMad,
        },
      ],
    });
  }

  return (
    <div className="glass-card rounded-[2rem] p-5 md:p-7">
      <RatingStars />
      <h1 className="mt-4 text-4xl font-black leading-tight text-brand-ink md:text-5xl">
        {product.headline}
      </h1>
      <p className="mt-4 text-lg leading-8 text-brand-muted">{product.subheading}</p>
      <div className="mt-6 grid gap-2 text-sm font-semibold text-brand-primary md:grid-cols-3">
        <span>الدفع عند الاستلام</span>
        <span>تأكيد الطلب بالهاتف</span>
        <span>توصيل لجميع مدن المغرب</span>
      </div>
      <div className="mt-6">
        <OfferSelector
          offers={product.offers}
          selectedOfferId={selectedOffer.id}
          onSelect={setSelectedOffer}
        />
      </div>
      <Button className="mt-6 w-full text-lg" onClick={handleAdd}>
        اختار العرض وافتح السلة
      </Button>
      <p className="mt-3 text-center text-sm text-brand-muted">
        ما غادي تخلص والو الآن. الفريق غادي يتاصل بك لتأكيد الطلب. التوصيل 35 درهم.
      </p>
    </div>
  );
}
