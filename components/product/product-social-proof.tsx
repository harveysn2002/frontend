"use client";

import { Clock, MessageCircle, PackageCheck, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useInView } from "@/hooks/use-in-view";

const proofPoints = [
  {
    icon: PackageCheck,
    title: "طلب واضح ومباشر",
    text: "تختار العرض، تدخل معلوماتك، وكتاخد رقم الطلب فالموقع.",
  },
  {
    icon: ShieldCheck,
    title: siteConfig.priceIncludesShippingNote,
    text: "ما كاينش مفاجآت فالثمن — التوصيل داخل السعر المعروض.",
  },
  {
    icon: Clock,
    title: "تأكيد قبل الإرسال",
    text: "فريق VORLAY كيتصل بك بالهاتف قبل ما تخرج أي شحنة.",
  },
  {
    icon: MessageCircle,
    title: "دعم حقيقي",
    text: `WhatsApp متاح ${siteConfig.supportHours}.`,
  },
];

export function ProductSocialProof() {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={`rounded-[1.75rem] border border-brand-primary/12 bg-white p-4 shadow-sm transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <p className="text-xs font-bold text-brand-muted">شنو كتستناك من VORLAY؟</p>
      <p className="mt-1 text-sm font-black text-brand-ink">معلومات حقيقية — بلا أرقام ولا تقييمات مخترعة</p>

      <div className="mt-3 grid gap-2">
        {proofPoints.map(({ icon: Icon, title, text }, index) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-2xl bg-brand-ivory/80 px-3 py-2.5"
            style={{
              animation: visible ? `slide-up 0.5s ease-out ${index * 0.08}s forwards` : undefined,
              opacity: visible ? undefined : 0,
            }}
          >
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-primary">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-black text-brand-ink">{title}</p>
              <p className="mt-0.5 text-xs leading-6 text-brand-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
