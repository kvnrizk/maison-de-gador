import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "La Maison de Gador — Chocolatier",
    template: "%s | La Maison de Gador",
  },
  description: "Premium chocolate dates, handcrafted in Qatar. The Art of Adoration.",
  openGraph: {
    title: "La Maison de Gador — Chocolatier",
    description: "Premium chocolate dates, handcrafted in Qatar.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
