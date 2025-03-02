import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-purple-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-lime-500",
    "bg-cyan-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-rose-500",
    "bg-indigo-500",
    "bg-emerald-500",
  ],
});
