"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { TrustTicker } from "@/components/layout/trust-ticker";
import { Button } from "@/components/ui/button";
import { products } from "@/config/products";
import { useInView } from "@/hooks/use-in-view";

const trust = ["الدفع عند الاستلام", "تأكيد الطلب بالهاتف", "توصيل لجميع مدن المغرب"];
const pains = ["الوقوف الطويل", "الجلوس بزاف", "خدمة الدار والحركة"];

function AnimatedBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.12);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        animation: visible ? `slide-up 0.55s ease-out ${delay}s forwards` : undefined,
        opacity: visible ? undefined : 0,
      }}
    >
      {children}
    </div>
  );
}

export function HomePageContent() {
  return (
    <>
      <section className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <AnimatedBlock>
            <div className="mb-4 inline-flex animate-pop-in rounded-full bg-brand-soft px-4 py-2 text-sm font-black text-brand-primary">
              عروض إطلاق VORLAY متاحة اليوم
            </div>
          </AnimatedBlock>
          <AnimatedBlock delay={0.05}>
            <h1 className="text-5xl font-black leading-tight text-brand-ink md:text-6xl">
              راحة لظهرك... وثقة فوقفتك
            </h1>
          </AnimatedBlock>
          <AnimatedBlock delay={0.1}>
            <p className="mt-6 text-xl leading-9 text-brand-muted">
              منتجات دعم الظهر من VORLAY مختارة لكل شخص كيقضي نهارو بين الخدمة،
              الجلوس، السياقة، والحركة، وكيحتاج حل عملي يرافقه فنهاره.
            </p>
          </AnimatedBlock>
          <AnimatedBlock delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/collections">
                <Button className="text-lg transition-transform hover:scale-[1.02]">اكتشف المجموعة</Button>
              </Link>
              <Link href="/products/taqm-dahr">
                <Button variant="secondary" className="text-lg transition-transform hover:scale-[1.02]">
                  شوف أفضل عرض
                </Button>
              </Link>
            </div>
          </AnimatedBlock>
          <AnimatedBlock delay={0.2} className="mt-8">
            <TrustTicker />
          </AnimatedBlock>
        </div>
        <AnimatedBlock delay={0.1} className="relative aspect-square overflow-hidden rounded-[3rem] bg-brand-soft shadow-soft">
          <Image
            src="/api/placeholder?label=VORLAY%20Hero"
            alt="VORLAY hero"
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
        </AnimatedBlock>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <AnimatedBlock>
            <div className="max-w-3xl">
              <h2 className="text-4xl font-black">كتوصل لآخر النهار وظهرك عيان؟</h2>
              <p className="mt-4 text-lg leading-8 text-brand-muted">
                الجلسة الطويلة، الخدمة فالدار، والسياقة كيتجمعو على ظهرك. VORLAY
                كتقدم حلول دعم يومية باش تحس براحة أكثر بلا وعود طبية مبالغ فيها.
              </p>
            </div>
          </AnimatedBlock>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pains.map((item, index) => (
              <AnimatedBlock key={item} delay={index * 0.08}>
                <div className="rounded-[2rem] bg-brand-ivory p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm">
                  <h3 className="text-xl font-black">{item}</h3>
                  <p className="mt-2 text-brand-muted">دعم بسيط يقدر يبدل إحساسك خلال اليوم.</p>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <AnimatedBlock>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-black">اختار المنتج المناسب</h2>
              <p className="mt-3 text-brand-muted">ثلاث حلول واضحة للجلوس، الحركة، أو أفضل قيمة.</p>
            </div>
            <Link href="/collections" className="hidden font-black text-brand-primary md:block">
              شاهد المجموعة
            </Link>
          </div>
        </AnimatedBlock>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product, index) => (
            <AnimatedBlock key={product.id} delay={index * 0.08}>
              <ProductCard product={product} />
            </AnimatedBlock>
          ))}
        </div>
      </section>

      <section className="bg-brand-primary py-16 text-white">
        <div className="container grid gap-8 md:grid-cols-3">
          {trust.map((item, index) => (
            <AnimatedBlock key={item} delay={index * 0.1}>
              <div className="rounded-[2rem] bg-white/10 p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="text-3xl font-black">{item}</div>
                <p className="mt-3 text-white/80">
                  VORLAY ما كتعرضش أرقام أو تقييمات حتى تكون مبنية على طلبات حقيقية.
                </p>
              </div>
            </AnimatedBlock>
          ))}
        </div>
      </section>
    </>
  );
}
