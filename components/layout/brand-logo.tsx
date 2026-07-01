import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

const LOGO_SRC = "/images/logos/vorlay-wordmark-header.png";
const LOGO_WIDTH = 1013;
const LOGO_HEIGHT = 170;

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
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority
        className={cn(
          "h-auto w-auto transition group-hover:opacity-90",
          compact ? "max-h-11 min-w-[180px]" : "min-w-[200px] max-h-12 sm:max-h-[3.25rem] md:max-h-14",
        )}
      />
    </Link>
  );
}
