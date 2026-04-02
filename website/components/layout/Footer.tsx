"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  return (
    <footer className="bg-brand-dark text-brand-cream/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img src="/logo.png" alt="La Maison de Gador" className="h-16 w-auto mb-4" />
            <p className="text-lg font-[family-name:var(--font-script)] text-brand-gold/60">{t("tagline")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-brand-gold text-sm font-medium tracking-wider uppercase mb-4">
              {t("quick_links")}
            </h4>
            <ul className="space-y-2">
              {(["about", "shop", "gifts", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key}`}
                    className="text-sm text-brand-cream/50 hover:text-brand-gold transition-colors"
                  >
                    {tn(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-brand-gold text-sm font-medium tracking-wider uppercase mb-4">
              {t("connect")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://instagram.com/lmd.gador" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-cream/50 hover:text-brand-gold transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com/lamaisondegador" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-cream/50 hover:text-brand-gold transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@lamaisondegador" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-cream/50 hover:text-brand-gold transition-colors">
                  TikTok
                </a>
              </li>
              <li>
                <a href="https://wa.me/97433314007" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-cream/50 hover:text-brand-gold transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-cream/10 text-center">
          <p className="text-xs text-brand-cream/30">
            &copy; {new Date().getFullYear()} La Maison de Gador. {t("rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
