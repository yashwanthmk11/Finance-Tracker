module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#a1c4fd',
          DEFAULT: '#2193b0',
          dark: '#6dd5ed',
        },
        accent: {
          light: '#fbc2eb',
          DEFAULT: '#ee9ca7',
          dark: '#ffdde1',
        },
        card: {
          light: '#f8fafc',
          DEFAULT: '#f1f5f9',
          dark: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}; 