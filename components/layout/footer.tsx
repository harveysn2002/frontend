import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { SocialLinks } from "@/components/layout/social-links";
import { siteConfig } from "@/config/site";
import { getListedProducts } from "@/config/products";
import { whatsappLink } from "@/lib/social";

export function Footer() {
  const whatsappUrl = whatsappLink(
    siteConfig.social.whatsappNumber,
    siteConfig.social.whatsappMessage,
  );

  return (
    <footer className="border-t border-brand-primary/10 bg-white">
      <div className="container grid gap-8 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <BrandLogo />
          <p className="mt-4 text-sm leading-7 text-brand-muted">
            VORLAY كتقدم منتجات دعم وراحة الظهر للحياة اليومية، بتجربة طلب واضحة
            والدفع عند الاستلام.
          </p>
          <div className="mt-5">
            <p className="mb-3 text-sm font-black text-brand-ink">تابعنا</p>
            <SocialLinks />
          </div>
        </div>
        <div>
          <h3 className="font-black">المتجر</h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-muted">
            <li><Link href="/collections">المجموعة</Link></li>
            {getListedProducts().map((product) => (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`}>{product.nameAr}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-black">الدعم</h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-muted">
            <li><Link href="/contact">تواصل معنا</Link></li>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={siteConfig.social.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={siteConfig.social.facebookUrl} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li><Link href="/shipping-returns">التوصيل والاستبدال</Link></li>
            <li><Link href="/privacy-policy">سياسة الخصوصية</Link></li>
            <li><Link href="/terms">شروط الاستخدام</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-black">الثقة</h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-muted">
            <li>الدفع عند الاستلام</li>
            <li>تأكيد الطلب قبل الإرسال</li>
            <li>توصيل لجميع مدن المغرب</li>
            <li>{siteConfig.supportEmail}</li>
            <li>{siteConfig.supportHours}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
