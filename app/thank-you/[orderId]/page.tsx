import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "شكرا لك | VORLAY",
};

export default function ThankYouPage({
  params,
  searchParams,
}: {
  params: { orderId: string };
  searchParams: { order?: string };
}) {
  const orderNumber = searchParams.order || params.orderId;

  return (
    <div className="container py-14">
      <section className="glass-card rounded-[3rem] p-8 text-center md:p-12">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-primary text-3xl font-black text-white">
          ✓
        </div>
        <h1 className="mt-6 text-5xl font-black">شكرا لك، طلبك تسجل بنجاح</h1>
        <p className="mt-4 text-xl text-brand-muted">رقم الطلب: {orderNumber}</p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-brand-muted">
          فريق VORLAY غادي يتاصل بك قريباً لتأكيد الطلب والعنوان قبل الإرسال.
          خلي الهاتف قريب منك باش نسرعو التوصيل.
        </p>
        <div className="mt-8 grid gap-4 text-right md:grid-cols-4">
          {["تسجيل الطلب", "اتصال التأكيد", "تجهيز الطلب", "الدفع عند الاستلام"].map((step) => (
            <div key={step} className="rounded-2xl bg-white p-4 font-black shadow-sm">{step}</div>
          ))}
        </div>
        <Link href="/collections">
          <Button className="mt-8">رجعي للمجموعة</Button>
        </Link>
      </section>
    </div>
  );
}
