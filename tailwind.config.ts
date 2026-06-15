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
    },
  },
  plugins: [],
};

export default config;
