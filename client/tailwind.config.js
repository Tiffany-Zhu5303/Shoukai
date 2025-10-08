/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",   
    "./pages/**/*.{js,ts,jsx,tsx}",  
    "./components/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors:{
        'rose-red': '#C33C54',
        blush: '#CF6377',
        'salmon-pink': '#E79CA1',
        'pale-dogwood': '#FFD4CA',
        linen: '#F7EDE2',
        'smoky-black': '#0A0903',
        'lavender-blush': '#FFEEEB'
      },
      height: {
        '10vh': '10vh'
      },
      fontFamily: {
				kanit: ['Kanit', 'var(--font-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"']
			},
    },
  },
  plugins: [],
}

