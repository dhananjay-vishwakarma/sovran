/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'premium': {
          'black': '#000000',
          'charcoal': '#1a1a1a',
          'dark': '#0a0a0a',
          'darker': '#050505',
          'gold': '#d4af37',
          'gold-light': '#f4e4bc',
          'gold-dark': '#b8941f',
          'champagne': '#f7e7ce',
          'bronze': '#cd7f32',
          'platinum': '#e5e4e2',
        },
        'elegant': {
          'gold': '#d4af37',
          'rose-gold': '#e8b4a0',
          'silver': '#c0c0c0',
          'pearl': '#f8f6f0',
          'onyx': '#353839',
          'marble': '#f9f9f9',
        },
        'gradient': {
          'gold-start': '#d4af37',
          'gold-middle': '#f4e4bc',
          'gold-end': '#b8941f',
          'luxury': '#000000',
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { 'box-shadow': '0 0 20px #60a5fa' },
          'to': { 'box-shadow': '0 0 30px #34d399' },
        }
      }
    },
  },
  plugins: [],
};
