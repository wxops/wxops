import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#bd93f9',
          pink: '#ff79c6',
          cyan: '#8be9fd',
          green: '#50fa7b',
          orange: '#ffb86c',
        },
        // Dracula (https://github.com/dracula/dracula-theme) mapped onto the
        // Tailwind color names already used throughout the component tree —
        // overriding here recolors every existing className without touching
        // each component.
        indigo: { 300: '#cfb0fb', 400: '#bd93f9', 500: '#bd93f9', 600: '#9d6fe0', 950: '#3a2f52' },
        violet: { 300: '#cfb0fb', 400: '#bd93f9', 500: '#bd93f9', 600: '#9d6fe0' },
        purple: { 300: '#f4b8e4', 400: '#ff79c6', 500: '#ff79c6', 600: '#e0529f', 950: '#4a2438' },
        pink: { 400: '#ff79c6', 500: '#ff79c6', 600: '#e0529f' },
        cyan: { 300: '#a8f0fe', 400: '#8be9fd', 500: '#8be9fd', 600: '#5cd3ea' },
        teal: { 300: '#9ff8d4', 500: '#6df1bc' },
        blue: { 300: '#a8c0fb', 500: '#8fa4f7' },
        emerald: { 300: '#83fda4', 400: '#50fa7b', 500: '#50fa7b', 600: '#34d968' },
        green: { 400: '#50fa7b', 500: '#50fa7b' },
        rose: { 300: '#ff8a8a', 400: '#ff5555', 500: '#ff5555' },
        red: { 300: '#ff8a8a', 500: '#ff5555' },
        amber: { 300: '#ffcd97', 400: '#ffb86c', 500: '#ffb86c', 600: '#f0993d' },
        orange: { 300: '#ffcd97', 500: '#ffb86c' },
        yellow: { 300: '#f6fdb8', 500: '#f1fa8c' },
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(189, 147, 249, 0.3)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 60px rgba(189, 147, 249, 0.6)',
          },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern':
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(189 147 249 / 0.07)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      },
      fontFamily: {
        sans: ['Fira Code', 'monospace'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
