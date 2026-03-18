/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'care-green': '#4A614A', // Hijau gelap seperti di tombol
        'care-bg': '#F9FAF7',    // Background krem pucat
      },
    },
  },
  plugins: [],
}