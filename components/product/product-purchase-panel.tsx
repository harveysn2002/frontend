"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, Star } from "lucide-react";
import { OfferCountdown } from "@/components/product/offer-countdown";
import { OfferSelector } from "@/components/product/offer-selector";
import { ProductTrustBadges } from "@/components/product/product-trust-badges";
import { RatingStars } from "@/components/product/rating-stars";
import type { Offer, Product } from "@/config/products";
import { getProductReviews } from "@/config/reviews";
import { formatMad } from "@/lib/currency";
import { useProductPurchase } from "@/hooks/use-product-purchase";

const buyButtonClass =
  "flex w-full min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#E8C872] via-brand-gold to-[#A8842E] px-5 py-3.5 text-base font-black text-[#1a1208] shadow-[0_8px_28px_rgba(201,162,74,0.32)] transition hover:brightness-110 active:scale-[0.99] sm:min-h-[3.25rem] sm:text-lg";

function RefundGuaranteeNote() {
  return (
    <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-bold text-brand-primary sm:text-xs">
      <RefreshCw className="h-3.5 w-3.5 shrink-0 motion-safe:animate-spin" style={{ animationDuration: "2.8s" }} aria-hidden />
      ضمان 30 يوم للاسترجاع
    </p>
  );
}

export function ProductPurchasePanel({ product }: { product: Product }) {
  const defaultOffer = product.offers.find((offer) => offer.recommended) || product.offers[0];
  const [selectedOffer, setSelectedOffer] = useState<Offer>(defaultOffer);
  const [showSticky, setShowSticky] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const unit = product.quantityUnit ?? "piece";
  const { addToCart, buyNow } = useProductPurchase(product);
  const priceLabel = formatMad(selectedOffer.priceMad);
  const reviews = getProductReviews(product.id);

  const scrollToReviews = () => {
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        {reviews ? (
          <button
            type="button"
            onClick={scrollToReviews}
            className="mt-2 flex w-full items-center justify-between gap-2 rounded-2xl border border-brand-primary/15 bg-white px-3 py-2 text-right transition hover:bg-brand-soft"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i <= Math.round(reviews.average)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-none text-brand-primary/20"
                    }`}
                  />
                ))}
              </span>
              <span className="text-sm font-black text-brand-ink">{reviews.average.toFixed(1)}</span>
              <span className="text-xs font-semibold text-brand-muted">({reviews.count} تقييم)</span>
            </span>
            <span className="text-xs font-black text-brand-primary underline underline-offset-2">
              شوف آراء الناس
            </span>
          </button>
        ) : null}
        <p className="mt-2 inline-flex rounded-full bg-brand-gold/15 px-2.5 py-0.5 text-[10px] font-black text-brand-ink sm:text-xs">
          {product.eyebrow ?? "VORLAY · دعم يومي مريح · الدفع عند الاستلام"}
        </p>
        <h1 className="mt-3 text-xl font-black leading-tight text-brand-ink sm:text-2xl md:text-3xl">
          {product.headline}
        </h1>
        <p className="mt-2 text-[13px] leading-6 text-brand-muted sm:text-sm sm:leading-7">{product.subheading}</p>

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

        <OfferCountdown />

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

        <RefundGuaranteeNote />

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
            <RefundGuaranteeNote />
          </div>
        </div>
      ) : null}
    </>
  );
}
