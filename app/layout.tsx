import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Noto_Sans_Arabic } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CheckoutModal } from "@/components/checkout/checkout-modal";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PixelScripts } from "@/components/tracking/pixel-scripts";
import { activeNiche } from "@/config/niche";
import { nicheCopy } from "@/config/niche-copy";
import { siteConfig } from "@/config/site";
import { themeCssVars } from "@/config/theme";
import "./globals.css";

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: nicheCopy.metaTitle,
  description: nicheCopy.metaDescription,
  metadataBase: new URL(siteConfig.siteUrl),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-niche={activeNiche}
      className={arabic.variable}
      style={themeCssVars() as CSSProperties}
    >
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
