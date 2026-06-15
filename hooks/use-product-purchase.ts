"use client";

import type { Offer, Product } from "@/config/products";
import { trackAddToCart, trackInitiateCheckout } from "@/lib/tracking";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/store/cart-store";

export function useProductPurchase(product: Product) {
  const addOfferToStore = useCartStore((state) => state.addOffer);
  const openCheckout = useCartStore((state) => state.openCheckout);

  function addOffer(offer: Offer) {
    const item = addOfferToStore(product, offer);
    trackAddToCart({
      eventId: item.addToCartEventId,
      value: item.totalPriceMad,
      currency: "MAD",
      contents: [
        {
          id: product.id,
          quantity: offer.quantity,
          item_price: item.unitPriceMad,
        },
      ],
    });
    return item;
  }

  function addToCart(offer: Offer) {
    return addOffer(offer);
  }

  function buyNow(offer: Offer) {
    addOffer(offer);
    const eventId = openCheckout();
    const total = offer.priceMad + siteConfig.shippingMad;
    trackInitiateCheckout({
      eventId,
      value: total,
      currency: "MAD",
      contents: [
        {
          id: product.id,
          quantity: offer.quantity,
          item_price: Math.round(offer.priceMad / offer.quantity),
        },
      ],
    });
  }

  return { addToCart, buyNow };
}
