/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f0f3',
          100: '#ebe1e7',
          200: '#d7c3cf',
          300: '#c3a5b7',
          400: '#af879f',
          500: '#9b6987',
          600: '#7c546c',
          700: '#5d3f51',
          800: '#3e2a36',
          900: '#1f151b',
        },
        brand: {
          purple: '#6b4d5e',
          cream: '#f5ede8',
          mauve: '#8b6d7f',
        },
      },
    },
  },
  plugins: [],
}
