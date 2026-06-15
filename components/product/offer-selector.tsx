"use client";

import { cn } from "@/lib/cn";
import { formatMad } from "@/lib/currency";
import type { Offer } from "@/config/products";

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
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black">{offer.title}</span>
                  <span className="rounded-full bg-brand-gold px-3 py-1 text-xs font-black text-white">
                    {offer.badge}
                  </span>
                </div>
                <p className="mt-1 text-sm text-brand-muted">{offer.subtitle}</p>
                {savings > 0 && (
                  <p className="mt-2 text-xs font-bold text-brand-primary">
                    كتوفر {formatMad(savings)}
                  </p>
                )}
              </div>
              <div className="text-left">
                <div className="text-xl font-black">{formatMad(offer.priceMad)}</div>
                <div className="text-sm text-brand-muted line-through">
                  {formatMad(offer.compareAtPriceMad)}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
