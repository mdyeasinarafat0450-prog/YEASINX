import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080A09",
        foreground: "#FFFFFF",
        surface: {
          50: "#1A221E",
          100: "#141A16",
          200: "#0E1210",
          300: "#0B0E0C",
          400: "#080A09",
        },
        neon: {
          DEFAULT: "#B6FF3B",
          50: "#F4FFE0",
          100: "#E7FFB8",
          200: "#D6FF85",
          300: "#C4FF52",
          400: "#B6FF3B",
          500: "#98E61C",
          600: "#75B30F",
          glow: "rgba(182, 255, 59, 0.35)",
        },
        muted: {
          DEFAULT: "#8E9590",
          light: "#B8C0BA",
          dark: "#4B534D",
        },
        border: "rgba(182, 255, 59, 0.12)",
        "border-light": "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        neon: "0 0 25px rgba(182, 255, 59, 0.35)",
        "neon-sm": "0 0 12px rgba(182, 255, 59, 0.25)",
        "neon-lg": "0 0 50px rgba(182, 255, 59, 0.45)",
        "neon-inset": "inset 0 0 20px rgba(182, 255, 59, 0.2)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
