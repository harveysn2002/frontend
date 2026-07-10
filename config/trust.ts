import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Clock,
  CreditCard,
  Headphones,
  Lock,
  MapPin,
  MessageCircle,
  PackageCheck,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const painAnswer =
  "ڤورلاي كتجاوب بمنتج عملي ومريح — والدفع عند الاستلام.";

export const trustTickerItems: Array<{ label: string; subtitle: string; icon: LucideIcon }> = [
  { label: "الدفع عند الاستلام", subtitle: "بدون دفع أونلاين", icon: ShieldCheck },
  { label: "توصيل 2‑5 أيام", subtitle: "لجميع مدن المغرب", icon: Truck },
  { label: "30 يوم ضمان الاسترجاع", subtitle: "استرجاع كامل", icon: RefreshCw },
  { label: "تأكيد بالهاتف", subtitle: "قبل كل إرسال", icon: PhoneCall },
];

export type TrustBadgeItem = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

export const purchaseTrustBadges: TrustBadgeItem[] = [
  {
    icon: ShieldCheck,
    title: "الدفع عند الاستلام",
    subtitle: "كتخلّص غير ملي توصل الطلب",
  },
  {
    icon: PhoneCall,
    title: "تأكيد بالهاتف",
    subtitle: "نتاصلو بيك قبل الإرسال",
  },
  {
    icon: Truck,
    title: "توصيل لجميع المغرب",
    subtitle: siteConfig.priceIncludesShippingNote,
  },
  {
    icon: PackageCheck,
    title: "تفتيش قبل الدفع",
    subtitle: "شوف المنتج ومن بعد خلّص",
  },
  {
    icon: CreditCard,
    title: "ما كاينش دفع أونلاين",
    subtitle: "ما خاصكش تدخل بيانات البطاقة",
  },
  {
    icon: RefreshCw,
    title: "30 يوم للاسترجاع",
    subtitle: "ما عجبكش؟ رجّعو خلال 30 يوم",
  },
  {
    icon: Lock,
    title: "بياناتك آمنة",
    subtitle: "غير الاسم والهاتف والعنوان للتوصيل",
  },
];

export const checkoutTrustItems: Array<{ icon: LucideIcon; label: string }> = [
  { icon: ShieldCheck, label: "COD" },
  { icon: PhoneCall, label: "تأكيد بالهاتف" },
  { icon: PackageCheck, label: "تفتيش قبل الدفع" },
  { icon: Truck, label: "توصيل شامل" },
  { icon: RefreshCw, label: "30 يوم للاسترجاع" },
];

export const riskFreeOrderNote =
  "طلب بلا مخاطرة: ما كتخلص والو دابا — كتقدر تلغي ملي نتاصلو بيك إلا ما بغيتيش.";

export const trustPillars: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: ShieldCheck,
    title: "الدفع عند الاستلام فقط",
    description: "ما كتخلص حتى توصل الطلب. كتقدر ترفضه إلا ما عجبكش.",
  },
  {
    icon: PhoneCall,
    title: "تأكيد بالهاتف قبل الإرسال",
    description: "فريق VORLAY كيتصل بك باش يأكد العنوان والكمية — بلا مفاجآت.",
  },
  {
    icon: Truck,
    title: "توصيل لجميع مدن المغرب",
    description: `${siteConfig.priceIncludesShippingNote}. الثمن المعروض هو اللي كتخلص.`,
  },
  {
    icon: RefreshCw,
    title: "30 يوم للاسترجاع",
    description: "إلا ما عجبكش المنتج، عندك 30 يوم باش ترجعو — بلا تعقيد.",
  },
];

export const socialProofPoints: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: PackageCheck,
    title: "طلب واضح ومباشر",
    text: "تختار العرض، تدخل معلوماتك، وكتاخد رقم الطلب فالموقع.",
  },
  {
    icon: ShieldCheck,
    title: siteConfig.priceIncludesShippingNote,
    text: "ما كاينش مفاجآت فالثمن — التوصيل داخل السعر المعروض.",
  },
  {
    icon: Clock,
    title: "تأكيد قبل الإرسال",
    text: "فريق VORLAY كيتصل بك بالهاتف قبل ما تخرج أي شحنة.",
  },
  {
    icon: Headphones,
    title: "دعم قبل وبعد الطلب",
    text: `فريق VORLAY كيجاوبك ${siteConfig.supportHours}.`,
  },
  {
    icon: MapPin,
    title: "توصيل لعنوانك",
    text: "كنصيفطو لجميع المدن والمناطق داخل المغرب.",
  },
  {
    icon: MessageCircle,
    title: "تواصل سهل",
    text: "تقدر تسول قبل الطلب — نجاوبو على أسئلتك بصراحة.",
  },
];

export const orderSteps: Array<{ title: string; text: string }> = [
  { title: "اختار العرض", text: "طقم واحد أو أكثر — الثمن واضح" },
  { title: "كمل معلوماتك", text: "الاسم، الهاتف، المدينة والحي" },
  { title: "تأكيد بالهاتف", text: "نتاصلو بيك قبل ما نصيفط" },
  { title: "استلم وخلّص", text: "شوف المنتج ومن بعد ادفع COD" },
];

export const productFaqs: Array<{ q: string; a: string }> = [
  {
    q: "واش خاصني نخلّص أونلاين؟",
    a: "لا. VORLAY كتخدم بالدفع عند الاستلام فقط — كتخلص ملي توصلك السلعة.",
  },
  {
    q: "واش كيعالج آلام الظهر؟",
    a: "لا. هو منتج دعم وراحة يومية وليس بديلاً عن الطبيب.",
  },
  {
    q: "كيفاش كيتأكد الطلب؟",
    a: "الفريق كيتصل بك بالهاتف قبل الإرسال باش يأكد العنوان والكمية.",
  },
  {
    q: "واش الثمن فيه التوصيل؟",
    a: `نعم. ${siteConfig.priceIncludesShippingNote} — ما كاينش رسوم إضافية مخفية.`,
  },
  {
    q: "واش نقدر نلغي الطلب؟",
    a: "نعم. تقدر تلغي ملي نتاصلو بيك للتأكيد — قبل ما تخرج الشحنة.",
  },
  {
    q: "واش كاين استرجاع؟",
    a: "نعم. عندك 30 يوم من تاريخ الاستلام باش ترجّع المنتج إلا ما عجبكش — بلا تعقيد.",
  },
  {
    q: "شحال كياخد التوصيل؟",
    a: "عادة 2–5 أيام عمل حسب المدينة — كنأكدو المدة ملي نتاصلو بيك.",
  },
  {
    q: "واش نقدر نشوف المنتج قبل ما نخلص؟",
    a: "نعم. مع الدفع عند الاستلام كتقدر تفتش الطرد قبل الدفع.",
  },
];
