"use client";

import { useEffect, useState } from "react";
import { trustTickerItems } from "@/config/trust";

export function TrustTicker({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (trustTickerItems.length <= 1) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % trustTickerItems.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const item = trustTickerItems[index];
  const Icon = item.icon;

  return (
    <div
      className={`w-full bg-gradient-to-l from-brand-dark to-brand-primary py-3 sm:py-3.5 ${className}`}
    >
      <div className="container flex min-h-[2.5rem] items-center justify-center">
        <div
          key={item.label}
          className="flex items-center gap-2.5 motion-safe:animate-trust-fade sm:gap-3"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-brand-gold/30 bg-brand-gold/15 sm:h-9 sm:w-9">
            <Icon className="h-4 w-4 text-brand-gold sm:h-[18px] sm:w-[18px]" />
          </span>
          <div className="text-center">
            <p className="whitespace-nowrap text-[12px] font-bold leading-tight text-brand-gold sm:text-sm">
              {item.label}
            </p>
            <p className="whitespace-nowrap text-[10px] leading-tight text-white/60 sm:text-[11px]">
              {item.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
