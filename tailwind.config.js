/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1f5f9',
          100: '#d9e3ec',
          500: '#426482',
          600: '#244e75',
          700: '#0a345c',
          800: '#082a4a',
          900: '#061e36',
          accent: '#f58c20',
          red: '#de0029',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 40px rgba(19, 52, 72, .08)',
      },
    },
  },
  plugins: [],
}
