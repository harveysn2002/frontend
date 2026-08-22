"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, Star, Users } from "lucide-react";
import { OfferCountdown } from "@/components/product/offer-countdown";
import { OfferSelector } from "@/components/product/offer-selector";
import { ProductTrustBadges } from "@/components/product/product-trust-badges";
import { RatingStars } from "@/components/product/rating-stars";
import type { Offer, Product } from "@/config/products";
import { nicheCopy } from "@/config/niche-copy";
import { getProductReviews } from "@/config/reviews";
import { formatMad } from "@/lib/currency";
import { createEventId } from "@/lib/events";
import { trackViewContent } from "@/lib/tracking";
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
  const compareLabel =
    selectedOffer.compareAtPriceMad > selectedOffer.priceMad
      ? formatMad(selectedOffer.compareAtPriceMad)
      : null;
  const reviews = getProductReviews(product.id);
  const viewedProductId = useRef<string | null>(null);
  const buyersCount = product.buyersCount;

  const scrollToReviews = () => {
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (viewedProductId.current === product.id) return;
    viewedProductId.current = product.id;
    const offer = product.offers.find((o) => o.recommended) || product.offers[0];
    trackViewContent({
      eventId: createEventId("view"),
      value: offer?.priceMad,
      currency: "MAD",
      product,
      contents: offer
        ? [{ id: product.id, quantity: offer.quantity, item_price: Math.round(offer.priceMad / offer.quantity) }]
        : undefined,
    });
  }, [product]);

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

        {buyersCount ? (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-brand-primary/15 bg-brand-soft/80 px-3.5 py-2.5">
            <span className="inline-flex items-center gap-2 text-sm font-black text-brand-ink">
              <Users className="h-4 w-4 text-brand-primary" aria-hidden />
              +{buyersCount} مشتري
            </span>
            {reviews ? (
              <button
                type="button"
                onClick={scrollToReviews}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary underline-offset-2 hover:underline"
              >
                <span className="inline-flex items-center gap-0.5" aria-hidden>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i <= Math.round(reviews.average)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-none text-brand-primary/20"
                      }`}
                    />
                  ))}
                </span>
                {reviews.average.toFixed(1)} · شوف الآراء
              </button>
            ) : null}
          </div>
        ) : reviews ? (
          <button
            type="button"
            onClick={scrollToReviews}
            className="mt-3 flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-brand-primary/25 bg-brand-soft/70 px-4 py-3.5 text-right shadow-sm transition hover:border-brand-primary/40 hover:bg-brand-soft active:scale-[0.99] sm:py-4"
          >
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-0.5" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i <= Math.round(reviews.average)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-none text-brand-primary/20"
                    }`}
                  />
                ))}
              </span>
              <span className="text-base font-black text-brand-ink sm:text-lg">
                {reviews.average.toFixed(1)}
              </span>
            </span>
            <span className="rounded-full bg-brand-primary px-3.5 py-1.5 text-sm font-black text-white sm:text-base">
              شوف آراء الناس
            </span>
          </button>
        ) : null}

        <p className="mt-3 inline-flex rounded-full bg-brand-gold/15 px-2.5 py-0.5 text-[10px] font-black text-brand-ink sm:text-xs">
          {product.eyebrow ?? nicheCopy.defaultEyebrow}
        </p>
        <h1 className="mt-2 text-xl font-black leading-tight text-brand-ink sm:text-2xl md:text-[1.7rem]">
          {product.headline}
        </h1>
        <p className="mt-2 text-[13px] leading-6 text-brand-muted sm:text-sm sm:leading-7">
          {product.subheading}
        </p>

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

        {!product.hideOfferCountdown ? <OfferCountdown /> : null}

        <p className="mt-4 text-sm font-black text-brand-ink">اختار العرض:</p>
        <div className="mt-2">
          <OfferSelector
            offers={product.offers}
            selectedOfferId={selectedOffer.id}
            quantityUnit={unit}
            onSelect={setSelectedOffer}
            onBuyNow={buyNow}
          />
        </div>

        <div className="mt-3 rounded-2xl border border-brand-primary/10 bg-white px-3.5 py-3 text-center">
          <p className="text-[11px] font-bold text-brand-muted">الثمن الحالي</p>
          <p className="mt-0.5 flex items-baseline justify-center gap-2">
            <span className="text-2xl font-black text-brand-ink sm:text-3xl">{priceLabel}</span>
            {compareLabel ? (
              <span className="text-sm font-bold text-brand-muted line-through">{compareLabel}</span>
            ) : null}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-brand-primary">
            التوصيل على حسابنا · الدفع عند الاستلام
          </p>
        </div>

        <button type="button" onClick={() => buyNow(selectedOffer)} className={`mt-3 ${buyButtonClass}`}>
          <span>اطلب دابا</span>
          <span className="opacity-60">·</span>
          <span>{priceLabel}</span>
        </button>

        <div className="mt-3">
          <ProductTrustBadges compact />
        </div>

        <RefundGuaranteeNote />

        <p className="mt-2 text-center text-[11px] font-semibold text-brand-muted sm:text-xs">
          الدفع عند الاستلام · بدون دفع أونلاين · تأكيد بالهاتف
        </p>

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
            {buyersCount ? (
              <p className="mb-2 text-center text-[11px] font-bold text-brand-muted">
                +{buyersCount} مشتري · الدفع عند الاستلام
              </p>
            ) : null}
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
