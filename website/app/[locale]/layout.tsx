import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Playfair_Display, Alex_Brush, Inter, Cairo } from "next/font/google";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ComingSoon from "@/components/layout/ComingSoon";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const isRtl = locale === "ar";
  const comingSoon = process.env.COMING_SOON === "true";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cairo.variable} ${playfair.variable} ${alexBrush.variable} ${
          isRtl ? "font-arabic" : "font-sans"
        } antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider locale={locale} messages={messages} now={new Date()}>
          {comingSoon ? (
            <ComingSoon locale={locale} />
          ) : (
            <>
              <Header locale={locale} />
              <main className="flex-1">{children}</main>
              <Footer />
              <WhatsAppButton />
            </>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
