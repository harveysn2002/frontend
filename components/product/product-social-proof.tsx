"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MapPin, Users } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const cities = [
  "الدار البيضاء",
  "الرباط",
  "مراكش",
  "طنجة",
  "فاس",
  "أكادير",
  "مكناس",
  "وجدة",
];

const quotes = [
  {
    text: "الطلب ساهل والفريق اتصل بيا قبل ما يصيفطو الطرد.",
    name: "سارة",
    city: "الرباط",
  },
  {
    text: "خدمتني فالطريق بزاف، والدفع عند الاستلام ريحني.",
    name: "يوسف",
    city: "الدار البيضاء",
  },
  {
    text: "التوصيل وصلني فالوقت وكلشي واضح من الأول.",
    name: "نورة",
    city: "مراكش",
  },
];

const stats = [
  { label: "15+ مدينة مغربية", icon: MapPin },
  { label: "تأكيد قبل الإرسال", icon: CheckCircle2 },
  { label: "زبناء راضيين", icon: Users },
];

export function ProductSocialProof() {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [cityIndex, setCityIndex] = useState(0);

  useEffect(() => {
    const quoteTimer = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes.length);
    }, 4500);
    const cityTimer = window.setInterval(() => {
      setCityIndex((current) => (current + 1) % cities.length);
    }, 2800);
    return () => {
      window.clearInterval(quoteTimer);
      window.clearInterval(cityTimer);
    };
  }, []);

  const quote = quotes[quoteIndex];

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-[1.75rem] border border-brand-primary/12 bg-gradient-to-br from-white via-brand-ivory to-brand-soft/40 p-4 shadow-sm transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-primary/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-500" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <p className="text-sm font-black text-brand-ink">طلبات نشطة من المغرب</p>
        </div>
        <div className="overflow-hidden rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold text-brand-primary">
          <span key={cityIndex} className="inline-block animate-slide-up">
            آخر نشاط: {cities[cityIndex]}
          </span>
        </div>
      </div>

      <div className="mt-3 min-h-[4.5rem]">
        <p
          key={quoteIndex}
          className="animate-slide-up text-sm leading-7 text-brand-muted"
          style={{ animationDuration: "0.45s" }}
        >
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="mt-2 text-xs font-bold text-brand-primary">
          {quote.name} · {quote.city}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {stats.map(({ label, icon: Icon }, index) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 rounded-2xl bg-white/80 px-2 py-2.5 text-center"
            style={{
              animation: visible ? `slide-up 0.55s ease-out ${index * 0.1 + 0.15}s forwards` : undefined,
              opacity: visible ? undefined : 0,
            }}
          >
            <Icon className="h-4 w-4 text-brand-primary" />
            <span className="text-[11px] font-bold leading-5 text-brand-ink">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
