"use client";

import { cn } from "@/lib/cn";
import {
  formatMad,
  offerPriceScopeLabel,
  offerQuantityLabel,
  offerUnitPriceMad,
} from "@/lib/currency";
import type { Offer } from "@/config/products";
import { siteConfig } from "@/config/site";

export function OfferSelector({
  offers,
  selectedOfferId,
  onSelect,
}: {
  offers: Offer[];
  selectedOfferId: string;
  onSelect: (offer: Offer) => void;
}) {
  return (
    <div className="grid gap-3">
      {offers.map((offer) => {
        const selected = offer.id === selectedOfferId;
        const savings = offer.compareAtPriceMad - offer.priceMad;
        const unitPrice = offerUnitPriceMad(offer.priceMad, offer.quantity);

        return (
          <button
            key={offer.id}
            type="button"
            onClick={() => onSelect(offer)}
            className={cn(
              "rounded-3xl border bg-white p-4 text-right transition",
              selected ? "border-brand-primary ring-4 ring-brand-soft" : "border-brand-primary/15",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-black">{offer.title}</span>
                  <span className="rounded-full bg-brand-gold px-3 py-1 text-xs font-black text-white">
                    {offer.badge}
                  </span>
                  {offer.quantity > 1 ? (
                    <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-black text-white">
                      ×{offer.quantity} قطع
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-brand-muted">{offer.subtitle}</p>
                {savings > 0 && (
                  <p className="mt-2 text-xs font-bold text-brand-primary">
                    كتوفر {formatMad(savings)}
                  </p>
                )}
              </div>
              <div className="shrink-0 text-left">
                <div className="rounded-xl bg-brand-primary/10 px-3 py-1 text-xs font-black text-brand-primary">
                  {offerQuantityLabel(offer.quantity)}
                </div>
                <div className="mt-2 text-2xl font-black leading-none">{formatMad(offer.priceMad)}</div>
                <div className="mt-1 text-sm font-bold text-brand-ink">{offerPriceScopeLabel(offer.quantity)}</div>
                {offer.quantity > 1 ? (
                  <div className="mt-1 text-xs font-semibold text-brand-muted">
                    {formatMad(unitPrice)} للقطعة
                  </div>
                ) : null}
                <div className="mt-1 text-sm text-brand-muted line-through">
                  {formatMad(offer.compareAtPriceMad)}
                </div>
              </div>
            </div>
          </button>
        );
      })}
      <p className="text-center text-sm font-semibold text-brand-primary">
        {siteConfig.priceIncludesShippingNote}
      </p>
    </div>
  );
}
