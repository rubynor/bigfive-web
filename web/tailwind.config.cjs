const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * Replaces the NextUI theme plugin. Semantic tokens keep the NextUI class
 * vocabulary (bg-background, text-foreground, text-default-500, bg-content1,
 * border-divider, primary/secondary/…) so ported markup keeps working; the
 * theme-varying ones are CSS variables set in app.css under :root / .dark.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        divider: 'rgb(var(--divider) / <alpha-value>)',
        content1: 'rgb(var(--content1) / <alpha-value>)',
        content2: 'rgb(var(--content2) / <alpha-value>)',
        content3: 'rgb(var(--content3) / <alpha-value>)',
        content4: 'rgb(var(--content4) / <alpha-value>)',
        default: { ...colors.zinc, DEFAULT: colors.zinc[300] },
        primary: {
          ...colors.blue,
          DEFAULT: colors.blue[600],
          foreground: colors.white
        },
        secondary: {
          ...colors.violet,
          DEFAULT: colors.violet[600],
          foreground: colors.white
        },
        success: {
          ...colors.emerald,
          DEFAULT: colors.emerald[500],
          foreground: colors.white
        },
        warning: {
          ...colors.amber,
          DEFAULT: colors.amber[500],
          foreground: colors.black
        },
        danger: {
          ...colors.red,
          DEFAULT: colors.red[500],
          foreground: colors.white
        }
      },
      fontFamily: {
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code Variable', ...defaultTheme.fontFamily.mono]
      },
      keyframes: {
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' }
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        heartbeat: 'heartbeat 1s ease-in-out infinite',
        'infinite-scroll': 'infinite-scroll 25s linear infinite'
      }
    }
  },
  plugins: []
};
