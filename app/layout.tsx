import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "./fonts/SpaceGrotesk-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/SpaceGrotesk-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/SpaceGrotesk-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/SpaceGrotesk-700.woff2", weight: "700", style: "normal" },
  ],
});

const body = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "./fonts/Inter-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Inter-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Inter-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Inter-700.woff2", weight: "700", style: "normal" },
  ],
});

const mono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    { path: "./fonts/JetBrainsMono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/JetBrainsMono-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/JetBrainsMono-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/JetBrainsMono-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thermalforge.io"),
  title: "ThermalForge — Direct-to-Chip Liquid Cooling for AI Racks (30–130 kW)",
  description:
    "ThermalForge designs, retrofits, and operates direct-to-chip liquid cooling for high-density AI infrastructure. Cut PUE below 1.10, triple rack density, and deploy in weeks. Audit your facility, model the savings, and operate from one portal.",
  keywords: [
    "liquid cooling", "direct-to-chip cooling", "data center cooling",
    "AI data center", "GPU rack cooling", "CDU", "cold plate", "PUE reduction",
    "high density rack", "data center retrofit", "thermal management",
  ],
  authors: [{ name: "ThermalForge" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    title: "ThermalForge — Liquid Cooling That Deploys at AI Scale",
    description:
      "Direct-to-chip liquid cooling for 30–130 kW racks. Lower PUE, higher density, faster deployment. Model your savings in 60 seconds.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    siteName: "ThermalForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThermalForge — Liquid Cooling for AI Data Centers",
    description:
      "Direct-to-chip liquid cooling for 30–130 kW racks. Model your savings in 60 seconds.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Toaster
          position="top-center"
          theme="dark"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "#0d1219",
              border: "1px solid #1f2935",
              color: "#e8eef5",
            },
          }}
        />
      </body>
    </html>
  );
}
