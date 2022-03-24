module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        htl_grau: '#c6c6c5',
        htl_dunkelgrau: '#6f6f6e',
        htl_rot: '#8d1717',
        htl_hellrot: '#be1622',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
