/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.{handlebars,js}",
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}