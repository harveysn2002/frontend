import type { HeroRotatingItem, HomeHeroSlide } from "@/config/hero-types";

const heroImage = (file: string) => `/images/hero/${file}`;

const archSlide: HomeHeroSlide = {
  id: "arch",
  slug: "daamat-qaws-qadam",
  nameAr: "دعامة القدم المسطحة",
  badge: "VORLAY ✦ للقدم المسطحة",
  headlineWhite: "دعم للقدم",
  headlineGold: "المسطحة",
  description:
    "دعامة مرنة بوسادة جل مدمجة — مصمّمة للقدم المسطحة. زوج كامل (L و R)، مقاس موحد.",
  image: heroImage("hero-home.png"),
  imageAlt: "VORLAY — دعامة القدم المسطحة",
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
