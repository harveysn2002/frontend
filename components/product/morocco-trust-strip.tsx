"use client";

import type { LucideIcon } from "lucide-react";
import { ShieldCheck, PhoneCall, Truck, BadgeCheck } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { ProductSocialProof } from "@/components/product/product-social-proof";

const items: Array<{
  icon: LucideIcon;
  title: string;
  text: string;
  floatDelay: string;
}> = [
  {
    icon: ShieldCheck,
    title: "الدفع عند الاستلام",
    text: "ما كتخلص حتى توصلك السلعة",
    floatDelay: "0s",
  },
  {
    icon: PhoneCall,
    title: "تأكيد بالهاتف",
    text: "فريق VORLAY كيتاصل بك قبل الإرسال",
    floatDelay: "0.4s",
  },
  {
    icon: Truck,
    title: "توصيل للمغرب",
    text: "لجميع المدن مع متابعة الطلب",
    floatDelay: "0.8s",
  },
  {
    icon: BadgeCheck,
    title: "علامة موثوقة",
    text: "تجربة واضحة بلا ادعاءات وهمية",
    floatDelay: "1.2s",
  },
];

type MoroccoTrustStripProps = {
  compact?: boolean;
  showSocialProof?: boolean;
};

export function MoroccoTrustStrip({ compact = false, showSocialProof = false }: MoroccoTrustStripProps) {
  const { ref, visible } = useInView<HTMLDivElement>(0.12);

  return (
    <div ref={ref} className="grid gap-4">
      <div
        className={
          compact
            ? "grid grid-cols-2 gap-3"
            : "grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        }
      >
        {items.map(({ icon: Icon, title, text, floatDelay }, index) => (
          <div
            key={title}
            className={`group flex items-start gap-3 rounded-2xl border border-brand-primary/10 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/25 hover:shadow-md ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              animation: visible ? `slide-up 0.55s ease-out ${index * 0.08}s forwards` : undefined,
            }}
          >
            <div className="relative shrink-0">
              <span
                className="absolute inset-0 rounded-full bg-brand-primary/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div
                className={`relative grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-brand-primary ${
                  visible ? "animate-pop-in" : ""
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <Icon
                  className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                    visible ? "animate-float" : ""
                  }`}
                  style={{ animationDelay: floatDelay }}
                />
              </div>
            </div>
            <div>
              <p className="font-black text-brand-ink">{title}</p>
              <p className="mt-1 text-sm leading-6 text-brand-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>

      {showSocialProof && <ProductSocialProof />}
    </div>
  );
}

export function OrderStepsStrip() {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);
  const steps = [
    "اختار العرض",
    "زيد للسلّة",
    "أكد الاسم والهاتف",
    "الدفع عند الاستلام",
  ];

  return (
    <div ref={ref} className="grid gap-3 md:grid-cols-4">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`rounded-2xl bg-brand-primary/8 px-4 py-5 text-center transition-transform duration-300 hover:-translate-y-1 ${
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
          <p className="font-black text-brand-ink">{step}</p>
        </div>
      ))}
    </div>
  );
}
