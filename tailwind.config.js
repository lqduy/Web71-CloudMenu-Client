/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'create-page': 'url("/src/assets/layouts/create-page.jpg")'
      },
      boxShadow: {
        card: '0 1px 1px #091e4240, 0 0 1px #091e424f'
      }
    }
  },
  plugins: [],
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
    preflight: false
  }
};
