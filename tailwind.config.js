/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          grayText: '#d4c0c0',
          lightRed: '#6b3030',
          lightRedHover: '#b02b2b',
        },
      },
    },
    plugins: [],
}