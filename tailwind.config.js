/** @type {import('tailwindcss').Config} */

import { tailwindCustomColors } from "./src/tailwind/colors";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "360px",
        xs: "480px",
        lmd: "990px",
      },
      colors: {
        blue: tailwindCustomColors.blue,
        red: tailwindCustomColors.red,
        gray: tailwindCustomColors.gray,
      },
    },
  },
  plugins: [],
};
