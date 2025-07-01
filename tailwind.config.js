/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   darkMode: ['attribute', 'data-theme', 'dark'], // enabled via data-theme="dark" or daisyUI theme
//   theme: {
//     extend: {
//       colors: {
//         brand: '#14b8a6',
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/typography'),
//     require('daisyui'),
//   ],
//   daisyui: {
//     themes: ['forest'],
//     base: false,
//     utils: false,
//     logs: false,
//   },
// }
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: [
      //  badges we added by string
      'bg-green-600/20','text-green-300',
      'bg-yellow-600/20','text-yellow-300',
      'bg-red-600/20','text-red-300',
    ],
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
      themes: ['forest'],
      base: false,   // skip CSS reset
      utils: false,  // skip 30 k extra utility classes
      logs: false,
    },
  }
