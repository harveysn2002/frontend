import type { HeroRotatingItem, HomeHeroSlide } from "@/config/hero-types";

const armaniSlide: HomeHeroSlide = {
  id: "armani-chrono",
  slug: "emporio-armani",
  nameAr: "Emporio Armani",
  badge: "VORLAY WATCHES ✦ NEW DROP",
  headlineWhite: "ساعة رجالية",
  headlineGold: "كتفرض وجودها",
  description:
    "كرونوغراف بستايل Emporio Armani — أنيق للهدية وللطلعات. الدفع عند الاستلام فكل المغرب.",
  image: "/images/hero/watches-hero.jpg",
  imageAlt: "VORLAY Watches — ساعة Emporio Armani",
  priceMad: 349,
  compareAtPriceMad: 499,
  priceNote: "ساعة واحدة — كرونوغراف — الدفع عند الاستلام",
};

export const watchesHeroSlides: HomeHeroSlide[] = [armaniSlide];

export const watchesHeroRotatingItems: HeroRotatingItem[] = [
  {
    kind: "headline",
    lineWhite: armaniSlide.headlineWhite,
    lineGold: armaniSlide.headlineGold,
  },
  { kind: "body", text: armaniSlide.description },
];
