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
          bg: "#fffaf6",
          surface: "#ffffff",
          primary: "#FE6900",
          primaryDark: "#E85D00",
          accent: "#FE6900",
          accentDark: "#D95400",
          text: "#0f172a",
          textMuted: "rgba(15, 23, 42, 0.72)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
