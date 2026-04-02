import { getTranslations } from "next-intl/server";
import { getProductsByCategory } from "@/data/products";

const giftBoxes = [
  {
    key: "ramadan",
    color: "bg-brand-teal",
    border: "border-brand-gold",
    text: "text-brand-cream",
    accent: "text-brand-gold-light",
    description:
      "A curated selection of our finest chocolate dates, elegantly presented in a luxury teal box with gold foil detailing. The perfect companion for Iftar gatherings.",
  },
  {
    key: "eid",
    color: "bg-brand-burgundy",
    border: "border-brand-gold",
    text: "text-brand-cream",
    accent: "text-brand-gold-light",
    description:
      "Celebrate the joy of Eid with 24 handcrafted chocolate dates in six exquisite flavors, complete with a hand-calligraphed greeting card.",
  },
  {
    key: "wedding",
    color: "bg-brand-cream",
    border: "border-brand-gold/40",
    text: "text-brand-dark",
    accent: "text-brand-gold",
    description:
      "Bespoke wedding favors that leave a lasting impression. Choose your selection, packaging, and personalized ribbon for your special day.",
  },
  {
    key: "corporate",
    color: "bg-brand-dark",
    border: "border-brand-gold",
    text: "text-brand-cream",
    accent: "text-brand-gold-light",
    description:
      "Impress clients and partners with premium branded gift boxes. Custom quantities, logo placement, and personalized cards available.",
  },
] as const;

export default async function GiftsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations("gifts");
  const giftProducts = getProductsByCategory("gifting");

  return (
    <div>
      {/* Page Header */}
      <section className="bg-brand-teal py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] font-bold text-brand-gold-light tracking-wide mb-6">
            {t("title")}
          </h1>
          <p className="text-brand-cream/80 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-script)]">
            {t("subtitle")}
          </p>
          <div className="mt-8 w-24 h-px bg-brand-gold/40 mx-auto" />
        </div>
      </section>

      {/* Gift Box Cards — 2x2 Grid */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {giftBoxes.map((box) => (
              <div
                key={box.key}
                className={`${box.color} ${box.text} rounded-2xl border-2 ${box.border} overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-brand-teal/5 border-b border-brand-gold/20 flex items-center justify-center">
                  <div className="text-center opacity-40">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                      />
                    </svg>
                    <span className="text-sm tracking-wide">Gift Box Photo</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 lg:p-10">
                  <h3 className={`text-2xl font-[family-name:var(--font-playfair)] font-bold ${box.accent} mb-4`}>
                    {t(box.key)}
                  </h3>
                  <p className="leading-relaxed opacity-90 mb-8">
                    {box.description}
                  </p>
                  <a
                    href="https://wa.me/97470770747"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-semibold px-8 py-3 rounded-full transition-colors duration-200 text-sm tracking-wide"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t("customize_cta")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Products from Data */}
      {giftProducts.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-4">
                {t("title")}
              </h2>
              <div className="w-16 h-px bg-brand-gold mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {giftProducts.map((product) => (
                <div
                  key={product.slug}
                  className="group bg-brand-cream/30 rounded-2xl border border-brand-gold/20 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-brand-teal/5 border-b border-brand-gold/20 rounded-t-xl flex items-center justify-center">
                    <div className="text-brand-teal/30 text-center">
                      <svg
                        className="w-12 h-12 mx-auto mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-2">
                      {product.name[locale as "en" | "ar"]}
                    </h3>
                    <p className="text-brand-dark/60 text-sm leading-relaxed mb-4">
                      {product.description[locale as "en" | "ar"]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-brand-gold font-bold text-lg">
                        {product.price} {product.currency}
                      </span>
                      <span className="text-brand-teal/50 text-xs tracking-wide uppercase">
                        {product.ingredients[locale as "en" | "ar"][0]}
                      </span>
                    </div>
                    <a
                      href="https://wa.me/97470770747"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-semibold px-6 py-3 rounded-full transition-colors duration-200 text-sm tracking-wide"
                    >
                      {t("customize_cta")}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-brand-teal">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-12 h-px bg-brand-gold/40 mx-auto mb-8" />
          <p className="text-brand-cream/70 text-xl mb-8 leading-relaxed font-[family-name:var(--font-script)]">
            {t("custom_arrangement")}
          </p>
          <a
            href="https://wa.me/97470770747"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-bold px-10 py-4 rounded-full transition-colors duration-200 tracking-wide"
          >
            {t("customize_cta")}
          </a>
          <div className="w-12 h-px bg-brand-gold/40 mx-auto mt-8" />
        </div>
      </section>
    </div>
  );
}
