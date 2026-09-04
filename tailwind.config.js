/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50:  '#eef8f6',
          100: '#d8efeb',
          200: '#b4dfd8',
          300: '#83c9bf',
          400: '#4eaea1',
          500: '#278f84',
          600: '#18756d',
          700: '#155e59',
          800: '#154b48',
          900: '#133f3d',
          950: '#0c2928',
        },
        primary: {
          50:  '#eef8f6',
          100: '#d8efeb',
          200: '#b4dfd8',
          300: '#83c9bf',
          400: '#4eaea1',
          500: '#278f84',
          600: '#18756d',
          700: '#155e59',
          800: '#154b48',
          900: '#133f3d',
        },
        sky: {
          50:  '#f3f8f6',
          400: '#75b8a9',
          500: '#4e9b8c',
          600: '#347d70',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
