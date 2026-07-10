tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        surface: "#FFFFFF",
        primary: "#2563EB",
        "primary-soft": "#DBEAFE",
        border: "#E2E8F0",
        ink: "#0F172A",
        muted: "#64748B",
        success: "#059669",
        warning: "#D97706",
        danger: "#DC2626",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
        panel: "0 12px 28px rgba(15, 23, 42, 0.06)",
      },
      borderRadius: {
        panel: "16px",
      },
      maxWidth: {
        studio: "1600px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
};
