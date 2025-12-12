import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        scrapbook: {
          cream: '#FDF8F3',
          paper: '#F5EDE4',
          kraft: '#C4A77D',
          washi: '#E8D5C4',
          rose: '#E8B4B8',
          sage: '#9CAF88',
          sky: '#A7C7E7',
          lavender: '#C5B4E3',
          peach: '#FFDAB9',
          mint: '#B2D8CE',
        },
        accent: {
          gold: '#D4AF37',
          copper: '#B87333',
          bronze: '#CD7F32',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        handwritten: ['Dancing Script', 'cursive'],
        chalk: ['Caveat', 'cursive'],
        vintage: ['Abril Fatface', 'serif'],
        clean: ['Quicksand', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url('/textures/paper.png')",
        'kraft-texture': "url('/textures/kraft.png')",
        'linen-texture': "url('/textures/linen.png')",
      },
      boxShadow: {
        'photo': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 3px #fff',
        'polaroid': '0 8px 24px -4px rgba(0, 0, 0, 0.15)',
        'washi': '2px 2px 4px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}

export default config