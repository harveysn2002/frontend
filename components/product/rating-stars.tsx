import { ShieldCheck, PhoneCall, Truck } from "lucide-react";

export function RatingStars() {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-brand-muted sm:text-xs">
      <span className="inline-flex items-center gap-1">
        <ShieldCheck className="h-3.5 w-3.5 text-brand-primary" />
        الدفع عند الاستلام
      </span>
      <span className="text-brand-primary/30">·</span>
      <span className="inline-flex items-center gap-1">
        <PhoneCall className="h-3.5 w-3.5 text-brand-primary" />
        تأكيد بالهاتف
      </span>
      <span className="text-brand-primary/30">·</span>
      <span className="inline-flex items-center gap-1">
        <Truck className="h-3.5 w-3.5 text-brand-primary" />
        توصيل شامل
      </span>
    </div>
  );
}
