/**
 * Every storefront string that changes with the niche.
 * Order flow, trust and checkout copy stay shared in `config/trust.ts`.
 */
export type NicheCopy = {
  metaTitle: string;
  metaDescription: string;
  /** Paragraph under the logo in the footer */
  footerTagline: string;
  /** Fallback text under an objection card when the product has no `painResponses` */
  painAnswer: string;
  /** Heading above the objection cards on the product page */
  painCardsHeading: string;
  /** Heading of the "how it helps" section on the product page */
  mechanismHeading: string;
  /** Gold pill above the headline when a product has no `eyebrow` */
  defaultEyebrow: string;
  /** Cross-sell block heading in the cart drawer */
  cartCrossSellHeading: string;
  /** Suffixes for story-banner alt text, in page order */
  storyAlts: {
    afterPain: string;
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  home: {
    painHeading: string;
    painBody: string;
    painChips: Array<{ title: string; text: string }>;
    productsHeading: string;
    productsSubheading: string;
  };
  collections: {
    metaTitle: string;
    heading: string;
    body: string;
    guideHeading: string;
  };
  about: {
    metaTitle: string;
    heading: string;
    body: string;
    values: string[];
    valueNote: string;
  };
  /** Niche-specific FAQ entry (replaces the medical disclaimer for watches) */
  disclaimerFaq: { q: string; a: string };
  /** Second paragraph on /terms */
  termsDisclaimer: string;
};
