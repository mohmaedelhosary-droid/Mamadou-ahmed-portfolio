import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030712',
        night: '#060e1f',
        haze: '#89dbe2',
        mist: '#d9f7fb'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 20px 60px rgba(54, 164, 187, 0.22)'
      }
    }
  },
  plugins: []
};

export default config;
