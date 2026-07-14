export const metadata = {
  title: "التوصيل والاستبدال | VORLAY",
};

export default function ShippingReturnsPage() {
  return (
    <div className="container py-14">
      <article className="rounded-[3rem] bg-white p-8 leading-8 shadow-soft">
        <h1 className="text-4xl font-black">التوصيل والاستبدال</h1>
        <p className="mt-5 text-brand-muted">
          التوصيل متاح لجميع مدن المغرب، والدفع يكون عند الاستلام. التوصيل على
          حسابنا — الثمن المعروض هو اللي كتخلص. بعد تسجيل الطلب، فريق VORLAY يتاصل بك
          لتأكيد المعلومات قبل الإرسال.
        </p>
        <h2 className="mt-8 text-2xl font-black">الاستبدال</h2>
        <p className="mt-3 text-brand-muted">
          يمكن طلب الاستبدال حسب الشروط التشغيلية: المنتج يكون بحالته الأصلية،
          والتواصل يتم خلال الفترة المحددة من طرف فريق الدعم.
        </p>
      </article>
    </div>
  );
}
