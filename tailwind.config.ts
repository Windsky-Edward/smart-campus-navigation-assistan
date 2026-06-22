import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        upm: { DEFAULT: "#B5121B", dark: "#7F0D14", light: "#FFF1F2" },
        secondary: "#2D6CDF",
        success: "#4CAF50",
        warning: "#FF9800",
        error: "#F44336",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Arial", "sans-serif"],
        heading: ["Poppins", "Inter", "Segoe UI", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(127, 13, 20, 0.08)",
        float: "0 16px 44px rgba(127, 13, 20, 0.16)",
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
