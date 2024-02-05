/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // prestige primary color
      colors: {
        "primary-50": "#F9F2EB",
        "primary-100": "#E8D7C5",
        "primary-200": "#D6BB9F",
        "primary-300": "#C49F79",
        "primary-400": "#B28353",
        primary: "#A0672D",
        "primary-600": "#845526",
        "primary-700": "#68431E",
        "primary-800": "#4C3116",
        "primary-900": "#301F0E",
        "primary-950": "#140D06",
      },
      fontFamily: {
        brittany: ['var(--font-brittany)'],
        cormorant: ['var(--font-cormorant)'],
        nunito: ['var(--font-nunito)'],
        // sans: ['var(--font-nunito)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: "425px",
        // => @media (min-width: 425px) { ... }
      },
    },
  },
  media: false,
};
