"use client";

import type { LucideIcon } from "lucide-react";
import { ShieldCheck, PhoneCall, Truck, BadgeCheck } from "lucide-react";
import { orderSteps } from "@/config/trust";
import { useInView } from "@/hooks/use-in-view";

const miniItems: Array<{ icon: LucideIcon; title: string }> = [
  { icon: ShieldCheck, title: "الدفع عند الاستلام" },
  { icon: PhoneCall, title: "تأكيد بالهاتف" },
  { icon: Truck, title: "توصيل للمغرب" },
  { icon: BadgeCheck, title: "تفتيش قبل الدفع" },
];

export function MoroccoTrustMini() {
  const { ref, visible } = useInView<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      className={`flex flex-wrap justify-center gap-2 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {miniItems.map(({ icon: Icon, title }, index) => (
        <span
          key={title}
          className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/10 bg-white px-3 py-1.5 text-[11px] font-bold text-brand-ink shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
          style={{
            animation: visible ? `pop-in 0.45s ease-out ${index * 0.06}s forwards` : undefined,
          }}
        >
          <Icon className="h-3.5 w-3.5 text-brand-primary" />
          {title}
        </span>
      ))}
    </div>
  );
}

export function OrderStepsStrip() {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);

  return (
    <div ref={ref} className="grid gap-3 md:grid-cols-4">
      {orderSteps.map((step, index) => (
        <div
          key={step.title}
          className={`rounded-2xl bg-brand-primary/8 px-4 py-4 text-center transition-transform duration-300 hover:-translate-y-1 sm:py-5 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            animation: visible ? `slide-up 0.5s ease-out ${index * 0.09}s forwards` : undefined,
          }}
        >
          <div
            className={`mx-auto mb-2 grid h-8 w-8 place-items-center rounded-full bg-brand-primary text-sm font-black text-white ${
              visible ? "animate-pop-in" : ""
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {index + 1}
          </div>
          <p className="font-black text-brand-ink">{step.title}</p>
          <p className="mt-1 text-xs leading-6 text-brand-muted">{step.text}</p>
        </div>
      ))}
    </div>
  );
}
