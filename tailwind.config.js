/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        typing: 'typing 2.5s steps(30, end), blink 0.8s step-end infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        typing: {
          'from': { width: '0%' },
          'to': { width: '100%' },
        }
      },
      blink: {
        '50%': { borderColor: 'transparent' },
        '0%, 100%': { borderColor: 'white' },
      },
      fontFamily: {
        generalsans: ['General Sans', 'sans-serif'],
      },
      colors: {
        black: {
          DEFAULT: '#000',
          100: '#010103',
          200: '#0E0E10',
          300: '#1C1C21',
          500: '#3A3A49',
          600: '#1A1A1A',
        },
        white: {
          DEFAULT: '#FFFFFF',
          800: '#E4E4E6',
          700: '#D6D9E9',
          600: '#AFB0B6',
          500: '#62646C',
        },
      },
      backgroundImage: {
        terminal: "url('/assets/terminal.png')",
      },
    },
  },
  plugins: [],
};
