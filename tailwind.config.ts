import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        racing: {
          red: "#F7D619",
          "red-dark": "#D4BB0A",
          "red-glow": "rgba(247, 214, 25, 0.3)",
        },
        carbon: {
          950: "#0A0A0A",
          900: "#111111",
          800: "#1A1A1A",
          700: "#222222",
          600: "#2D2D2D",
          500: "#404040",
          400: "#555555",
          300: "#777777",
        },
        metal: {
          light: "#C0C0C0",
          DEFAULT: "#8A8A8A",
          dark: "#5A5A5A",
        },
      },
      fontFamily: {
        heading: ["Rajdhani", "Oswald", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "count-up": "countUp 2s ease-out forwards",
        "line-expand": "lineExpand 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(247, 214, 25, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(247, 214, 25, 0.4)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        lineExpand: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      backgroundImage: {
        "carbon-fiber":
          "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "red-gradient": "linear-gradient(135deg, #F7D619 0%, #D4BB0A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
