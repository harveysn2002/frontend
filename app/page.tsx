import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/config/products";

const trust = ["الدفع عند الاستلام", "تأكيد الطلب بالهاتف", "توصيل لجميع مدن المغرب"];

export default function HomePage() {
  return (
    <>
      <section className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-brand-soft px-4 py-2 text-sm font-black text-brand-primary">
            عروض إطلاق VORLAY متاحة اليوم
          </div>
          <h1 className="text-5xl font-black leading-tight text-brand-ink md:text-6xl">
            راحة لظهرك... وثقة فوقفاتك
          </h1>
          <p className="mt-6 text-xl leading-9 text-brand-muted">
            منتجات دعم الظهر من VORLAY مختارة لكل شخص كيقضي نهارو بين الخدمة،
            الجلوس، السياقة، والحركة، وكيحتاج حل عملي يرافقه فنهاره.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/collections">
              <Button className="text-lg">اكتشف المجموعة</Button>
            </Link>
            <Link href="/products/taqm-dahr">
              <Button variant="secondary" className="text-lg">شوف أفضل عرض</Button>
            </Link>
          </div>
          <div className="mt-8 grid gap-3 text-sm font-bold text-brand-primary sm:grid-cols-3">
            {trust.map((item) => (
              <div key={item} className="rounded-2xl bg-white p-3 shadow-sm">{item}</div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-brand-soft shadow-soft">
          <Image
            src="/api/placeholder?label=VORLAY%20Hero"
            alt="VORLAY hero"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black">كتوصل لآخر النهار وظهرك عيان؟</h2>
            <p className="mt-4 text-lg leading-8 text-brand-muted">
              الجلسة الطويلة، الخدمة فالدار، والسياقة كيتجمعو على ظهرك. VORLAY
              كتقدم حلول دعم يومية باش تحس براحة أكثر بلا وعود طبية مبالغ فيها.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["الوقوف الطويل", "الجلوس بزاف", "خدمة الدار والحركة"].map((item) => (
              <div key={item} className="rounded-[2rem] bg-brand-ivory p-6">
                <h3 className="text-xl font-black">{item}</h3>
                <p className="mt-2 text-brand-muted">دعم بسيط يقدر يبدل إحساسك خلال اليوم.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-black">اختار المنتج المناسب</h2>
            <p className="mt-3 text-brand-muted">ثلاث حلول واضحة للجلوس، الحركة، أو أفضل قيمة.</p>
          </div>
          <Link href="/collections" className="hidden font-black text-brand-primary md:block">
            شاهد المجموعة
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-brand-primary py-16 text-white">
        <div className="container grid gap-8 md:grid-cols-3">
          {["طلب واضح بلا مبالغة", "الدفع عند الاستلام", "توصيل لجميع مدن المغرب"].map((item) => (
            <div key={item} className="rounded-[2rem] bg-white/10 p-6">
              <div className="text-3xl font-black">{item}</div>
              <p className="mt-3 text-white/80">
                VORLAY ما كتعرضش أرقام أو تقييمات حتى تكون مبنية على طلبات حقيقية.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}