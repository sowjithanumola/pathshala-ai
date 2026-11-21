import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#10172A', 800: '#1B2440', 900: '#0B1020' },
        blue: '#638BFF', teal: '#52D6C1', warm: '#F8FAFC', lavender: '#B6A1FF', amber: '#F4C56A',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Noto Sans Telugu', 'Noto Sans Devanagari', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Malayalam', 'Noto Sans Bengali', 'Noto Naskh Arabic', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'Comic Sans MS', 'Trebuchet MS', 'Noto Sans Telugu', 'sans-serif'],
      },
      borderRadius: { card: '1.25rem' },
      boxShadow: { soft: '0 1px 2px rgba(16,23,42,.06), 0 8px 24px -8px rgba(16,23,42,.18)' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: { 'fade-up': 'fade-up 0.4s ease-out both', shimmer: 'shimmer 1.5s linear infinite' },
    },
  },
  plugins: [],
} satisfies Config;
