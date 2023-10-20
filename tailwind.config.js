const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#F97316',
        'primary-light': '#F7F8FC',
        'secondary-light': '#FFFFFF',
        'ternary-light': '#f6f7f8',

        'primary-dark': '#fb8700',
        'secondary-dark': '#C27217',
        'ternary-dark': '#C27217'
      },
      container: {
        padding: {
          DEFAULT: '0.5rem',
          sm: '2rem',
          lg: '5rem',
          xl: '6rem',
          '2xl': '8rem'
        }
      },
      screens: {
        ssm: '300px'
      },
      backgroundImage: {
        'create-page': 'url("/src/assets/layouts/create-page.jpg")'
      },
      boxShadow: {
        card: '0 1px 1px #091e4240, 0 0 1px #091e424f'
      },
      fontFamily: {
        dancing: ['Dancing Script'],
        roboto: ['Roboto']
      },
      backgroundImage: {
        bannerBg: "url('/src/assets/image/banner.png')"
      }
    }
  },
  variants: {
    extend: { opacity: ['disabled'] }
  },
  plugins: ['@tailwindcss/forms'],
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
    preflight: false
  }
};
