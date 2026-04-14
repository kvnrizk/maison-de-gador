import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function ComingSoon({ locale }: { locale: string }) {
  const t = await getTranslations("soon");
  const isRtl = locale === "ar";
  const otherLocale = locale === "en" ? "ar" : "en";
  const otherLabel = locale === "en" ? "العربية" : "English";

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-brand-teal overflow-hidden px-6"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Radial gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,78,0.12)_0%,transparent_65%)]" />
      {/* Top + bottom gold hairlines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      {/* Language toggle */}
      <Link
        href={`/${otherLocale}`}
        className="absolute top-6 end-6 text-brand-cream/70 hover:text-brand-gold text-sm tracking-wider uppercase transition-colors z-10"
      >
        {otherLabel}
      </Link>

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        {/* Phoenix logo */}
        <div className="mb-10 flex justify-center">
          <Image
            src="/logo-light.png"
            alt="La Maison de Gador"
            width={140}
            height={140}
            priority
            className="w-28 h-28 md:w-36 md:h-36 object-contain"
          />
        </div>

        {/* Brand name */}
        <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-normal tracking-wide text-brand-cream mb-3">
          La Maison de Gador
        </h1>

        {/* Script tagline */}
        <p className="font-[family-name:var(--font-script)] text-2xl md:text-4xl text-gold-gradient mb-10 leading-tight">
          {t("tagline")}
        </p>

        {/* Gold divider */}
        <div className="w-16 h-px bg-brand-gold/60 mx-auto mb-10" />

        {/* Coming Soon headline */}
        <p className="font-[family-name:var(--font-heading)] text-xl md:text-3xl text-brand-gold tracking-[0.3em] uppercase mb-6">
          {t("headline")}
        </p>

        {/* Promise */}
        <p className="text-brand-cream/80 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          {t("promise")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://wa.me/97470770747?text=I%20want%20to%20know%20more%20about%20La%20Maison%20de%20Gador"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all text-sm font-medium"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("cta_whatsapp")}
          </a>

          <a
            href="https://www.instagram.com/lmd.gador"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10 hover:border-brand-gold px-6 py-3 rounded-full transition-all text-sm font-medium"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
            </svg>
            @lmd.gador
          </a>
        </div>

        {/* Footer line */}
        <p className="mt-16 text-brand-cream/40 text-xs tracking-widest uppercase">
          {t("footer")}
        </p>
      </div>
    </div>
  );
}
