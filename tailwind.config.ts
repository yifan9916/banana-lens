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
        'blur-in': 'blur-in 500ms ease-in-out forwards',
        'fade-in': 'fade-in 1s ease-in-out',
        'fade-out': 'fade-out 4s ease-in-out',
        'slide-up': 'slide-up 500ms ease-in-out forwards',
        'slide-down': 'slide-down 500ms ease-in-out forwards',
        'attention-collection':
          'attention-collection 1s ease-in-out 500ms 2 alternate',
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
        'slide-up': {
          from: {
            opacity: '0',
            transform: 'translate3d(0, 1%,0)',
          },
          to: {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
        'slide-down': {
          from: {
            opacity: '0',
            transform: 'translate3d(0, -1%,0)',
          },
          to: {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },

        'attention-collection': {
          from: {
            opacity: '0.5',
            flex: '1',
          },
          to: {
            opacity: '1',
            flex: '1.2',
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
    plugin(
      ({ matchUtilities, theme }) => {
        matchUtilities(
          {
            'animation-iteration': (value) => {
              return {
                'animation-iteration-count': value,
              };
            },
          },
          {
            values: theme('animationIteration'),
          }
        );
      },
      {
        theme: {
          animationIteration: {
            1: '1',
            2: '2',
            3: '3',
          },
        },
      }
    ),
  ],
};
export default config;
