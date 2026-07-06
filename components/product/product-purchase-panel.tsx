"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Zap } from "lucide-react";
import { OfferSelector } from "@/components/product/offer-selector";
import { ProductTrustBadges } from "@/components/product/product-trust-badges";
import { CheckoutTrustBar } from "@/components/trust/checkout-trust-bar";
import { riskFreeOrderNote } from "@/config/trust";
import { RatingStars } from "@/components/product/rating-stars";
import { Button } from "@/components/ui/button";
import type { Offer, Product } from "@/config/products";
import { formatMad, offerQuantityLabel } from "@/lib/currency";
import { useProductPurchase } from "@/hooks/use-product-purchase";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const defaultOffer = product.offers.find((offer) => offer.recommended) || product.offers[0];
  const [selectedOffer, setSelectedOffer] = useState<Offer>(defaultOffer);
  const [showSticky, setShowSticky] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const unit = product.quantityUnit ?? "piece";
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
      <div id="order" ref={panelRef} className="glass-card scroll-mt-28 rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-5 md:p-6">
        <RatingStars />
        <p className="mt-2 inline-flex rounded-full bg-brand-gold/15 px-2.5 py-0.5 text-[10px] font-black text-brand-ink sm:text-xs">
          {product.eyebrow ?? "VORLAY · دعم يومي مريح · الدفع عند الاستلام"}
        </p>
        <h1 className="mt-3 text-2xl font-black leading-tight text-brand-ink sm:text-3xl md:text-4xl">
          {product.headline}
        </h1>
        <p className="mt-2 text-sm leading-7 text-brand-muted sm:text-base sm:leading-8">{product.subheading}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.bestFor.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand-primary/12 bg-white px-2.5 py-0.5 text-[10px] font-bold text-brand-primary sm:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <ProductTrustBadges />
        </div>

        <div className="mt-4">
          <OfferSelector
            offers={product.offers}
            selectedOfferId={selectedOffer.id}
            quantityUnit={unit}
            onSelect={setSelectedOffer}
            onBuyNow={buyNow}
          />
        </div>

        <button
          type="button"
          onClick={() => buyNow(selectedOffer)}
          className="mt-3 flex w-full items-center justify-between gap-2 rounded-xl bg-brand-soft/30 px-3 py-2.5 text-sm transition hover:bg-brand-soft/50 active:scale-[0.99]"
        >
          <span className="font-bold text-brand-ink">
            {selectedOffer.title} · {offerQuantityLabel(selectedOffer.quantity, unit)}
          </span>
          <span className="text-base font-black text-brand-primary sm:text-lg">
            {formatMad(selectedOffer.priceMad)}
          </span>
        </button>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button
            className="min-h-10 w-full px-3 text-sm sm:min-h-11"
            onClick={() => addToCart(selectedOffer)}
          >
            <ShoppingBag className="h-4 w-4" />
            زيد للسلّة
          </Button>
          <Button
            variant="secondary"
            className="min-h-10 w-full px-3 text-sm sm:min-h-11"
            onClick={() => buyNow(selectedOffer)}
          >
            <Zap className="h-4 w-4" />
            اطلب دابا COD
          </Button>
        </div>

        <div className="mt-3">
          <CheckoutTrustBar />
        </div>

        <p className="mt-2.5 text-center text-[11px] leading-5 text-brand-muted sm:text-xs">
          {riskFreeOrderNote}
        </p>
      </div>

      {showSticky ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-primary/10 bg-white/95 p-2.5 shadow-[0_-12px_40px_rgba(31,41,51,0.12)] backdrop-blur-xl sm:p-3">
          <div className="container flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-brand-ink">{product.nameAr}</p>
              <p className="text-xs text-brand-muted">
                {selectedOffer.title} · {formatMad(selectedOffer.priceMad)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:max-w-sm sm:flex-1">
              <Button className="min-h-10 w-full text-sm" onClick={() => addToCart(selectedOffer)}>
                زيد للسلّة
              </Button>
              <Button variant="secondary" className="min-h-10 w-full text-sm" onClick={() => buyNow(selectedOffer)}>
                اطلب دابا
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
