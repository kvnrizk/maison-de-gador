"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isRtl = locale === "ar";
  const otherLocale = locale === "en" ? "ar" : "en";

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/shop", label: t("shop") },
    { href: "/gifts", label: t("gifts") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-icon.png" alt="" className="h-10 w-auto" />
          <span className="text-brand-teal font-bold text-lg tracking-wide hidden sm:inline">
            GADOR
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === link.href
                  ? "text-brand-gold font-medium"
                  : "text-brand-dark/70 hover:text-brand-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language Toggle + Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link
            href={pathname}
            locale={otherLocale}
            className="text-sm text-brand-teal/60 hover:text-brand-gold transition-colors font-medium"
          >
            {tc("language")}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-brand-dark p-1"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-brand-cream border-t border-brand-gold/10 px-6 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm py-2 ${
                pathname === link.href
                  ? "text-brand-gold font-medium"
                  : "text-brand-dark/70 hover:text-brand-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
