// @ts-check

const favicons = require("favicons");
const fs = require("fs");

const config = require("../config/site");
const cwd = require("../utils/cwd");

(async () => {
  const { files, images, html } = await favicons(cwd("./public/kite.png"), {
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
    ...files.map(({ contents, name }) => fs.writeFileSync(cwd("./public", name), contents)),
    ...images.map(({ contents, name }) => fs.writeFileSync(cwd("./public/icons", name), contents)),
    fs.writeFileSync(
      cwd("./src/generated/favicon-meta-tags.jsx"),
      `export default function FaviconMetaTags() { return <>${html.map((h) => h.replace(/>$/, " />")).join(" ")}</>; }`,
    ),
  ]);
})();
