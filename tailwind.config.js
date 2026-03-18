/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      'care-green': '#4A7c59', 
      'care-light': '#F8F9F4',
    }
  },
},
  plugins: [],
}