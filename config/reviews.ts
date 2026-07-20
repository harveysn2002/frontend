import type { ProductId } from "@/config/products";

export type ProductReview = {
  /** Masked buyer handle, kept as-is from the source */
  name: string;
  /** 1–5 stars */
  rating: number;
  /** Purchase date label */
  date: string;
  /** Selected variant label */
  variant?: string;
  /** Faithful Darija translation of the original review (no fabrication) */
  text?: string;
  /** "Helpful" count from the source, when present */
  helpful?: number;
};

export type ProductReviewSummary = {
  average: number;
  count: number;
  reviews: ProductReview[];
};

/**
 * Real buyer reviews collected from the original supplier listing and
 * translated faithfully to Moroccan Darija. Nothing is invented, the brand
 * name is never inserted into a buyer's words, and negative reviews are kept.
 */
const reviewsByProduct: Partial<Record<ProductId, ProductReviewSummary>> = {
  pillow: {
    average: 4.4,
    count: 14,
    reviews: [
      {
        name: "L***s",
        rating: 5,
        date: "10 شتنبر 2025",
        variant: "طقم رمادي",
        text: "ناعمة، طرية ومزيانة. إلا سقتي مدة طويلة الظهر والرقبة كيوجعوني، كان صعيب، ولكن من بعد ما استعملت هاد المنتج بزاف ديال الألم مشا.",
        helpful: 1,
      },
      {
        name: "m***o",
        rating: 4,
        date: "18 غشت 2025",
        variant: "طقم أزرق",
        text: "مريحة. فالبداية كتبان ماشي مريحة، ولكن ملي كتتأقلم مع الجسم كلشي كيتحسن. يمكن كانت غاتكون أحسن لو كانت شوية أطول وتغطي مساحة أكبر من العمود الفقري. مسند الرأس زعما مزيان حتى هو، رغم أنه يمكن أقل شوية لو كان الجزء السفلي أرفع.",
        helpful: 2,
      },
      {
        name: "1***r",
        rating: 5,
        date: "25 غشت 2025",
        variant: "ظهر أسود",
        text: "شريتها حيت ظهري كان كيتعب فالسياقة الطويلة، وكتبان مزيانة.",
      },
      {
        name: "AliExpress Shopper",
        rating: 5,
        date: "30 غشت 2025",
        variant: "طقم رمادي",
        text: "مادة من نوع ميموري فوم، خدّامة مزيان!",
      },
      {
        name: "المشتري",
        rating: 5,
        date: "شتنبر 2025",
        variant: "طقم أسود",
        text: "ما تخيّبتش.",
      },
      {
        name: "D***r",
        rating: 5,
        date: "26 نونبر 2025",
        variant: "طقم أسود",
        text: "سلعة ممتازة 👍😀",
      },
      {
        name: "M***E",
        rating: 4,
        date: "04 غشت 2025",
        variant: "مسند رأس أسود",
        text: "راحة مزيانة للرقبة.",
      },
      {
        name: "k***r",
        rating: 2,
        date: "25 أكتوبر 2025",
        variant: "طقم أسود",
        text: "الصور ما كيتطابقوش. جات فيها كتابة وماشي غير كحلة صافية. كتزلق طول الوقت وما كتقعدش مزيان، ولهذا كتولّي غير مريحة من بعد شي دقائق.",
      },
      {
        name: "M***E",
        rating: 4,
        date: "04 غشت 2025",
        variant: "ظهر أسود",
        text: "مطابقة للوصف.",
      },
      {
        name: "m***z",
        rating: 3,
        date: "13 غشت 2025",
        variant: "طقم رمادي",
        text: "طرية بزاف، كنت محتاج شي حاجة أقصح.",
      },
      {
        name: "A***z",
        rating: 5,
        date: "20 شتنبر 2025",
        variant: "طقم أسود",
      },
      {
        name: "M***a",
        rating: 5,
        date: "24 يوليوز 2025",
        variant: "طقم بني",
      },
      {
        name: "AliExpress Shopper",
        rating: 5,
        date: "07 أكتوبر 2025",
        variant: "مسند رأس أسود",
      },
      {
        name: "M***a",
        rating: 4,
        date: "10 يناير 2026",
        variant: "طقم أسود",
      },
    ],
  },
};

export function getProductReviews(productId: ProductId): ProductReviewSummary | undefined {
  return reviewsByProduct[productId];
}
