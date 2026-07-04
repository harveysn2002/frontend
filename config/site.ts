const PLACEHOLDER_WHATSAPP = new Set(["", "212600000000", "600000000"]);

const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");

/** True only when a real WhatsApp number is configured (not a placeholder). */
export const hasWhatsApp = Boolean(whatsappNumber) && !PLACEHOLDER_WHATSAPP.has(whatsappNumber);

export const siteConfig = {
  nameAr: "VORLAY",
  nameEn: "vorlay.shop",
  domain: "vorlay.shop",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://vorlay.shop",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.vorlay.shop",
  supportPhone: hasWhatsApp ? `+${whatsappNumber}` : "",
  supportEmail: "support@vorlay.shop",
  /** Displayed shipping line is 0 — product prices already include delivery. */
  shippingMad: 0,
  priceIncludesShippingNote: "الثمن يشمل تكلفة التوصيل",
  announcement: "الدفع عند الاستلام | توصيل لجميع مدن المغرب | تأكيد الطلب بالهاتف",
  social: {
    whatsappNumber: hasWhatsApp ? whatsappNumber : "",
    whatsappMessage: "السلام عليكم، عندي سؤال على VORLAY",
    instagramUrl:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/vorlay",
    facebookUrl:
      process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/vorlayshop",
  },
  supportHours: "من الاثنين إلى السبت، 9:00 - 18:00",
};
