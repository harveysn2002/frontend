import type { ProductId } from "@/config/products";
import { products } from "@/config/products";

export type HomeHeroSlide = {
  id: ProductId;
  slug: string;
  nameAr: string;
  badge: string;
  headlineWhite: string;
  headlineGold: string;
  description: string;
  image: string;
  imageAlt: string;
};

/** Drop PNG/WebP files in public/images/hero/ — hero-{pillow|belt|bundle}.{webp|png} */
const heroImage = (file: string) => `/images/hero/${file}`;

const slideCopy: Record<
  ProductId,
  Pick<HomeHeroSlide, "badge" | "headlineWhite" | "headlineGold" | "description" | "image" | "imageAlt">
> = {
  pillow: {
    badge: "VORLAY ✦ NEW COLLECTION",
    headlineWhite: "راحة حقيقية",
    headlineGold: "لكل رحلة",
    description:
      "طقم 2 في 1 — وسادة رقبة ووسادة ظهر بميموري فوم. للسيارة، المكتب، والجلوس الطويل.",
    image: heroImage("hero-pillow.webp"),
    imageAlt: "طقم VORLAY — وسادة رقبة وظهر",
  },
  belt: {
    badge: "VORLAY ✦ BEST SELLER",
    headlineWhite: "وقفة ثابتة",
    headlineGold: "نهار كامل",
    description:
      "حزام دعم الظهر قابل للتعديل — للخدمة، الوقوف الطويل، والحركة اليومية.",
    image: heroImage("hero-belt.png"),
    imageAlt: "حزام VORLAY لدعم الظهر",
  },
  bundle: {
    badge: "VORLAY ✦ BEST VALUE",
    headlineWhite: "الحل الكامل",
    headlineGold: "بأفضل قيمة",
    description: "حزام + وسادة في طلب واحد — راحة فالجلوس والحركة بثمن أحسن.",
    image: heroImage("hero-bundle.webp"),
    imageAlt: "طقم VORLAY الكامل — حزام ووسادة",
  },
};

export const homeHeroSlides: HomeHeroSlide[] = products.map((product) => ({
  id: product.id,
  slug: product.slug,
  nameAr: product.nameAr,
  ...slideCopy[product.id],
}));

export function getHeroOffer(productId: ProductId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return null;
  return product.offers.find((item) => item.recommended) || product.offers[0];
}
