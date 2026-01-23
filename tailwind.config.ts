import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A792",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F23813",
          foreground: "#FFFFFF",
        },
        background: "#F7F7F7",
        foreground: "#000000",
        text: {
          primary: "#000000",
          secondary: "#1C1B1F",
          muted: "#595959",
          light: "#818181",
          white: "#FFFFFF",
          gray: "#778088",
          dark: "#495560",
        },
        teal: {
          DEFAULT: "#00A792",
          light: "#7BBCB0",
        },
        orange: "#FFA432",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1C2B38",
        },
        border: "rgba(0, 0, 0, 0.09)",
        input: "#FFFFFF",
        ring: "#00A792",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        volkhov: ["var(--font-volkhov)", "serif"],
        mulish: ["var(--font-mulish)", "sans-serif"],
        openSans: ["var(--font-open-sans)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "30px",
        "5xl": "60px",
      },
      backdropBlur: {
        xs: "2.5px",
        "2xl": "55.55px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
