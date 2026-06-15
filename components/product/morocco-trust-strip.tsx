import { ShieldCheck, PhoneCall, Truck, BadgeCheck } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "الدفع عند الاستلام",
    text: "ما كتخلص حتى توصلك السلعة",
  },
  {
    icon: PhoneCall,
    title: "تأكيد بالهاتف",
    text: "فريق VORLAY كيتاصل بك قبل الإرسال",
  },
  {
    icon: Truck,
    title: "توصيل للمغرب",
    text: "لجميع المدن مع متابعة الطلب",
  },
  {
    icon: BadgeCheck,
    title: "علامة موثوقة",
    text: "تجربة واضحة بلا ادعاءات وهمية",
  },
];

export function MoroccoTrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "grid grid-cols-2 gap-3"
          : "grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      }
    >
      {items.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="flex items-start gap-3 rounded-2xl border border-brand-primary/10 bg-white p-4 shadow-sm"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-black text-brand-ink">{title}</p>
            <p className="mt-1 text-sm leading-6 text-brand-muted">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrderStepsStrip() {
  const steps = [
    "اختار العرض",
    "زيد للسلّة",
    "أكد الاسم والهاتف",
    "الدفع عند الاستلام",
  ];

  return (
    <div className="grid gap-3 md:grid-cols-4">
      {steps.map((step, index) => (
        <div
          key={step}
          className="rounded-2xl bg-brand-primary/8 px-4 py-5 text-center"
        >
          <div className="mx-auto mb-2 grid h-8 w-8 place-items-center rounded-full bg-brand-primary text-sm font-black text-white">
            {index + 1}
          </div>
          <p className="font-black text-brand-ink">{step}</p>
        </div>
      ))}
    </div>
  );
}
