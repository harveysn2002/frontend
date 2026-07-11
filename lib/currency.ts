import type { QuantityUnit } from "@/config/products";

export function formatMad(amount: number) {
  return new Intl.NumberFormat("ar-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function offerQuantityLabel(quantity: number, unit: QuantityUnit = "piece"): string {
  if (unit === "set") {
    if (quantity === 1) return "طقم واحد";
    if (quantity === 2) return "طقمين";
    return `${quantity} أطقم`;
  }
  if (quantity === 1) return "قطعة واحدة";
  if (quantity === 2) return "2 قطع";
  return `${quantity} قطع`;
}

export function offerPriceScopeLabel(quantity: number, unit: QuantityUnit = "piece"): string {
  if (unit === "set") {
    if (quantity === 1) return "الثمن لطقم واحد";
    return `الثمن لـ ${quantity} أطقم`;
  }
  if (quantity === 1) return "الثمن لقطعة واحدة";
  return `الثمن لـ ${quantity} قطع`;
}

export function offerPriceClarityLabel(quantity: number, unit: QuantityUnit = "piece"): string | null {
  if (quantity <= 1) return null;
  if (unit === "set") return `لـ ${quantity} أطقم — ماشي طقم واحد`;
  return `لـ ${quantity} قطع — ماشي قطعة وحدة`;
}

export function offerUnitPriceMad(priceMad: number, quantity: number): number {
  return Math.round(priceMad / quantity);
}

export function offerQuantityBadge(quantity: number, unit: QuantityUnit = "piece"): string | null {
  if (quantity <= 1) return null;
  return unit === "set" ? `×${quantity} أطقم` : `×${quantity} قطع`;
}
