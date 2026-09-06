/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        markhor: {
          midnight: '#071116',
          navy: '#0B1C26',
          black: '#04090C',
          gold: '#C7A15A',
          champagne: '#D6B978',
          ivory: '#F4F0E8',
          stone: '#9A9389',
          water: '#164E63',
          green: '#263D32',
        },
        primary: '#071116',
        gold: '#C7A15A',
        ivory: '#F4F0E8',
        navy: '#0B1C26',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '1400px',
      },
      boxShadow: {
        'luxury': '0 20px 50px rgba(0, 0, 0, 0.4)',
        'gold-glow': '0 0 25px rgba(199, 161, 90, 0.25)',
      }
    }
  },
  plugins: [],
}
