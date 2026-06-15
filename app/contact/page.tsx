import { siteConfig } from "@/config/site";

export const metadata = {
  title: "تواصل معنا | VORLAY",
};

export default function ContactPage() {
  return (
    <div className="container py-14">
      <section className="glass-card rounded-[3rem] p-8 md:p-12">
        <h1 className="text-5xl font-black">تواصل معنا</h1>
        <p className="mt-5 max-w-2xl text-xl leading-9 text-brand-muted">
          عندك سؤال قبل الطلب؟ فريق VORLAY يجاوبك، والطلب كيتأكد بالهاتف قبل الإرسال.
        </p>
      </section>
      <section className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h2 className="font-black">WhatsApp</h2>
          <p className="mt-2 text-brand-muted">{siteConfig.supportPhone}</p>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h2 className="font-black">Email</h2>
          <p className="mt-2 text-brand-muted">{siteConfig.supportEmail}</p>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h2 className="font-black">الخدمة</h2>
          <p className="mt-2 text-brand-muted">من الاثنين إلى السبت، 9:00 - 18:00</p>
        </div>
      </section>
    </div>
  );
}
