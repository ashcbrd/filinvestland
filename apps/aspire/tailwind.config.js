/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Cabin"', "sans-serif"],
    },
    screens: {
      xs: { max: "415px" },
      sm: { max: "641px" },
      md: { max: "767px" },
      tablet: { max: "991px" },
      lg: { max: "1024px" },
      xl: { max: "1280px" },
      smd: { max: "1199px" },
      "2xl": { max: "1536px" },
      short: { raw: "(max-height: 768px) and (min-width: 1280px)" },
    },
    extend: {
      colors: {
        "aqua-blue": "#005587",
        "light-blue": "#0679BD",
        "baby-blue": "#0097F0",
        "deep-blue": "#002E50",
        "sky-blue": "#61BDFF",
        "candy-blue": "#F3FCFF",
        "blue-1": "#0184E2",
        charcoal: "#1C1C1C",
        "custom-gray-1": "#DDD",
        "custom-gray-2": "#787878",
        "custom-gray-3": "#EDEDED",
        "custom-gray-4": "#ABABAB",
        "custom-gray-5": "#C8C8C8",
        "custom-black-1": "#1B1B1B",
        "custom-black-2": "#343434",
        "custom-black-3": "#001B2B",
      },
      height: {
        "news-card": "532px",
      },
      backgroundImage: {
        sky: "linear-gradient(180deg, #8FBEEA 0%, #F9FEFF 100%)",
        "banner-radial":
          "radial-gradient(50% 50.00% at 50% 50.00%, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.15) 100%)",
        "card-shadow":
          "linear-gradient(90deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.00) 100%)",
        "project-card-shadow":
          "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.00) 100%)",
        "slide-arrow-shadow":
          "linear-gradient(90deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.00) 100%)",
        "virtual-shadow":
          "linear-gradient(0, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.00) 100%)",
      },
      boxShadow: {
        "location-box": "0px 4px 40px 2px rgba(0, 0, 0, 0.10)",
        "booking-close": "0px 4px 40px rgba(0, 0, 0, 0.10)",
      },
      fontFamily: {
        getlost: "GetLost, sans-serif",
      },
    },
  },
  plugins: [],
};
