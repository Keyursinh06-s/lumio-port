/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-gray': '#707070',
        'brand-white': '#ffffff',
        'brand-light-gray': '#bababa',
        'brand-border-gray': '#c9c9c9',
        'brand-bg-gray': '#ebeced',
      },
      fontFamily: {
        heading: ['Geist', '"Geist Placeholder"', 'sans-serif'],
        body: ['Geist', '"Geist Placeholder"', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '30px',
        'inner-card': '25px',
        'pill': '50px',
      },
      boxShadow: {
        'card': '0px 10px 20px 0px rgba(0, 0, 0, 0.1)',
        'navbar': '0px 10px 26px -4.5px rgba(0, 0, 0, 0.02)',
        'input': '0px 5px 20px 0px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
