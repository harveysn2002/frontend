import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

const LOGO_SRC = "/images/logos/vorlay-wordmark-header.png";

export function BrandLogo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex shrink-0 items-center", className)}
      aria-label="VORLAY"
    >
      <Image
        src={LOGO_SRC}
        alt="VORLAY"
        width={compact ? 132 : 168}
        height={compact ? 36 : 46}
        priority
        className={cn(
          "h-auto w-auto transition group-hover:opacity-90",
          compact ? "max-h-9" : "max-h-10 md:max-h-11",
        )}
      />
    </Link>
  );
}
