export type ProductId = "belt" | "pillow" | "bundle";

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
  mechanism: string;
  image: string;
  images: string[];
  offers: Offer[];
  crossSellIds: ProductId[];
};

const placeholder = (label: string) =>
  `/api/placeholder?label=${encodeURIComponent(label)}`;

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
    mechanism:
      "الحزام كيعطي دعم وتذكير لطيف للوضعية أثناء الحركة والجلسة، بدون وعود علاجية.",
    image: productImage("posture-belt-front"),
    images: [
      productImage("posture-belt-front"),
      productImage("posture-belt-back"),
      placeholder("حزام الظهر - تفاصيل الحزام"),
      placeholder("حزام الظهر - طريقة اللبس"),
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
    nameEn: "VORLAY Back Pillow",
    headline: "وسادة الظهر لجلسة أريح فالمكتب والدار والسيارة",
    subheading:
      "كتعاون على دعم الظهر أثناء الجلوس الطويل وتخلي الكرسي أكثر راحة.",
    cardHeading: "راحة أرقى للجلوس الطويل",
    cardSubheading: "للمكتب، السيارة، والصالون",
    bestFor: ["المكتب", "السيارة", "الجلوس الطويل"],
    benefits: [
      "كتدعم الظهر أثناء الجلوس.",
      "مناسبة للكرسي والسيارة والصالون.",
      "تصميم عملي وسهل النقل.",
      "كتخلي الجلسة أكثر توازنًا وراحة.",
    ],
    pains: [
      "كتجلس ساعات فالخدمة؟",
      "كرسي السيارة كيعييك؟",
      "بغيت الكرسي يدعم ظهرك أكثر؟",
    ],
    mechanism:
      "الوسادة كتعاون على ملء الفراغ بين الظهر والكرسي، ما يعطي إحساسًا أريح أثناء الجلوس.",
    image: productImage("seat-back-cushion"),
    images: [
      productImage("seat-back-cushion"),
      productImage("car-back-support"),
      placeholder("وسادة الظهر - المكتب"),
      placeholder("وسادة الظهر - التفاصيل"),
    ],
    crossSellIds: ["belt", "bundle"],
    offers: [
      {
        id: "pillow-1",
        productId: "pillow",
        quantity: 1,
        title: "قطعة واحدة",
        subtitle: "خلي جلستك أريح",
        badge: "للتجربة",
        priceMad: 199,
        compareAtPriceMad: 245,
      },
      {
        id: "pillow-2",
        productId: "pillow",
        quantity: 2,
        title: "قطعتين",
        subtitle: "واحدة للمكتب وواحدة للسيارة",
        badge: "الأكثر اختياراً",
        priceMad: 369,
        compareAtPriceMad: 490,
        recommended: true,
      },
      {
        id: "pillow-3",
        productId: "pillow",
        quantity: 3,
        title: "ثلاث قطع",
        subtitle: "للدار والمكتب والسيارة",
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
    image: productImage("car-back-support"),
    images: [
      productImage("car-back-support"),
      productImage("posture-belt-front"),
      productImage("seat-back-cushion"),
      placeholder("طقم الظهر - هدية عملية"),
    ],
    crossSellIds: ["pillow", "belt"],
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

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: ProductId) {
  return products.find((product) => product.id === id);
}

export function getOfferById(offerId: string) {
  for (const product of products) {
    const offer = product.offers.find((item) => item.id === offerId);
    if (offer) return offer;
  }
  return upsellOffers.find((item) => item.id === offerId);
}
