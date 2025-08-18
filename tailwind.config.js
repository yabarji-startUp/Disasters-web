/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Optimisation CSS pour production (RGESN 1.3)
  safelist: [
    // Classes utilisées dynamiquement
    {
      pattern: /^bg-/,
      variants: ['hover', 'focus', 'active']
    },
    {
      pattern: /^text-/,
      variants: ['hover', 'focus', 'active']
    },
    {
      pattern: /^border-/,
      variants: ['hover', 'focus', 'active']
    },
    {
      pattern: /^animate-/
    }
  ]
};
