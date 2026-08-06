import { byNiche } from "@/config/niche";
import {
  comfortHeroRotatingItems,
  comfortHeroSlides,
} from "@/config/niches/comfort/hero";
import {
  watchesHeroRotatingItems,
  watchesHeroSlides,
} from "@/config/niches/watches/hero";
import type { HeroRotatingItem, HomeHeroSlide } from "@/config/hero-types";

export type { HeroRotatingItem, HomeHeroSlide };

export const homeHeroSlides: HomeHeroSlide[] = byNiche({
  comfort: comfortHeroSlides,
  watches: watchesHeroSlides,
});

export const heroRotatingItems: HeroRotatingItem[] = byNiche({
  comfort: comfortHeroRotatingItems,
  watches: watchesHeroRotatingItems,
});
