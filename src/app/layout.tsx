import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXORA — 3D Developer Portfolio | I DESIGN, I CREATE, I DEVELOP",
  description:
    "Cinematic 3D interactive portfolio of NEXORA. Creative developer and UI engineer crafting immersive digital experiences, WebGL spatial environments, and high-performance web applications with live embedded previews.",
  keywords: [
    "NEXORA",
    "Creative Developer",
    "3D Developer Portfolio",
    "Three.js",
    "WebGL",
    "Next.js",
    "TypeScript",
    "Interactive Portfolio",
    "Frontend Engineer",
    "Tailwind CSS",
  ],
  authors: [{ name: "NEXORA" }],
  openGraph: {
    title: "NEXORA — Interactive 3D Developer Portfolio",
    description: "I DESIGN, I CREATE, I DEVELOP. Explore live interactive applications and spatial 3D developer workstation.",
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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080A09] text-white antialiased selection:bg-[#B6FF3B] selection:text-black min-h-screen relative font-sans">
        {children}
      </body>
    </html>
  );
}
