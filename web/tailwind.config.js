import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  darkMode: 'class',
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius: {
          large: '8px',
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#DC2626',
              50: '#FDE2E2',
              100: '#FCCBCB',
              200: '#FAA7A7',
              300: '#F68383',
              400: '#F45F5F',
              500: '#F23B3B',
              600: '#E01717',
              700: '#DC2626',
              800: '#B91D1D',
              900: '#991B1B',
            },
          },
        },
      },
    }),
  ],
};
