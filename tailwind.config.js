/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'care-green': '#4A614A', 
        'care-bg': '#F9FAF7',   
      },
    },
  },
  plugins: [],
}