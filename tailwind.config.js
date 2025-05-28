/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#86D420',
          dark: '#78bf1d',
          light: '#9be635',
          10: 'rgba(134, 212, 32, 0.1)',
          20: 'rgba(134, 212, 32, 0.2)',
        },
        secondary: "#1F57C3",
        dark: "#001E00",
        light: "#F2F7F2",
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/hero-image.jpg')",
      },
    },
  },
  plugins: [],
};
