import type { ProductId } from "@/config/products";
import { products } from "@/config/products";

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
};

const heroImage = (file: string) => `/images/hero/${file}`;

export const pillowSlide: HomeHeroSlide = {
  id: "pillow",
  slug: "wisada-dahr",
  nameAr: "وسادة الظهر",
  badge: "VORLAY ✦ NEW COLLECTION",
  headlineWhite: "راحة حقيقية",
  headlineGold: "لكل رحلة",
  description:
    "طقم 2 في 1 — وسادة رقبة ووسادة ظهر بميموري فوم. للسيارة، المكتب، والجلوس الطويل.",
  image: heroImage("hero-home.png"),
  imageAlt: "طقم VORLAY — وسادة رقبة وظهر",
};

/** Single homepage hero — product pages keep their own galleries. */
export const homeHeroSlides: HomeHeroSlide[] = [pillowSlide];

export function getHeroOffer(productId: ProductId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return null;
  return product.offers.find((item) => item.recommended) || product.offers[0];
}
