/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        topgear: ['"Oswald"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'slap': 'slapDown 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'frost': 'frostGlow 3s ease-in-out infinite',
        'subzero-pulse': 'subzeroPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flame': 'flameFlicker 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'ladder': 'bounceLadder 1s ease-in-out infinite alternate',
      },
      keyframes: {
        slapDown: {
          '0%': { transform: 'scale(1.15) rotate(4deg)', opacity: '0.85' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        frostGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(56, 189, 248, 0.4), inset 0 0 15px rgba(56, 189, 248, 0.2)' },
          '50%': { boxShadow: '0 0 35px rgba(56, 189, 248, 0.8), inset 0 0 25px rgba(56, 189, 248, 0.5)' },
        },
        subzeroPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.6' },
        },
        flameFlicker: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))' },
          '50%': { filter: 'drop-shadow(0 0 18px rgba(249, 115, 22, 1))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceLadder: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
