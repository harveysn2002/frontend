/**
 * Active niche catalog facade.
 * Comfort catalog stays under niches/comfort — set NEXT_PUBLIC_NICHE=comfort to revert.
 */
import { byNiche } from "@/config/niche";
import { comfortCatalog } from "@/config/niches/comfort/catalog";
import { watchesCatalog } from "@/config/niches/watches/catalog";
import type { Offer, Product, ProductId, QuantityUnit } from "@/config/product-types";

export type { Offer, Product, ProductId, QuantityUnit };

const catalog = byNiche({
  comfort: comfortCatalog,
  watches: watchesCatalog,
});

export const products: Product[] = catalog.products;
export const upsellOffers: Offer[] = catalog.upsellOffers;

export function getListedProducts() {
  return products.filter((product) => product.listed !== false);
}

export function getProductBySlug(slug: string) {
  const product = products.find((item) => item.slug === slug);
  if (!product || product.listed === false) return undefined;
  return product;
}

export function getProductById(id: ProductId) {
  return products.find((product) => product.id === id);
}

export function getListedProductById(id: ProductId) {
  const product = getProductById(id);
  if (!product || product.listed === false) return undefined;
  return product;
}

export function getOfferById(offerId: string) {
  for (const product of products) {
    const offer = product.offers.find((item) => item.id === offerId);
    if (offer) return offer;
  }
  return upsellOffers.find((item) => item.id === offerId);
}
