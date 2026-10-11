import type { Metadata, Viewport } from "next";
import { Inter, Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NEON//FRAME — Creative Developer & Motion Designer Portfolio",
  description:
    "Production-grade interactive portfolio of NEON//FRAME. Creative developer, web designer, and motion designer crafting high-impact digital experiences with live embedded previews.",
  keywords: [
    "Creative Developer",
    "Web Designer",
    "Motion Designer",
    "Next.js",
    "Interactive Portfolio",
    "WebGL",
    "GSAP",
    "Frontend Engineer",
  ],
  authors: [{ name: "NEON//FRAME" }],
  openGraph: {
    title: "NEON//FRAME — Interactive Portfolio",
    description: "Explore digital experiences and live interactive applications.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#080A09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${spaceMono.variable} dark`}
    >
      <body className="bg-background text-foreground antialiased selection:bg-neon selection:text-background min-h-screen relative font-sans">
        {children}
      </body>
    </html>
  );
}
