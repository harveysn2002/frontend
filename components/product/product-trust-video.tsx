import { ImageBuyNowCta } from "@/components/product/image-buy-now-cta";
import type { Product } from "@/config/products";

export function ProductTrustVideo({
  src,
  poster,
  product,
}: {
  src: string;
  poster?: string;
  product?: Product;
}) {
  return (
    <section className="container py-8 md:py-12">
      <div className="mx-auto max-w-[460px]">
        <h2 className="mb-4 text-center text-2xl font-black sm:text-3xl">
          شوف المنتج فالحقيقة
        </h2>
        <div className="overflow-hidden rounded-[1.75rem] bg-black shadow-soft">
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
    </section>
  );
}
