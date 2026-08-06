import { byNiche } from "@/config/niche";
import { comfortReviews } from "@/config/niches/comfort/reviews";
import { watchesReviews } from "@/config/niches/watches/reviews";
import type {
  ProductReview,
  ProductReviewSummary,
  ReviewsByProduct,
} from "@/config/review-types";
import type { ProductId } from "@/config/product-types";

export type { ProductReview, ProductReviewSummary, ReviewsByProduct };

export const reviewsByProduct: ReviewsByProduct = byNiche({
  comfort: comfortReviews,
  watches: watchesReviews,
});

export function getProductReviews(productId: ProductId): ProductReviewSummary | undefined {
  return reviewsByProduct[productId];
}
