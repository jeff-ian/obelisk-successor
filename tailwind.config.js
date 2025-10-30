/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          50: '#f7f8f9',
          100: '#e1e3e6',
          200: '#c3c7ce',
          300: '#a2a6b3',
          400: '#7b8092',
          500: '#52586d',
          600: '#373b4e',
          700: '#262838',
          800: '#1b1d29',
          900: '#11131b',
          950: '#0b0c12',
        },
        accent: {
          blue: '#1e90ff',
          purple: '#7c3aed',
          green: '#22c55e',
        },
        gradient: {
          start: '#7c3aed',
          end: '#1e90ff',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7c3aed 0%, #1e90ff 100%)',
        'gradient-obsidian': 'linear-gradient(135deg, #0b0c12 0%, #1b1d29 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        'scale-in': 'scaleIn 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(124, 58, 237, 0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.8)' },
        },
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.25', fontWeight: '700' }],
        'h1': ['2.25rem', { lineHeight: '1.25', fontWeight: '600' }],
        'h2': ['1.75rem', { lineHeight: '1.25', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }],
        'xs': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
