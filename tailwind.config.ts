import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        heading: ['var(--font-poppins)', ...fontFamily.sans],
      },
      colors: {
        'mysave-cyan': '#07E0FE',
        'mysave-pink': '#F608D1',
        'mysave-red': '#E11D48'
      },
    },
    plugins: [],
  },
}
export default config
