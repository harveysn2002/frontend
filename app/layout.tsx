import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CheckoutModal } from "@/components/checkout/checkout-modal";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFab } from "@/components/layout/social-links";
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
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={arabic.variable}>
      <body className="w-full max-w-full overflow-x-hidden font-sans">
        <PixelScripts />
        <Header />
        <main className="w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
        <WhatsAppFab />
      </body>
    </html>
  );
}
