"use client";

import { useEffect, useRef, useState } from "react";
import { OfferSelector } from "@/components/product/offer-selector";
import { ProductTrustBadges } from "@/components/product/product-trust-badges";
import { RatingStars } from "@/components/product/rating-stars";
import type { Offer, Product } from "@/config/products";
import { formatMad } from "@/lib/currency";
import { useProductPurchase } from "@/hooks/use-product-purchase";

const buyButtonClass =
  "flex w-full min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#E8C872] via-brand-gold to-[#A8842E] px-5 py-3.5 text-base font-black text-[#1a1208] shadow-[0_8px_28px_rgba(201,162,74,0.32)] transition hover:brightness-110 active:scale-[0.99] sm:min-h-[3.25rem] sm:text-lg";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const defaultOffer = product.offers.find((offer) => offer.recommended) || product.offers[0];
  const [selectedOffer, setSelectedOffer] = useState<Offer>(defaultOffer);
  const [showSticky, setShowSticky] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const unit = product.quantityUnit ?? "piece";
  const { addToCart, buyNow } = useProductPurchase(product);
  const priceLabel = formatMad(selectedOffer.priceMad);

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

        <p className="mt-5 text-sm font-black text-brand-ink">اختار العرض:</p>
        <div className="mt-2">
          <OfferSelector
            offers={product.offers}
            selectedOfferId={selectedOffer.id}
            quantityUnit={unit}
            onSelect={setSelectedOffer}
            onBuyNow={buyNow}
          />
        </div>

        <button type="button" onClick={() => buyNow(selectedOffer)} className={`mt-4 ${buyButtonClass}`}>
          <span>اطلب دابا</span>
          <span className="opacity-60">·</span>
          <span>{priceLabel}</span>
        </button>

        <p className="mt-2 text-center text-[11px] font-semibold text-brand-muted sm:text-xs">
          الدفع عند الاستلام · بدون دفع أونلاين
        </p>

        <div className="mt-3">
          <ProductTrustBadges compact />
        </div>

        <button
          type="button"
          onClick={() => addToCart(selectedOffer)}
          className="mt-3 w-full text-center text-xs font-bold text-brand-primary underline-offset-2 hover:underline"
        >
          زيد للسلّة ديالي
        </button>
      </div>

      {showSticky ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-primary/10 bg-white/95 p-3 shadow-[0_-12px_40px_rgba(31,41,51,0.12)] backdrop-blur-xl">
          <div className="container">
            <button type="button" onClick={() => buyNow(selectedOffer)} className={buyButtonClass}>
              <span>اطلب دابا</span>
              <span className="opacity-60">·</span>
              <span>{priceLabel}</span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
