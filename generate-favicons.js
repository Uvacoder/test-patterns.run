/* eslint-disable no-shadow */

const favicons = require("favicons");
const fs = require("fs");
const path = require("path");

const config = require("./config/site");

favicons(
  path.join(__dirname, "./images/kite.png"),
  {
    path: "/icons/",
    appName: config.title,
    appShortName: config.title,
    appDescription: config.description,
    developerName: config.title,
    developerURL: config.url,
    background: config.theme,
    theme_color: config.theme,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: false,
      favicons: true,
      firefox: false,
      windows: true,
      yandex: false,
    },
    logging: true,
  },
  (error, { files, images }) => {
    if (error) {
      throw error;
    }

    images?.forEach((image) => {
      fs.writeFile(
        path.resolve(__dirname, "./public/icons", image.name),
        image.contents,
        (error) => error && console.error(error),
      );
    });

    files?.forEach((file) => {
      fs.writeFile(
        path.resolve(__dirname, "./public", file.name),
        file.contents,
        (error) => error && console.error(error),
      );
    });
  },
);
