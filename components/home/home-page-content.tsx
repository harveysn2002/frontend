"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { PremiumHomeHero } from "@/components/home/premium-home-hero";
import { ProductCard } from "@/components/product/product-card";
import { TrustPillarsSection } from "@/components/trust/trust-pillars-section";
import { getListedProducts } from "@/config/products";
import { useInView } from "@/hooks/use-in-view";

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

      <section className="bg-white py-10 sm:py-14">
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

      <section className="container py-10 sm:py-14">
        <AnimatedBlock>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-black">اختار المنتج المناسب</h2>
              <p className="mt-3 text-brand-muted">حلول واضحة للجلوس، الحركة، والراحة اليومية.</p>
            </div>
            <Link href="/collections" className="hidden font-black text-brand-primary md:block">
              شاهد المجموعة
            </Link>
          </div>
        </AnimatedBlock>
        <div className="grid gap-6 md:grid-cols-3">
          {getListedProducts().map((product, index) => (
            <AnimatedBlock key={product.id} delay={index * 0.08}>
              <ProductCard product={product} />
            </AnimatedBlock>
          ))}
        </div>
      </section>

      <TrustPillarsSection variant="dark" />
    </>
  );
}
