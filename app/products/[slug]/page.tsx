import { notFound } from "next/navigation";
import { MoroccoTrustMini, OrderStepsStrip } from "@/components/product/morocco-trust-strip";
import { ProductSocialProof } from "@/components/product/product-social-proof";
import { StoreSocialStats } from "@/components/trust/store-social-stats";
import { TrustPillarsSection } from "@/components/trust/trust-pillars-section";
import { socialProofPlaceholderNote, getActiveSocialProof } from "@/config/social-proof";
import { productFaqs } from "@/config/trust";
import { ProductPainCards } from "@/components/product/product-pain-cards";
import { ProductCard } from "@/components/product/product-card";
import { ProductPageCta } from "@/components/product/product-page-cta";
import { ProductImageCarousel } from "@/components/product/product-image-carousel";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductStoryBanner } from "@/components/product/product-story-banners";
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

  const socialProof = getActiveSocialProof();

  return (
    <div className="pb-24 md:pb-0">
      <section className="container grid gap-8 py-10 lg:grid-cols-[1fr_1.05fr]">
        <div className="grid gap-4">
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
          <ProductSocialProof />
        </div>
        <ProductPurchasePanel product={product} />
      </section>

      <section className="container pb-6">
        <h2 className="mb-5 text-2xl font-black">كيفاش كيطلب من VORLAY؟</h2>
        <OrderStepsStrip />
        <div className="mt-6">
          <MoroccoTrustMini />
        </div>
      </section>

      <TrustPillarsSection />

      {story[0] ? (
        <ProductStoryBanner
          src={story[0]}
          alt={`${product.nameAr} — راحة فكل رحلة`}
          product={product}
        />
      ) : null}

      <section className="container py-10 md:py-14">
        <h2 className="text-4xl font-black">كيفاش كيعاون؟</h2>
        <p className="mt-5 max-w-3xl text-lg leading-9 text-brand-muted">{product.mechanism}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {product.benefits.map((benefit) => (
            <div key={benefit} className="rounded-2xl bg-white p-4 font-semibold shadow-sm">
              {benefit}
            </div>
          ))}
        </div>
      </section>

      {story[1] ? (
        <ProductStoryBanner
          src={story[1]}
          alt={`${product.nameAr} — الراحة اللي كتستحقها`}
          product={product}
        />
      ) : null}

      <section className="bg-brand-primary py-12 text-white sm:py-14">
        <div className="container">
          <h2 className="text-2xl font-black sm:text-3xl">علاش VORLAY فالمغرب؟</h2>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-white/85 sm:text-base">
            {socialProof
              ? "أرقام وتقييمات من طلبات حقيقية — ثقة مبنية على تجربة زبناء فالمغرب."
              : `VORLAY كتبني ثقة حقيقية: ${socialProofPlaceholderNote}`}
          </p>
          <StoreSocialStats variant="dark" className="mt-6" />
        </div>
      </section>

      {story[2] ? (
        <ProductStoryBanner
          src={story[2]}
          alt={`${product.nameAr} — الفرق من أول لمسة`}
          product={product}
        />
      ) : null}

      <section className="container py-16">
        <h2 className="text-4xl font-black">كمل التجربة</h2>
        <p className="mt-3 text-brand-muted">زيد منتجات أخرى للسلّة باش تكمل الراحة ديالك</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {crossSells.map((item) => item && <ProductCard key={item.id} product={item} />)}
        </div>
      </section>

      <section className="container pb-20">
        <div className="rounded-[3rem] bg-white p-8 shadow-soft">
          <h2 className="text-3xl font-black">أسئلة مهمة</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {productFaqs.map(({ q, a }) => (
              <div key={q} className="rounded-2xl bg-brand-ivory p-5">
                <h3 className="font-black">{q}</h3>
                <p className="mt-2 text-sm leading-7 text-brand-muted">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-24 md:pb-20">
        <ProductPageCta
          product={product}
          title="باغي تجرب VORLAY دابا؟"
          subtitle="اختار العرض اللي مناسب ليك، زيد للسلّة، وكمل الطلب بالدفع عند الاستلام."
        />
      </section>
    </div>
  );
}
