"use client";

import { painAnswer } from "@/config/trust";
import { useInView } from "@/hooks/use-in-view";

type ProductPainCardsProps = {
  pains: string[];
};

export function ProductPainCards({ pains }: ProductPainCardsProps) {
  const { ref, visible } = useInView<HTMLDivElement>(0.12);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <h2 className="text-lg font-black text-brand-ink md:text-xl">واش هاد الشي كيبان مألوف؟</h2>
      <div className="mt-3 grid gap-3">
        {pains.map((pain, index) => (
          <div
            key={pain}
            className="rounded-2xl border border-brand-primary/8 bg-brand-ivory p-4 transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              animation: visible ? `slide-up 0.5s ease-out ${index * 0.08}s forwards` : undefined,
              opacity: visible ? undefined : 0,
            }}
          >
            <h3 className="text-base font-black leading-7 text-brand-ink">{pain}</h3>
            <p className="mt-2 text-sm leading-7 text-brand-muted">{painAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
