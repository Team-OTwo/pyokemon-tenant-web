/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#222222",
        white: "#FFFFFF",
        primary: {
          dark: "#3B9AFF",
          DEFAULT: "#75B8FF",
        },
        error: "#FF5959",
        success: "#44CB8F",
        yellow: {
          DEFAULT: "#FFD800",
          light: "#FFCF36",
        },
        purple: {
          DEFAULT: "#6338CE",
          light: "#805BDB",
        },
        green: {
          DEFAULT: "#389E0D",
          light: "#44CB8F",
        },
        orange: {
          DEFAULT: "#FA8C16",
        },
        red: {
          DEFAULT: "#F5222D",
        },
        blue: {
          DEFAULT: "#096DD9",
        },
      },
    },
    colors: {
      gray: {
        100: "#F3F2F1",
        300: "#DDDDDB",
        500: "#A19F9A",
        700: "#686764",
      },
    },
  },
  plugins: [],
}
