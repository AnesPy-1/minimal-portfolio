import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        bg2: "#090909",
        line: "rgba(255,255,255,0.08)",
        mono: {
          white: "#ffffff",
          silver: "#d4d4d8",
          smoke: "#a1a1aa",
          ink: "#0a0a0a",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 255, 255, 0.12)",
        glass: "0 20px 60px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.09) 1px, transparent 0)",
        "hero-glow":
          "radial-gradient(circle at top, rgba(255,255,255,0.12), transparent 38%), radial-gradient(circle at bottom right, rgba(255,255,255,0.06), transparent 30%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        heroFloat: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.18", transform: "scale(1)" },
          "50%": { opacity: "0.34", transform: "scale(1.08)" },
        },
        slowSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(91,140,255,0.0)" },
          "50%": { boxShadow: "0 0 40px rgba(91,140,255,0.3)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        heroFloat: "heroFloat 8s ease-in-out infinite",
        glowPulse: "glowPulse 10s ease-in-out infinite",
        slowSpin: "slowSpin 24s linear infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
