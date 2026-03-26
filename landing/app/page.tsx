import SignupForm from "@/components/SignupForm";

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-brand-teal relative overflow-hidden">
      {/* Subtle gold radial glow */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 40%, #C9A84E 0%, transparent 70%)`,
      }} />

      {/* Decorative side flourish (echoing logo's wing pattern) */}
      <div className="absolute left-0 top-0 w-1/3 h-full opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(ellipse at 0% 50%, #C9A84E 0%, transparent 60%)`,
      }} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo — full brand mark with phoenix, wordmark, and "Chocolatier" */}
        <div className="mb-4">
          <img
            src="/logo.png"
            alt="La Maison de Gador — Chocolatier"
            className="h-48 sm:h-56 md:h-64 w-auto"
          />
        </div>

        {/* Gold decorative line */}
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent my-8" />

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-brand-cream text-center mb-4 font-light italic">
          Something Beautiful is Coming
        </h1>

        <p className="text-lg text-brand-cream/60 text-center max-w-lg mb-10 leading-relaxed">
          Premium chocolate dates, handcrafted with love in Doha.
          <br />
          <span className="text-brand-gold font-medium">Be the first to taste.</span>
        </p>

        {/* Signup Form */}
        <SignupForm />

        {/* WhatsApp Link */}
        <a
          href="https://wa.me/97433314007?text=I%20want%20to%20know%20more%20about%20La%20Maison%20de%20Gador"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 text-sm text-brand-gold/60 hover:text-brand-gold underline underline-offset-4 transition-colors"
        >
          Or reach us on WhatsApp
        </a>

        {/* Social Links */}
        <div className="mt-16 flex gap-8 text-brand-gold/30">
          <a href="https://instagram.com/lamaisondegador" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors text-sm tracking-wider uppercase">
            Instagram
          </a>
          <a href="https://facebook.com/lamaisondegador" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors text-sm tracking-wider uppercase">
            Facebook
          </a>
          <a href="https://tiktok.com/@lamaisondegador" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors text-sm tracking-wider uppercase">
            TikTok
          </a>
        </div>

        {/* Tagline + Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm italic text-brand-gold/40 mb-2">
            The Art of Adoration
          </p>
          <p className="text-xs text-brand-cream/20">
            &copy; {new Date().getFullYear()} La Maison de Gador
          </p>
        </div>
      </div>
    </main>
  );
}
