"use client";

import type { Offer, Product } from "@/config/products";
import { trackAddToCart, trackInitiateCheckout } from "@/lib/tracking";
import { useCartStore, type CartItem } from "@/store/cart-store";

export function useProductPurchase(product: Product) {
  const addOfferToStore = useCartStore((state) => state.addOffer);
  const replaceWithOffer = useCartStore((state) => state.replaceWithOffer);
  const openCheckout = useCartStore((state) => state.openCheckout);

  function trackCartItem(item: CartItem, offer: Offer) {
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
  }

  function addToCart(offer: Offer) {
    const item = addOfferToStore(product, offer);
    trackCartItem(item, offer);
    return item;
  }

  function buyNow(offer: Offer) {
    // Always one selection in checkout — never stack on each "اطلب دابا".
    const item = replaceWithOffer(product, offer);
    trackCartItem(item, offer);
    const eventId = openCheckout();
    trackInitiateCheckout({
      eventId,
      value: offer.priceMad,
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
