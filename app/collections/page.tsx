import { ProductCard } from "@/components/product/product-card";
import { products } from "@/config/products";

export const metadata = {
  title: "مجموعة VORLAY | منتجات دعم الظهر",
};

export default function CollectionsPage() {
  return (
    <div className="container py-14">
      <section className="glass-card rounded-[3rem] p-8 md:p-12">
        <h1 className="text-5xl font-black">مجموعة VORLAY لدعم راحة الظهر</h1>
        <p className="mt-5 max-w-3xl text-xl leading-9 text-brand-muted">
          اختار الحل اللي مناسب ليومك: دعم أثناء الحركة، راحة أثناء الجلوس، أو
          الطقم الكامل بأفضل قيمة.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <section className="mt-12 rounded-[3rem] bg-white p-8 shadow-soft">
        <h2 className="text-3xl font-black">كيفاش تختاري؟</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="rounded-[2rem] border border-brand-primary/10 p-5">
              <h3 className="text-xl font-black">{product.nameAr}</h3>
              <p className="mt-2 text-brand-muted">{product.cardSubheading}</p>
              <ul className="mt-4 space-y-2 text-sm text-brand-muted">
                {product.bestFor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
