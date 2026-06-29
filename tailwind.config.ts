import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0F766E",
          dark: "#115E59",
          soft: "#CCFBF1",
          gold: "#C9A24A",
          ivory: "#FFF7ED",
          ink: "#1F2933",
          muted: "#667085",
        },
      },
      fontFamily: {
        sans: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(31, 41, 51, 0.10)",
      },
      keyframes: {
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.6) translateY(8px)" },
          "70%": { transform: "scale(1.08) translateY(0)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "70%": { transform: "scale(1.15)", opacity: "0" },
          "100%": { transform: "scale(1.15)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "marquee-rtl": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "marquee-rtl": "marquee-rtl 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
