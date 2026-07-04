export type ProductId = "belt" | "pillow" | "bundle";

export type QuantityUnit = "piece" | "set";

export type Offer = {
  id: string;
  productId: ProductId;
  quantity: number;
  title: string;
  subtitle: string;
  badge: string;
  priceMad: number;
  compareAtPriceMad: number;
  recommended?: boolean;
  upsellOnly?: boolean;
};

export type Product = {
  id: ProductId;
  slug: string;
  nameAr: string;
  nameEn: string;
  headline: string;
  subheading: string;
  cardHeading: string;
  cardSubheading: string;
  bestFor: string[];
  benefits: string[];
  pains: string[];
  /** Persuasive one-liner under each pain card (same order as `pains`) */
  painResponses?: string[];
  mechanism: string;
  image: string;
  images: string[];
  /** Large image beside "كيفاش كيعاون؟" section */
  detailImage?: string;
  /** Full-width story banners stacked below the buy section */
  storyImages?: string[];
  /** Short persuasive line above the headline (gold pill) */
  eyebrow?: string;
  /** Promo graphics with text — use contain so badges/prices stay visible */
  heroImageFit?: "cover" | "contain";
  /** Gallery fit — defaults to `heroImageFit` when omitted */
  carouselImageFit?: "cover" | "contain";
  quantityUnit?: QuantityUnit;
  offers: Offer[];
  crossSellIds: ProductId[];
  /** Set false to hide from storefront until back in stock */
  listed?: boolean;
};

const placeholder = (label: string) =>
  `/api/placeholder?label=${encodeURIComponent(label)}`;

const staticProductImage = (file: string) => `/images/products/${file}`;

const productImage = (name: string) => `/api/product-image?name=${encodeURIComponent(name)}`;

export const products: Product[] = [
  {
    id: "belt",
    slug: "hizam-dahr",
    nameAr: "حزام الظهر",
    nameEn: "VORLAY Back Belt",
    headline: "حزام الظهر اللي كيعاونك تبقى واقف بثقة",
    subheading:
      "دعم يومي خفيف للظهر والوقفة، مناسب للجلسة الطويلة، الخدمة، الحركة، أو المكتب.",
    cardHeading: "دعم عملي للوقفة والحركة",
    cardSubheading: "لنهار طويل فيه خدمة، وقوف، وجلسة بزاف",
    bestFor: ["الخدمة فالدار", "الوقوف الطويل", "الجلوس فالمكتب"],
    benefits: [
      "قابل للتعديل حسب الراحة والمقاس.",
      "كيعاونك تحس بثبات أكثر خلال اليوم.",
      "سهل اللبس والنزع.",
      "مناسب للاستعمال اليومي بدون تعقيد.",
    ],
    pains: [
      "كتوقف بزاف فالخدمة أو الدار؟",
      "كتحس الوقفة كتتهرس مع آخر النهار؟",
      "بغيت دعم بلا شكل طبي محرج؟",
    ],
    painResponses: [
      "حزام VORLAY خفيف وقابل للتعديل — كيعاونك تبقى واقف بثقة طوال النهار.",
      "دعم يومي عملي كيخليك تحس بثبات أكثر، بلا تعقيد ولا لبس ثقيل.",
      "تصميم بسيط وأنيق — كيلبس تحت الملابس وما كيبانش مزعج.",
    ],
    mechanism:
      "الحزام كيعطي دعم وتذكير لطيف للوضعية أثناء الحركة والجلسة، بدون وعود علاجية.",
    eyebrow: "VORLAY · دعم يومي للوقفة والحركة · الدفع عند الاستلام",
    image: staticProductImage("belt-hero-white.png"),
    heroImageFit: "contain",
    images: [
      staticProductImage("belt-hero-white.png"),
      staticProductImage("belt-lifestyle-infographic.png"),
      staticProductImage("belt-wearing-infographic.png"),
      staticProductImage("belt-daily-use-infographic.png"),
      staticProductImage("belt-features-infographic.png"),
    ],
    crossSellIds: ["pillow", "bundle"],
    offers: [
      {
        id: "belt-1",
        productId: "belt",
        quantity: 1,
        title: "قطعة واحدة",
        subtitle: "جرب دعم VORLAY اليومي",
        badge: "للتجربة",
        priceMad: 109,
        compareAtPriceMad: 149,
      },
      {
        id: "belt-2",
        productId: "belt",
        quantity: 2,
        title: "قطعتين",
        subtitle: "واحدة ليك وواحدة لشخص عزيز",
        badge: "الأكثر اختياراً",
        priceMad: 199,
        compareAtPriceMad: 298,
        recommended: true,
      },
      {
        id: "belt-3",
        productId: "belt",
        quantity: 3,
        title: "ثلاث قطع",
        subtitle: "أفضل قيمة للعائلة",
        badge: "أفضل قيمة",
        priceMad: 279,
        compareAtPriceMad: 447,
      },
    ],
  },
  {
    id: "pillow",
    slug: "wisada-dahr",
    nameAr: "وسادة الظهر",
    nameEn: "VORLAY Back Pillow Set",
    headline: "طقم 2 في 1 — دعم الرقبة والظهر فالمكتب والدار والسيارة",
    subheading:
      "طقم كامل فباكية واحدة: وسادة رقبة ووسادة ظهر قابلة للتعديل، معامل ميموري فوم ووجه ناعم. كتعاون على راحة أكثر فالسياقة الطويلة، المكتب، والجلوس اليومي.",
    cardHeading: "طقم 2 في 1 — رقبة وظهر",
    cardSubheading: "ميموري فوم قابل للتعديل — لون أسود — للسيارة والمكتب",
    bestFor: ["السياقة الطويلة", "المكتب", "الجلوس الطويل"],
    benefits: [
      "طقم كامل فباكية واحدة: وسادة رقبة + وسادة ظهر.",
      "ميموري فوم مع ألياف طبيعية — دعم مريح وكيبقى ثابت مع الوقت.",
      "تصميم قابل للتعديل باش يناسب ظهرك ورقبتك.",
      "وجه ناعم من ألياف صناعية — لمسة مريحة ومخملية.",
      "اللون المتاح حالياً: أسود فقط — طقم رقبة وظهر متناسق.",
      "مثالي للسياقة الطويلة والجلوس فالكرسي — كيعاون على وضعية أريح.",
    ],
    pains: [
      "كتسوق ساعات والرقبة والظهر كيعيوك؟",
      "كرسي السيارة أو المكتب ما كيعطيش الدعم اللي بغيتي؟",
      "بغيت طقم كامل (رقبة + ظهر) فطلب واحد؟",
    ],
    painResponses: [
      "طقم وسائد VORLAY — رقبة وظهر بميموري فوم. من أوّل لمسة غادي تحس بالفرق.",
      "كيركب فأي كرسي سيارة أو مكتب — ميموري فوم كيتشكل على جسمك وكيعطي دعم مخصص.",
      "طقم 2 في 1 فباكية واحدة — ما خاصك تشري كل حاجة بوحدها. الدفع عند الاستلام.",
    ],
    mechanism:
      "الطقم كيجمع وسادة رقبة ووسادة ظهر قابلة للتعديل. الميموري فوم كيتشكل على جسمك باش يعطي دعم مخصص للظهر والرقبة، خاصة فالسياقة الطويلة أو الجلوس المتواصل. الوجه الناعم كيخليك تحس براحة أكثر على البشرة، والحشوة كتبقى ثابتة حتى بعد الاستعمال المتكرر — بلا وعود علاجية.",
    eyebrow: "VORLAY · طقم 2 في 1 الأكثر طلباً · توصيل لجميع مدن المغرب",
    image: staticProductImage("pillow-posture-infographic.png"),
    heroImageFit: "cover",
    carouselImageFit: "cover",
    quantityUnit: "set",
    images: [staticProductImage("pillow-posture-infographic.png")],
    detailImage: staticProductImage("pillow-posture-infographic.png"),
    storyImages: [
      staticProductImage("wisada-story-comfort.png"),
      staticProductImage("wisada-story-lifestyle.png"),
      staticProductImage("wisada-story-compare.png"),
    ],
    crossSellIds: ["belt", "bundle"],
    offers: [
      {
        id: "pillow-1",
        productId: "pillow",
        quantity: 1,
        title: "طقم واحد",
        subtitle: "2 في 1 — رقبة وظهر",
        badge: "الأكثر طلباً",
        priceMad: 199,
        compareAtPriceMad: 245,
        recommended: true,
      },
      {
        id: "pillow-2",
        productId: "pillow",
        quantity: 2,
        title: "طقمين",
        subtitle: "2 طقم 2 في 1 — واحد للمكتب وواحد للسيارة",
        badge: "وفّر أكثر",
        priceMad: 369,
        compareAtPriceMad: 490,
      },
      {
        id: "pillow-3",
        productId: "pillow",
        quantity: 3,
        title: "ثلاث أطقم",
        subtitle: "3 طقم 2 في 1 — للدار والمكتب والسيارة",
        badge: "أفضل قيمة",
        priceMad: 529,
        compareAtPriceMad: 735,
      },
    ],
  },
  {
    id: "bundle",
    slug: "taqm-dahr",
    nameAr: "طقم الظهر",
    nameEn: "VORLAY Back Set",
    headline: "طقم الظهر: الحل الكامل للجلوس والحركة",
    subheading:
      "حزام الظهر + وسادة الظهر في عرض واحد لكل شخص باغي راحة أكثر فنهاره كامل.",
    cardHeading: "الحل الكامل بأفضل قيمة",
    cardSubheading: "دعم أثناء الحركة وراحة أثناء الجلوس",
    bestFor: ["أفضل قيمة", "هدية عملية", "الجلوس والحركة"],
    benefits: [
      "يجمع الحزام والوسادة في طلب واحد.",
      "أفضل قيمة مقارنة بشراء كل منتج وحده.",
      "مناسب كهدية للأب، الأم، الزوج، الزوجة، أو أي شخص عزيز.",
      "يغطي أغلب لحظات اليوم: الحركة والجلوس.",
    ],
    pains: [
      "كيعييك الجلوس والحركة بجوج؟",
      "بغيت حل كامل بدل منتج واحد؟",
      "كتقلب على هدية عملية؟",
    ],
    mechanism:
      "استعمل الوسادة للكرسي والسيارة، والحزام للأوقات اللي كتحتاج فيها دعم أكثر أثناء الحركة.",
    eyebrow: "VORLAY · أفضل قيمة — حزام + وسادة · الدفع عند الاستلام",
    image: staticProductImage("wisada-before-after.png"),
    heroImageFit: "cover",
    images: [
      staticProductImage("wisada-before-after.png"),
      staticProductImage("belt-lifestyle-infographic.png"),
      staticProductImage("belt-wearing-infographic.png"),
      staticProductImage("belt-daily-use-infographic.png"),
      staticProductImage("belt-features-infographic.png"),
      staticProductImage("pillow-posture-infographic.png"),
    ],
    crossSellIds: ["pillow", "belt"],
    listed: false,
    offers: [
      {
        id: "bundle-1",
        productId: "bundle",
        quantity: 1,
        title: "طقم واحد",
        subtitle: "حزام + وسادة",
        badge: "الحل الكامل",
        priceMad: 279,
        compareAtPriceMad: 308,
        recommended: true,
      },
      {
        id: "bundle-2",
        productId: "bundle",
        quantity: 2,
        title: "طقمين",
        subtitle: "طقم ليك وطقم كهدية",
        badge: "أفضل قيمة",
        priceMad: 499,
        compareAtPriceMad: 616,
      },
      {
        id: "bundle-3",
        productId: "bundle",
        quantity: 3,
        title: "ثلاث أطقم",
        subtitle: "للعائلة والهدايا",
        badge: "عرض العائلة",
        priceMad: 699,
        compareAtPriceMad: 924,
      },
    ],
  },
];

export const upsellOffers: Offer[] = [
  {
    id: "upsell-pillow",
    productId: "pillow",
    quantity: 1,
    title: "زيد وسادة الظهر",
    subtitle: "عرض خاص غير الآن قبل تأكيد الطلب",
    badge: "خصم خاص",
    priceMad: 179,
    compareAtPriceMad: 199,
    upsellOnly: true,
  },
  {
    id: "upsell-belt",
    productId: "belt",
    quantity: 1,
    title: "زيد حزام الظهر",
    subtitle: "عرض خاص غير الآن قبل تأكيد الطلب",
    badge: "خصم خاص",
    priceMad: 99,
    compareAtPriceMad: 109,
    upsellOnly: true,
  },
];

export function getListedProducts() {
  return products.filter((product) => product.listed !== false);
}

export function getProductBySlug(slug: string) {
  const product = products.find((item) => item.slug === slug);
  if (!product || product.listed === false) return undefined;
  return product;
}

export function getProductById(id: ProductId) {
  return products.find((product) => product.id === id);
}

export function getListedProductById(id: ProductId) {
  const product = getProductById(id);
  if (!product || product.listed === false) return undefined;
  return product;
}

export function getOfferById(offerId: string) {
  for (const product of products) {
    const offer = product.offers.find((item) => item.id === offerId);
    if (offer) return offer;
  }
  return upsellOffers.find((item) => item.id === offerId);
}
