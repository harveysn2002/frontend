"use client";

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
}: {
  offers: Offer[];
  selectedOfferId: string;
  quantityUnit?: QuantityUnit;
  onSelect: (offer: Offer) => void;
}) {
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
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-5 text-brand-muted sm:text-xs">
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

              <div className="shrink-0 text-left">
                <div className="text-lg font-black leading-none text-brand-ink sm:text-xl">
                  {formatMad(offer.priceMad)}
                </div>
                <div className="mt-0.5 text-[11px] text-brand-muted line-through sm:text-xs">
                  {formatMad(offer.compareAtPriceMad)}
                </div>
              </div>
            </div>
          </button>
        );
      })}
      <p className="pt-0.5 text-center text-[11px] font-semibold text-brand-primary sm:text-xs">
        {siteConfig.priceIncludesShippingNote}
      </p>
    </div>
  );
}
