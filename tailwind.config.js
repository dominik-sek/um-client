/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['Montserrat', 'sans-serif']
      },
      colors:{
        primary: "#4DC591",
        secondary: "#9BA1FF",
        tertiary: "#FF7648",
        gray:{
          'dark': '#191B32',
          'light': '#9295A3',
        }
      },

    },
  },
  plugins: [],
}
