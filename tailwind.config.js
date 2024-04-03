/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090A'
      },
      grid: {
        templateRows: {
          7: 'repeat(7, minmax(0, 1fr))'
        }
      },
      backgroundImage: {
        'backgroundHome': "url('./src/assets/Desktop - 1 (4).svg')",
      }
    },
  },
  plugins: [],
}

