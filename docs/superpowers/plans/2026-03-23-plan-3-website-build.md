# Plan 3: Website Build (Next.js Storefront + Medusa Backend)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full bilingual website for La Maison de Gador — 10 pages, Arabic/English with RTL, connected to Medusa.js backend, deployed on Hetzner VPS via Docker Compose.

**Architecture:** Next.js 15 App Router storefront with `[locale]` routing via next-intl. Medusa.js 2.x headless backend for product catalog and order management. Nginx reverse proxy. All services in Docker Compose on a single Hetzner VPS.

**Tech Stack:** Next.js 15, Tailwind CSS, next-intl, Medusa.js 2.x, PostgreSQL, Redis, Docker Compose, Nginx

**Spec:** `docs/superpowers/specs/2026-03-23-la-maison-de-gador-design.md` (Phase 3)
**Depends on:** Plan 1 (brand assets), Plan 2 (website scaffolded)

---

## File Structure

```
website/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              ← Locale layout (dir=rtl for AR)
│   │   ├── page.tsx                ← Homepage
│   │   ├── about/page.tsx
│   │   ├── shop/
│   │   │   ├── page.tsx            ← Product catalog
│   │   │   └── [slug]/page.tsx     ← Product detail
│   │   ├── gifts/page.tsx
│   │   ├── custom/page.tsx
│   │   ├── corporate/page.tsx
│   │   └── contact/page.tsx
│   ├── layout.tsx                  ← Root layout (fonts, metadata)
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageToggle.tsx
│   │   └── WhatsAppButton.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Container.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── FeaturedProducts.tsx
│       ├── StoryTeaser.tsx
│       ├── InstagramFeed.tsx
│       └── ProductGrid.tsx
├── lib/
│   ├── medusa/
│   │   └── client.ts               ← Medusa JS client
│   ├── fonts.ts                     ← Font loading
│   └── utils.ts                     ← cn() helper
├── messages/
│   ├── en.json                      ← English translations
│   └── ar.json                      ← Arabic translations
├── middleware.ts                     ← next-intl locale detection
├── i18n/
│   ├── request.ts
│   └── routing.ts
├── public/
│   ├── fonts/                       ← Handstory, Satoshi, Cairo
│   ├── images/                      ← Static images
│   └── icons/                       ← Favicons
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

---

### Task 1: Set Up Next.js with Tailwind + next-intl + Brand System

**Files:**
- Modify: `website/package.json` (add deps)
- Create: `website/tailwind.config.ts`, `website/app/globals.css`
- Create: `website/lib/fonts.ts`, `website/lib/utils.ts`
- Create: `website/i18n/routing.ts`, `website/i18n/request.ts`, `website/middleware.ts`
- Create: `website/messages/en.json`, `website/messages/ar.json`
- Create: `website/app/layout.tsx`, `website/app/[locale]/layout.tsx`

- [ ] **Step 1: Install dependencies**

```bash
cd D:/Projects/La-Maison-de-Gador/website
npm install next-intl clsx tailwind-merge
```

- [ ] **Step 2: Create utility helpers**

Create `website/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Create font loading**

Create `website/lib/fonts.ts`:
```typescript
import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const handstory = localFont({
  src: "../public/fonts/Handstory.woff2",
  variable: "--font-handstory",
  display: "swap",
});

export const cairo = localFont({
  src: [
    { path: "../public/fonts/Cairo-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Cairo-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Cairo-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cairo",
  display: "swap",
});
```

- [ ] **Step 4: Set up Tailwind config with brand system**

Replace `website/tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: "#8B6914",
          cream: "#F0E6D3",
          blue: "#3AABE0",
          orange: "#E07830",
          dark: "#3C2415",
          white: "#FAF6F0",
        },
      },
      fontFamily: {
        handstory: ["var(--font-handstory)"],
        satoshi: ["var(--font-satoshi)"],
        cairo: ["var(--font-cairo)"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 5: Set up globals.css**

Replace `website/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-brown: #8B6914;
  --color-cream: #F0E6D3;
  --color-blue: #3AABE0;
  --color-orange: #E07830;
  --color-dark: #3C2415;
  --color-white: #FAF6F0;
}

body {
  background-color: var(--color-white);
  color: var(--color-dark);
}

/* RTL support via logical properties */
[dir="rtl"] .text-start { text-align: right; }
[dir="rtl"] .text-end { text-align: left; }
```

- [ ] **Step 6: Set up next-intl routing**

Create `website/i18n/routing.ts`:
```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
});
```

Create `website/i18n/request.ts`:
```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "ar")) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

Create `website/middleware.ts`:
```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 7: Create translation files**

Create `website/messages/en.json`:
```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "shop": "Shop",
    "gifts": "Gift Boxes",
    "custom": "Custom Orders",
    "corporate": "Corporate",
    "contact": "Contact"
  },
  "home": {
    "hero_title": "The Art of Adoration",
    "hero_subtitle": "Premium chocolate dates, handcrafted in Doha",
    "shop_now": "Shop Now",
    "our_story": "Our Story",
    "featured_title": "Featured Collections",
    "whatsapp_cta": "Order on WhatsApp"
  },
  "footer": {
    "copyright": "© {year} La Maison de Gador. All rights reserved.",
    "tagline": "The Art of Adoration"
  },
  "common": {
    "language": "العربية",
    "add_to_cart": "Add to Cart",
    "view_details": "View Details",
    "send": "Send",
    "loading": "Loading..."
  }
}
```

Create `website/messages/ar.json`:
```json
{
  "nav": {
    "home": "الرئيسية",
    "about": "من نحن",
    "shop": "المتجر",
    "gifts": "علب الهدايا",
    "custom": "طلبات خاصة",
    "corporate": "هدايا الشركات",
    "contact": "اتصل بنا"
  },
  "home": {
    "hero_title": "فن التذوق",
    "hero_subtitle": "تمور شوكولا فاخرة، مصنوعة يدوياً في الدوحة",
    "shop_now": "تسوق الآن",
    "our_story": "قصتنا",
    "featured_title": "مجموعات مميزة",
    "whatsapp_cta": "اطلب عبر واتساب"
  },
  "footer": {
    "copyright": "© {year} لا ميزون دي غادور. جميع الحقوق محفوظة.",
    "tagline": "فن التذوق"
  },
  "common": {
    "language": "English",
    "add_to_cart": "أضف إلى السلة",
    "view_details": "عرض التفاصيل",
    "send": "إرسال",
    "loading": "جاري التحميل..."
  }
}
```

- [ ] **Step 8: Set up root layout**

Replace `website/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | La Maison de Gador",
    default: "La Maison de Gador — Premium Chocolate Dates",
  },
  description: "Premium chocolate dates, handcrafted in Doha. The Art of Adoration.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 9: Set up locale layout**

Create `website/app/[locale]/layout.tsx`:
```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { satoshi, handstory, cairo } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) notFound();

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const fontClass = locale === "ar"
    ? `${cairo.variable} font-cairo`
    : `${satoshi.variable} font-satoshi`;

  return (
    <html lang={locale} dir={dir}>
      <body className={`${handstory.variable} ${satoshi.variable} ${cairo.variable} ${fontClass} antialiased bg-brand-white text-brand-dark`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 10: Update next.config.ts**

Replace `website/next.config.ts`:
```typescript
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
      },
      {
        protocol: "https",
        hostname: "lamaisondegador.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 11: Run and verify**

```bash
cd D:/Projects/La-Maison-de-Gador/website
npm run dev
```

Open http://localhost:3000/en — verify English renders
Open http://localhost:3000/ar — verify Arabic renders with RTL

- [ ] **Step 12: Commit**

```bash
git add website/
git commit -m "Set up Next.js with Tailwind, next-intl bilingual, and brand system"
```

---

### Task 2: Build Shared Layout Components

**Files:**
- Create: `website/components/ui/Container.tsx`, `Button.tsx`
- Create: `website/components/layout/Header.tsx`, `Footer.tsx`, `LanguageToggle.tsx`, `WhatsAppButton.tsx`

- [ ] **Step 1: Build Container component**

Create `website/components/ui/Container.tsx`:
```tsx
import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Build Button component**

Create `website/components/ui/Button.tsx`:
```tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        {
          "bg-brand-brown text-brand-cream hover:bg-brand-dark": variant === "primary",
          "bg-brand-cream text-brand-brown hover:bg-brand-brown hover:text-brand-cream": variant === "secondary",
          "border-2 border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-brand-cream": variant === "outline",
          "px-3 py-1.5 text-sm": size === "sm",
          "px-5 py-2.5 text-base": size === "md",
          "px-7 py-3 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 3: Build LanguageToggle component**

Create `website/components/layout/LanguageToggle.tsx`:
```tsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");

  function switchLocale() {
    const newLocale = locale === "en" ? "ar" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      className="text-sm font-medium text-brand-brown hover:text-brand-dark transition-colors"
    >
      {t("language")}
    </button>
  );
}
```

- [ ] **Step 4: Build Header component**

Create `website/components/layout/Header.tsx`:
```tsx
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import LanguageToggle from "./LanguageToggle";

export default async function Header() {
  const t = await getTranslations("nav");

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/shop", label: t("shop") },
    { href: "/gifts", label: t("gifts") },
    { href: "/custom", label: t("custom") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-white/90 backdrop-blur-md border-b border-brand-cream">
      <Container className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo-icon.svg" alt="" className="h-8 w-auto" />
          <span className="font-handstory text-xl text-brand-brown hidden sm:block">
            Gador
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-brand-dark/70 hover:text-brand-brown transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle />
        </div>
      </Container>
    </header>
  );
}
```

Note: Link import needs next-intl navigation setup. Create `website/i18n/navigation.ts`:
```typescript
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

Update Header to import from `@/i18n/navigation` instead.

- [ ] **Step 5: Build Footer component**

Create `website/components/layout/Footer.tsx`:
```tsx
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-brand-dark text-brand-cream py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src="/images/logo-light.svg" alt="La Maison de Gador" className="h-12 w-auto mb-4" />
            <p className="text-brand-cream/60 text-sm">{t("tagline")}</p>
          </div>
          <div>
            <h3 className="font-medium mb-3">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm text-brand-cream/70">
              <Link href="/shop" className="hover:text-brand-cream">Shop</Link>
              <Link href="/gifts" className="hover:text-brand-cream">Gift Boxes</Link>
              <Link href="/custom" className="hover:text-brand-cream">Custom Orders</Link>
              <Link href="/corporate" className="hover:text-brand-cream">Corporate</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-medium mb-3">Follow Us</h3>
            <div className="flex gap-4 text-sm text-brand-cream/70">
              <a href="https://instagram.com/lamaisondegador" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cream">Instagram</a>
              <a href="https://facebook.com/lamaisondegador" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cream">Facebook</a>
              <a href="https://tiktok.com/@lamaisondegador" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cream">TikTok</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-brand-cream/20 text-center text-sm text-brand-cream/40">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 6: Build WhatsApp floating button**

Create `website/components/layout/WhatsAppButton.tsx`:
```tsx
export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/974XXXXXXXX?text=Hello%20La%20Maison%20de%20Gador"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Contact on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}
```

Note: uses `end-6` (logical property) so it positions correctly in RTL.

- [ ] **Step 7: Run and verify layout**

```bash
npm run dev
```

Verify at http://localhost:3000/en:
- Header with logo, nav links, language toggle
- Footer with links and social
- WhatsApp button fixed bottom-right
- Switch to /ar — RTL layout, Arabic text, WhatsApp moves to bottom-left

- [ ] **Step 8: Commit**

```bash
git add website/components/ website/i18n/navigation.ts
git commit -m "Add shared layout: Header, Footer, WhatsApp button, language toggle"
```

---

### Task 3: Build Homepage

**Files:**
- Create: `website/app/[locale]/page.tsx`
- Create: `website/components/sections/Hero.tsx`, `FeaturedProducts.tsx`, `StoryTeaser.tsx`

- [ ] **Step 1: Build Hero section**

Create `website/components/sections/Hero.tsx`:
```tsx
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default async function Hero() {
  const t = await getTranslations("home");

  return (
    <section className="relative min-h-[80vh] flex items-center bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/60" />
      <Container className="relative z-10 py-20">
        <div className="max-w-2xl">
          <h1 className="font-handstory text-5xl sm:text-6xl md:text-7xl text-brand-cream mb-6">
            {t("hero_title")}
          </h1>
          <p className="text-xl text-brand-cream/80 mb-8">
            {t("hero_subtitle")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop">
              <Button size="lg">{t("shop_now")}</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="border-brand-cream text-brand-cream hover:bg-brand-cream hover:text-brand-dark">
                {t("our_story")}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Build FeaturedProducts section**

Create `website/components/sections/FeaturedProducts.tsx`:
```tsx
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";

const PLACEHOLDER_PRODUCTS = [
  { id: 1, name: "Signature Collection", price: "QAR 250", image: "/images/placeholder-box-1.jpg" },
  { id: 2, name: "Royal Gift Box", price: "QAR 450", image: "/images/placeholder-box-2.jpg" },
  { id: 3, name: "Artisan Selection", price: "QAR 180", image: "/images/placeholder-box-3.jpg" },
];

export default async function FeaturedProducts() {
  const t = await getTranslations("home");

  return (
    <section className="py-20 bg-brand-white">
      <Container>
        <h2 className="font-handstory text-3xl sm:text-4xl text-brand-brown text-center mb-12">
          {t("featured_title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLACEHOLDER_PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-square bg-brand-cream rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full flex items-center justify-center text-brand-brown/30">
                  {/* Replace with real product images */}
                  <span className="text-sm">{product.name}</span>
                </div>
              </div>
              <h3 className="font-medium text-brand-dark group-hover:text-brand-brown transition-colors">
                {product.name}
              </h3>
              <p className="text-brand-brown font-medium">{product.price}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Build StoryTeaser section**

Create `website/components/sections/StoryTeaser.tsx`:
```tsx
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default async function StoryTeaser() {
  const t = await getTranslations("home");

  return (
    <section className="py-20 bg-brand-cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-handstory text-3xl sm:text-4xl text-brand-brown mb-6">
              {t("our_story")}
            </h2>
            <p className="text-brand-dark/70 leading-relaxed mb-6">
              La Maison de Gador is where French artistry meets Gulf tradition.
              Each chocolate date is a masterpiece — handcrafted with the finest
              ingredients and wrapped with love.
            </p>
            <Link href="/about">
              <Button variant="secondary">{t("our_story")}</Button>
            </Link>
          </div>
          <div className="aspect-[4/3] bg-brand-brown/10 rounded-lg flex items-center justify-center text-brand-brown/30">
            {/* Replace with lifestyle photo */}
            <span className="text-sm">Brand Story Image</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Assemble Homepage**

Create `website/app/[locale]/page.tsx`:
```tsx
import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import StoryTeaser from "@/components/sections/StoryTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <StoryTeaser />
    </>
  );
}
```

- [ ] **Step 5: Run and verify**

```bash
npm run dev
```

Verify at /en and /ar:
- Hero with headline, subtitle, 2 CTAs
- Featured products grid (placeholder)
- Story teaser section
- All text bilingual
- RTL layout correct in Arabic

- [ ] **Step 6: Commit**

```bash
git add website/
git commit -m "Build homepage with hero, featured products, and story teaser"
```

---

### Task 4: Build About Page

**Files:**
- Create: `website/app/[locale]/about/page.tsx`

- [ ] **Step 1: Add translations**

Add to `messages/en.json`:
```json
"about": {
  "title": "Our Story",
  "subtitle": "Where French artistry meets Gulf tradition",
  "story_p1": "La Maison de Gador was born from a simple belief: that a date can be more than a date. It can be a work of art, a gesture of love, a moment of pure indulgence.",
  "story_p2": "We source the finest dates and transform them with premium fillings — rich pistachio cream, smooth hazelnut, delicate saffron — then enrobe each one in Belgian chocolate.",
  "story_p3": "Every box is handcrafted with the same care you'd give a gift to someone you adore. Because that's exactly what it is.",
  "craft_title": "The Craft",
  "symbol_title": "Our Symbol",
  "symbol_text": "The cocoa bean at the heart of our name represents transformation — from raw nature to refined luxury. The diamond within symbolizes the precious care in every piece."
}
```

Add equivalent Arabic translations to `messages/ar.json`.

- [ ] **Step 2: Build the page**

Create `website/app/[locale]/about/page.tsx`:
```tsx
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      <section className="py-20 bg-brand-cream">
        <Container className="max-w-3xl text-center">
          <h1 className="font-handstory text-4xl sm:text-5xl text-brand-brown mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-brand-dark/60">{t("subtitle")}</p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl space-y-6 text-brand-dark/80 leading-relaxed">
          <p>{t("story_p1")}</p>
          <p>{t("story_p2")}</p>
          <p>{t("story_p3")}</p>
        </Container>
      </section>

      <section className="py-16 bg-brand-dark text-brand-cream">
        <Container className="max-w-3xl text-center">
          <img src="/images/logo-icon-light.svg" alt="" className="h-16 mx-auto mb-6" />
          <h2 className="font-handstory text-3xl mb-4">{t("symbol_title")}</h2>
          <p className="text-brand-cream/70 leading-relaxed">{t("symbol_text")}</p>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git commit -am "Add About page with brand story and symbol section"
```

---

### Task 5: Build Shop + Product Detail Pages

**Files:**
- Create: `website/app/[locale]/shop/page.tsx`
- Create: `website/app/[locale]/shop/[slug]/page.tsx`
- Create: `website/lib/medusa/client.ts`
- Create: `website/components/sections/ProductGrid.tsx`

- [ ] **Step 1: Set up Medusa client**

```bash
cd website && npm install @medusajs/js-sdk
```

Create `website/lib/medusa/client.ts`:
```typescript
import Medusa from "@medusajs/js-sdk";

export const medusa = new Medusa({
  baseUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
});
```

- [ ] **Step 2: Build ProductGrid component**

Create `website/components/sections/ProductGrid.tsx`:
```tsx
import { Link } from "@/i18n/navigation";

type Product = {
  id: string;
  title: string;
  handle: string;
  thumbnail?: string;
  variants?: { calculated_price?: { calculated_amount: number; currency_code: string } }[];
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link key={product.id} href={`/shop/${product.handle}`} className="group">
          <div className="aspect-square bg-brand-cream rounded-lg overflow-hidden mb-4">
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand-brown/30 text-sm">
                {product.title}
              </div>
            )}
          </div>
          <h3 className="font-medium text-brand-dark group-hover:text-brand-brown transition-colors">
            {product.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Build Shop page**

Create `website/app/[locale]/shop/page.tsx`:
```tsx
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/sections/ProductGrid";
import { medusa } from "@/lib/medusa/client";

export default async function ShopPage() {
  const t = await getTranslations("nav");

  let products = [];
  try {
    const { products: data } = await medusa.store.product.list({
      limit: 20,
    });
    products = data || [];
  } catch {
    // Medusa not connected yet — show placeholder
    products = [];
  }

  return (
    <section className="py-20">
      <Container>
        <h1 className="font-handstory text-4xl text-brand-brown text-center mb-12">
          {t("shop")}
        </h1>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center text-brand-dark/50">
            Products coming soon. Check back after we connect Medusa.
          </p>
        )}
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Build Product Detail page**

Create `website/app/[locale]/shop/[slug]/page.tsx`:
```tsx
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { medusa } from "@/lib/medusa/client";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string; locale: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations("common");

  let product = null;
  try {
    const { products } = await medusa.store.product.list({
      handle: slug,
      limit: 1,
    });
    product = products?.[0] || null;
  } catch {
    // Medusa not running
  }

  if (!product) return notFound();

  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-brand-cream rounded-lg overflow-hidden">
            {product.thumbnail ? (
              <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand-brown/30">
                Product Image
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-brand-dark mb-4">{product.title}</h1>
            <p className="text-brand-dark/70 mb-8">{product.description}</p>
            <Button size="lg">{t("add_to_cart")}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git commit -am "Add Shop catalog and Product detail pages with Medusa client"
```

---

### Task 6: Build Remaining Pages (Gifts, Custom, Corporate, Contact)

**Files:**
- Create: `website/app/[locale]/gifts/page.tsx`
- Create: `website/app/[locale]/custom/page.tsx`
- Create: `website/app/[locale]/corporate/page.tsx`
- Create: `website/app/[locale]/contact/page.tsx`

Each page follows the same pattern. I'll outline the structure — full code in implementation.

- [ ] **Step 1: Build Gifts page** — Curated collections grid (Ramadan, Eid, Wedding, Corporate). Links to shop filtered by collection.

- [ ] **Step 2: Build Custom Orders page** — Inquiry form (name, email, phone, description, quantity). Form submits to API route that saves to JSON (like landing signup). WhatsApp link as alternative.

- [ ] **Step 3: Build Corporate Gifts page** — B2B focus. Bulk order form. Custom branding description. Mockup images placeholder.

- [ ] **Step 4: Build Contact page** — WhatsApp (primary), phone, email, location. Simple layout, no map needed initially.

- [ ] **Step 5: Add all translations** to `messages/en.json` and `messages/ar.json`.

- [ ] **Step 6: Verify all pages** in both EN and AR.

- [ ] **Step 7: Commit**

```bash
git commit -am "Add Gifts, Custom Orders, Corporate, and Contact pages"
```

---

### Task 7: Set Up Medusa.js Backend with Docker Compose

**Files:**
- Modify: `docker/docker-compose.yml`
- Create: `medusa/medusa-config.ts`, `medusa/Dockerfile`
- Create: `website/Dockerfile`

- [ ] **Step 1: Set up Medusa project properly**

The `medusa/` directory was already scaffolded in Plan 2. Now configure it.

Follow Medusa docs for exact setup: `https://docs.medusajs.com/learn/installation`.

- [ ] **Step 2: Configure medusa-config.ts**

Key settings:
- `DATABASE_URL` pointing to Docker Postgres
- `REDIS_URL` pointing to Docker Redis
- `http.storeCors` allowing storefront origin
- `http.adminCors` allowing admin origin

- [ ] **Step 3: Create Medusa Dockerfile**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 9000
CMD ["npm", "start"]
```

- [ ] **Step 4: Create website Dockerfile**

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/messages ./messages
EXPOSE 3000
CMD ["npm", "start"]
```

- [ ] **Step 5: Test Docker Compose locally**

```bash
cd D:/Projects/La-Maison-de-Gador/docker
docker-compose up --build
```

Verify:
- Medusa admin at http://localhost:9000/app
- Storefront at http://localhost:3000
- Postgres + Redis running

- [ ] **Step 6: Commit**

```bash
git commit -am "Add Docker Compose setup for all services"
```

---

### Task 8: Responsive Design + RTL Polish

- [ ] **Step 1: Mobile navigation** — Add hamburger menu for mobile (slide-out drawer or dropdown).

- [ ] **Step 2: Test all pages at mobile breakpoints** — 375px (iPhone SE), 390px (iPhone 14), 768px (iPad).

- [ ] **Step 3: RTL full review** — Switch to /ar and check every page for layout issues, text alignment, icon direction.

- [ ] **Step 4: Commit**

```bash
git commit -am "Responsive design and RTL polish"
```

---

## Plan 3 Completion Criteria

- [ ] Next.js project with Tailwind + next-intl running
- [ ] Full bilingual support (EN/AR) with RTL
- [ ] Brand fonts (Handstory, Satoshi, Cairo) loading
- [ ] Shared layout: Header with nav + language toggle, Footer, WhatsApp button
- [ ] Homepage: Hero, Featured Products, Story Teaser
- [ ] About page with brand story
- [ ] Shop page with product grid (connected to Medusa)
- [ ] Product detail page
- [ ] Gifts, Custom Orders, Corporate, Contact pages
- [ ] Medusa.js backend running in Docker
- [ ] Docker Compose with Postgres + Redis + Medusa + Next.js + Nginx
- [ ] Mobile-responsive at all breakpoints
- [ ] RTL layout verified on all pages
