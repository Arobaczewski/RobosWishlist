/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // we toggle .dark on <html>
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",   // lowercase
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",   // uppercase (you have both)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
