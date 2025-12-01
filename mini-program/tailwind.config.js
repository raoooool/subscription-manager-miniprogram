/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./miniprogram/**/*.{wxml,ts,js,wxs,json}'],
  theme: {
    extend: {
      colors: {
        nb: {
          ink: '#0f172a',
          accent: '#ff5c8d',
          lemon: '#ffe082',
          pink: '#ffc2e0',
          sky: '#9ee6ff',
          lilac: '#f6d7ff',
          mint: '#c8f8b8'
        }
      },
      boxShadow: {
        brutal: '10px 12px 0 rgba(15, 23, 42, 0.18)'
      },
      borderRadius: {
        brutal: '24px'
      }
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: []
};
