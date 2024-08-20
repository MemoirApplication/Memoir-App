// tailwind.config.js
const { nextui } = require("@nextui-org/react");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
      keyframes: {
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        // Light Themes
        "amber-light": {
          extend: "light",
          colors: {
            secondary: {
              50: "#fffbeb",
              100: "#fef3c7",
              200: "#fde68a",
              300: "#fcd34d",
              400: "#fbbf24",
              500: "#f59e0b",
              600: "#d97706",
              700: "#b45309",
              800: "#92400e",
              900: "#78350f",
              DEFAULT: "#f59e0b",
            },
          },
        },
        "lime-light": {
          extend: "light",
          colors: {
            secondary: {
              50: "#f7fee7",
              100: "#ecfccb",
              200: "#d9f99d",
              300: "#bef264",
              400: "#a3e635",
              500: "#84cc16",
              600: "#65a30d",
              700: "#4d7c0f",
              800: "#3f6212",
              900: "#2e7d32",
              DEFAULT: "#84cc16",
            },
          },
        },
        "teal-light": {
          extend: "light",
          colors: {
            secondary: {
              50: "#f0fdfa",
              100: "#ccfbf1",
              200: "#99f6e4",
              300: "#5eead4",
              400: "#2dd4bf",
              500: "#14b8a6",
              600: "#0d9488",
              700: "#0f766e",
              800: "#115e59",
              900: "#134e4a",
              DEFAULT: "#14b8a6",
            },
          },
        },
        "blue-light": {
          extend: "light",
          colors: {
            secondary: {
              50: "#eff6ff",
              100: "#dbeafe",
              200: "#bfdbfe",
              300: "#93c5fd",
              400: "#60a5fa",
              500: "#3b82f6",
              600: "#2563eb",
              700: "#1d4ed8",
              800: "#1e40af",
              900: "#1e3a8a",
              DEFAULT: "#3b82f6",
            },
          },
        },
        "violet-light": {
          extend: "light",
          colors: {
            secondary: {
              50: "#f5f3ff",
              100: "#ede9fe",
              200: "#ddd6fe",
              300: "#c4b5fd",
              400: "#a78bfa",
              500: "#8b5cf6",
              600: "#7c3aed",
              700: "#6d28d9",
              800: "#5b21b6",
              900: "#4c1d95",
              DEFAULT: "#8b5cf6",
            },
          },
        },
        "rose-light": {
          extend: "light",
          colors: {
            secondary: {
              50: "#fff1f2",
              100: "#ffe4e6",
              200: "#fecdd3",
              300: "#fda4af",
              400: "#fb7185",
              500: "#f43f5e",
              600: "#e11d48",
              700: "#be123c",
              800: "#9f1239",
              900: "#831843",
              DEFAULT: "#f43f5e",
            },
          },
        },
        "neutral-light": {
          extend: "light",
          colors: {
            secondary: {
              50: "#f9fafb",
              100: "#f3f4f6",
              200: "#e5e7eb",
              300: "#d1d5db",
              400: "#9ca3af",
              500: "#6b7280",
              600: "#4b5563",
              700: "#374151",
              800: "#1f2937",
              900: "#111827",
              DEFAULT: "#6b7280",
            },
          },
        },
        // Dark Themes
        "amber-dark": {
          extend: "dark",
          colors: {
            secondary: {
              50: "#78350f",
              100: "#92400e",
              200: "#b45309",
              300: "#d97706",
              400: "#f59e0b",
              500: "#fbbf24",
              600: "#fde68a",
              700: "#fef3c7",
              800: "#fffbeb",
              900: "#ffffff",
              DEFAULT: "#f59e0b",
            },
          },
        },
        "lime-dark": {
          extend: "dark",
          colors: {
            secondary: {
              50: "#2e7d32",
              100: "#3f6212",
              200: "#4d7c0f",
              300: "#65a30d",
              400: "#84cc16",
              500: "#a3e635",
              600: "#bef264",
              700: "#d9f99d",
              800: "#ecfccb",
              900: "#f7fee7",
              DEFAULT: "#84cc16",
            },
          },
        },
        "teal-dark": {
          extend: "dark",
          colors: {
            secondary: {
              50: "#134e4a",
              100: "#115e59",
              200: "#0f766e",
              300: "#0d9488",
              400: "#14b8a6",
              500: "#2dd4bf",
              600: "#5eead4",
              700: "#99f6e4",
              800: "#ccfbf1",
              900: "#f0fdfa",
              DEFAULT: "#2dd4bf",
            },
          },
        },
        "blue-dark": {
          extend: "dark",
          colors: {
            secondary: {
              50: "#1e3a8a",
              100: "#1d4ed8",
              200: "#2563eb",
              300: "#3b82f6",
              400: "#60a5fa",
              500: "#93c5fd",
              600: "#bfdbfe",
              700: "#dbeafe",
              800: "#eff6ff",
              900: "#ffffff",
              DEFAULT: "#3b82f6",
            },
          },
        },
        "violet-dark": {
          extend: "dark",
          colors: {
            secondary: {
              50: "#4c1d95",
              100: "#5b21b6",
              200: "#6d28d9",
              300: "#7c3aed",
              400: "#8b5cf6",
              500: "#a78bfa",
              600: "#c4b5fd",
              700: "#ddd6fe",
              800: "#ede9fe",
              900: "#f5f3ff",
              DEFAULT: "#8b5cf6",
            },
          },
        },
        "rose-dark": {
          extend: "dark",
          colors: {
            secondary: {
              50: "#831843",
              100: "#9f1239",
              200: "#be123c",
              300: "#e11d48",
              400: "#f43f5e",
              500: "#fb7185",
              600: "#fda4af",
              700: "#fecdd3",
              800: "#ffe4e6",
              900: "#fff1f2",
              DEFAULT: "#f43f5e",
            },
          },
        },
        "neutral-dark": {
          extend: "dark",
          colors: {
            secondary: {
              50: "#111827",
              100: "#1f2937",
              200: "#374151",
              300: "#4b5563",
              400: "#6b7280",
              500: "#9ca3af",
              600: "#d1d5db",
              700: "#f3f4f6",
              800: "#f9fafb",
              900: "#ffffff",
              DEFAULT: "#9ca3af",
            },
          },
        },
      },
    }),
  ],
};
