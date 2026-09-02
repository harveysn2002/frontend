export type OrderConfirmationSnapshot = {
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  totalMad: number;
  items: Array<{ nameAr: string; offerTitle: string; quantity: number; totalPriceMad: number }>;
};

export function buildCustomerOrderConfirmationMessage(snapshot: OrderConfirmationSnapshot) {
  const lines = snapshot.items.map(
    (item) => `- ${item.nameAr} (${item.offerTitle}) x ${item.quantity} — ${item.totalPriceMad} درهم`,
  );

  return [
    "السلام عليكم،",
    "",
    "بغيت نأكد طلبي من vorlay.shop",
    "",
    `رقم الطلب: ${snapshot.orderNumber}`,
    `الاسم: ${snapshot.customerName}`,
    `الهاتف: ${snapshot.phone}`,
    `المدينة: ${snapshot.city}`,
    "",
    "الطلب:",
    ...lines,
    "",
    `المجموع: ${snapshot.totalMad} درهم`,
    "الدفع عند الاستلام",
    "",
    "شكراً",
  ].join("\n");
}

export function buildStoreOrderConfirmationMessage(snapshot: OrderConfirmationSnapshot) {
  const lines = snapshot.items.map(
    (item) => `- ${item.nameAr} (${item.offerTitle}) x ${item.quantity} — ${item.totalPriceMad} درهم`,
  );

  return [
    `السلام عليكم ${snapshot.customerName}`,
    "",
    "تأكيد طلبك من VORLAY",
    "",
    `رقم الطلب: ${snapshot.orderNumber}`,
    `المدينة: ${snapshot.city}`,
    "",
    "الطلب:",
    ...lines,
    "",
    `المجموع: ${snapshot.totalMad} درهم (الدفع عند الاستلام)`,
    "",
    "غادي نتاصلو بيك قريباً لتأكيد العنوان والتوصيل.",
    "شكراً على ثقتك",
    "فريق VORLAY",
  ].join("\n");
}
