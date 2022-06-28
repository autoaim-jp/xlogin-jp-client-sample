module.exports = {
  purge: ['./public/build/*.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
      },
      borderColor: (theme) => ({
       ...theme('colors'),
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
