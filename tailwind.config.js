/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#8b5cf6',
          DEFAULT: '#7c3aed',
          dark: '#5b21b6',
        },
        secondary: {
          light: '#3b82f6',
          DEFAULT: '#1d4ed8',
          dark: '#1e40af',
        },
      },
    },
  },
  plugins: [],
}; 