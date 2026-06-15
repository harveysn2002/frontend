export const metadata = {
  title: "سياسة الخصوصية | VORLAY",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-14">
      <article className="prose prose-lg max-w-none rounded-[3rem] bg-white p-8 shadow-soft">
        <h1>سياسة الخصوصية</h1>
        <p>
          نستعمل الاسم ورقم الهاتف ومعلومات الطلب فقط لتأكيد الطلب، التوصيل،
          خدمة الزبناء، وتحسين تجربة المتجر وقياس الإعلانات بشكل آمن.
        </p>
        <p>
          لا نبيع معلوماتك الشخصية. رموز التتبع وCAPI تستعمل حسب إعدادات الإعلانات،
          والبيانات الحساسة مثل الهاتف يتم هاشها في الخادم قبل إرسالها للمنصات.
        </p>
      </article>
    </div>
  );
}
