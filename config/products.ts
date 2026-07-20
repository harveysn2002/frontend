export type ProductId = "belt" | "pillow" | "bundle" | "neck-pillow";

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
  /** Full-width story banners between text sections */
  storyImages?: string[];
  /** Image shown after pain cards, before the price panel */
  afterPainImage?: string;
  /** Trust-building video (mp4 under /public) shown lower on the product page */
  trustVideo?: string;
  /** Poster image for the trust video */
  trustVideoPoster?: string;
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
    headline: "طقم رقبة وظهر — دعم فالمكتب والدار والسيارة",
    subheading:
      "طقم كامل فباكية واحدة: وسادة رقبة ووسادة ظهر قابلة للتعديل، معامل ميموري فوم ووجه ناعم. كتعاون على راحة أكثر فالسياقة الطويلة، المكتب، والجلوس اليومي.",
    cardHeading: "طقم رقبة وظهر",
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
      "طقم رقبة وظهر فباكية واحدة — ما خاصك تشري كل حاجة بوحدها. الدفع عند الاستلام.",
    ],
    mechanism:
      "الطقم كيجمع وسادة رقبة ووسادة ظهر قابلة للتعديل. الميموري فوم كيتشكل على جسمك باش يعطي دعم مخصص للظهر والرقبة، خاصة فالسياقة الطويلة أو الجلوس المتواصل. الوجه الناعم كيخليك تحس براحة أكثر على البشرة، والحشوة كتبقى ثابتة حتى بعد الاستعمال المتكرر — بلا وعود علاجية.",
    eyebrow: "VORLAY · طقم رقبة وظهر الأكثر طلباً · توصيل لجميع مدن المغرب",
    image: staticProductImage("wisada-set-floating.png"),
    heroImageFit: "contain",
    carouselImageFit: "contain",
    quantityUnit: "set",
    images: [
      staticProductImage("wisada-set-floating.png"),
      staticProductImage("wisada-hero-white.png"),
      staticProductImage("wisada-back-detail.png"),
      staticProductImage("wisada-neck-pillow.png"),
      staticProductImage("wisada-lumbar-front.png"),
      staticProductImage("wisada-set-angle.png"),
    ],
    detailImage: staticProductImage("wisada-set-floating.png"),
    afterPainImage: staticProductImage("wisada-ad-compare-infographic.png"),
    trustVideo: "/videos/vorlay-trust.mp4",
    trustVideoPoster: staticProductImage("vorlay-trust-poster.jpg"),
    storyImages: [
      staticProductImage("wisada-ad-features-car.png"),
      staticProductImage("wisada-ad-car-man.png"),
    ],
    crossSellIds: ["belt", "bundle"],
    offers: [
      {
        id: "pillow-1",
        productId: "pillow",
        quantity: 1,
        title: "طقم واحد",
        subtitle: "وسادة عنق + وسادة ظهر (جوج وسائد)",
        badge: "الأكثر طلباً",
        priceMad: 179,
        compareAtPriceMad: 245,
        recommended: true,
      },
      {
        id: "pillow-2",
        productId: "pillow",
        quantity: 2,
        title: "طقمين",
        subtitle: "4 وسائد — وسادتين عنق + وسادتين ظهر",
        badge: "وفّر أكثر",
        priceMad: 309,
        compareAtPriceMad: 358,
      },
      {
        id: "pillow-3",
        productId: "pillow",
        quantity: 3,
        title: "ثلاث أطقم",
        subtitle: "6 وسائد — 3 عنق + 3 ظهر",
        badge: "أفضل قيمة",
        priceMad: 407,
        compareAtPriceMad: 537,
      },
    ],
  },
  {
    id: "neck-pillow",
    slug: "wisada-onk",
    nameAr: "وسادة العنق الطبية",
    nameEn: "VORLAY Cervical Neck Pillow",
    headline: "وسادة العنق اللي كترجع لرقبتك راحتها كل ليلة",
    subheading:
      "وسادة رقبة مريحة بتصميم مدروس ومناطق دعم مختلفة للنوم على الظهر أو الجنب. قماش منسوج ناعم كيتنفّس، حشوة كترجع بسرعة لشكلها، وقابلة للغسل فالغسالة.",
    cardHeading: "وسادة عنق بمناطق دعم مدروسة",
    cardSubheading: "قماش منسوج يتنفّس — قابلة للغسل — لنوم مريح كل ليلة",
    bestFor: ["النوم على الظهر", "النوم على الجنب", "راحة الرقبة"],
    benefits: [
      "مناطق دعم مختلفة: منطقة لحماية الرقبة ومناطق للنوم على الجنب والظهر.",
      "حشوة كترجع بسرعة لشكلها — دعم ثابت وكيدوم مع الوقت.",
      "قماش منسوج ناعم كيتنفّس ومريح على البشرة.",
      "قابلة للغسل فالغسالة وما كتتشوهش عند السحب.",
      "تصميم مريح كيعاون على وضعية أحسن للرقبة والعمود الفقري العنقي.",
      "مناسبة لكل الناس اللي كيحسو بتعب الرقبة بعد النوم.",
    ],
    pains: [
      "كتفيق مصدّع ولا رقبتك كتوجعك من الوسادة العادية؟",
      "الوسادة قاصحة بزاف ولا طرية بزاف وما كتعطي حتى دعم؟",
      "كتقلب على وسادة كتناسب النوم على الظهر والجنب بجوج؟",
    ],
    painResponses: [
      "وسادة VORLAY بمناطق دعم مدروسة — كتسند الرقبة مزيان وكتفيق مرتاح.",
      "الحشوة كترجع بسرعة لشكلها: لا قاصحة بزاف لا طرية بزاف — دعم متوازن كل ليلة.",
      "مناطق مختلفة فنفس الوسادة: تقدر تنعس على الظهر ولا على الجنب بنفس الراحة. الدفع عند الاستلام.",
    ],
    mechanism:
      "الوسادة مصمّمة بمناطق دعم مختلفة: منطقة وسطية لحماية الرقبة، ومناطق جانبية أعلى شوية للنوم على الجنب. الحشوة كترجع بسرعة لشكلها باش تعطي دعم ثابت للرقبة طول الليل، والقماش المنسوج كيتنفّس باش تبقى مرتاح — بلا وعود علاجية.",
    eyebrow: "VORLAY · وسادة عنق طبية · توصيل لجميع مدن المغرب",
    image: staticProductImage("cervical-hero.png"),
    heroImageFit: "contain",
    carouselImageFit: "contain",
    quantityUnit: "piece",
    images: [
      staticProductImage("cervical-hero.png"),
      staticProductImage("cervical-zones-top.png"),
      staticProductImage("cervical-zones-side.png"),
      staticProductImage("cervical-rebound.png"),
      staticProductImage("cervical-fabric.png"),
      staticProductImage("cervical-fill.png"),
    ],
    detailImage: staticProductImage("cervical-zones-side.png"),
    afterPainImage: staticProductImage("cervical-zones-top.png"),
    storyImages: [
      staticProductImage("cervical-rebound.png"),
      staticProductImage("cervical-washable.png"),
    ],
    crossSellIds: ["pillow", "belt"],
    offers: [
      {
        id: "neck-pillow-1",
        productId: "neck-pillow",
        quantity: 1,
        title: "وسادة واحدة",
        subtitle: "جرّب راحة وسادة العنق من VORLAY",
        badge: "للتجربة",
        priceMad: 229,
        compareAtPriceMad: 299,
      },
      {
        id: "neck-pillow-2",
        productId: "neck-pillow",
        quantity: 2,
        title: "وسادتين",
        subtitle: "وحدة ليك ووحدة لشريك حياتك",
        badge: "الأكثر طلباً",
        priceMad: 399,
        compareAtPriceMad: 598,
        recommended: true,
      },
      {
        id: "neck-pillow-3",
        productId: "neck-pillow",
        quantity: 3,
        title: "ثلاث وسائد",
        subtitle: "أفضل قيمة للعائلة",
        badge: "أفضل قيمة",
        priceMad: 549,
        compareAtPriceMad: 897,
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
