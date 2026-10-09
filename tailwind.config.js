/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        perch: 'var(--perch)',
        silence: 'var(--silence)',
        posy: 'var(--posy)',
        icicle: 'var(--icicle)',
        peat: 'var(--peat)',
        frosty: 'var(--frosty)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        text: 'var(--text)',
        'text-soft': 'var(--text-soft)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Cormorant', 'Georgia', 'serif'],
        body: ['"Nunito Sans"', '"Helvetica Neue"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
