/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "p-purple": "hsl(259, 100%, 65%)",
        "p-red" : "hsl(0, 100%, 67%)",
        "offwhite" : "hsl(0, 0%, 94%)",
        "lightgray" : "hsl(0, 0%, 86%)",
        "smokey" : "hsl(0, 1%, 44%)",
        "offblack" : "hsl(0, 0%, 8%)"
      },

      fontFamily: {
        poppins : ["Poppins", "sans-serif"]
      },

      borderWidth: {
        "1" : "1px"
      },

      letterSpacing: {
        "extra-wide": "0.2em"
      }
    },
  },
  plugins: [],
}

