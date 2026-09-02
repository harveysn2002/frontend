import type { OrderConfirmationSnapshot } from "@/lib/whatsapp-order";

const STORAGE_KEY = "vorlay_order_confirmation";

export function saveOrderConfirmation(snapshot: OrderConfirmationSnapshot) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Ignore quota / private mode errors — thank-you page still works without WhatsApp details.
  }
}

export function readOrderConfirmation(orderNumber: string): OrderConfirmationSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const snapshot = JSON.parse(raw) as OrderConfirmationSnapshot;
    if (snapshot.orderNumber !== orderNumber) return null;
    return snapshot;
  } catch {
    return null;
  }
}

export function clearOrderConfirmation() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
