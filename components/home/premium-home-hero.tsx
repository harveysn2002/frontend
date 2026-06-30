"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { getHeroOffer, homeHeroSlides } from "@/config/home-hero";
import { formatMad } from "@/lib/currency";

const trustPoints = ["الدفع عند الاستلام", "توصيل لجميع مدن المغرب", "تأكيد الطلب بالهاتف"];

export function PremiumHomeHero() {
  const slide = homeHeroSlides[0];
  const offer = getHeroOffer(slide.id);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -start-24 top-0 h-72 w-72 rounded-full bg-brand-primary/15 blur-[100px] md:h-96 md:w-96 md:blur-[120px]" />
        <div className="absolute -end-16 bottom-0 h-56 w-56 rounded-full bg-brand-gold/12 blur-[80px] md:h-80 md:w-80 md:blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,162,74,0.07),transparent_55%)]" />
      </div>

      <div className="container relative grid items-center gap-8 py-10 sm:gap-10 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
        {/* Product image */}
        <div className="relative order-2 lg:order-1">
          <div className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px]">
            <div className="absolute inset-[4%] animate-hero-glow rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.1)_42%,transparent_68%)]" />
            <div className="absolute inset-[12%] rounded-full bg-white/[0.07] blur-3xl" />
            <div className="absolute inset-[18%] rounded-full border border-white/[0.08] bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_70%)]" />
            <div className="relative h-full w-full animate-hero-float">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority
                quality={92}
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 520px"
                className="relative z-10 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </div>

        {/* Copy + CTAs */}
        <div className="order-1 lg:order-2">
          <div className="mb-4 inline-flex animate-hero-fade-up rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1.5 text-[11px] font-bold tracking-wide text-brand-gold sm:text-xs">
            {slide.badge}
          </div>

          <h1 className="animate-hero-fade-up text-3xl font-black leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block text-white">{slide.headlineWhite}</span>
            <span className="mt-1 block bg-gradient-to-l from-[#E8C872] via-brand-gold to-[#A8842E] bg-clip-text text-transparent">
              {slide.headlineGold}
            </span>
          </h1>

          <p className="mt-4 max-w-xl animate-hero-fade-up text-base leading-8 text-white/75 sm:mt-5 sm:text-lg sm:leading-9 [animation-delay:80ms]">
            {slide.description}
          </p>

          <p className="mt-3 text-sm font-bold text-brand-gold/90 sm:mt-4">
            {slide.nameAr}
            {offer ? ` · ${formatMad(offer.priceMad)}` : null}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
            <Link
              href={`/products/${slide.slug}#order`}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-gradient-to-l from-[#E8C872] via-brand-gold to-[#A8842E] px-5 py-2.5 text-sm font-black text-[#1a1208] shadow-[0_8px_30px_rgba(201,162,74,0.35)] transition hover:brightness-110 sm:min-h-12 sm:flex-none sm:px-6 sm:text-base"
            >
              {offer ? `اطلب الآن — ${formatMad(offer.priceMad)}` : "اطلب الآن"}
            </Link>
            <Link
              href={`/products/${slide.slug}`}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10 sm:min-h-12 sm:flex-none sm:px-6 sm:text-base"
            >
              شوف التفاصيل
            </Link>
          </div>

          <ul className="mt-6 flex flex-col gap-2.5 text-xs text-white/70 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-3 sm:text-sm">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-gold/20 text-brand-gold sm:h-5 sm:w-5">
                  <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={3} />
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
