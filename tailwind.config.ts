import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        korzina: {
          bg: "#f6f8f6",
          surface: "#d7dfda",
          primary: "#34774a",
          primaryDark: "#0d4333",
          accent: "#f3a821",
          accentDark: "#e47021",
          text: "#0d4333",
          textMuted: "rgba(13, 67, 51, 0.75)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
