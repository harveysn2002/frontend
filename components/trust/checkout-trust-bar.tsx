import { checkoutTrustItems } from "@/config/trust";

export function CheckoutTrustBar({ showNote = true }: { showNote?: boolean }) {
  return (
    <div className="rounded-2xl border border-brand-primary/10 bg-brand-ivory/60 px-3 py-2.5">
      <div className="flex flex-wrap justify-center gap-2">
        {checkoutTrustItems.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-brand-ink shadow-sm"
          >
            <Icon className="h-3 w-3 text-brand-primary" />
            {label}
          </span>
        ))}
      </div>
      {showNote ? (
        <p className="mt-1.5 text-center text-[10px] leading-4 text-brand-muted">
          COD · تأكيد بالهاتف · توصيل شامل
        </p>
      ) : null}
    </div>
  );
}
