/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          red: "#f16f33",
          blue: "#595880",
          lighter_blue: "#8787b2",
          lightest_blue: "#cbcbe7",
          creame: "#fef4de",
          light_creame: "#fefaef",
          dark_creame: "#fce2a9",
          green: "#acbd6f",
          army_green: "#464703",
          main_creame: '#fcf4df',
          main_brown: '#dbc5b6',
          main_pink: '#f0b7c1',
          main_green: '#afbd78'
        },
      },
      fontSize: {
        small: "12px",
        medium: "14px",
        large: "16px"
      }
    },
  },
  plugins: [],
}
