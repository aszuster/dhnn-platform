module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["HelveticaNowDisplayRegular", "system-ui"],
      secondary: ["NeueMachinaLight"],
      bold: ["HelveticaNowDisplayBold"],
      thin: ["HelveticaNowDisplayThin"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "bp-ope": "1380px",
      "2xl": "1530px",
      "3xl": "1900px",
    },
    maxWidth: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#282728",
        gray: "#D9D9D9",
        grayDHNN: "#C4C4C4",
        grayDHNN2: "#1C1C1C",
        grayDHNN3: "#7B7B7B",
        yellowDHNN: "#FFFF05",
        white: "#FFFFFF",
        scroll: "rgba(74,72,74,0.6)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        bars: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
    borderRadius: {
      none: "0",
      xs: "30px",
      s: "2.625rem",
      m: "2.875rem",
      lg: "46px",
      full: "9999px",
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/line-clamp")],
  variants: {
    scrollbar: ["rounded"],
  },
}
