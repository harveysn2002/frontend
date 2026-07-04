import Image from "next/image";

export function ProductStoryBanners({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  if (images.length === 0) return null;

  return (
    <section className="w-full" aria-label={alt}>
      {images.map((src, index) => (
        <div key={src} className="relative w-full overflow-hidden bg-brand-ink">
          <Image
            src={src}
            alt={`${alt} — ${index + 1}`}
            width={1600}
            height={900}
            quality={92}
            sizes="100vw"
            className="h-auto w-full object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </section>
  );
}
