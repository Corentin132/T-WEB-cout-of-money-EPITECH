import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      spacing: {
        "128": "32rem",
      },
    },
    colors: {
      bluePrimary: "var(--primary-blue)",
      lightBluePrimary: "var(--primary-blue-light)",
      darkBluePrimary: "var(--primary-blue-dark)",
      orangeSecondary: "var(--secondary-orange)",
      grey: "var(--grey)",
      bgGrey: "var(--bg-grey)",
      successLight: "var(--success-green-light)",
      errorLight: "var(--error-red-light)",
      cryptoPositiveGreen: "var(--crypto-positive-green)",
      cryptoNegativeRed: "var(--crypto-negative-red)",
      ...colors,
    },
    fontFamily: {
      sans: ["var(--font-family)", "ui-sans-serif", "system-ui"],
    },
    screens: {
      desktop: { max: "1280px" },
      laptop: { max: "1024px" },
      tablet: { max: "768px" },
      mobile: { max: "640px" },
    },
  },
  plugins: [],
} satisfies Config;
