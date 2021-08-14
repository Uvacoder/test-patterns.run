const favicons = require("favicons");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");

const config = require("../config/site");

function cwd(...rest) {
  return path.join(process.cwd(), ...rest);
}

(async () => {
  mkdirp.sync(cwd("./public/icons"));

  const { files, images } = await favicons(cwd("./images/kite.png"), {
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
  });

  await Promise.all([
    images.forEach(({ contents, name }) => {
      fs.writeFileSync(cwd("./public/icons", name), contents);
    }),
    files.forEach(({ contents, name }) => {
      fs.writeFileSync(cwd("./public", name), contents);
    }),
  ]);
})();
