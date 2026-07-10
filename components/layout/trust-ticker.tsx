import { trustTickerItems } from "@/config/trust";

export function TrustTicker({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full bg-gradient-to-l from-[#1a2e2a] to-[#1f3832] py-3 sm:py-3.5 ${className}`}
    >
      <div className="container flex items-center justify-between gap-2 overflow-x-auto sm:gap-4">
        {trustTickerItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#c9a44e]/30 bg-[#c9a44e]/15 sm:h-9 sm:w-9">
                <Icon className="h-4 w-4 text-[#c9a44e] sm:h-[18px] sm:w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="whitespace-nowrap text-[11px] font-bold leading-tight text-[#c9a44e] sm:text-xs">
                  {item.label}
                </p>
                <p className="whitespace-nowrap text-[9px] leading-tight text-white/60 sm:text-[10px]">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
