/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        sm: '576px',
        md: '768px',
        lg: '1024px',
        xl: '1400px',
      },
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
        },
        red:{
          'light':'#FF316F',
        }
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
