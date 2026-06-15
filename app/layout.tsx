import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CheckoutModal } from "@/components/checkout/checkout-modal";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PixelScripts } from "@/components/tracking/pixel-scripts";
import { siteConfig } from "@/config/site";
import "./globals.css";

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VORLAY | راحة الظهر للحياة اليومية",
  description:
    "متجر VORLAY لمنتجات دعم وراحة الظهر في المغرب. الدفع عند الاستلام، توصيل لجميع مدن المغرب، وتأكيد الطلب قبل الإرسال.",
  metadataBase: new URL(siteConfig.siteUrl),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={arabic.variable}>
      <body className="font-sans">
        <PixelScripts />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
      </body>
    </html>
  );
}
