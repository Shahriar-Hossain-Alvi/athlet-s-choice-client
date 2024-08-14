import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        acPink: "#EF2853",
        acNavyBlue: "#00BAFF",
        acBlackPrimary: "#161616",
        acDarkGray: "#232323",
        acBlackSecondary: "#1D1D1D "
      }
    },
  },
  plugins: [
    daisyui,
  ],
}

