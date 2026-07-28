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
    average: 4.7,
    count: 29,
    reviews: [
      {
        name: "S***D",
        rating: 5,
        date: "20 يناير 2026",
        variant: "أسود",
        text: "دعم ممتاز لأسفل الظهر. تقريباً كامل. كنستعمل دعم الظهر فالطوموبيل وأنا راضي بزاف بشكل عام. الحشوة كتتأقلم مباشرة مع الظهر وكتعطي الدعم بالضبط فين خاصو. الظهر كيبقى مستقيم بشكل واضح، حتى فالطريق الطويلة — مريح بزاف وأقل تعب من غير دعم. الصناعة عالية الجودة، ما كيزلقش وكيبقى ثابت فبلاصتو. الراحة والوظيفة فأعلى مستوى. العيب الصغير الوحيد: الحشوة طرية شوية، زيادة 10–15٪ ديال القساحة غاتكون مثالية ليا. ولكن هادشي عيب بسيط بزاف. فالمجمل، نصيحة واضحة بالشراء. تقريباً كامل للاستعمال اليومي فالطوموبيل.",
      },
      {
        name: "4***r",
        rating: 5,
        date: "14 يونيو 2026",
        variant: "رمادي",
        text: "منتج زوين. مع مشاكل العمود الفقري العنقي اللي عندي، كيخدم بشكل رائع وكيدعم منطقة الرقبة وأنا كنسوق.",
      },
      {
        name: "Y***f",
        rating: 5,
        date: "18 غشت 2025",
        variant: "أسود",
        text: "راحة لا تُصدّق، دعم الظهر مثالي للسفرات الطويلة، كننصح بيه بزاف.",
      },
      {
        name: "S***K",
        rating: 5,
        date: "05 فبراير 2026",
        variant: "أسود",
        text: "من أحسن المشتريات. بزاف ديال المرات كنخرج من الخدمة وأنا كنعاني من ألم أسفل الظهر، وملي كنقعد فالطوموبيل ما كنعرفش كيفاش نقعد من الألم. مع الوسادة، كنحس براحة.",
      },
      {
        name: "D***y",
        rating: 5,
        date: "19 غشت 2025",
        variant: "أسود",
        text: "هادي ثاني وحدة كنشري، للطوموبيل الآخر. مصنوعة مزيان وكتعطي دعم. الحشوة كترجع لبلاصتها مزيان.",
      },
      {
        name: "l***k",
        rating: 5,
        date: "03 شتنبر 2025",
        variant: "رمادي",
        text: "مصنوعة بجودة عالية. أنا قياس M، والوسادة كتجي مزبوطة على ظهري. الحشوة مريحة.",
      },
      {
        name: "H***m",
        rating: 5,
        date: "14 أبريل 2026",
        variant: "أسود",
        text: "منتج زوين وكيعطي دعم مزيان للظهر. كننصحك بيه إلا كنتي كتسوق طوموبيل قديمة ولا الكراسي الأصلية ديالك مركّبين بطريقة غريبة.",
      },
      {
        name: "D***y",
        rating: 5,
        date: "22 يوليوز 2025",
        variant: "أسود",
        text: "السلعة وصلات بسرعة، مصنوعة مزيان. كتبان كبيرة ولكن كتنضغط مزيان ملي كتستعملها فالطوموبيل. كترجع لبلاصتها مزيان حتى دابا.",
      },
      {
        name: "e***r",
        rating: 5,
        date: "02 غشت 2025",
        variant: "أسود",
        text: "سوبر ميݣا، كنت محتاجها حيت كراسي طوموبيلي ما فيهاش ضبط للظهر.",
      },
      {
        name: "S***h",
        rating: 5,
        date: "29 أكتوبر 2025",
        variant: "أسود",
        text: "مرضية بزاف ومريحة. بالنسبة ليا مريحة حتى للرقبة.",
      },
      {
        name: "B***Z",
        rating: 5,
        date: "16 دجنبر 2025",
        variant: "رمادي",
        text: "التوصيل والشحن سريع بزاف. جودة مزيانة ووسادة مريحة. كننصح بهاد المتجر والبائع.",
      },
      {
        name: "R***a",
        rating: 5,
        date: "15 نونبر 2025",
        variant: "رمادي",
        text: "مريحة ولكن قاصحة بما يكفي باش ترتاح منها الظهر اللي كيوجع.",
      },
      {
        name: "O***r",
        rating: 5,
        date: "01 نونبر 2025",
        variant: "أسود",
        text: "هادي ثالث وسادة كنطلب. صحابي حتى هوما عجباتهم بزاف، كننصح بيها.",
      },
      {
        name: "N***l",
        rating: 5,
        date: "23 ماي 2026",
        variant: "أسود",
        text: "الوسادة كتحس بيها مزيانة على الظهر، طرية وكتجي مزبوطة فكرسي الطوموبيل. غادي نجربها فسفر طويل نشوف واش غانحس بتحسن فالظهر.",
      },
      {
        name: "g***n",
        rating: 5,
        date: "26 غشت 2025",
        variant: "أزرق",
        text: "منتج زوين، مريح فالاستعمال وأنا كنسوق.",
      },
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
        name: "K***m",
        rating: 5,
        date: "30 غشت 2025",
        variant: "طقم رمادي",
        text: "حشوة كتتأقلم مع الجسم، خدّامة مزيان!",
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
        name: "S***a",
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
