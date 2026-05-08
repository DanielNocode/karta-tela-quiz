import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#0E0B1A",
        "bg-mid": "#16122B",
        "accent-primary": "#A99CFB",
        "accent-secondary": "#9B8FE8",
        "accent-glow": "#C4B7FF",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B8B0D9",
        "text-muted": "#7A7396",
        success: "#7FE5B0",
        error: "#FF7B91",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "Inter", "sans-serif"],
      },
      borderColor: {
        "subtle": "rgba(169, 156, 251, 0.2)",
        "active": "rgba(169, 156, 251, 0.6)",
      },
      backgroundImage: {
        "cosmic-radial":
          "radial-gradient(ellipse at top, #1F1640 0%, #0E0B1A 65%)",
        "cta-gradient":
          "linear-gradient(135deg, #A99CFB 0%, #8B7BE8 100%)",
        "progress-gradient":
          "linear-gradient(90deg, #A99CFB 0%, #C4B7FF 100%)",
      },
      boxShadow: {
        "glow-sm": "0 0 8px rgba(169, 156, 251, 0.6)",
        "glow-md": "0 0 12px rgba(169, 156, 251, 0.6)",
        "glow-lg": "0 4px 20px rgba(169, 156, 251, 0.3)",
        "glow-xl": "0 6px 28px rgba(169, 156, 251, 0.5)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { boxShadow: "0 4px 20px rgba(169, 156, 251, 0.3)" },
          "50%": { boxShadow: "0 4px 28px rgba(169, 156, 251, 0.6)" },
        },
        spinGlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease both",
        "pulse-glow": "pulse 2s infinite",
        "spin-glow": "spinGlow 1.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
