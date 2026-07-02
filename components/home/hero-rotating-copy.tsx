"use client";

import { useEffect, useState } from "react";
import type { HeroRotatingItem } from "@/config/home-hero";
import { cn } from "@/lib/cn";

const FADE_MS = 650;

function getItemText(item: HeroRotatingItem) {
  return item.kind === "headline" ? `${item.lineWhite} ${item.lineGold}` : item.text;
}

function getHoldMs(text: string) {
  return Math.max(4200, Math.min(9000, 3000 + text.length * 48));
}

type HeroRotatingCopyProps = {
  items: HeroRotatingItem[];
};

export function HeroRotatingCopy({ items }: HeroRotatingCopyProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (items.length <= 1) return;

    const hold = getHoldMs(getItemText(items[index]));
    const fadeOutTimer = window.setTimeout(() => setVisible(false), hold);
    const nextTimer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % items.length);
      setVisible(true);
    }, hold + FADE_MS);

    return () => {
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(nextTimer);
    };
  }, [index, items]);

  const current = items[index];

  return (
    <div
      className="relative min-h-[4.75rem] sm:min-h-[6rem] md:min-h-[7rem] lg:min-h-[8rem]"
      aria-live="polite"
    >
      <div
        className={cn(
          "transition-opacity duration-[650ms] ease-in-out motion-reduce:transition-none",
          visible ? "opacity-100" : "opacity-0",
        )}
      >
        {current.kind === "headline" ? (
          <h1 className="text-3xl font-black leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block text-white">{current.lineWhite}</span>
            <span className="mt-1 block bg-gradient-to-l from-[#E8C872] via-brand-gold to-[#A8842E] bg-clip-text text-transparent">
              {current.lineGold}
            </span>
          </h1>
        ) : (
          <p className="max-w-xl text-base leading-8 text-white/75 sm:text-lg sm:leading-9">
            {current.text}
          </p>
        )}
      </div>
    </div>
  );
}
