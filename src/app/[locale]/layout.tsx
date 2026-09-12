import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale, locales } from "@/i18n/routing";
import "../globals.css";

const inter = localFont({
  src: "../../../public/fonts/Inter.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});
const arabic = localFont({
  src: "../../../public/fonts/NotoSansArabic.woff2",
  variable: "--font-arabic",
  display: "swap",
  weight: "100 900",
  preload: false,
});
export const metadata: Metadata = {
  metadataBase: new URL("https://mikrokaynakantalya.com"),
  applicationName: "Platin Antalya · Mikro Kaynak",
  icons: { icon: "/icon.svg", apple: "/media/logo.png" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f3ed",
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${arabic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
