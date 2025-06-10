import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: '#64564a',
        burntOrange: '#E07A5F',
        goldenYellow: '#F2CC8F',
        oliveGreen: '#81B29A',
        warmIvory: '#F4F1DE',
        plum: '#9B5DE5',
        deepNavy: '#3D405B',
        paper: '#FDFBF7',
        linen: '#F5F5F0',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Montserrat', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        'tan-pearl': ['"TAN Pearl"', 'serif'],
      },
      animation: {
        'falling-leaves': 'falling 10s linear infinite',
      },
      keyframes: {
        falling: {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'pattern': "url('/images/pattern.svg')",
      },
    },
  },
  plugins: [],
}
export default config 