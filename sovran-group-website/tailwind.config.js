/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  important: true, // This forces Tailwind styles to have higher specificity
  safelist: [
    'bg-dark-900/95',
    'bg-transparent',
    'bg-dark-700',
    'bg-dark-800',
    'text-primary-400',
    'bg-primary-600',
    'bg-primary-700',
    'hover:bg-primary-700',
    'hover:text-primary-400',
    'hover:bg-dark-700',
    'font-sans',
    'font-serif',
    'tracking-wide',
    'tracking-wider'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdfaf5',
          100: '#f9f2e6', 
          200: '#f2e5d0',
          300: '#ebd8b9',
          400: '#e2c9a0',
          500: '#d9b987',
          600: '#CDAD7D', // Keep the accent color
          700: '#b99565',
          800: '#9e7e53',
          900: '#836741',
        },
        dark: {
          50: '#ffffff', // White
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#000000', // Black
        }
      },
      fontFamily: {
        'sans': ['"ivymode"', 'sans-serif'],
        'serif': ['"ivymode"', 'serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      fontWeight: {
        'thin': 200,
        'light': 300,
        'normal': 400,
        'medium': 400, // Using regular for medium as there's no 500
        'semibold': 600,
        'bold': 700,
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-right': 'slideRight 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
