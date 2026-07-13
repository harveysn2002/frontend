import { ImageBuyNowCta } from "@/components/product/image-buy-now-cta";
import type { Product } from "@/config/products";

export function ProductTrustVideo({
  src,
  poster,
  product,
  compact = false,
}: {
  src: string;
  poster?: string;
  product?: Product;
  compact?: boolean;
}) {
  const video = (
    <div className="mx-auto w-full max-w-[280px]">
      <div className="overflow-hidden rounded-2xl bg-black shadow-soft">
        <video
          className="h-auto w-full"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          muted
        />
      </div>
      {product ? <ImageBuyNowCta product={product} /> : null}
    </div>
  );

  if (compact) {
    return (
      <div className="rounded-2xl bg-white/60 p-3 shadow-sm">
        <p className="mb-2 text-center text-sm font-black text-brand-ink">
          شوف المنتج فالحقيقة
        </p>
        {video}
      </div>
    );
  }

  return (
    <section className="container py-8 md:py-12">
      <h2 className="mb-4 text-center text-2xl font-black sm:text-3xl">
        شوف المنتج فالحقيقة
      </h2>
      {video}
    </section>
  );
}
