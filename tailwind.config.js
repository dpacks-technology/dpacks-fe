/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: '#1f1f1f', // #1f1f1f // 31, 31, 31
        content1: '#1f1f1f',
        light: '#f6f8fc',
        secondaryDark: '#2d2f31', // #2d2f31 // 45, 47, 49
        secondaryLight: '#ffffff',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        '15px': '15px',
      },
    },
  },
  darkMode: "media",
  plugins: [nextui()],
};
