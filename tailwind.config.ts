import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    transitionDuration: {
      DEFAULT: '300ms',
    },
    transitionTimingFunction: {
      DEFAULT: 'linear',
    },
    extend: {
      keyframes: {
        'toast-in': {
          from: {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(0%)',
          },
        },
        progress: {
          from: {
            width: '0',
          },
          to: {
            width: '100%',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        'toast-in': 'toast-in 250ms linear',
        progress: 'progress 3s linear',
      },
      backgroundImage: {
        // Gradients
        'button-primary':
          'linear-gradient(90deg, rgba(254, 94, 53, 0.80) 10.49%, rgba(246, 119, 2, 0.80) 92.04%, rgba(255, 239, 118, 0.80) 158.76%);',
        'button-primary-hover': 'linear-gradient(90deg, #FE5E35 10.49%, #F67702 92.04%, #FFEF76 158.76%);',
        // Background images
        'header-rectangle': 'url("/static/images/header/rectangle.svg")',
        'modal-connect': 'url("/static/images/modals/modal-connect.svg")',
        'modal-welcome': 'url("/static/images/modals/modal-welcome.svg")',
        'modal-signin': 'url("/static/images/modals/modal-signin.svg")',
        'info-box': 'url("/static/images/modals/info-box.svg")',
        notification: 'url("/static/images/notification/notification.svg")',
        liquidity: 'url("/static/images/liquidity/liquidity.svg")',
        'statistics-box': 'url("/static/images/liquidity/statistics-box.svg")',
      },
      lineHeight: {
        normal: 'normal',
      },
      colors: {
        shark: {
          '100': '#52575C',
          '200': '#474C51',
          '300': '#393E44',
          '400': '#292D32', // main
          '500': '#1C1F21',
          '600': '#0D0F10',
          '700': '#000000',
          '800': '#000000',
          '900': '#111315',
        },
        'outrageous-orange': {
          '100': '#ffe2d4',
          '200': '#ffc2a9',
          '300': '#ff9772',
          '400': '#fe5e35', // main
          '500': '#fd3812',
          '600': '#ee1e08',
          '700': '#c51209',
          '800': '#9c1110',
          '900': '#7e1110',
        },
        'chilean-fire': {
          '50': '#fffaec',
          '100': '#fff3d3',
          '200': '#ffe3a6',
          '300': '#ffce6e',
          '400': '#ffad33',
          '500': '#ff920c',
          '600': '#f67702', // main
          '700': '#ca5904',
          '800': '#a0450c',
          '900': '#813b0d',
        },
        festival: {
          '100': '#fff9c2',
          '200': '#ffef76', // main
          '300': '#ffe245',
          '400': '#fcce13',
          '500': '#ecb506',
          '600': '#cc8c02',
          '700': '#a26306',
          '800': '#864d0d',
          '900': '#723f11',
        },
        alto: {
          '50': '#f7f7f7',
          '100': '#ededed',
          '200': '#d9d9d9',
          '300': '#c8c8c8',
          '400': '#adadad',
          '500': '#999999',
          '600': '#888888',
          '700': '#7b7b7b',
          '800': '#676767',
          '900': '#545454',
          '950': '#363636',
        },
        'oxford-blue': {
          '50': '#f3f6f8',
          '100': '#e1e8ec',
          '200': '#c7d3da',
          '300': '#a0b4c0',
          '400': '#718d9f',
          '500': '#567184',
          '600': '#4a5e70',
          '700': '#41505d',
          '800': '#3a4550',
          '900': '#343c45',
          '950': '#1f252d',
        },
      },
      screens: {
        xxs: '320px',
      },
    },
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1740px',
      },
    },
  },
  plugins: [],
}
// eslint-disable-next-line import/no-default-export
export default config
