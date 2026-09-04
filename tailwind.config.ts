import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./feature/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B1C2C",
          50: "#EEF2F5",
          100: "#D3DCE3",
          200: "#A6B9C7",
          300: "#7996AB",
          400: "#4C738F",
          500: "#2B5573",
          600: "#173D57",
          700: "#0F2C40",
          800: "#0B1C2C",
          900: "#071220",
        },
        paper: {
          DEFAULT: "#F7F5F0",
          dim: "#EFEBE2",
        },
        amber: {
          DEFAULT: "#E8A33D",
          light: "#F4C878",
          dark: "#C67F1E",
        },
        teal: {
          DEFAULT: "#1B6E5B",
          light: "#2E9179",
          dark: "#124F41",
        },
        charcoal: "#1A1F26",
        line: "#D9D2C2",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(217,210,194,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(217,210,194,0.35) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
      boxShadow: {
        switch: "0 0 0 1px rgba(232,163,61,0.35), 0 0 24px rgba(232,163,61,0.35)",
        card: "0 1px 2px rgba(11,28,44,0.06), 0 8px 24px rgba(11,28,44,0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        flicker: "flicker 3s ease-in-out infinite",
        rise: "rise 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
