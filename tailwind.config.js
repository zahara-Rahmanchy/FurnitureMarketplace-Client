/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        grechen: ['"Grechen Fuemen"', "serif"],
      },
      keyframes: {
        shimmerLine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmerLine: 'shimmerLine 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
});
 
      