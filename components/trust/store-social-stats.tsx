import { Star, PackageCheck } from "lucide-react";
import { getActiveSocialProof } from "@/config/social-proof";
import { cn } from "@/lib/cn";

type StoreSocialStatsProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function StoreSocialStats({ variant = "light", className }: StoreSocialStatsProps) {
  const stats = getActiveSocialProof();
  if (!stats) return null;

  const isDark = variant === "dark";

  const items = [
    stats.ordersDelivered > 0
      ? {
          icon: PackageCheck,
          value: `${stats.ordersDelivered.toLocaleString("ar-MA")}+`,
          label: "طلب مؤكد",
        }
      : null,
    stats.reviewCount > 0 && stats.averageRating > 0
      ? {
          icon: Star,
          value: stats.averageRating.toFixed(1),
          label: `من ${stats.reviewCount.toLocaleString("ar-MA")} تقييم حقيقي`,
        }
      : null,
  ].filter(Boolean) as Array<{ icon: typeof Star; value: string; label: string }>;

  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "grid gap-3 sm:grid-cols-3",
        className,
      )}
    >
      {items.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className={cn(
            "flex items-center gap-3 rounded-2xl px-4 py-3",
            isDark ? "bg-white/10 text-white" : "border border-brand-primary/10 bg-brand-ivory text-brand-ink",
          )}
        >
          <div
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-full",
              isDark ? "bg-white/15 text-brand-gold" : "bg-brand-soft text-brand-primary",
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl font-black leading-none">{value}</p>
            <p className={cn("mt-1 text-xs leading-5", isDark ? "text-white/75" : "text-brand-muted")}>
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
