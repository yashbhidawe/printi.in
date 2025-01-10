/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2d016a",
        primaryLight: "#4a1d88",
        accent: "#f1a10a",
        bgLight: "#f6f4fc",
        bgSecondary: "#e3d9f1",
        textDark: "#1a1a1a",
        textLight: "#ffffff",
      },
    },
  },
  plugins: [],
};
