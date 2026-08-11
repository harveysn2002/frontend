import { notFound } from "next/navigation";
import { ProductPainCards } from "@/components/product/product-pain-cards";
import { ProductCard } from "@/components/product/product-card";
import { ProductImageCarousel } from "@/components/product/product-image-carousel";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductStoryBanner } from "@/components/product/product-story-banners";
import { ProductTrustVideo } from "@/components/product/product-trust-video";
import { ProductReviews } from "@/components/product/product-reviews";
import { nicheCopy } from "@/config/niche-copy";
import { getProductBySlug, getListedProductById, getListedProducts } from "@/config/products";
import { getProductReviews } from "@/config/reviews";
import { productFaqs } from "@/config/trust";

export function generateStaticParams() {
  return getListedProducts().map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  return {
    title: product ? `${product.nameAr} | VORLAY` : "VORLAY",
    description: product?.subheading,
  };
}

function storyAlt(index: number, nameAr: string) {
  const alts = nicheCopy.storyAlts;
  const ordered = [alts.first, alts.second, alts.third, alts.fourth];
  const suffix = ordered[index] ?? `صورة ${index + 1}`;
  return `${nameAr} — ${suffix}`;
}

function StoryList({
  images,
  startIndex,
  product,
}: {
  images: string[];
  startIndex: number;
  product: NonNullable<ReturnType<typeof getProductBySlug>>;
}) {
  return (
    <>
      {images.map((src, i) => (
        <ProductStoryBanner
          key={src}
          src={src}
          alt={storyAlt(startIndex + i, product.nameAr)}
          product={product}
        />
      ))}
    </>
  );
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const heroFit = product.heroImageFit === "contain" ? "contain" : "cover";
  const carouselFit =
    product.carouselImageFit === "contain"
      ? "contain"
      : product.carouselImageFit === "cover"
        ? "cover"
        : heroFit;
  const story = product.storyImages ?? [];
  const crossSells = product.crossSellIds
    .map((id) => getListedProductById(id))
    .filter(Boolean)
    .slice(0, 2);
  const keyFaqs = [
    productFaqs[0],
    nicheCopy.disclaimerFaq,
    ...productFaqs.slice(2, 4),
  ];
  const keyBenefits = product.benefits.slice(0, 4);
  const reviews = getProductReviews(product.id);
  const storyAlts = nicheCopy.storyAlts;

  // Spread every story image across the page (not capped at 2–3).
  const chunk = Math.max(1, Math.ceil(story.length / 4));
  const s1 = story.slice(0, chunk);
  const s2 = story.slice(chunk, chunk * 2);
  const s3 = story.slice(chunk * 2, chunk * 3);
  const s4 = story.slice(chunk * 3);

  return (
    <div className="pb-24 md:pb-0">
      <section className="container flex flex-col gap-6 py-6 sm:gap-8 sm:py-8 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <ProductImageCarousel
            images={product.images}
            alt={product.nameAr}
            imageFit={carouselFit}
            product={product}
          />
        </div>

        <div className="order-2 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ProductPurchasePanel product={product} />
        </div>

        <div className="order-3 grid gap-3 sm:gap-4 lg:col-start-1 lg:row-start-2">
          {product.trustVideo ? (
            <ProductTrustVideo
              src={product.trustVideo}
              poster={product.trustVideoPoster}
              aspect={product.trustVideoAspect}
              compact
            />
          ) : null}
          <ProductPainCards pains={product.pains} painResponses={product.painResponses} />
          {product.afterPainImage ? (
            <ProductStoryBanner
              src={product.afterPainImage}
              alt={`${product.nameAr} — ${storyAlts.afterPain}`}
              product={product}
              contained={false}
            />
          ) : null}
        </div>
      </section>

      <StoryList images={s1} startIndex={0} product={product} />

      <section className="container py-6 sm:py-8">
        <h2 className="text-2xl font-black sm:text-3xl">{nicheCopy.mechanismHeading}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-muted sm:text-base sm:leading-8">
          {product.mechanism}
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {keyBenefits.map((benefit) => (
            <li key={benefit} className="rounded-xl bg-white px-3 py-2.5 text-sm font-semibold shadow-sm">
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      <StoryList images={s2} startIndex={s1.length} product={product} />

      {reviews ? <ProductReviews summary={reviews} /> : null}

      <StoryList images={s3} startIndex={s1.length + s2.length} product={product} />

      {crossSells.length > 0 ? (
        <section className="container py-8 sm:py-10">
          <h2 className="text-2xl font-black">كمل التجربة</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {crossSells.map((item) => item && <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      ) : null}

      <StoryList
        images={s4}
        startIndex={s1.length + s2.length + s3.length}
        product={product}
      />

      <section className="container pb-16 sm:pb-20">
        <div className="rounded-2xl bg-white p-5 shadow-soft sm:rounded-3xl sm:p-6">
          <h2 className="text-xl font-black sm:text-2xl">أسئلة سريعة</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {keyFaqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl bg-brand-ivory px-3 py-3 sm:px-4">
                <h3 className="text-sm font-black">{q}</h3>
                <p className="mt-1 text-xs leading-6 text-brand-muted sm:text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
