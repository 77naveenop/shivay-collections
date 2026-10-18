/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbf7ee',
          100: '#f5edd6',
          200: '#edd9ad',
          300: '#e3be7c',
          400: '#d9a24e',
          500: '#c5842c', // Royal Warm Gold
          600: '#ad6a22',
          700: '#894e1d',
          800: '#71401e',
          900: '#5f361c',
          950: '#371c0c',
        },
        royal: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
