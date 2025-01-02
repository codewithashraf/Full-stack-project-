/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        bgMove: "bgMove 10s linear infinite",
        borderBlur: "borderBlur 6s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": { textShadow: "0 0 5px #ff0080, 0 0 10px #ff0080" },
          "100%": { textShadow: "0 0 20px #ff0080, 0 0 30px #ff0080" },
        },
        bgMove: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        borderBlur: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
}

