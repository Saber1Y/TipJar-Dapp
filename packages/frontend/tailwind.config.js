/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['var(--font-sora)', 'sans-serif'],
        code: ['var(--font-code)', 'monospace'],
        grotesk: ['var(--font-grotesk)', 'sans-serif'],
      },
      keyframes: {
        bounceY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10%)' },
        },
      },
      animation: {
        bounceY: 'bounceY 1s infinite',
      },
    },
  },
  plugins: [],
};
