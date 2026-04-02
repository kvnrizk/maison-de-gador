import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { products } from "@/data/products";
import Image from "next/image";

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const lang = locale as "en" | "ar";
  const t = await getTranslations("home");
  const tShop = await getTranslations("shop");

  const featuredProducts = products.filter((p) => p.category !== "gifting").slice(0, 4);

  return (
    <>
      {/* ============================================= */}
      {/* HERO SECTION                                  */}
      {/* ============================================= */}
      <section className="relative min-h-screen flex items-center justify-center bg-brand-teal overflow-hidden">
        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,78,0.08)_0%,transparent_70%)]" />
        {/* Decorative top edge */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
        {/* Decorative bottom edge */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Phoenix Logo */}
          <div className="mb-12">
            <Image
              src="/logo.png"
              alt="La Maison de Gador"
              width={160}
              height={160}
              className="mx-auto drop-shadow-[0_0_40px_rgba(201,168,78,0.15)]"
              priority
            />
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="block w-16 h-px bg-brand-gold/40" />
            <span className="block w-2 h-2 rotate-45 border border-brand-gold/50" />
            <span className="block w-16 h-px bg-brand-gold/40" />
          </div>

          {/* Headline */}
          <h1 className="text-gold-gradient text-5xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-script)] tracking-wide mb-6">
            {t("hero_title")}
          </h1>

          {/* Subtitle */}
          <p className="text-brand-cream/80 text-lg sm:text-xl font-light tracking-wide max-w-2xl mx-auto mb-12 leading-relaxed">
            {t("hero_subtitle")}
          </p>

          {/* CTA Button */}
          <Link
            href="/shop"
            className="inline-block px-10 py-4 border border-brand-gold text-brand-gold text-sm uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-teal transition-all duration-500"
          >
            {t("hero_cta")}
          </Link>

        </div>
      </section>

      {/* ============================================= */}
      {/* FEATURED PRODUCTS                             */}
      {/* ============================================= */}
      <section className="bg-brand-cream py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-brand-dark text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] font-bold tracking-wide mb-4">
              {t("featured_title")}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="block w-12 h-px bg-brand-gold/60" />
              <span className="block w-1.5 h-1.5 rotate-45 bg-brand-gold" />
              <span className="block w-12 h-px bg-brand-gold/60" />
            </div>
            <p className="text-brand-dark/60 text-lg font-light max-w-lg mx-auto">
              {t("featured_subtitle")}
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
                  {/* Product Image Placeholder */}
                  <div className="aspect-square bg-brand-teal/5 border-b border-brand-gold/20 flex items-center justify-center relative overflow-hidden">
                    <div className="w-24 h-24 border border-brand-gold/30 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-teal/5" />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-brand-dark font-[family-name:var(--font-playfair)] font-medium text-base mb-2 group-hover:text-brand-gold-dark transition-colors duration-300">
                      {product.name[lang]}
                    </h3>
                    <p className="text-brand-dark/50 text-sm font-light mb-4 line-clamp-2">
                      {product.description[lang]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-brand-gold font-medium">
                        {product.price} {product.currency}
                      </span>
                      <span className="text-brand-dark/40 text-xs uppercase tracking-wider group-hover:text-brand-gold transition-colors duration-300">
                        {tShop("view_details")} &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* STORY TEASER                                  */}
      {/* ============================================= */}
      <section className="bg-brand-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left — Story Text */}
          <div className="flex flex-col justify-center px-8 sm:px-16 py-20 lg:py-24">
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-10 h-px bg-brand-gold/50" />
              <span className="text-brand-gold/60 text-xs uppercase tracking-[0.3em]">
                {t("story_title")}
              </span>
            </div>
            <p className="text-brand-cream/90 text-2xl sm:text-3xl font-[family-name:var(--font-script)] leading-relaxed mb-10">
              {t("story_text")}
            </p>
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-brand-gold text-sm uppercase tracking-[0.2em] hover:text-brand-gold-light transition-colors duration-300 group"
              >
                {t("story_cta")}
                <span className="inline-block w-6 h-px bg-brand-gold group-hover:w-10 transition-all duration-300" />
              </Link>
            </div>
          </div>

          {/* Right — Image Placeholder */}
          <div className="relative bg-brand-teal flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,78,0.06)_0%,transparent_70%)]" />
            {/* Decorative pattern */}
            <div className="relative">
              <div className="w-48 h-48 border border-brand-gold/20 rotate-45" />
              <div className="absolute inset-4 border border-brand-gold/15 rotate-45" />
              <div className="absolute inset-8 border border-brand-gold/10 rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="La Maison de Gador"
                  width={80}
                  height={80}
                  className="opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* WHATSAPP CTA                                  */}
      {/* ============================================= */}
      <section className="relative bg-brand-burgundy py-24 sm:py-28 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,78,0.08)_0%,transparent_60%)]" />
        {/* Top decorative line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="block w-12 h-px bg-brand-gold/40" />
            <span className="block w-2 h-2 rotate-45 border border-brand-gold/40" />
            <span className="block w-12 h-px bg-brand-gold/40" />
          </div>

          <h2 className="text-gold-gradient text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold tracking-wide mb-6">
            {t("cta_title")}
          </h2>

          <p className="text-brand-cream/70 text-lg font-light mb-12 max-w-xl mx-auto">
            {t("cta_subtitle")}
          </p>

          <a
            href="https://wa.me/97433314007"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-brand-gold text-brand-teal font-medium text-sm uppercase tracking-[0.15em] hover:bg-brand-gold-light transition-colors duration-300"
          >
            {/* WhatsApp icon */}
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("cta_button")}
          </a>
        </div>
      </section>
    </>
  );
}
