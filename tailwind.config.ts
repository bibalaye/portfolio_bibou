import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Will be defined in globals.css
        foreground: "var(--foreground)", // Will be defined in globals.css
        'accent-electric-blue': '#00FFFF',
        'dm-background': '#1A1A1A',
        'dm-text-primary': '#E5E7EB',
        'dm-text-secondary': '#374151',
        'dm-border': '#1F2937',
        'lm-background': '#F9FAFB',
        'lm-text-primary': '#1F2937',
        'lm-text-secondary': '#D1D5DB',
        'lm-border': '#E5E7EB',
      },
    },
  },
  plugins: [],
};
export default config;
