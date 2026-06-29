"use client";

import { useEffect, useState } from "react";
import { trustTickerItems } from "@/config/trust";

type TrustTickerProps = {
  variant?: "fade" | "announcement";
  className?: string;
};

export function TrustTicker({ variant = "fade", className = "" }: TrustTickerProps) {
  const [index, setIndex] = useState(0);
  const isAnnouncement = variant === "announcement";

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % trustTickerItems.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={
        isAnnouncement
          ? `relative h-7 overflow-hidden text-white ${className}`
          : `relative overflow-hidden rounded-2xl border border-brand-primary/12 bg-gradient-to-l from-brand-soft/70 to-white px-4 py-3.5 ${className}`
      }
      aria-live="polite"
    >
      <div className={`relative flex items-center justify-center ${isAnnouncement ? "h-7" : "min-h-[2rem]"}`}>
        {trustTickerItems.map((item, itemIndex) => {
          const Icon = item.icon;
          const isActive = itemIndex === index;

          return (
            <div
              key={item.label}
              className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-700 ${
                isActive ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
              }`}
            >
              <span
                className={`grid place-items-center rounded-full ${
                  isAnnouncement
                    ? "h-7 w-7 bg-white/15 text-white"
                    : "h-9 w-9 bg-brand-soft text-brand-primary"
                } ${isActive ? "animate-pop-in" : ""}`}
              >
                <Icon className={isAnnouncement ? "h-3.5 w-3.5" : "h-4 w-4"} />
              </span>
              <span
                className={`font-black ${
                  isAnnouncement ? "text-sm text-white" : "text-sm text-brand-primary md:text-base"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
        <span className={`invisible flex items-center gap-2 font-black ${isAnnouncement ? "text-sm" : "text-base"}`}>
          <span className="h-9 w-9" />
          {trustTickerItems[0].label}
        </span>
      </div>

      {!isAnnouncement && (
        <div className="mt-2.5 flex justify-center gap-1.5">
          {trustTickerItems.map((item, itemIndex) => (
            <span
              key={item.label}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                itemIndex === index ? "w-5 bg-brand-primary" : "w-1.5 bg-brand-primary/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
