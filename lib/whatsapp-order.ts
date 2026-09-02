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
    "بلاصة السكن فالمدينة (الحي + العنوان):",
    "",
    "شكراً",
  ].join("\n");
}

export function buildStoreAddressRequestMessage(snapshot: OrderConfirmationSnapshot) {
  return [
    `السلام عليكم ${snapshot.customerName}`,
    "",
    "وصلنا طلبك من VORLAY",
    "",
    `رقم الطلب: ${snapshot.orderNumber}`,
    `المدينة: ${snapshot.city}`,
    "",
    "عافاك عطينا بلاصة السكن فالمدينة (الحي + العنوان أو نقطة قريبة) باش نوصلو الطلب.",
    "",
    "شكراً",
    "فريق VORLAY",
  ].join("\n");
}
