/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./src/app/**/*.{js,ts,jsx,tsx,html}",
    "./src/app/(public)/**/*.{js,ts,jsx,tsx,html}",
    "./src/app/admin/**/*.{js,ts,jsx,tsx,html}",
    "./src/components/**/*.{js,ts,jsx,tsx,html}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        markhor: {
          midnight: '#071116',
          navy: '#0B1C26',
          black: '#04090C',
          slate: '#121E26',
          gold: '#C7A15A',
          champagne: '#D6B978',
          bronze: '#8C734B',
          ivory: '#F4F0E8',
          stone: '#9A9389',
          water: '#164E63',
          green: '#263D32',
        },
        primary: '#071116',
        gold: '#C7A15A',
        champagne: '#D6B978',
        ivory: '#F4F0E8',
        navy: '#0B1C26',
        stone: '#9A9389',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'micro': '0.26em',
        'eyebrow': '0.24em',
        'nav': '0.2em',
        'subtle': '0.14em',
      },
      maxWidth: {
        'content': '1400px',
        'editorial': '1280px',
        'reading': '720px',
      },
      boxShadow: {
        'luxury': '0 20px 50px rgba(0, 0, 0, 0.45)',
        'luxury-lg': '0 30px 60px rgba(4, 9, 12, 0.6)',
        'gold-glow': '0 0 30px rgba(199, 161, 90, 0.15)',
        'champagne-glow': '0 0 30px rgba(214, 185, 120, 0.2)',
      },
      borderRadius: {
        'sm': '2px',
        'DEFAULT': '4px',
      }
    }
  },
  plugins: [],
}

