/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8F7F4',
        ink: {
          DEFAULT: '#15172B', // Midnight navy main text
          muted: '#77758A',   // Secondary text specified
          faint: '#9EA0AE',   // Tertiary / placeholder
          subtle: '#D6D4CD',  // Subtle hairline borders
        },
        brand: {
          DEFAULT: '#7357FF', // Electric violet primary
          hover: '#6042FC',
          light: '#F1EEFF',   // Subtle tint for active items
          border: '#D8D0FF',
          dark: '#482BD9',
        },
        lime: {
          DEFAULT: '#D8F36A', // Growth highlights & indicators
          hover: '#C9E84F',
          light: '#F5FBD8',
          dark: '#7D980C',
          ink: '#15172B',
        },
        surface: {
          DEFAULT: '#FFFFFF', // Card surfaces
          muted: '#F3F2EE',
          subtle: '#FAF9F6',
          border: '#E7E5DF', // Crisp restrained border
          borderDark: '#D8D5CC',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(21, 23, 43, 0.04)',
        'card': '0 1px 3px rgba(21, 23, 43, 0.05), 0 1px 2px rgba(21, 23, 43, 0.03)',
        'elevated': '0 4px 16px -2px rgba(21, 23, 43, 0.06), 0 2px 6px -1px rgba(21, 23, 43, 0.03)',
        'button': '0 1px 2px rgba(21, 23, 43, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.16)',
        'button-lime': '0 1px 2px rgba(21, 23, 43, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
        '2xl': '16px',
      }
    },
  },
  plugins: [],
}
