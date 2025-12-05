/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        "bebas-neue": ["Bebas Neue"],
      },
      colors: {
        primary: "#1E599B",
        darkBlue: "#1A2042",
        midBlue: "#282F5A",
        secondary: "#19DB8C",
        error: "#ef4444",
        grayText: "#696969",
        lightGray: "#CCCCCC",
        backgroundColor: "#19DB8C08",
      },
    },
  },
  plugins: [],
};
