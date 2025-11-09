/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#065EB3', // Azul oscuro para textos y elementos importantes
        'brand-secondary': '#1D9CDC', // Azul medio para botones y acentos
        'brand-light-blue': '#E0EDF4', // Azul muy claro para fondos sutiles
        'brand-bg': '#FFFFFF', // Fondo principal blanco
        'brand-bg-alt': '#F9F6F2', // Fondo alternativo color hueso
      },
    },
  },
  plugins: [],
}
