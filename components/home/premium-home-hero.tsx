"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { HeroRotatingCopy } from "@/components/home/hero-rotating-copy";
import { ImageBuyNowCta } from "@/components/product/image-buy-now-cta";
import { heroRotatingItems, homeHeroSlides } from "@/config/home-hero";
import { getProductBySlug } from "@/config/products";
import { formatMad } from "@/lib/currency";

const trustPoints = ["الدفع عند الاستلام", "توصيل لجميع مدن المغرب", "تأكيد الطلب بالهاتف"];

export function PremiumHomeHero() {
  const slide = homeHeroSlides[0];
  const product = getProductBySlug(slide.slug);
  const priceLabel = formatMad(slide.priceMad);
  const compareLabel = slide.compareAtPriceMad ? formatMad(slide.compareAtPriceMad) : null;

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-gradient-to-br from-brand-primary via-brand-dark to-[#0d4f4a] text-white">
      <div className="container relative grid items-center gap-5 py-6 sm:gap-8 sm:py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
        <div className="relative order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[1.75rem] bg-black shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:max-w-[480px] sm:rounded-[2rem] lg:max-w-[540px]">
            <div className="relative aspect-[3/2] w-full animate-hero-float">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority
                quality={95}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 540px"
                className="object-contain"
              />
            </div>
            {product ? <ImageBuyNowCta product={product} className="pt-3" /> : null}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-3 inline-flex rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-[10px] font-bold tracking-wide text-brand-gold sm:mb-4 sm:py-1.5 sm:text-xs">
            {slide.badge}
          </div>

          <HeroRotatingCopy items={heroRotatingItems} />

          <div className="mt-3 flex flex-wrap items-end gap-2.5 sm:mt-4 sm:gap-3">
            <p className="text-2xl font-black text-white sm:text-3xl md:text-4xl">{priceLabel}</p>
            {compareLabel ? (
              <p className="pb-0.5 text-sm font-bold text-white/50 line-through sm:text-base md:text-lg">
                {compareLabel}
              </p>
            ) : null}
          </div>
          {slide.priceNote ? (
            <p className="mt-1 text-sm font-bold text-brand-gold/90">{slide.priceNote}</p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-2.5">
            <Link
              href={`/products/${slide.slug}#order`}
              className="inline-flex min-h-10 flex-1 items-center justify-center rounded-2xl bg-gradient-to-l from-[#E8C872] via-brand-gold to-[#A8842E] px-4 py-2 text-sm font-black text-[#1a1208] shadow-[0_8px_30px_rgba(201,162,74,0.35)] transition hover:brightness-110 sm:min-h-11 sm:flex-none sm:px-5 sm:text-base"
            >
              {`اطلب الآن — ${priceLabel}`}
            </Link>
            <Link
              href={`/products/${slide.slug}`}
              className="inline-flex min-h-10 flex-1 items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10 sm:min-h-11 sm:flex-none sm:px-5 sm:text-base"
            >
              شوف التفاصيل
            </Link>
          </div>

          <ul className="mt-4 flex flex-col gap-2 text-[11px] text-white/70 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2 sm:text-xs md:text-sm">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-1.5 sm:gap-2">
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-gold/20 text-brand-gold">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-l from-transparent via-white/25 to-transparent" />
    </section>
  );
}
