import Image from "next/image";
import { ImageBuyNowCta } from "@/components/product/image-buy-now-cta";
import type { Product } from "@/config/products";

/** Single story image between text sections (namabeauty-style). */
export function ProductStoryBanner({
  src,
  alt,
  product,
  /** When false, no outer container — use inside an existing container column */
  contained = true,
}: {
  src: string;
  alt: string;
  product?: Product;
  contained?: boolean;
}) {
  const block = (
    <>
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
      {product ? <ImageBuyNowCta product={product} /> : null}
    </>
  );

  if (!contained) return block;

  return <div className="container py-8 md:py-12">{block}</div>;
}
