export const siteConfig = {
  nameAr: "VORLAY",
  nameEn: "vorlay.shop",
  domain: "vorlay.shop",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://vorlay.shop",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.vorlay.shop",
  supportPhone: "+212600000000",
  supportEmail: "support@vorlay.shop",
  shippingMad: 35,
  announcement: "الدفع عند الاستلام | توصيل لجميع مدن المغرب | تأكيد الطلب بالهاتف",
  social: {
    whatsappNumber:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "212600000000",
    whatsappMessage: "السلام عليكم، عندي سؤال على VORLAY",
    instagramUrl:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/vorlay",
    facebookUrl:
      process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/vorlay",
  },
  supportHours: "من الاثنين إلى السبت، 9:00 - 18:00",
};
