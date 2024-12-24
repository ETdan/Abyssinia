/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Amarante", "cursive"], // Make Amarante the default font for sans
      },
      colors: {
        primary: "#fcbb00",
        secondary: "#FFA500",
        danger: "#FF0000",
      },
    },
  },
  plugins: [],
};
