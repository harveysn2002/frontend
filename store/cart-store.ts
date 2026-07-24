"use client";

import { create } from "zustand";
import { getProductById, type Offer, type Product, type ProductId } from "@/config/products";
import { createEventId } from "@/lib/events";

export type CartItem = {
  id: string;
  productId: ProductId;
  slug: string;
  nameAr: string;
  offerId: string;
  offerTitle: string;
  quantity: number;
  unitPriceMad: number;
  totalPriceMad: number;
  image: string;
  isUpsell?: boolean;
  addToCartEventId: string;
};

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isUpsellOpen: boolean;
  checkoutEventId?: string;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => string;
  closeCheckout: () => void;
  openUpsell: () => void;
  closeUpsell: () => void;
  addOffer: (product: Product, offer: Offer, options?: { isUpsell?: boolean }) => CartItem;
  /** Buy-now: cart becomes exactly this one offer (no stacking). */
  replaceWithOffer: (product: Product, offer: Offer) => CartItem;
  removeItem: (id: string) => void;
  clear: () => void;
  total: () => number;
};

function buildCartItem(
  product: Product,
  offer: Offer,
  options?: { isUpsell?: boolean },
): CartItem {
  const eventId = createEventId(options?.isUpsell ? "upsell_add" : "addtocart");
  return {
    id: `${offer.id}-${eventId}`,
    productId: product.id,
    slug: product.slug,
    nameAr: product.nameAr,
    offerId: offer.id,
    offerTitle: offer.title,
    quantity: offer.quantity,
    unitPriceMad: Math.round(offer.priceMad / offer.quantity),
    totalPriceMad: offer.priceMad,
    image: product.image,
    isUpsell: options?.isUpsell,
    addToCartEventId: eventId,
  };
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  isCheckoutOpen: false,
  isUpsellOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openCheckout: () => {
    const eventId = get().checkoutEventId || createEventId("checkout");
    set({ checkoutEventId: eventId, isCheckoutOpen: true, isCartOpen: false });
    return eventId;
  },
  closeCheckout: () => set({ isCheckoutOpen: false }),
  openUpsell: () => set({ isUpsellOpen: true }),
  closeUpsell: () => set({ isUpsellOpen: false }),
  addOffer: (product, offer, options) => {
    const item = buildCartItem(product, offer, options);
    set((state) => ({
      // Same offer must not stack (double-tap / reopen).
      items: [...state.items.filter((existing) => existing.offerId !== offer.id), item],
      isCartOpen: true,
    }));
    return item;
  },
  replaceWithOffer: (product, offer) => {
    const item = buildCartItem(product, offer);
    set({ items: [item], isCartOpen: false });
    return item;
  },
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clear: () => set({ items: [], checkoutEventId: undefined }),
  total: () => get().items.reduce((sum, item) => sum + item.totalPriceMad, 0),
}));

export function getFirstMissingCrossSell(items: CartItem[]) {
  const existing = new Set(items.map((item) => item.productId));
  const first = items[0];
  const base = first ? getProductById(first.productId) : null;
  const candidate = base?.crossSellIds.find((id) => !existing.has(id));
  return candidate ? getProductById(candidate) : null;
}
