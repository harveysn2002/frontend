import { SocialLinks } from "@/components/layout/social-links";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/social";

export const metadata = {
  title: "تواصل معنا | VORLAY",
};

export default function ContactPage() {
  const whatsappUrl = whatsappLink(
    siteConfig.social.whatsappNumber,
    siteConfig.social.whatsappMessage,
  );

  return (
    <div className="container py-14">
      <section className="glass-card rounded-[3rem] p-8 md:p-12">
        <h1 className="text-5xl font-black">تواصل معنا</h1>
        <p className="mt-5 max-w-2xl text-xl leading-9 text-brand-muted">
          عندك سؤال قبل الطلب؟ راسلنا على WhatsApp أو تابعنا على Instagram و Facebook.
          فريق VORLAY كيجاوبك، والطلب كيتأكد بالهاتف قبل الإرسال.
        </p>
        <div className="mt-8">
          <SocialLinks showLabels />
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h2 className="font-black">WhatsApp</h2>
          <p className="mt-2 text-brand-muted">أسرع طريقة باش توصل معنا</p>
          <p className="mt-2 font-bold text-brand-primary" dir="ltr">
            +{siteConfig.social.whatsappNumber}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 py-3 text-base font-bold text-white transition",
              "bg-[#25D366] hover:bg-[#1ebe57]",
            )}
          >
            راسلنا على WhatsApp
          </a>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h2 className="font-black">Instagram</h2>
          <p className="mt-2 text-brand-muted">شوف منتجات VORLAY وتجارب الزبناء</p>
          <a
            href={siteConfig.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-brand-primary/25 bg-white px-5 py-3 text-base font-bold text-brand-primary transition hover:bg-brand-soft/40",
            )}
          >
            تابعنا على Instagram
          </a>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h2 className="font-black">Facebook</h2>
          <p className="mt-2 text-brand-muted">آخر الأخبار والعروض من VORLAY</p>
          <a
            href={siteConfig.social.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-brand-primary/25 bg-white px-5 py-3 text-base font-bold text-brand-primary transition hover:bg-brand-soft/40",
            )}
          >
            تابعنا على Facebook
          </a>
        </div>
      </section>

      <section className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h2 className="font-black">Email</h2>
          <p className="mt-2 text-brand-muted">{siteConfig.supportEmail}</p>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h2 className="font-black">أوقات الخدمة</h2>
          <p className="mt-2 text-brand-muted">{siteConfig.supportHours}</p>
        </div>
      </section>
    </div>
  );
}
