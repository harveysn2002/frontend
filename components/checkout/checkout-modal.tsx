"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckoutTrustBar } from "@/components/trust/checkout-trust-bar";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useKeyboardInset } from "@/hooks/use-keyboard-inset";
import { createOrder } from "@/lib/api";
import { formatMad } from "@/lib/currency";
import { createEventId } from "@/lib/events";
import { normalizeMoroccanMobile } from "@/lib/phone";
import { trackPurchase } from "@/lib/tracking";
import { collectAttribution, collectPixelCookies } from "@/lib/utm";
import { useCartStore } from "@/store/cart-store";

const schema = z.object({
  name: z.string().trim().min(2, "دخل الاسم الكامل"),
  phone: z
    .string()
    .trim()
    .min(1, "دخل رقم الهاتف")
    .refine((value) => normalizeMoroccanMobile(value), {
      message: "دخل رقم هاتف مغربي صحيح",
    }),
  city: z.string().trim().min(2, "دخل المدينة"),
});

type CheckoutValues = z.infer<typeof schema>;

/** Wait for the keyboard animation before recentering the field. */
function keepFieldVisible(event: React.FocusEvent<HTMLInputElement>) {
  const field = event.target;
  window.setTimeout(() => field.scrollIntoView({ block: "center", behavior: "smooth" }), 300);
}

export function CheckoutModal() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());
  const isCheckoutOpen = useCartStore((state) => state.isCheckoutOpen);
  const closeCheckout = useCartStore((state) => state.closeCheckout);
  const clear = useCartStore((state) => state.clear);
  const checkoutEventId = useCartStore((state) => state.checkoutEventId);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { inset: keyboardInset, viewportHeight } = useKeyboardInset(isCheckoutOpen);

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", city: "" },
  });

  async function onValid(values: CheckoutValues) {
    const phone = normalizeMoroccanMobile(values.phone);
    if (!phone) return;

    setSubmitting(true);
    setError("");

    const purchaseEventId = createEventId("purchase");
    const currentItems = useCartStore.getState().items;
    const currentTotal = useCartStore.getState().total();

    try {
      const response = await createOrder({
        customer: {
          name: values.name,
          phone: phone.local,
          phone_e164: phone.e164,
          city: values.city,
          region: "",
        },
        items: currentItems.map((item) => ({
          product_id: item.productId,
          slug: item.slug,
          name_ar: item.nameAr,
          offer_id: item.offerId,
          quantity: item.quantity,
          unit_price_mad: item.unitPriceMad,
          total_price_mad: item.totalPriceMad,
          is_upsell: Boolean(item.isUpsell),
        })),
        totals: {
          subtotal_mad: currentTotal,
          discount_mad: 0,
          shipping_mad: 0,
          total_mad: currentTotal,
          currency: "MAD",
        },
        upsell: {
          shown: false,
          accepted: false,
        },
        events: {
          purchase_event_id: purchaseEventId,
          checkout_event_id: checkoutEventId,
          add_to_cart_event_ids: currentItems.map((item) => item.addToCartEventId),
        },
        attribution: collectAttribution(),
        pixel_cookies: collectPixelCookies(),
      });

      trackPurchase({
        eventId: purchaseEventId,
        value: currentTotal,
        currency: "MAD",
        orderNumber: response.orderNumber,
        contents: currentItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
          item_price: item.unitPriceMad,
        })),
      });

      closeCheckout();
      clear();
      window.location.href = `/thank-you/${response.orderId}?order=${encodeURIComponent(response.orderNumber)}`;
    } catch (err) {
      const message = err instanceof Error ? err.message : "تعذر تسجيل الطلب";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog.Root open={isCheckoutOpen} onOpenChange={(value) => !value && closeCheckout()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-ink/40" />
        <Dialog.Content
          style={
            keyboardInset > 0
              ? { bottom: `${keyboardInset + 12}px`, maxHeight: `${viewportHeight - 24}px` }
              : undefined
          }
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 mx-auto flex max-h-[min(92dvh,94vh)] w-auto max-w-xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-soft sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[calc(100%-1.5rem)] sm:-translate-x-1/2 sm:-translate-y-1/2"
        >
          <div className="flex items-center justify-between px-5 pb-2 pt-5 md:px-7 md:pt-7">
            <Dialog.Title className="text-2xl font-black">طلبك</Dialog.Title>
            <Dialog.Close className="rounded-full p-2 hover:bg-brand-soft" aria-label="Close checkout">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={form.handleSubmit(onValid)}
          >
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 pb-3 md:px-7">
              <div className="rounded-3xl bg-brand-soft/35 p-4">
                <div className="mb-3 font-black">ملخص الطلب</div>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between py-1 text-sm">
                    <span>{item.nameAr} · {item.offerTitle}</span>
                    <span>{formatMad(item.totalPriceMad)}</span>
                  </div>
                ))}
                <div className="mt-3 flex justify-between border-t border-brand-primary/10 pt-3 text-lg font-black">
                  <span>الإجمالي</span>
                  <span>{formatMad(total)}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-brand-primary">
                  {siteConfig.priceIncludesShippingNote} — الدفع عند الاستلام فقط
                </p>
              </div>

              <label className="block">
                <span className="font-bold">الاسم الكامل</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-brand-primary/20 px-4 py-3 outline-none focus:border-brand-primary"
                  placeholder="مثال: أحمد بنعلي"
                  autoComplete="name"
                  onFocus={keepFieldVisible}
                  {...form.register("name")}
                />
                <span className="text-sm text-red-700">{form.formState.errors.name?.message}</span>
              </label>
              <label className="block">
                <span className="font-bold">رقم الهاتف المغربي</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-brand-primary/20 px-4 py-3 outline-none focus:border-brand-primary"
                  placeholder="06XXXXXXXX"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  onFocus={keepFieldVisible}
                  {...form.register("phone")}
                />
                <span className="text-sm text-red-700">{form.formState.errors.phone?.message}</span>
              </label>
              <label className="block">
                <span className="font-bold">المدينة</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-brand-primary/20 px-4 py-3 outline-none focus:border-brand-primary"
                  placeholder="الدار البيضاء"
                  autoComplete="address-level2"
                  onFocus={keepFieldVisible}
                  {...form.register("city")}
                />
                <span className="text-sm text-red-700">{form.formState.errors.city?.message}</span>
              </label>
              <p className="text-sm text-brand-muted">
                فريق VORLAY غادي يتاصل بيك قبل الإرسال باش يأكد العنوان.
              </p>
              <div className="mt-1">
                <CheckoutTrustBar />
              </div>
            </div>

            <div className="sticky bottom-0 shrink-0 border-t border-brand-primary/10 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 md:px-7 md:pb-7">
              {error && <p className="mb-3 rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <Button className="w-full" disabled={items.length === 0 || submitting}>
                {submitting ? "كنسجّلو الطلب..." : "أكد الطلب — الدفع عند الاستلام"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
