import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#1f2937', // gray-800/900 feel
        lochinvar: 'var(--ay-brand)', // Main Green
        waikawa: '#577399', // Blue-ish Gray
        trendy: '#8D5A97', // Purple/Pink
      }
    },
  },
  plugins: [],
};
export default config;
