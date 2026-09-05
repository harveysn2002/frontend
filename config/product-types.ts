/**
 * Product shapes shared by every niche catalog.
 * Niche catalogs live under `config/niches/<niche>/catalog.ts`.
 */

/** Free-form so each niche can name its own products (e.g. "belt", "armani-chrono"). */
export type ProductId = string;

export type QuantityUnit = "piece" | "set";

export type Offer = {
  id: string;
  productId: ProductId;
  quantity: number;
  title: string;
  subtitle: string;
  badge: string;
  priceMad: number;
  compareAtPriceMad: number;
  recommended?: boolean;
  upsellOnly?: boolean;
};

export type Product = {
  id: ProductId;
  slug: string;
  nameAr: string;
  nameEn: string;
  headline: string;
  subheading: string;
  cardHeading: string;
  cardSubheading: string;
  bestFor: string[];
  benefits: string[];
  pains: string[];
  /** Persuasive one-liner under each pain card (same order as `pains`) */
  painResponses?: string[];
  mechanism: string;
  image: string;
  images: string[];
  /** Large image beside "كيفاش كيعاون؟" section */
  detailImage?: string;
  /** Full-width story banners between text sections */
  storyImages?: string[];
  /** Image shown after pain cards, before the price panel */
  afterPainImage?: string;
  /** Trust-building video (mp4 under /public) shown lower on the product page */
  trustVideo?: string;
  /** Poster image for the trust video */
  trustVideoPoster?: string;
  /** Video frame shape — portrait (Reels) or landscape product demos */
  trustVideoAspect?: "portrait" | "landscape";
  /** Extra trust videos shown together with `trustVideo` (not replacing it) */
  extraTrustVideos?: Array<{
    src: string;
    poster?: string;
    aspect?: "portrait" | "landscape";
  }>;
  /** Short persuasive line above the headline (gold pill) */
  eyebrow?: string;
  /** Promo graphics with text — use contain so badges/prices stay visible */
  heroImageFit?: "cover" | "contain";
  /** Gallery fit — defaults to `heroImageFit` when omitted */
  carouselImageFit?: "cover" | "contain";
  quantityUnit?: QuantityUnit;
  /** Soft social proof near the buy box, e.g. 220 → "+220 مشتري" */
  buyersCount?: number;
  /** Hide the urgency countdown on this product page */
  hideOfferCountdown?: boolean;
  /** Extra FAQs shown on this product page only */
  faqs?: Array<{ q: string; a: string }>;
  offers: Offer[];
  crossSellIds: ProductId[];
  /** Set false to hide from storefront until back in stock */
  listed?: boolean;
};

export type NicheCatalog = {
  products: Product[];
  upsellOffers: Offer[];
};

export const placeholderImage = (label: string) =>
  `/api/placeholder?label=${encodeURIComponent(label)}`;
