import type { HeroRotatingItem, HomeHeroSlide } from "@/config/hero-types";

const chronoSlide: HomeHeroSlide = {
  id: "armani-chrono",
  slug: "chrono-elegance",
  nameAr: "كرونوغراف VORLAY",
  badge: "VORLAY WATCHES ✦ NEW DROP",
  headlineWhite: "ساعة رجالية",
  headlineGold: "كتفرض وجودها",
  description:
    "كرونوغراف رجالي أنيق — مثالي للهدية وللطلعات. الدفع عند الاستلام فكل المغرب.",
  image: "/images/products/watches/armani/armani-hero.jpg",
  imageAlt: "VORLAY Watches — ساعة كرونوغراف رجالية",
  priceMad: 349,
  compareAtPriceMad: 499,
  priceNote: "ساعة واحدة — كرونوغراف — الدفع عند الاستلام",
};

export const watchesHeroSlides: HomeHeroSlide[] = [chronoSlide];

export const watchesHeroRotatingItems: HeroRotatingItem[] = [
  {
    kind: "headline",
    lineWhite: chronoSlide.headlineWhite,
    lineGold: chronoSlide.headlineGold,
  },
  { kind: "body", text: chronoSlide.description },
];
