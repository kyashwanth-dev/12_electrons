/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        bg: { DEFAULT: 'var(--bg)', 2: 'var(--bg2)', 3: 'var(--bg3)', 4: 'var(--bg4)' },
        border: { DEFAULT: 'var(--border)', 2: 'var(--border2)', 3: 'var(--border3)' },
        text: { DEFAULT: 'var(--text)', 2: 'var(--text2)', 3: 'var(--text3)', 4: 'var(--text4)', 5: 'var(--text5)' },
        green: { DEFAULT: 'var(--green)', hover: 'var(--green-hover)', dim: 'var(--green-dim)' },
        blue: { DEFAULT: 'var(--blue)', hover: 'var(--blue-hover)', dim: 'var(--blue-dim)' },
        orange: { DEFAULT: 'var(--orange)', hover: 'var(--orange-hover)', dim: 'var(--orange-dim)' },
        // Legacy mappings to keep existing pages working seamlessly
        navy: {
          DEFAULT: 'var(--text)',
          500: 'var(--text2)',
          600: 'var(--text3)',
          800: 'var(--text4)',
        },
        accent: {
          DEFAULT: 'var(--blue)',
          light: 'var(--blue)',
          subtle: 'var(--blue-dim)',
          border: 'var(--border)',
        },
        surface: {
          DEFAULT: 'var(--bg2)',
          2: 'var(--bg3)',
        },
      },
      keyframes: {
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'ticker': 'ticker-scroll 20s linear infinite',
      }
    },
  },
  plugins: [],
}
