import { purchaseTrustBadges } from "@/config/trust";
import { hasWhatsApp } from "@/config/site";
import { BadgeCheck } from "lucide-react";

export function ProductTrustBadges({ compact = false }: { compact?: boolean }) {
  const items = hasWhatsApp
    ? [
        ...purchaseTrustBadges.slice(0, 4),
        {
          icon: BadgeCheck,
          title: "دعم واتساب",
          subtitle: "نجاوبو على أسئلتك قبل الطلب",
        },
      ]
    : purchaseTrustBadges.slice(0, 6);

  if (compact) {
    return (
      <div className="flex flex-wrap justify-center gap-1.5">
        {items.map(({ icon: Icon, title }) => (
          <span
            key={title}
            className="inline-flex items-center gap-1 rounded-full border border-brand-primary/10 bg-white px-2.5 py-1 text-[10px] font-bold text-brand-ink"
          >
            <Icon className="h-3 w-3 shrink-0 text-brand-primary" />
            {title}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
      {items.map(({ icon: Icon, title, subtitle }) => (
        <div
          key={title}
          className="rounded-xl border border-brand-primary/8 bg-white/80 px-2.5 py-2.5 sm:rounded-2xl sm:px-3 sm:py-3"
        >
          <div className="flex items-start gap-2">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-primary/10 text-brand-primary sm:h-8 sm:w-8">
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-black leading-5 text-brand-ink sm:text-xs">{title}</p>
              <p className="mt-0.5 text-[10px] leading-4 text-brand-muted sm:text-[11px]">{subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
