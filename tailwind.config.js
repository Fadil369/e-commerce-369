/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Noto Sans Arabic", "Arial", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        secondary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
        },
        saudi: {
          green: "#006C35",
          gold: "#FFD700",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "saudi-pattern":
          "linear-gradient(45deg, #006C35 25%, transparent 25%), linear-gradient(-45deg, #006C35 25%, transparent 25%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    // RTL support plugin
    function ({ addUtilities }) {
      const newUtilities = {
        ".rtl": {
          direction: "rtl",
        },
        ".ltr": {
          direction: "ltr",
        },
        ".text-start": {
          "text-align": "left",
          '[dir="rtl"] &': {
            "text-align": "right",
          },
        },
        ".text-end": {
          "text-align": "right",
          '[dir="rtl"] &': {
            "text-align": "left",
          },
        },
        ".ml-auto-rtl": {
          "margin-left": "auto",
          '[dir="rtl"] &': {
            "margin-left": "0",
            "margin-right": "auto",
          },
        },
        ".mr-auto-rtl": {
          "margin-right": "auto",
          '[dir="rtl"] &': {
            "margin-right": "0",
            "margin-left": "auto",
          },
        },
        ".pl-4-rtl": {
          "padding-left": "1rem",
          '[dir="rtl"] &': {
            "padding-left": "0",
            "padding-right": "1rem",
          },
        },
        ".pr-4-rtl": {
          "padding-right": "1rem",
          '[dir="rtl"] &': {
            "padding-right": "0",
            "padding-left": "1rem",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
