import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        upm: { DEFAULT: "#3F7FA6", dark: "#2B5F7D", light: "#EAF4F8" },
        brand: { DEFAULT: "#C8102E", dark: "#8F0B1F", light: "#FFF1F3" },
        secondary: "#5B8FB9",
        success: "#3D8B6D",
        warning: "#FF9800",
        error: "#C8102E",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Arial", "sans-serif"],
        heading: ["Poppins", "Inter", "Segoe UI", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(43, 95, 125, 0.08)",
        float: "0 16px 44px rgba(43, 95, 125, 0.14)",
      },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        pulseRing: { "0%,100%": { transform: "scale(.85)", opacity: ".6" }, "50%": { transform: "scale(1.2)", opacity: ".15" } },
      },
      animation: { "fade-up": "fade-up .35s ease-out", "pulse-ring": "pulseRing 1.8s ease-in-out infinite" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
