export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f7f9fb",
        surface: "#f7f9fb",
        primary: "#002542",
        "primary-container": "#1b3b5a",
        "surface-container-low": "#f2f4f6",
        "surface-container": "#eceef0",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "surface-container-lowest": "#ffffff",
        "surface-tint": "#436182",
        "secondary-fixed": "#d8e3f4",
        "outline-variant": "#c3c6ce",
        "on-surface": "#191c1e",
        "on-surface-variant": "#43474d",
      },
      fontFamily: {
        headline: ["Newsreader", "serif"],
        body: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};