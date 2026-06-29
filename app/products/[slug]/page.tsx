import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MoroccoTrustStrip, OrderStepsStrip } from "@/components/product/morocco-trust-strip";
import { ProductCard } from "@/components/product/product-card";
import { ProductPageCta } from "@/components/product/product-page-cta";
import { ProductImageCarousel } from "@/components/product/product-image-carousel";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { getProductById, getProductBySlug, products } from "@/config/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
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
  const detailFit = product.heroImageFit === "contain" ? "object-contain" : "object-cover";

  const crossSells = product.crossSellIds
    .map((id) => getProductById(id))
    .filter(Boolean)
    .slice(0, 2);

  return (
    <div className="pb-24 md:pb-0">
      <section className="container grid gap-8 py-10 lg:grid-cols-[1fr_1.05fr]">
        <div className="grid gap-4">
          <ProductImageCarousel images={product.images} alt={product.nameAr} imageFit={heroFit} />
          <MoroccoTrustStrip compact showSocialProof />
        </div>
        <ProductPurchasePanel product={product} />
      </section>

      <section className="container pb-10">
        <h2 className="mb-5 text-2xl font-black">كيفاش كيطلب من VORLAY؟</h2>
        <OrderStepsStrip />
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <h2 className="text-4xl font-black">واش هاد الشي كيبان مألوف؟</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {product.pains.map((pain) => (
              <div key={pain} className="rounded-[2rem] bg-brand-ivory p-6">
                <h3 className="text-xl font-black">{pain}</h3>
                <p className="mt-3 text-brand-muted">
                  VORLAY كتقترح دعم يومي مريح، بدون وعود علاجية أو مبالغة.
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ProductPageCta
              product={product}
              title="باغي تجرب VORLAY دابا؟"
              subtitle="اختار العرض اللي مناسب ليك، زيد للسلّة، وكمل الطلب فـ 30 ثانية بالدفع عند الاستلام."
            />
          </div>
        </div>
      </section>

      <section className="container grid items-center gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-black">كيفاش كيعاون؟</h2>
          <p className="mt-5 text-lg leading-9 text-brand-muted">{product.mechanism}</p>
          <div className="mt-6 grid gap-3">
            {product.benefits.map((benefit) => (
              <div key={benefit} className="rounded-2xl bg-white p-4 font-semibold shadow-sm">
                {benefit}
              </div>
            ))}
          </div>
        </div>
        <div className={`relative aspect-[4/3] overflow-hidden rounded-[3rem] shadow-soft ${product.heroImageFit === "contain" ? "bg-brand-ivory" : "bg-brand-soft"}`}>
          <Image src={product.images[1] ?? product.images[0]} alt={product.nameAr} fill className={detailFit} />
        </div>
      </section>

      <section className="bg-brand-primary py-16 text-white">
        <div className="container">
          <h2 className="text-4xl font-black">علاش VORLAY فالمغرب؟</h2>
          <p className="mt-4 max-w-3xl text-lg leading-9 text-white/85">
            VORLAY كتبني ثقة حقيقية: تجربة طلب واضحة، دعم قبل البيع، وتأكيد بالهاتف قبل
            ما تخرج أي شحنة. بلا تقييمات وهمية وبلا أرقام مخترعة.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "منتجات دعم الظهر للاستعمال اليومي",
              "توصيل لجميع مدن المغرب",
              "الدفع عند الاستلام فقط",
              "تأكيد الطلب قبل الإرسال",
              "دعم WhatsApp قبل وبعد الطلب",
              "شفافية كاملة فالأسعار والتوصيل",
            ].map((point) => (
              <div key={point} className="rounded-[2rem] bg-white/10 p-6">
                <p className="leading-8">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-4xl font-black">كمل التجربة</h2>
        <p className="mt-3 text-brand-muted">زيد منتجات أخرى للسلّة باش تكمل الراحة ديالك</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {crossSells.map((item) => item && <ProductCard key={item.id} product={item} />)}
        </div>
      </section>

      <section className="container pb-10">
        <ProductPageCta
          product={product}
          title="جاهز تطلب؟"
          subtitle="زيد للسلّة ديالك دابا. ما كتخلص حتى توصلك السلعة."
        />
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
          <div className="mt-8">
            <Link
              href="#order"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-dark"
            >
              رجع للطلب و زيد للسلّة
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
