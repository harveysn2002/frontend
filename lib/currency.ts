export function formatMad(amount: number) {
  return new Intl.NumberFormat("ar-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function offerQuantityLabel(quantity: number): string {
  if (quantity === 1) return "قطعة واحدة";
  if (quantity === 2) return "2 قطع";
  return `${quantity} قطع`;
}

export function offerPriceScopeLabel(quantity: number): string {
  if (quantity === 1) return "الثمن لقطعة واحدة";
  return `الثمن لـ ${quantity} قطع`;
}

export function offerPriceClarityLabel(quantity: number): string | null {
  if (quantity <= 1) return null;
  return `لـ ${quantity} قطع — ماشي قطعة وحدة`;
}

export function offerUnitPriceMad(priceMad: number, quantity: number): number {
  return Math.round(priceMad / quantity);
}
