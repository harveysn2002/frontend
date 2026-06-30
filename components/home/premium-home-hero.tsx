"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { getHeroOffer, homeHeroSlides } from "@/config/home-hero";
import { formatMad } from "@/lib/currency";
import { cn } from "@/lib/cn";

const AUTO_MS = 5200;
const trustPoints = ["الدفع عند الاستلام", "توصيل لجميع مدن المغرب", "تأكيد الطلب بالهاتف"];

export function PremiumHomeHero() {
  const slides = homeHeroSlides;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((index: number) => {
    setActive((index + slides.length) % slides.length);
    setAnimKey((key) => key + 1);
  }, [slides.length]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(next, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [next, paused]);

  const slide = slides[active];
  const offer = getHeroOffer(slide.id);

  return (
    <section
      className="relative overflow-hidden bg-[#0a0a0a] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -start-24 top-0 h-96 w-96 rounded-full bg-brand-primary/20 blur-[120px]" />
        <div className="absolute -end-16 bottom-0 h-80 w-80 rounded-full bg-brand-gold/15 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,162,74,0.08),transparent_55%)]" />
      </div>

      <div className="container relative grid min-h-[min(92vh,860px)] items-center gap-10 py-14 lg:grid-cols-2 lg:gap-14 lg:py-20">
        {/* Product showcase */}
        <div className="relative order-2 lg:order-1">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="absolute inset-[8%] animate-hero-glow rounded-full bg-[radial-gradient(circle,rgba(201,162,74,0.35)_0%,transparent_70%)]" />
            <div className="absolute inset-[18%] animate-pulse-ring rounded-full border border-brand-gold/20" />

            {slides.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-out",
                  index === active
                    ? "z-10 scale-100 opacity-100"
                    : "z-0 scale-95 opacity-0 pointer-events-none",
                )}
              >
                <div
                  className={cn(
                    "relative h-full w-full",
                    index === active && "animate-hero-float",
                  )}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    priority={index === 0}
                    quality={92}
                    sizes="(max-width: 1024px) 90vw, 520px"
                    className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              aria-label="المنتج السابق"
              onClick={prev}
              className="absolute start-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="المنتج التالي"
              onClick={next}
              className="absolute end-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.nameAr}
                onClick={() => goTo(index)}
                className={cn(
                  "relative h-14 w-14 overflow-hidden rounded-2xl border-2 transition-all duration-300",
                  index === active
                    ? "border-brand-gold scale-110 shadow-[0_0_20px_rgba(201,162,74,0.4)]"
                    : "border-white/20 opacity-60 hover:opacity-100",
                )}
              >
                <Image src={item.image} alt="" fill className="object-contain bg-black/40 p-1" sizes="56px" />
              </button>
            ))}
          </div>

          <div className="mx-auto mt-4 flex max-w-xs gap-1.5">
            {slides.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 flex-1 overflow-hidden rounded-full bg-white/15",
                )}
              >
                <div
                  className={cn(
                    "h-full rounded-full bg-brand-gold transition-all",
                    index === active ? "animate-hero-progress w-full" : "w-0",
                  )}
                  style={index === active ? { animationDuration: `${AUTO_MS}ms` } : undefined}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Copy + CTAs */}
        <div className="order-1 lg:order-2">
          <div
            key={`badge-${animKey}`}
            className="mb-5 inline-flex animate-hero-fade-up rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-xs font-bold tracking-wide text-brand-gold"
          >
            {slide.badge}
          </div>

          <div key={`headline-${animKey}`} className="animate-hero-fade-up">
            <h1 className="text-5xl font-black leading-[1.15] md:text-6xl lg:text-7xl">
              <span className="block text-white">{slide.headlineWhite}</span>
              <span className="mt-1 block bg-gradient-to-l from-[#E8C872] via-brand-gold to-[#A8842E] bg-clip-text text-transparent">
                {slide.headlineGold}
              </span>
            </h1>
          </div>

          <p
            key={`desc-${animKey}`}
            className="mt-6 max-w-xl animate-hero-fade-up text-lg leading-9 text-white/75 [animation-delay:80ms]"
          >
            {slide.description}
          </p>

          <p
            key={`name-${animKey}`}
            className="mt-4 text-sm font-bold text-brand-gold/90 animate-hero-fade-up [animation-delay:120ms]"
          >
            {slide.nameAr}
            {offer ? ` · ${formatMad(offer.priceMad)}` : null}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 animate-hero-fade-up [animation-delay:160ms]">
            <Link
              href={`/products/${slide.slug}#order`}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-l from-[#E8C872] via-brand-gold to-[#A8842E] px-6 py-3 text-base font-black text-[#1a1208] shadow-[0_8px_30px_rgba(201,162,74,0.35)] transition hover:brightness-110"
            >
              {offer ? `اطلب الآن — ${formatMad(offer.priceMad)}` : "اطلب الآن"}
            </Link>
            <Link
              href={`/products/${slide.slug}`}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-6 py-3 text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              شوف التفاصيل
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-gold/20 text-brand-gold">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-l from-transparent via-brand-gold/50 to-transparent" />
    </section>
  );
}
