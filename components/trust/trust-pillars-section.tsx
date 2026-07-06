import { trustPillars } from "@/config/trust";

export function TrustPillarsSection({
  variant = "light",
  title = "علاش تطلب من VORLAY بثقة؟",
  subtitle = "تجربة شراء واضحة — بلا دفع أونلاين، بلا مفاجآت.",
}: {
  variant?: "light" | "dark";
  title?: string;
  subtitle?: string;
}) {
  const dark = variant === "dark";

  return (
    <section className={dark ? "bg-brand-primary py-12 text-white sm:py-14" : "py-10 sm:py-12"}>
      <div className="container">
        <h2 className={`text-2xl font-black sm:text-3xl ${dark ? "text-white" : "text-brand-ink"}`}>
          {title}
        </h2>
        <p className={`mt-2 max-w-2xl text-sm sm:text-base ${dark ? "text-white/80" : "text-brand-muted"}`}>
          {subtitle}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustPillars.map(({ icon: Icon, title: pillarTitle, description }) => (
            <div
              key={pillarTitle}
              className={
                dark
                  ? "rounded-2xl bg-white/10 p-4 sm:p-5"
                  : "rounded-2xl border border-brand-primary/8 bg-white p-4 shadow-sm sm:p-5"
              }
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-xl ${
                  dark ? "bg-white/15 text-white" : "bg-brand-primary/10 text-brand-primary"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <h3 className={`mt-3 text-sm font-black sm:text-base ${dark ? "text-white" : "text-brand-ink"}`}>
                {pillarTitle}
              </h3>
              <p className={`mt-1.5 text-xs leading-6 sm:text-sm ${dark ? "text-white/75" : "text-brand-muted"}`}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
