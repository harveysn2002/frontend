import type { Product } from "@/config/products";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track?: (...args: unknown[]) => void; page?: () => void };
    snaptr?: (...args: unknown[]) => void;
  }
}

const enabled = process.env.NEXT_PUBLIC_ENABLE_PIXELS === "true";

export type TrackingPayload = {
  eventId: string;
  value?: number;
  currency?: "MAD";
  product?: Product;
  contents?: Array<{ id: string; quantity: number; item_price?: number; price?: number }>;
  orderNumber?: string;
};

export function trackPageView() {
  if (!enabled || typeof window === "undefined") return;
  window.fbq?.("track", "PageView");
  window.ttq?.page?.();
  window.snaptr?.("track", "PAGE_VIEW");
}

export function trackViewContent(payload: TrackingPayload) {
  if (!enabled || typeof window === "undefined") return;
  window.fbq?.(
    "track",
    "ViewContent",
    {
      content_name: payload.product?.nameAr,
      content_ids: payload.product ? [payload.product.id] : undefined,
      content_type: "product",
      currency: "MAD",
    },
    { eventID: payload.eventId },
  );
  window.ttq?.track?.("ViewContent", {
    content_id: payload.product?.id,
    content_name: payload.product?.nameAr,
    currency: "MAD",
    event_id: payload.eventId,
  });
  window.snaptr?.("track", "VIEW_CONTENT", {
    item_ids: payload.product ? [payload.product.id] : [],
    client_dedup_id: payload.eventId,
  });
}

export function trackAddToCart(payload: TrackingPayload) {
  if (!enabled || typeof window === "undefined") return;
  window.fbq?.(
    "track",
    "AddToCart",
    {
      value: payload.value,
      currency: "MAD",
      contents: payload.contents,
      content_type: "product",
    },
    { eventID: payload.eventId },
  );
  window.ttq?.track?.("AddToCart", {
    value: payload.value,
    currency: "MAD",
    contents: payload.contents,
    event_id: payload.eventId,
  });
  window.snaptr?.("track", "ADD_CART", {
    price: payload.value,
    currency: "MAD",
    client_dedup_id: payload.eventId,
  });
}

export function trackInitiateCheckout(payload: TrackingPayload) {
  if (!enabled || typeof window === "undefined") return;
  window.fbq?.(
    "track",
    "InitiateCheckout",
    { value: payload.value, currency: "MAD", contents: payload.contents },
    { eventID: payload.eventId },
  );
  window.ttq?.track?.("InitiateCheckout", {
    value: payload.value,
    currency: "MAD",
    contents: payload.contents,
    event_id: payload.eventId,
  });
  window.snaptr?.("track", "START_CHECKOUT", {
    price: payload.value,
    currency: "MAD",
    client_dedup_id: payload.eventId,
  });
}

export function trackPurchase(payload: TrackingPayload) {
  if (!enabled || typeof window === "undefined") return;
  window.fbq?.(
    "track",
    "Purchase",
    {
      value: payload.value,
      currency: "MAD",
      contents: payload.contents,
      content_type: "product",
    },
    { eventID: payload.eventId },
  );
  window.ttq?.track?.("CompletePayment", {
    value: payload.value,
    currency: "MAD",
    contents: payload.contents,
    event_id: payload.eventId,
  });
  window.snaptr?.("track", "PURCHASE", {
    price: payload.value,
    currency: "MAD",
    transaction_id: payload.orderNumber,
    client_dedup_id: payload.eventId,
  });
}
