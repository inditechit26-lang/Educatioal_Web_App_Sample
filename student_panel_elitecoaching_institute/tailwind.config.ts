import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F8FAFC",
        ink: "#0F172A",
        muted: "#64748B",
        line: "#E2E8F0",
        brand: "#2563EB",
        accent: "#0EA5E9",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,.03), 0 8px 24px rgba(15,23,42,.04)",
        lift: "0 14px 32px rgba(15,23,42,.09)",
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] },
    },
  },
  plugins: [],
};

export default config;
