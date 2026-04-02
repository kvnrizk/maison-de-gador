import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { products, getProduct } from "@/data/products";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ["en", "ar"].flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug }))
  );
}

export default async function ProductPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations("product");
  const lang = locale === "ar" ? "ar" : "en";

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ordering: ${product.name.en}`
  );
  const whatsappUrl = `https://wa.me/97470770747?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Back Link */}
      <div className="container mx-auto px-6 pt-8">
        <Link
          href="/shop"
          className="inline-flex items-center text-sm font-medium text-brand-teal hover:text-brand-gold transition-colors"
        >
          <svg
            className={`w-4 h-4 ${lang === "ar" ? "ml-2 rotate-180" : "mr-2"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("back_to_shop")}
        </Link>
      </div>

      {/* Product Detail */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Placeholder */}
          <div className="aspect-square bg-brand-teal/5 border border-brand-gold/20 rounded-xl flex items-center justify-center">
            <div className="text-brand-gold/30">
              <svg
                className="w-24 h-24"
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

          {/* Right: Product Info */}
          <div className="flex flex-col justify-center">
            {/* Category Badge */}
            <span className="inline-block self-start px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider bg-brand-teal/10 text-brand-teal mb-4">
              {product.category}
            </span>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-brand-dark mb-4">
              {product.name[lang]}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-brand-gold mb-8">
              {product.price}{" "}
              <span className="text-lg font-normal text-brand-dark/50">
                {product.currency}
              </span>
            </p>

            {/* Description */}
            <p className="text-brand-dark/70 text-lg leading-relaxed mb-10">
              {product.description[lang]}
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-brand-gold/20 mb-10" />

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-lg font-[family-name:var(--font-playfair)] font-semibold text-brand-dark mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center me-3">
                  <svg
                    className="w-4 h-4 text-brand-gold"
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
                {t("ingredients")}
              </h2>
              <ul className="space-y-2 ms-11">
                {product.ingredients[lang].map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center text-brand-dark/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold me-3 flex-shrink-0" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Perfect For */}
            <div className="mb-10">
              <h2 className="text-lg font-[family-name:var(--font-playfair)] font-semibold text-brand-dark mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center me-3">
                  <svg
                    className="w-4 h-4 text-brand-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                {t("perfect_for")}
              </h2>
              <div className="flex flex-wrap gap-2 ms-11">
                {product.perfectFor[lang].map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-brand-burgundy/10 text-brand-burgundy text-sm font-medium border border-brand-burgundy/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Order via WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-teal text-white font-semibold rounded-xl hover:bg-brand-teal/90 transition-all duration-300 hover:shadow-lg hover:shadow-brand-teal/20 text-lg"
            >
              <svg
                className={`w-6 h-6 ${lang === "ar" ? "ml-3" : "mr-3"}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t("order_whatsapp")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
