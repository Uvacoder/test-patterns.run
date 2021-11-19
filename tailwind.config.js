// https://tailwindcss.com/docs/configuration

const defaultTheme = require("tailwindcss/defaultConfig");

/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  darkMode: false, // or 'media' or 'class'

  mode: "jit",

  purge: ["src/**/*.tsx"],

  theme: {
    extend: {
      fontFamily: {
        mono: ["Cousine", ...defaultTheme.theme.fontFamily.mono],
        sans: ["Fira Sans", ...defaultTheme.theme.fontFamily.sans],
      },
      minWidth: (theme) => ({
        ...theme("maxWidth"),
      }),
    },
  },
};
