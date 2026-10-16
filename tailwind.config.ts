import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'waterway-blue': '#0070C0',
        'waterway-blue-dark': '#005A9C',
        'sky-blue': '#0BD6FF',
        'pure-white': '#FFFFFF',
        waterway: {
          blue: '#0070C0',
          dark: '#005A9C',
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0070C0',
          600: '#005A9C',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        sky: {
          blue: '#0BD6FF',
          light: '#E0FAFF',
          dark: '#00B4D8',
        },
        marine: {
          950: '#040914',
          900: '#0A192F',
          800: '#005A9C',
          700: '#0070C0',
          500: '#0BD6FF',
        },
        surface: {
          ground: '#F9FAFB',
          card: '#FFFFFF',
          border: '#E5E7EB',
          darkGround: '#0F172A',
          darkCard: '#1E293B',
          darkBorder: '#334155',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '32px': '2rem',
        '40px': '2.5rem',
        '48px': '3rem',
      },
      boxShadow: {
        'waterway': '0 10px 25px -5px rgba(0, 112, 192, 0.2), 0 8px 10px -6px rgba(0, 112, 192, 0.1)',
        'sky': '0 10px 25px -5px rgba(11, 214, 255, 0.25), 0 8px 10px -6px rgba(11, 214, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
export default config