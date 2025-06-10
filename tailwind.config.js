/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import flowbitePlugin from 'flowbite/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        elevate: 'var(--color-elevate)',
        surface: 'var(--color-surface)',
        'on-primary': 'var(--color-on-primary)',
        'on-secondary': 'var(--color-on-secondary)',
        'on-tertiary': 'var(--color-on-tertiary)',
        'on-elevate': 'var(--color-on-elevate)',
        'on-surface': 'var(--color-on-surface)',
      },
    },
  },
  plugins: [
    flowbitePlugin,
    plugin(function({ addBase, theme }) {
      addBase({
        ":root": {
          "--color-primary": '#242424',
          "--color-secondary": '#181818',
          "--color-tertiary": '#121212',
          "--color-elevate": '#0c0c0c',
          "--color-surface": theme('colors.neutral.800'),
          "--color-on-primary": '#ffffff',
          "--color-on-secondary": '#ffffff',
          "--color-on-tertiary": '#ffffff',
          "--color-on-elevate": '#ffffff',
          "--color-on-surface": theme('colors.neutral.50'),
        },
      });
    }),
  ],
} 