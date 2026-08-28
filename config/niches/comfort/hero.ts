import type { HeroRotatingItem, HomeHeroSlide } from "@/config/hero-types";

const heroImage = (file: string) => `/images/hero/${file}`;

const archSlide: HomeHeroSlide = {
  id: "arch",
  slug: "daamat-qaws-qadam",
  nameAr: "مشد دعم قوس القدم",
  badge: "VORLAY ✦ دعم يومي للقدم",
  headlineWhite: "راحة تحت",
  headlineGold: "القوس",
  description:
    "مشد مرن بوسادة جل مدمجة — للقدم المسطحة، الوقوف، والمشي اليومي. زوج كامل (L و R).",
  image: heroImage("hero-home.png"),
  imageAlt: "VORLAY — مشد دعم قوس القدم",
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
