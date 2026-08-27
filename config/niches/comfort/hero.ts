import type { HeroRotatingItem, HomeHeroSlide } from "@/config/hero-types";

const heroImage = (file: string) => `/images/hero/${file}`;

const archSlide: HomeHeroSlide = {
  id: "arch",
  slug: "daamat-qaws-qadam",
  nameAr: "دعامة قوس القدم",
  badge: "VORLAY ✦ دعم يومي",
  headlineWhite: "راحة لقوس",
  headlineGold: "رجليك",
  description:
    "دعامة مرنة بوسادة سيليكون مدمجة — للوقوف الطويل والمشي اليومي. زوج كامل، مقاس موحد.",
  image: heroImage("hero-home.png"),
  imageAlt: "VORLAY — دعامة قوس القدم",
  priceMad: 149,
  compareAtPriceMad: 199,
  priceNote: "زوج كامل — الدفع عند الاستلام",
};

export const comfortHeroSlides: HomeHeroSlide[] = [archSlide];

export const comfortHeroRotatingItems: HeroRotatingItem[] = [
  {
    kind: "headline",
    lineWhite: archSlide.headlineWhite,
    lineGold: archSlide.headlineGold,
  },
  { kind: "body", text: archSlide.description },
];
