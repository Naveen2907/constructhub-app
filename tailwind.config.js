/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Atmospheric Precision (Light / Consumer)
        brand: {
          orange: '#f2711c',
          'orange-dark': '#9e4300',
          'orange-light': '#ffdbcb',
          'orange-dim': '#ffb691',
        },
        // Industrial Luxe (Dark / Admin & Vendor)
        industrial: {
          bg: '#131313',
          surface: '#201f1f',
          'surface-low': '#1c1b1b',
          'surface-high': '#2a2a2a',
          'surface-highest': '#353534',
          border: '#584237',
        },
        // AI Builder / Luxe Home (Indigo)
        luxe: {
          primary: '#3525cd',
          container: '#4f46e5',
          fixed: '#e2dfff',
          'fixed-dim': '#c3c0ff',
          surface: '#fcf8ff',
          'surface-low': '#f5f2ff',
          'surface-container': '#f0ecf9',
        },
        // Status colors
        success: '#006c49',
        'success-container': '#6cf8bb',
        warning: '#795900',
        'warning-container': '#ffdf9f',
        danger: '#ba1a1a',
        'danger-container': '#ffdad6',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        ambient: '0px 24px 48px rgba(27, 28, 29, 0.06)',
        'ambient-lg': '0px 32px 64px rgba(27, 28, 29, 0.10)',
        glass: '0 8px 32px rgba(79, 70, 229, 0.08)',
        industrial: '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideIn: { '0%': { transform: 'translateX(-10px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}
