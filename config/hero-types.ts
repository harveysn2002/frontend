import type { ProductId } from "@/config/product-types";

export type HeroRotatingItem =
  | { kind: "headline"; lineWhite: string; lineGold: string }
  | { kind: "body"; text: string };

export type HomeHeroSlide = {
  id: ProductId;
  slug: string;
  nameAr: string;
  badge: string;
  headlineWhite: string;
  headlineGold: string;
  description: string;
  image: string;
  imageAlt: string;
  priceMad: number;
  compareAtPriceMad?: number;
  priceNote?: string;
};
