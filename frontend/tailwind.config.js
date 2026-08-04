/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — deep botanical green (canopy)
        canopy: {
          DEFAULT: '#1B4332',
          50: '#EAF4EF',
          100: '#CFE8DA',
          200: '#9FD1B6',
          300: '#6FB992',
          400: '#40916C',
          500: '#2D6A4F',
          600: '#1B4332',
          700: '#153627',
          800: '#0F2A1F',
          900: '#0A1D15',
        },
        // Accent — harvest marigold-orange
        harvest: {
          DEFAULT: '#E8873A',
          50: '#FDF3E9',
          100: '#FBE3C8',
          200: '#F6C68E',
          300: '#F1A85B',
          400: '#E8873A',
          500: '#D46F22',
          600: '#AD5A1B',
          700: '#824314',
        },
        // Secondary — warm paper white
        cream: {
          DEFAULT: '#FAF7F0',
          100: '#FFFFFF',
          200: '#F3EEE2',
        },
        // Ink — warm near-black for text
        soil: {
          DEFAULT: '#2B2118',
          light: '#5C4E3F',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      keyframes: {
        scan: {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'grow-in': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      animation: {
        scan: 'scan 2.4s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'grow-in': 'grow-in 0.8s ease-out both',
        sway: 'sway 6s ease-in-out infinite',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(27, 67, 50, 0.12)',
        card: '0 2px 12px 0 rgba(43, 33, 24, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
