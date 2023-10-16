/** @type {import('tailwindcss').Config} */

colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js'
  ],
  theme: {
    colors: {
      primary: "#5271ff",
      secondary: "#41d8c8",
      accent: "#52bbe1",
      plain: "#372632",
      base: "#fAf7f2"
    },
    extend: {
      colors
    }
  },
  plugins: [require('flowbite/plugin'), require('@headlessui/tailwindcss')
],
}
