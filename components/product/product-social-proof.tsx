"use client";

import { StoreSocialStats } from "@/components/trust/store-social-stats";
import { socialProofPoints } from "@/config/trust";
import { getActiveSocialProof } from "@/config/social-proof";
import { useInView } from "@/hooks/use-in-view";

export function ProductSocialProof() {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);
  const socialProof = getActiveSocialProof();

  return (
    <div
      ref={ref}
      className={`rounded-[1.75rem] border border-brand-primary/12 bg-white p-4 shadow-sm transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <p className="text-xs font-bold text-brand-muted">شنو كتستناك من VORLAY؟</p>
      <p className="mt-1 text-sm font-black text-brand-ink">
        {socialProof ? "أرقام من طلبات حقيقية" : "تجربة طلب واضحة — بلا مخاطرة"}
      </p>

      {socialProof ? <StoreSocialStats className="mt-3" /> : null}

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {socialProofPoints.map(({ icon: Icon, title, text }, index) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-2xl bg-brand-ivory/80 px-3 py-2.5"
            style={{
              animation: visible ? `slide-up 0.5s ease-out ${index * 0.06}s forwards` : undefined,
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
