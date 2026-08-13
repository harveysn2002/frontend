import type { ProductId } from "@/config/product-types";

export type ProductReview = {
  /** Masked buyer handle, kept as-is from the source */
  name: string;
  /** 1–5 stars */
  rating: number;
  /** Purchase date label */
  date: string;
  /** Selected variant label */
  variant?: string;
  /** Faithful Darija translation of the original review (no fabrication) */
  text?: string;
  /** "Helpful" count from the source, when present */
  helpful?: number;
};

export type ProductReviewSummary = {
  average: number;
  count: number;
  reviews: ProductReview[];
};

export type ReviewsByProduct = Partial<Record<ProductId, ProductReviewSummary>>;
