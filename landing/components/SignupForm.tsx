"use client";

import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center">
        <p className="text-lg text-brand-gold font-medium">
          Thank you! We&apos;ll notify you when we launch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 px-4 py-3 rounded-lg border border-brand-gold/20 bg-brand-dark/30 text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 transition-shadow"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-brand-gold text-brand-dark rounded-lg font-medium hover:bg-brand-gold-light transition-colors disabled:opacity-60"
      >
        {loading ? "..." : "Notify Me"}
      </button>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </form>
  );
}
