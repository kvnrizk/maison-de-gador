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
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Maison de Gador — Chocolatier",
    description: "Premium chocolate dates, handcrafted in Qatar.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
