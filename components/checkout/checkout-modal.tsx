"use client";

import { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { getProductById, upsellOffers } from "@/config/products";
import { siteConfig } from "@/config/site";
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
  region: z.string().trim().min(2, "دخل المنطقة أو الحي"),
});

type CheckoutValues = z.infer<typeof schema>;

export function CheckoutModal() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());
  const isCheckoutOpen = useCartStore((state) => state.isCheckoutOpen);
  const closeCheckout = useCartStore((state) => state.closeCheckout);
  const isUpsellOpen = useCartStore((state) => state.isUpsellOpen);
  const openUpsell = useCartStore((state) => state.openUpsell);
  const closeUpsell = useCartStore((state) => state.closeUpsell);
  const addOffer = useCartStore((state) => state.addOffer);
  const clear = useCartStore((state) => state.clear);
  const checkoutEventId = useCartStore((state) => state.checkoutEventId);
  const [pendingValues, setPendingValues] = useState<CheckoutValues | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(15);

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", city: "", region: "" },
  });

  const upsell = useMemo(() => {
    const hasPillow = items.some((item) => item.productId === "pillow");
    const selected = hasPillow ? upsellOffers.find((offer) => offer.productId === "belt") : upsellOffers[0];
    const product = selected ? getProductById(selected.productId) : null;
    return selected && product ? { offer: selected, product } : null;
  }, [items]);

  useEffect(() => {
    if (!isUpsellOpen) return;
    setSeconds(15);
    const timer = window.setInterval(() => {
      setSeconds((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isUpsellOpen]);

  function onValid(values: CheckoutValues) {
    setPendingValues(values);
    openUpsell();
  }

  async function finalizeOrder(values: CheckoutValues, acceptedUpsell: boolean) {
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
          region: values.region,
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
          shown: Boolean(upsell),
          accepted: acceptedUpsell,
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

      closeUpsell();
      closeCheckout();
      clear();
      window.location.href = `/thank-you/${response.orderId}?order=${encodeURIComponent(response.orderNumber)}`;
    } catch (err) {
      const message = err instanceof Error ? err.message : "تعذر تسجيل الطلب";
      setError(message);
      closeUpsell();
    } finally {
      setSubmitting(false);
    }
  }

  function acceptUpsell() {
    if (upsell) addOffer(upsell.product, upsell.offer, { isUpsell: true });
    if (pendingValues) void finalizeOrder(pendingValues, true);
  }

  function skipUpsell() {
    if (pendingValues) void finalizeOrder(pendingValues, false);
  }

  return (
    <>
      <Dialog.Root open={isCheckoutOpen} onOpenChange={(value) => !value && closeCheckout()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-ink/40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[94vh] w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2rem] bg-white p-5 shadow-soft md:p-7">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-2xl font-black">كمل الطلب فـ 30 ثانية</Dialog.Title>
              <Dialog.Close className="rounded-full p-2 hover:bg-brand-soft" aria-label="Close checkout">
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>
            <p className="mt-2 text-brand-muted">
              دخل الاسم، الهاتف، المدينة والمنطقة. فريق VORLAY غادي يتاصل بك قبل الإرسال.
            </p>

            <div className="mt-5 rounded-3xl bg-brand-soft/35 p-4">
              <div className="mb-3 font-black">ملخص الطلب</div>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-1 text-sm">
                  <span>{item.nameAr} · {item.offerTitle}</span>
                  <span>{formatMad(item.totalPriceMad)}</span>
                </div>
              ))}
              <div className="mt-3 flex justify-between border-t border-brand-primary/10 pt-3 text-lg font-black">
                <span>المجموع</span>
                <span>{formatMad(total)}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-brand-primary">
                {siteConfig.priceIncludesShippingNote}
              </p>
            </div>

            <form className="mt-5 space-y-4" onSubmit={form.handleSubmit(onValid)}>
              <label className="block">
                <span className="font-bold">الاسم الكامل</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-brand-primary/20 px-4 py-3 outline-none focus:border-brand-primary"
                  {...form.register("name")}
                />
                <span className="text-sm text-red-700">{form.formState.errors.name?.message}</span>
              </label>
              <label className="block">
                <span className="font-bold">رقم الهاتف</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-brand-primary/20 px-4 py-3 outline-none focus:border-brand-primary"
                  placeholder="0612345678"
                  {...form.register("phone")}
                />
                <span className="text-sm text-red-700">{form.formState.errors.phone?.message}</span>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="font-bold">المدينة</span>
                  <input
                    className="mt-2 w-full rounded-2xl border border-brand-primary/20 px-4 py-3 outline-none focus:border-brand-primary"
                    placeholder="الدار البيضاء"
                    {...form.register("city")}
                  />
                  <span className="text-sm text-red-700">{form.formState.errors.city?.message}</span>
                </label>
                <label className="block">
                  <span className="font-bold">المنطقة / الحي</span>
                  <input
                    className="mt-2 w-full rounded-2xl border border-brand-primary/20 px-4 py-3 outline-none focus:border-brand-primary"
                    placeholder="المعاريف"
                    {...form.register("region")}
                  />
                  <span className="text-sm text-red-700">{form.formState.errors.region?.message}</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-brand-primary">
                <span>الدفع عند الاستلام</span>
                <span>تأكيد قبل الإرسال</span>
              </div>
              {error && <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <Button className="w-full" disabled={items.length === 0 || submitting}>
                أكد الطلب
              </Button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={isUpsellOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-brand-ink/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-white p-6 text-center shadow-soft">
            <Dialog.Title className="text-2xl font-black">عرض خاص غير الآن</Dialog.Title>
            {upsell && (
              <>
                <p className="mt-3 text-brand-muted">
                  زيد {upsell.product.nameAr} بثمن خاص قبل ما نأكدو الطلب.
                </p>
                <div className="my-5 rounded-3xl bg-brand-soft/40 p-4">
                  <div className="text-lg font-black">{upsell.offer.title}</div>
                  <div className="mt-1 text-3xl font-black text-brand-primary">
                    {formatMad(upsell.offer.priceMad)}
                  </div>
                  <div className="text-sm text-brand-muted line-through">
                    {formatMad(upsell.offer.compareAtPriceMad)}
                  </div>
                </div>
              </>
            )}
            <p className="mb-4 text-sm font-bold text-brand-gold">العرض ينتهي خلال {seconds} ثانية</p>
            <div className="grid gap-3">
              <Button disabled={submitting} onClick={acceptUpsell}>
                نعم، زيدها للطلب
              </Button>
              <Button variant="secondary" disabled={submitting} onClick={skipUpsell}>
                لا شكراً، كمل الطلب
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
