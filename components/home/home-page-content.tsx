"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { PremiumHomeHero } from "@/components/home/premium-home-hero";
import { ProductCard } from "@/components/product/product-card";
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
      <PremiumHomeHero />

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
