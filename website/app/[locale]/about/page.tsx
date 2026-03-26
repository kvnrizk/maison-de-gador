import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-brand-teal py-24 md:py-32 relative overflow-hidden">
        {/* Decorative gold circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-gold/10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6">
            <div className="h-px w-16 bg-brand-gold mx-auto mb-4" />
            <span className="text-brand-gold/70 text-lg tracking-[0.3em] font-[family-name:var(--font-script)]">
              La Maison de Gador
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] font-bold text-brand-gold mb-6 tracking-wide">
            {t("title")}
          </h1>
          <p className="text-brand-cream/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="h-px w-24 bg-brand-gold/40 mx-auto mt-8" />
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section className="bg-brand-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text */}
            <div>
              <div className="h-px w-12 bg-brand-gold mb-6" />
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-brand-teal mb-6 tracking-wide">
                {t("origin_title")}
              </h2>
              <p className="text-brand-dark/70 text-lg leading-relaxed">
                {t("origin_text")}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-8 bg-brand-gold/40" />
                <div className="w-2 h-2 rotate-45 border border-brand-gold/40" />
                <div className="h-px w-8 bg-brand-gold/40" />
              </div>
            </div>

            {/* Image placeholder */}
            <div className="aspect-video bg-brand-teal/5 border border-brand-gold/20 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full border border-brand-gold/30 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-brand-gold/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                    />
                  </svg>
                </div>
                <span className="text-brand-dark/30 text-sm">Brand Origin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Phoenix ── */}
      <section className="bg-brand-teal py-20 md:py-28 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-brand-gold/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-brand-gold/5 translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image placeholder (left on desktop) */}
            <div className="order-2 md:order-1">
              <div className="aspect-square bg-brand-cream/5 border border-brand-gold/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full border border-brand-gold/30 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-brand-gold/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                      />
                    </svg>
                  </div>
                  <span className="text-brand-cream/30 text-sm">
                    Phoenix Emblem
                  </span>
                </div>
              </div>
            </div>

            {/* Text (right on desktop) */}
            <div className="order-1 md:order-2">
              <div className="h-px w-12 bg-brand-gold mb-6" />
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-brand-gold mb-6 tracking-wide">
                {t("phoenix_title")}
              </h2>
              <p className="text-brand-cream/80 text-lg leading-relaxed">
                {t("phoenix_text")}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-8 bg-brand-gold/40" />
                <div className="w-2 h-2 rotate-45 border border-brand-gold/40" />
                <div className="h-px w-8 bg-brand-gold/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Craft ── */}
      <section className="bg-brand-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-px w-12 bg-brand-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-brand-teal mb-6 tracking-wide">
              {t("craft_title")}
            </h2>
            <p className="text-brand-dark/70 text-lg leading-relaxed max-w-3xl mx-auto">
              {t("craft_text")}
            </p>
          </div>

          {/* Three image placeholders */}
          <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
            {[
              { label: "Ingredients", icon: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" },
              { label: "Process", icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5l-2.366 2.366A2.25 2.25 0 0115.862 18H8.138a2.25 2.25 0 01-1.572-.634L4.2 14.5m15.6 0l.534.534c.396.396.612.934.612 1.493v.578c0 .78-.53 1.46-1.285 1.678l-.914.26c-.296.084-.616.084-.912 0l-.914-.26A1.717 1.717 0 0116.207 17v-.578c0-.56.216-1.097.612-1.493L17.432 14.5" },
              { label: "Final Product", icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
            ].map((item) => (
              <div
                key={item.label}
                className="aspect-video bg-brand-teal/5 border border-brand-gold/20 rounded-xl flex items-center justify-center group hover:border-brand-gold/40 transition-colors"
              >
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full border border-brand-gold/20 flex items-center justify-center group-hover:border-brand-gold/40 transition-colors">
                    <svg
                      className="w-7 h-7 text-brand-gold/40 group-hover:text-brand-gold/60 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <span className="text-brand-dark/30 text-sm">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-brand-teal py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="h-px w-12 bg-brand-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-brand-gold mb-4 tracking-wide">
              {t("values_title")}
            </h2>
            <div className="h-px w-24 bg-brand-gold/30 mx-auto mt-6" />
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                title: t("value_quality"),
                text: t("value_quality_text"),
                icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
              },
              {
                title: t("value_heritage"),
                text: t("value_heritage_text"),
                icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z",
              },
              {
                title: t("value_craft"),
                text: t("value_craft_text"),
                icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-brand-cream/5 backdrop-blur-sm border border-brand-gold/15 rounded-xl p-8 md:p-10 text-center hover:border-brand-gold/30 transition-colors group"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-brand-gold/30 flex items-center justify-center group-hover:border-brand-gold/50 transition-colors">
                  <svg
                    className="w-8 h-8 text-brand-gold/70 group-hover:text-brand-gold transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={value.icon}
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-brand-gold mb-3 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-brand-cream/70 leading-relaxed">
                  {value.text}
                </p>

                {/* Decorative bottom line */}
                <div className="h-px w-12 bg-brand-gold/20 mx-auto mt-6 group-hover:w-20 group-hover:bg-brand-gold/40 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
