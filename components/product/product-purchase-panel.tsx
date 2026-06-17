"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Zap } from "lucide-react";
import { OfferSelector } from "@/components/product/offer-selector";
import { RatingStars } from "@/components/product/rating-stars";
import { Button } from "@/components/ui/button";
import type { Offer, Product } from "@/config/products";
import { formatMad, offerPriceScopeLabel, offerQuantityLabel } from "@/lib/currency";
import { useProductPurchase } from "@/hooks/use-product-purchase";
import { siteConfig } from "@/config/site";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const defaultOffer = product.offers.find((offer) => offer.recommended) || product.offers[0];
  const [selectedOffer, setSelectedOffer] = useState<Offer>(defaultOffer);
  const [showSticky, setShowSticky] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { addToCart, buyNow } = useProductPurchase(product);

  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="order" ref={panelRef} className="glass-card scroll-mt-28 rounded-[2rem] p-5 md:p-7">
        <RatingStars />
        <p className="mt-3 inline-flex rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-black text-brand-ink">
          VORLAY · دعم الظهر للحياة اليومية فالمغرب
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-brand-ink md:text-5xl">
          {product.headline}
        </h1>
        <p className="mt-4 text-lg leading-8 text-brand-muted">{product.subheading}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.bestFor.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand-primary/15 bg-white px-3 py-1 text-xs font-bold text-brand-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-2 text-sm font-semibold text-brand-primary md:grid-cols-3">
          <span>الدفع عند الاستلام</span>
          <span>تأكيد الطلب بالهاتف</span>
          <span>توصيل لجميع مدن المغرب</span>
        </div>

        <div className="mt-6">
          <OfferSelector
            offers={product.offers}
            selectedOfferId={selectedOffer.id}
            onSelect={setSelectedOffer}
          />
        </div>

        <div className="mt-5 rounded-2xl bg-brand-soft/35 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-lg font-black">
            <span>
              {selectedOffer.title} · {offerQuantityLabel(selectedOffer.quantity)}
            </span>
            <span className="text-brand-primary">{formatMad(selectedOffer.priceMad)}</span>
          </div>
          <p className="mt-1 text-sm font-bold text-brand-ink">{offerPriceScopeLabel(selectedOffer.quantity)}</p>
          <p className="mt-2 text-sm font-semibold text-brand-primary">
            {siteConfig.priceIncludesShippingNote}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button className="w-full text-base" onClick={() => addToCart(selectedOffer)}>
            <ShoppingBag className="ml-2 h-5 w-5" />
            زيد للسلّة ديالي
          </Button>
          <Button
            variant="secondary"
            className="w-full text-base"
            onClick={() => buyNow(selectedOffer)}
          >
            <Zap className="ml-2 h-5 w-5" />
            اطلب دابا COD
          </Button>
        </div>

        <p className="mt-3 text-center text-sm text-brand-muted">
          ما غادي تخلص والو الآن. الفريق غادي يتاصل بك لتأكيد الطلب قبل الإرسال.
        </p>
      </div>

      {showSticky ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-primary/10 bg-white/95 p-3 shadow-[0_-12px_40px_rgba(31,41,51,0.12)] backdrop-blur-xl md:p-4">
          <div className="container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate font-black text-brand-ink">{product.nameAr}</p>
              <p className="text-sm text-brand-muted">
                {selectedOffer.title} · {offerQuantityLabel(selectedOffer.quantity)} ·{" "}
                {formatMad(selectedOffer.priceMad)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:max-w-md sm:flex-1">
              <Button className="w-full" onClick={() => addToCart(selectedOffer)}>
                زيد للسلّة
              </Button>
              <Button variant="secondary" className="w-full" onClick={() => buyNow(selectedOffer)}>
                اطلب دابا
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
