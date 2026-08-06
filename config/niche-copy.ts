import { byNiche } from "@/config/niche";
import { comfortCopy } from "@/config/niches/comfort/copy";
import { watchesCopy } from "@/config/niches/watches/copy";
import type { NicheCopy } from "@/config/niche-copy-types";

export type { NicheCopy };

export const nicheCopy: NicheCopy = byNiche({
  comfort: comfortCopy,
  watches: watchesCopy,
});
