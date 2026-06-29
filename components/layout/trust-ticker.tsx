"use client";

import { useEffect, useState } from "react";
import { trustTickerItems } from "@/config/trust";

type TrustTickerProps = {
  variant?: "fade" | "marquee" | "inline";
  className?: string;
};

export function TrustTicker({ variant = "fade", className = "" }: TrustTickerProps) {
  if (variant === "marquee") {
    return <TrustMarquee className={className} />;
  }

  if (variant === "inline") {
    return (
      <p className={`text-sm font-bold text-brand-primary ${className}`}>
        {trustTickerItems.join("  ·  ")}
      </p>
    );
  }

  return <TrustFade className={className} />;
}

function TrustFade({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % trustTickerItems.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-brand-primary/12 bg-gradient-to-l from-brand-soft/70 to-white px-4 py-3 ${className}`}
      aria-live="polite"
    >
      <div className="flex items-center justify-center gap-2 text-sm font-black text-brand-primary md:text-base">
        {trustTickerItems.map((item, itemIndex) => (
          <span
            key={item}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              itemIndex === index
                ? "translate-y-0 opacity-100"
                : itemIndex < index
                  ? "-translate-y-3 opacity-0"
                  : "translate-y-3 opacity-0"
            }`}
          >
            {item}
          </span>
        ))}
        <span className="invisible">{trustTickerItems[0]}</span>
      </div>
      <div className="mt-2 flex justify-center gap-1.5">
        {trustTickerItems.map((item, itemIndex) => (
          <span
            key={item}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              itemIndex === index ? "w-5 bg-brand-primary" : "w-1.5 bg-brand-primary/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function TrustMarquee({ className }: { className?: string }) {
  const line = trustTickerItems.join("   |   ");
  const repeated = `${line}   |   ${line}   |   `;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden>
      <div className="inline-flex min-w-full animate-marquee-rtl">
        <span className="px-4">{repeated}</span>
        <span className="px-4">{repeated}</span>
      </div>
    </div>
  );
}
