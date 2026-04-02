import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "La Maison de Gador — Chocolatier";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#1B4D4D",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Gold top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #C9A84E, transparent)",
          }}
        />
        {/* Gold bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #C9A84E, transparent)",
          }}
        />

        {/* Logo */}
        <img
          src="https://maison-de-gador.vercel.app/logo.png"
          width={140}
          height={140}
          style={{ marginBottom: "24px", objectFit: "contain" }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: "bold",
            color: "#C9A84E",
            letterSpacing: "0.15em",
            marginBottom: "8px",
          }}
        >
          LA MAISON DE GADOR
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div style={{ width: "60px", height: "1px", background: "#C9A84E88" }} />
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "#C9A84E",
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ width: "60px", height: "1px", background: "#C9A84E88" }} />
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "26px",
            color: "#F5F0E8CC",
            letterSpacing: "0.05em",
          }}
        >
          Premium chocolate dates, handcrafted in Doha
        </div>
      </div>
    ),
    { ...size }
  );
}
