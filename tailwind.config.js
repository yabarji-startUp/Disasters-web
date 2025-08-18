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
  // Purge CSS pour production (RGESN 1.3)
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html', 
      './src/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    options: {
      safelist: [
        // Classes utilisées dynamiquement
        /^bg-/,
        /^text-/,
        /^border-/,
        /^hover:/,
        /^focus:/,
        /^animate-/
      ]
    }
  }
};
