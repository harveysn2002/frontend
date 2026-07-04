import Image from "next/image";
import { cn } from "@/lib/cn";

/** Single story image between text sections (namabeauty-style). */
export function ProductStoryBanner({
  src,
  alt,
  /** When false, no outer container — use inside an existing container column */
  contained = true,
}: {
  src: string;
  alt: string;
  contained?: boolean;
}) {
  const image = (
    <div className="overflow-hidden rounded-2xl bg-white shadow-soft sm:rounded-[1.75rem]">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        quality={95}
        sizes="(max-width: 1280px) 100vw, 1200px"
        className="h-auto w-full object-contain"
      />
    </div>
  );

  if (!contained) return image;

  return <div className="container py-8 md:py-12">{image}</div>;
}
