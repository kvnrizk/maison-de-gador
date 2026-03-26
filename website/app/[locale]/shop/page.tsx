import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { products } from "@/data/products";

export default async function ShopPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations("shop");
  const lang = locale === "ar" ? "ar" : "en";

  const categories = [
    { key: "all", label: t("filter_all") },
    { key: "signature", label: t("filter_signature") },
    { key: "premium", label: t("filter_premium") },
    { key: "gifting", label: t("filter_gifting") },
  ];

  const categoryColors: Record<string, string> = {
    signature: "bg-brand-teal/10 text-brand-teal",
    premium: "bg-brand-gold/10 text-brand-gold",
    gifting: "bg-brand-burgundy/10 text-brand-burgundy",
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Page Header */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-4">
            {t("title")}
          </h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6" />
          <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container mx-auto px-6 pb-4">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <span
              key={cat.key}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-default ${
                cat.key === "all"
                  ? "bg-brand-teal text-white shadow-md"
                  : "bg-white text-brand-dark/60 border border-brand-gold/20 hover:border-brand-gold/40"
              }`}
            >
              {cat.label}
            </span>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-brand-gold/10 transition-all duration-300 hover:border-brand-gold/40 hover:shadow-lg hover:shadow-brand-gold/5">
                {/* Image Placeholder */}
                <div className="aspect-square bg-brand-teal/5 border-b border-brand-gold/20 flex items-center justify-center">
                  <div className="text-brand-gold/30">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-3 ${
                      categoryColors[product.category] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.category}
                  </span>

                  {/* Product Name */}
                  <h3 className="text-lg font-[family-name:var(--font-playfair)] font-semibold text-brand-dark mb-2 group-hover:text-brand-teal transition-colors">
                    {product.name[lang]}
                  </h3>

                  {/* Price */}
                  <p className="text-brand-gold font-bold text-xl mb-4">
                    {product.price}{" "}
                    <span className="text-sm font-normal text-brand-dark/50">
                      {product.currency}
                    </span>
                  </p>

                  {/* View Details */}
                  <span className="inline-flex items-center text-sm font-medium text-brand-teal group-hover:text-brand-gold transition-colors">
                    {t("view_details")}
                    <svg
                      className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        lang === "ar" ? "mr-2 rotate-180" : "ml-2"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
