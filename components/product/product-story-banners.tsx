import Image from "next/image";

/** Single full-width story image between text sections (namabeauty-style). */
export function ProductStoryBanner({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="container py-8 md:py-12">
      <div className="overflow-hidden rounded-2xl bg-white shadow-soft sm:rounded-[1.75rem]">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          quality={92}
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="h-auto w-full object-contain"
        />
      </div>
    </div>
  );
}
