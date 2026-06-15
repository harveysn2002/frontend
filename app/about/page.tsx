import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "من نحن | VORLAY",
};

export default function AboutPage() {
  return (
    <div className="container py-14">
      <section className="glass-card rounded-[3rem] p-8 md:p-12">
        <h1 className="text-5xl font-black">VORLAY بدات من سؤال بسيط</h1>
        <p className="mt-6 max-w-3xl text-xl leading-9 text-brand-muted">
          علاش راحة الظهر اليومية ما تكونش أنيقة، عملية، ومطمئنة لكل دار مغربية؟
          VORLAY كتختار منتجات دعم واضحة فاستعمالها، وتقدم تجربة طلب بدفع عند
          الاستلام وتأكيد قبل الإرسال.
        </p>
      </section>
      <section className="mt-10 grid gap-5 md:grid-cols-4">
        {["الراحة قبل المبالغة", "وضوح قبل البيع", "تأكيد الطلب قبل الإرسال", "دعم بعد الشراء"].map((value) => (
          <div key={value} className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">{value}</h2>
            <p className="mt-3 text-brand-muted">وعد بسيط وواضح، بلا ادعاءات طبية كاذبة.</p>
          </div>
        ))}
      </section>
      <div className="mt-10">
        <Link href="/collections">
          <Button>شوف المجموعة</Button>
        </Link>
      </div>
    </div>
  );
}
