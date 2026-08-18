import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#111111',
          hover: '#2d2d2d',
          muted: '#666666',
        },
        accent: {
          DEFAULT: '#8b7355',
          light: '#c4a882',
          dark: '#5c4b35',
        },
        earth: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#e8dfd3',
          300: '#d5c4b0',
          800: '#3e3427',
          900: '#2c2416',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f9f9f9',
          dark: '#18181b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        elevated: '0 8px 32px rgba(0, 0, 0, 0.12)',
        drawer: '-4px 0 24px rgba(0, 0, 0, 0.15)',
      },
      zIndex: {
        overlay: '300',
        drawer: '400',
        modal: '500',
        toast: '600',
      },
      transitionDuration: {
        fast: '150ms',
        DEFAULT: '250ms',
        slow: '400ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 250ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'slide-right': 'slideRight 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left': 'slideLeft 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
