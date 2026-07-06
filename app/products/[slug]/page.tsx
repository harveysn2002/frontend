import { notFound } from "next/navigation";
import { MoroccoTrustMini, OrderStepsStrip } from "@/components/product/morocco-trust-strip";
import { StoreSocialStats } from "@/components/trust/store-social-stats";
import { socialProofPlaceholderNote, getActiveSocialProof } from "@/config/social-proof";
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

      <section className="bg-brand-primary py-16 text-white">
        <div className="container">
          <h2 className="text-4xl font-black">علاش VORLAY فالمغرب؟</h2>
          <p className="mt-4 max-w-3xl text-lg leading-9 text-white/85">
            {socialProof
              ? "أرقام وتقييمات من طلبات حقيقية — ثقة مبنية على تجربة زبناء فالمغرب."
              : `VORLAY كتبني ثقة حقيقية: ${socialProofPlaceholderNote}`}
          </p>
          <StoreSocialStats variant="dark" className="mt-6" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "منتجات دعم الظهر للاستعمال اليومي",
              "توصيل لجميع مدن المغرب",
              "الدفع عند الاستلام فقط",
              "تأكيد الطلب قبل الإرسال",
              "تأكيد الطلب بالهاتف قبل الإرسال",
              "شفافية كاملة فالأسعار والتوصيل",
            ].map((point) => (
              <div key={point} className="rounded-[2rem] bg-white/10 p-6">
                <p className="leading-8">{point}</p>
              </div>
            ))}
          </div>
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
            {[
              ["واش كيعالج آلام الظهر؟", "لا. هو منتج دعم وراحة يومية وليس بديلاً عن الطبيب."],
              ["واش الأداء عند الاستلام؟", "نعم، كتخلص حتى توصلك السلعة."],
              ["كيفاش كيتأكد الطلب؟", "الفريق كيتاصل بك بالهاتف قبل الإرسال."],
              ["واش كاين تبديل؟", "التبديل حسب الشروط الموضحة فصفحة التوصيل والاستبدال."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-2xl bg-brand-ivory p-5">
                <h3 className="font-black">{q}</h3>
                <p className="mt-2 text-brand-muted">{a}</p>
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
