import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | E-Commerce 369",
    default:
      "E-Commerce 369 - Saudi Women's Fashion | إي-كوميرس 369 - أزياء المرأة السعودية",
  },
  description:
    "منصة التجارة الإلكترونية الرائدة للأزياء النسائية في السعودية - Leading e-commerce platform for women's fashion in Saudi Arabia",
  keywords: [
    "أزياء نسائية",
    "ملابس سعودية",
    "عبايات",
    "فساتين",
    "women's fashion",
    "Saudi clothing",
    "abayas",
    "dresses",
  ],
  authors: [{ name: "Mohamed El Fadil Abuagla" }],
  creator: "Mohamed El Fadil Abuagla",
  openGraph: {
    title: "E-Commerce 369 - Saudi Women's Fashion",
    description:
      "Discover premium women's fashion designed for the modern Saudi woman",
    locale: "ar_SA",
    alternateLocale: "en_US",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Validate that the incoming locale is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <head>
        {/* Arabic fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* English fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* PWA meta tags */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="E-Commerce 369" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Viewport for mobile optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body
        className={`font-sans antialiased ${
          isRTL ? "font-arabic" : "font-inter"
        }`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
