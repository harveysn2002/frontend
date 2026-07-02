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
      className={cn("group block min-w-0", className)}
      aria-label="VORLAY"
    >
      <span
        className={cn(
          "relative block w-full",
          compact
            ? "h-10 max-w-[11rem] sm:h-11 sm:max-w-[12rem]"
            : "h-11 max-w-[min(100%,13.5rem)] sm:h-[4rem] sm:max-w-[16rem] md:h-16 md:max-w-[21rem]",
        )}
      >
        <Image
          src={LOGO_SRC}
          alt="VORLAY"
          fill
          priority
          sizes="(max-width: 640px) 70vw, 320px"
          className="object-contain object-right transition group-hover:opacity-90"
        />
      </span>
    </Link>
  );
}
