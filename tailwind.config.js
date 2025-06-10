/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        deepNavy: '#3D405B',
        terracotta: '#E07A5F',
        burntOrange: '#F2C14E',
        warmIvory: '#F4F1DE',
        warmBeige: '#F5F5DC',
        cream: '#FDFBF7',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        serif: ['Cormorant Garamond', 'serif'],
        'tan-pearl': ['TAN Pearl', 'serif'],
      },
      backgroundImage: {
        'parchment-texture': "url('/wedding-website/images/parchment-texture.png')",
        'red-texture': "url('/wedding-website/images/red-texture-bg.png')",
      },
    },
  },
  plugins: [],
} 