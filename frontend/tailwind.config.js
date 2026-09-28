/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#1e3a8a',
          600: '#1e40af',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#000080',
        },
        saffron: {
          500: '#FF9933',
          600: '#e68a2e',
        },
        indiaGreen: {
          500: '#138808',
          600: '#117a07',
        },
        govbg: '#F4F6F8',
        success: '#15803d',
        error: '#b91c1c',
        warning: '#b45309',
        card: '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-outfit)'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(0,0,128,0.08), 0 4px 6px -4px rgba(0,0,128,0.05)',
        'premium-hover': '0 20px 40px -10px rgba(0,0,128,0.12), 0 8px 16px -8px rgba(0,0,128,0.08)',
        'glow': '0 0 20px rgba(255,153,51,0.3)',
      },
      backgroundImage: {
        'mesh': 'radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%)',
        'subtle-grid': 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
};
