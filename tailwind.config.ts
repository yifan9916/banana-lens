import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 2s ease-in-out',
        'fade-out': 'fade-out 4s ease-in-out',
        'blur-in': 'blur-in 500ms ease-in-out forwards',
        'slide-in': 'slide-in 500ms ease-in-out forwards',
      },
      keyframes: {
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '75%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '25%': {
            opacity: '1',
          },
          '100%': {
            opacity: '1',
          },
        },

        'blur-in': {
          from: {
            'background-color': 'rgb(0 0 0 / 0)',
            'backdrop-filter': 'blur(0px)',
          },
          to: {
            'background-color': 'rgb(0 0 0 / 0.8)',
            'backdrop-filter': 'blur(8px)',
          },
        },
        'slide-in': {
          from: {
            opacity: '0',
            transform: 'translate3d(0, 5%,0)',
          },
          to: {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            };
          },
        },
        {
          values: theme('transitionDelay'),
        }
      );
    }),
  ],
};
export default config;
