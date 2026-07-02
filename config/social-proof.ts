/**
 * Social proof stats — OFF until you have real order/review data.
 *
 * When ready:
 * 1. Set numbers from your Google Sheet / backend (real counts only).
 * 2. Set `enabled: true`.
 * 3. Redeploy frontend.
 *
 * Never guess or inflate these values.
 */
export const socialProofConfig = {
  enabled: false,
  /** Total delivered or confirmed orders */
  ordersDelivered: 0,
  /** Average rating, e.g. 4.8 — only if you collect real reviews */
  averageRating: 0,
  /** Number of written reviews */
  reviewCount: 0,
} as const;

export type SocialProofStats = {
  ordersDelivered: number;
  averageRating: number;
  reviewCount: number;
};

export function getActiveSocialProof(): SocialProofStats | null {
  if (!socialProofConfig.enabled) return null;

  const { ordersDelivered, averageRating, reviewCount } = socialProofConfig;
  const hasOrders = ordersDelivered > 0;
  const hasReviews = reviewCount > 0 && averageRating > 0;

  if (!hasOrders && !hasReviews) return null;

  return { ordersDelivered, averageRating, reviewCount };
}

export const socialProofPlaceholderNote =
  "تجربة طلب واضحة، دعم قبل البيع، وتأكيد بالهاتف قبل ما تخرج أي شحنة.";
