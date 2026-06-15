"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { formatMad } from "@/lib/currency";
import { trackInitiateCheckout } from "@/lib/tracking";
import { getFirstMissingCrossSell, useCartStore } from "@/store/cart-store";

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const openCheckout = useCartStore((state) => state.openCheckout);
  const addOffer = useCartStore((state) => state.addOffer);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const subtotal = useCartStore((state) => state.total());
  const shipping = items.length > 0 ? siteConfig.shippingMad : 0;
  const total = subtotal + shipping;
  const crossSell = getFirstMissingCrossSell(items);
  const crossSellOffer = crossSell?.offers.find((offer) => offer.recommended) || crossSell?.offers[0];

  function handleCheckout() {
    const eventId = openCheckout();
    trackInitiateCheckout({
      eventId,
      value: total,
      currency: "MAD",
      contents: items.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
        item_price: item.unitPriceMad,
      })),
    });
  }

  function handleClearCart() {
    if (items.length === 0) return;
    clear();
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(value) => !value && closeCart()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-ink/40" />
        <Dialog.Content className="fixed left-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white p-5 shadow-soft md:rounded-r-[2rem]">
          <div className="flex items-center justify-between border-b border-brand-primary/10 pb-4">
            <Dialog.Title className="text-2xl font-black">السلة ديالك</Dialog.Title>
            <Dialog.Close className="rounded-full p-2 hover:bg-brand-soft" aria-label="سد السلة">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto py-5">
            {items.length === 0 ? (
              <p className="text-brand-muted">السلة فارغة دابا.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex gap-3 rounded-3xl border border-brand-primary/10 p-3 pe-12"
                  >
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`حذف ${item.nameAr} من السلة`}
                      className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-brand-soft">
                      <Image src={item.image} alt={item.nameAr} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-black">{item.nameAr}</div>
                      <div className="text-sm text-brand-muted">
                        {item.offerTitle} · x{item.quantity}
                      </div>
                      <div className="mt-2 font-black">{formatMad(item.totalPriceMad)}</div>
                      <button
                        type="button"
                        className="mt-3 inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 transition hover:bg-red-100"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        حذف من السلة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {crossSell && crossSellOffer && (
              <div className="mt-6 rounded-[2rem] bg-brand-soft/45 p-4">
                <div className="text-sm font-black text-brand-primary">كمل الراحة ديالك</div>
                <div className="mt-1 text-xl font-black">{crossSell.nameAr}</div>
                <p className="mt-1 text-sm text-brand-muted">{crossSell.cardSubheading}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-black">{formatMad(crossSellOffer.priceMad)}</span>
                  <Button
                    className="min-h-10 px-4 py-2 text-sm"
                    onClick={() => addOffer(crossSell, crossSellOffer)}
                  >
                    زيدها للطلب
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-brand-primary/10 pt-4">
            <div className="mb-3 space-y-2">
              <div className="flex items-center justify-between text-sm text-brand-muted">
                <span>ثمن المنتجات</span>
                <span>{formatMad(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-brand-muted">
                <span>التوصيل</span>
                <span>{formatMad(shipping)}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-black">
                <span>المجموع</span>
                <span>{formatMad(total)}</span>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-2 text-xs font-bold text-brand-primary">
              <span>الدفع عند الاستلام</span>
              <span>تأكيد قبل الإرسال</span>
            </div>
            <Button className="w-full" disabled={items.length === 0} onClick={handleCheckout}>
              كمل الطلب
            </Button>
            {items.length > 0 ? (
              <button
                type="button"
                onClick={handleClearCart}
                className="mt-3 w-full rounded-2xl border border-brand-primary/15 px-4 py-3 text-sm font-bold text-brand-muted transition hover:bg-brand-soft/40"
              >
                فرّغ السلة
              </button>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
