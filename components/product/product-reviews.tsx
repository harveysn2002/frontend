"use client";

import { useState } from "react";
import { Star, ThumbsUp, BadgeCheck } from "lucide-react";
import type { ProductReview, ProductReviewSummary } from "@/config/reviews";

const AVATAR_COLORS = [
  "bg-amber-500",
  "bg-rose-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-orange-500",
  "bg-teal-500",
];

function initialOf(name: string) {
  const first = name.trim().charAt(0);
  return first ? first.toUpperCase() : "؟";
}

function colorOf(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i += 1) sum += name.charCodeAt(i);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} من 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-none text-brand-primary/20"
          }`}
        />
      ))}
    </span>
  );
}

function ReviewRow({ review }: { review: ProductReview }) {
  return (
    <div className="flex gap-3 border-b border-brand-primary/10 py-4 last:border-none">
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black text-white ${colorOf(
          review.name,
        )}`}
        aria-hidden
      >
        {initialOf(review.name)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-black text-brand-ink">{review.name}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
            <BadgeCheck className="h-3 w-3" />
            شراء مؤكد
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Stars rating={review.rating} />
          {review.variant ? (
            <span className="text-[11px] font-semibold text-brand-muted">{review.variant}</span>
          ) : null}
          <span className="text-[11px] text-brand-muted">· {review.date}</span>
        </div>
        {review.text ? (
          <p className="mt-2 text-sm leading-7 text-brand-ink/90">{review.text}</p>
        ) : null}
        {review.helpful ? (
          <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-muted">
            <ThumbsUp className="h-3 w-3" />
            مفيد ({review.helpful})
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function ProductReviews({ summary }: { summary: ProductReviewSummary }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? summary.reviews : summary.reviews.slice(0, 5);

  return (
    <section className="container py-6 sm:py-8">
      <div className="rounded-2xl bg-white p-5 shadow-soft sm:rounded-3xl sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black sm:text-2xl">آراء الناس</h2>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-brand-ink sm:text-3xl">
              {summary.average.toFixed(1)}
            </span>
            <div>
              <Stars rating={summary.average} />
              <p className="mt-0.5 text-[11px] font-semibold text-brand-muted">
                من {summary.count} تقييم
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          {visible.map((review, index) => (
            <ReviewRow key={`${review.name}-${index}`} review={review} />
          ))}
        </div>

        {summary.reviews.length > 5 ? (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="mt-4 w-full rounded-full border border-brand-primary/20 px-4 py-2.5 text-sm font-bold text-brand-primary transition hover:bg-brand-soft"
          >
            {showAll ? "عرض أقل" : `شوف باقي التقييمات (${summary.reviews.length - 5})`}
          </button>
        ) : null}
      </div>
    </section>
  );
}
