import { notFound } from "next/navigation";
import { ProductPainCards } from "@/components/product/product-pain-cards";
import { ProductCard } from "@/components/product/product-card";
import { ProductImageCarousel } from "@/components/product/product-image-carousel";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductStoryBanner } from "@/components/product/product-story-banners";
import { productFaqs } from "@/config/trust";
import { getProductBySlug, getListedProductById, getListedProducts } from "@/config/products";

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
  const keyFaqs = productFaqs.slice(0, 4);
  const keyBenefits = product.benefits.slice(0, 4);

  return (
    <div className="pb-24 md:pb-0">
      <section className="container grid gap-6 py-6 sm:gap-8 sm:py-8 lg:grid-cols-[1fr_1.05fr]">
        <div className="grid gap-3 sm:gap-4">
          <ProductImageCarousel
            images={product.images}
            alt={product.nameAr}
            imageFit={carouselFit}
            product={product}
          />
          <ProductPainCards pains={product.pains} painResponses={product.painResponses} />
          {product.afterPainImage ? (
            <ProductStoryBanner
              src={product.afterPainImage}
              alt={`${product.nameAr} — الفرق من أول لمسة`}
              product={product}
              contained={false}
            />
          ) : null}
        </div>
        <ProductPurchasePanel product={product} />
      </section>

      {story[0] ? (
        <ProductStoryBanner
          src={story[0]}
          alt={`${product.nameAr} — راحة فكل رحلة`}
          product={product}
        />
      ) : null}

      <section className="container py-6 sm:py-8">
        <h2 className="text-2xl font-black sm:text-3xl">كيفاش كيعاون؟</h2>
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

      {story[1] ? (
        <ProductStoryBanner
          src={story[1]}
          alt={`${product.nameAr} — الراحة اللي كتستحقها`}
          product={product}
        />
      ) : null}

      {crossSells.length > 0 ? (
        <section className="container py-8 sm:py-10">
          <h2 className="text-2xl font-black">كمل التجربة</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {crossSells.map((item) => item && <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      ) : null}

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
