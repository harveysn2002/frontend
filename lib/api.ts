import { siteConfig } from "@/config/site";

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
    throw new Error(data?.detail || data?.message || "تعذر تسجيل الطلب");
  }

  return data as {
    ok: boolean;
    orderId: string;
    orderNumber: string;
    thankYouUrl?: string;
  };
}
