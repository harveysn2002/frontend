export const metadata = {
  title: "شروط الاستخدام | VORLAY",
};

export default function TermsPage() {
  return (
    <div className="container py-14">
      <article className="rounded-[3rem] bg-white p-8 leading-8 shadow-soft">
        <h1 className="text-4xl font-black">شروط الاستخدام</h1>
        <p className="mt-5 text-brand-muted">
          استعمال موقع VORLAY يعني قبولك لشروط الطلب والدفع عند الاستلام. الطلب
          لا يعتبر مؤكداً حتى يتواصل معك الفريق لتأكيد التفاصيل والعنوان.
        </p>
        <p className="mt-4 text-brand-muted">
          منتجات VORLAY موجهة لدعم الراحة اليومية وليست بديلاً عن استشارة الطبيب
          في حالات الألم الحاد أو الحالات الطبية.
        </p>
      </article>
    </div>
  );
}
