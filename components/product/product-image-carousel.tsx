"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function ProductImageCarousel({
  images,
  alt,
  imageFit = "cover",
}: {
  images: string[];
  alt: string;
  imageFit?: "cover" | "contain";
}) {
  const [index, setIndex] = useState(0);
  const contain = imageFit === "contain";
  const mainFit = contain ? "object-contain" : "object-cover";
  const thumbFit = contain ? "object-contain p-0.5" : "object-cover";
  const surface = contain ? "bg-brand-ivory" : "bg-brand-soft";

  function go(step: number) {
    setIndex((current) => (current + step + images.length) % images.length);
  }

  if (images.length === 0) return null;

  return (
    <div className="grid gap-3">
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft sm:aspect-square sm:rounded-[2.5rem]",
          surface,
        )}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          (event.currentTarget as HTMLElement).dataset.touchX = String(touch.clientX);
        }}
        onTouchEnd={(event) => {
          const startX = Number((event.currentTarget as HTMLElement).dataset.touchX);
          const endX = event.changedTouches[0].clientX;
          const delta = endX - startX;
          if (Math.abs(delta) < 40) return;
          go(delta > 0 ? -1 : 1);
        }}
      >
        <Image
          key={images[index]}
          src={images[index]}
          alt={alt}
          fill
          priority={index === 0}
          quality={95}
          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px"
          className={cn(mainFit, "transition-opacity duration-300")}
        />

        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="الصورة السابقة"
              onClick={() => go(-1)}
              className="absolute end-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-brand-primary/10 bg-white/95 text-brand-ink shadow-sm transition hover:bg-white sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="الصورة التالية"
              onClick={() => go(1)}
              className="absolute start-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-brand-primary/10 bg-white/95 text-brand-ink shadow-sm transition hover:bg-white sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5 sm:bottom-4 sm:gap-2">
              {images.map((image, dotIndex) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`صورة ${dotIndex + 1}`}
                  onClick={() => setIndex(dotIndex)}
                  className={cn(
                    "h-2 rounded-full transition",
                    dotIndex === index ? "w-6 bg-brand-primary sm:w-7" : "w-2 bg-white/80",
                  )}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((image, thumbIndex) => (
            <button
              key={image}
              type="button"
              aria-label={`عرض صورة ${thumbIndex + 1}`}
              onClick={() => setIndex(thumbIndex)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl border-2 transition sm:rounded-2xl",
                surface,
                thumbIndex === index
                  ? "border-brand-primary ring-2 ring-brand-soft sm:ring-4"
                  : "border-transparent opacity-80 hover:opacity-100",
              )}
            >
              <Image src={image} alt="" fill quality={85} sizes="120px" className={thumbFit} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
