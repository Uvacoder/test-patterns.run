const defaultTheme = require("tailwindcss/defaultConfig");

module.exports = {
  mode: "jit",

  purge: ["./**/*.tsx"],

  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {
      //
    },

    minWidth: (theme) => ({
      ...defaultTheme.theme.minWidth,
      ...theme("maxWidth"),
    }),

    fontFamily: {
      mono: ["Cousine", ...defaultTheme.theme.fontFamily.mono],
      sans: ["Fira Sans", ...defaultTheme.theme.fontFamily.sans],
    },
  },

  variants: {
    extend: {
      //
    },
  },

  plugins: [
    //
  ],
};
