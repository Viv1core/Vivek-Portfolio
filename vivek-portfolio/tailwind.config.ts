import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0D0D0D",
        accent: {
          DEFAULT: "#FF2D2D",
          dim: "#D60000",
        },
        highlight: "#FFFFFF",
        ink: {
          DEFAULT: "#F5F5F5",
          muted: "#A0A0A0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        "clamp-hero": "clamp(3.5rem, 11vw, 10.5rem)",
        "clamp-h2": "clamp(2.25rem, 6vw, 5rem)",
        "clamp-h3": "clamp(1.5rem, 3vw, 2.5rem)",
      },
      letterSpacing: {
        tightest2: "-0.04em",
        widest2: "0.28em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        blink: "blink 1.2s step-start infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
