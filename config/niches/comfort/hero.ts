import type { HeroRotatingItem, HomeHeroSlide } from "@/config/hero-types";

const heroImage = (file: string) => `/images/hero/${file}`;

const pillowSlide: HomeHeroSlide = {
  id: "pillow",
  slug: "wisada-dahr",
  nameAr: "وسادة الظهر",
  badge: "VORLAY ✦ NEW COLLECTION",
  headlineWhite: "راحة حقيقية",
  headlineGold: "لكل رحلة",
  description:
    "طقم وسادة رقبة ووسادة ظهر بحشوة كتتأقلم مع الجسم. للسيارة، المكتب، والجلوس الطويل.",
  image: heroImage("hero-home.png"),
  imageAlt: "طقم VORLAY — وسادة رقبة وظهر",
  priceMad: 179,
  compareAtPriceMad: 245,
  priceNote: "طقم واحد — رقبة وظهر — الدفع عند الاستلام",
};

export const comfortHeroSlides: HomeHeroSlide[] = [pillowSlide];

export const comfortHeroRotatingItems: HeroRotatingItem[] = [
  {
    kind: "headline",
    lineWhite: pillowSlide.headlineWhite,
    lineGold: pillowSlide.headlineGold,
  },
  { kind: "body", text: pillowSlide.description },
];
