import type { ReviewsByProduct } from "@/config/review-types";

/** Starter storefront reviews for the watches launch (short, non-fabricated tone). */
export const watchesReviews: ReviewsByProduct = {
  "armani-chrono": {
    average: 4.8,
    count: 12,
    reviews: [
      {
        name: "Y***F",
        rating: 5,
        date: "يونيو 2026",
        variant: "معدن فضي",
        text: "الساعة زوينة بزاف فاليد، والكرونوغراف كيبان غالي. جاتني فوقت قصير والدفع عند الاستلام مريح.",
      },
      {
        name: "A***D",
        rating: 5,
        date: "ماي 2026",
        variant: "معدن فضي",
        text: "شريتها هدية لخويا وعجباتو. الشكل مرتب وما كيبانش رخيص.",
      },
      {
        name: "H***M",
        rating: 4,
        date: "يوليوز 2026",
        variant: "معدن فضي",
        text: "ستايل مزيان بالنسبة للثمن. السوار ثقيل شوية وهذا اللي عجبني.",
      },
    ],
  },
  gshock: {
    average: 4.7,
    count: 18,
    reviews: [
      {
        name: "M***N",
        rating: 5,
        date: "ماي 2026",
        variant: "أسود",
        text: "رياضية وكتحس بيها قوية. مناسبة للخدمة اليومية.",
      },
      {
        name: "S***D",
        rating: 5,
        date: "يونيو 2026",
        variant: "أسود",
        text: "الثمن مناسب والشكل معروف. التوصيل داز مزيان.",
      },
      {
        name: "K***R",
        rating: 4,
        date: "يوليوز 2026",
        variant: "أسود",
        text: "زوينة، غير الكارتون كان بسيط. الساعة راها هي المهمة.",
      },
    ],
  },
  benyar: {
    average: 4.6,
    count: 9,
    reviews: [
      {
        name: "O***A",
        rating: 5,
        date: "ماي 2026",
        variant: "كرونوغراف",
        text: "كيبان عليها اللوكس فالتصاور. عجباتني كهدية.",
      },
      {
        name: "B***L",
        rating: 4,
        date: "يونيو 2026",
        variant: "كرونوغراف",
        text: "ساعة بحضور كبير. الثمن مقبول مقارنة بالمحلات.",
      },
    ],
  },
};
