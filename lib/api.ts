import { siteConfig } from "@/config/site";

const errorMessages: Record<string, string> = {
  "Invalid Moroccan phone number": "رقم الهاتف غير صحيح",
  "Orders are only accepted from Morocco": "الطلبات مقبولة من المغرب فقط",
  "VPN or suspicious network detected": "تم رفض الطلب: شبكة مشبوهة (VPN أو Proxy)",
  "Order risk is too high": "تعذر قبول الطلب: مخاطرة مرتفعة",
  "Unable to verify order risk": "تعذر التحقق من الطلب، جرّب من جديد",
  "Unable to verify order location": "تعذر التحقق من موقع الطلب",
  "Order screening is not configured": "التحقق من الطلب غير مفعّل بعد على السيرفر",
  "Database error while saving order": "خطأ في قاعدة البيانات. تأكد من تشغيل migration على السيرفر",
  "Field required": "عمر جميع الحقول المطلوبة",
};

const fieldErrorMessages: Record<string, string> = {
  city: "دخل المدينة",
  name: "دخل الاسم الكامل",
  phone: "دخل رقم هاتف مغربي صحيح",
};

function translateValidationError(entry: { loc?: unknown[]; msg?: unknown }): string {
  const loc = Array.isArray(entry.loc) ? entry.loc.map(String) : [];
  const field = loc[loc.length - 1] || "";
  if (typeof field === "string" && fieldErrorMessages[field]) {
    return fieldErrorMessages[field];
  }

  const msg = typeof entry.msg === "string" ? entry.msg : "";
  return errorMessages[msg] || msg || "تعذر تسجيل الطلب";
}

function translateApiError(detail: unknown): string {
  if (typeof detail === "string") {
    return errorMessages[detail] || detail;
  }

  if (Array.isArray(detail)) {
    const first = detail[0];
    if (first && typeof first === "object") {
      return translateValidationError(first as { loc?: unknown[]; msg?: unknown });
    }
  }

  return "تعذر تسجيل الطلب";
}

export async function createOrder(payload: unknown) {
  const response = await fetch(`${siteConfig.apiUrl}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(translateApiError(data?.detail) || "تعذر تسجيل الطلب");
  }

  return data as {
    ok: boolean;
    orderId: string;
    orderNumber: string;
    totalMad?: number;
    thankYouUrl?: string;
  };
}
