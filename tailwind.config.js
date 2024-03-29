/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        warmblack: "#242423",
        warning: "#ea8c55",
        error: "#eb445a",
        success: "#588157",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Quicksand", "sans-serif"],
      },
      width: {
        4.5: "1.125rem",
      },
      height: {
        4.5: "1.125rem",
      },
      boxShadow: {
        shadowBase: "0 0 10px 0 rgba(24,24,23,0.1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
