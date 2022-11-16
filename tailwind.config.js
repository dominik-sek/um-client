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
        blue:{
          'light':'#2499EF',
        },
        gray:{
          'light':'#8CA3BA',
          'medium': '#222B36',
          'dark': '#171C24',
        }
      },

    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
