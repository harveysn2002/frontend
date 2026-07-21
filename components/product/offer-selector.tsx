"use client";

import { useRef, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import {
  formatMad,
  offerPriceClarityLabel,
  offerQuantityBadge,
  offerUnitPriceMad,
} from "@/lib/currency";
import type { Offer, QuantityUnit } from "@/config/products";
import { siteConfig } from "@/config/site";

export function OfferSelector({
  offers,
  selectedOfferId,
  quantityUnit = "piece",
  onSelect,
  onBuyNow,
}: {
  offers: Offer[];
  selectedOfferId: string;
  quantityUnit?: QuantityUnit;
  onSelect: (offer: Offer) => void;
  onBuyNow?: (offer: Offer) => void;
}) {
  const buyLock = useRef(false);

  function handlePriceAction(event: MouseEvent, offer: Offer) {
    event.stopPropagation();
    if (buyLock.current) return;
    buyLock.current = true;
    onSelect(offer);
    onBuyNow?.(offer);
    window.setTimeout(() => {
      buyLock.current = false;
    }, 700);
  }

  return (
    <div className="grid gap-2">
      {offers.map((offer) => {
        const selected = offer.id === selectedOfferId;
        const savings = offer.compareAtPriceMad - offer.priceMad;
        const unitPrice = offerUnitPriceMad(offer.priceMad, offer.quantity);
        const qtyBadge = offerQuantityBadge(offer.quantity, quantityUnit);
        const clarity = offerPriceClarityLabel(offer.quantity, quantityUnit);

        return (
          <button
            key={offer.id}
            type="button"
            onClick={() => onSelect(offer)}
            className={cn(
              "relative w-full rounded-2xl border bg-white px-3 py-2.5 text-right transition sm:px-3.5 sm:py-3",
              selected
                ? "border-brand-primary shadow-[0_0_0_2px_rgba(13,111,103,0.12)]"
                : "border-brand-primary/12 hover:border-brand-primary/25",
            )}
          >
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-black text-brand-ink sm:text-base">{offer.title}</span>
                  <span className="rounded-full bg-brand-gold/90 px-2 py-0.5 text-[10px] font-black text-white">
                    {offer.badge}
                  </span>
                  {qtyBadge ? (
                    <span className="rounded-full bg-brand-primary px-2 py-0.5 text-[10px] font-black text-white">
                      {qtyBadge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-brand-muted sm:text-sm sm:leading-6">
                  {offer.subtitle}
                </p>
                {clarity ? (
                  <p className="mt-0.5 text-[10px] font-bold text-brand-primary sm:text-[11px]">{clarity}</p>
                ) : null}
                {savings > 0 ? (
                  <p className="mt-0.5 text-[10px] font-bold text-brand-primary sm:text-[11px]">
                    كتوفر {formatMad(savings)}
                  </p>
                ) : null}
                {offer.quantity > 1 ? (
                  <p className="mt-0.5 text-[10px] text-brand-muted">
                    {formatMad(unitPrice)} {quantityUnit === "set" ? "للطقم" : "للقطعة"}
                  </p>
                ) : null}
              </div>

              <div
                role="button"
                tabIndex={0}
                aria-label={`اطلب ${offer.title} — ${formatMad(offer.priceMad)}`}
                onClick={(event) => handlePriceAction(event, offer)}
                onDoubleClick={(event) => handlePriceAction(event, offer)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                    onSelect(offer);
                    onBuyNow?.(offer);
                  }
                }}
                className={cn(
                  "shrink-0 cursor-pointer rounded-xl px-1.5 py-1 text-left transition hover:bg-brand-primary/8 active:scale-[0.98]",
                  onBuyNow && "hover:ring-1 hover:ring-brand-primary/20",
                )}
              >
                <div className="text-lg font-black leading-none text-brand-ink sm:text-xl">
                  {formatMad(offer.priceMad)}
                </div>
                <div className="mt-0.5 text-[11px] text-brand-muted line-through sm:text-xs">
                  {formatMad(offer.compareAtPriceMad)}
                </div>
                {onBuyNow ? (
                  <p className="mt-1 text-[9px] font-bold text-brand-primary/70 sm:text-[10px]">اضغط للطلب</p>
                ) : null}
              </div>
            </div>
          </button>
        );
      })}
      <p className="pt-1 text-center text-[10px] font-semibold text-brand-primary sm:text-[11px]">
        {siteConfig.priceIncludesShippingNote}
      </p>
    </div>
  );
}
