// @ts-check

const favicons = require("favicons");
const fs = require("fs");

const siteConfig = require("../config/site");
const cwd = require("../utils/cwd");

(async () => {
  const { files, images, html } = await favicons(cwd("./public/icon.png"), {
    path: "/icons/",
    appName: siteConfig.title,
    appShortName: siteConfig.title,
    appDescription: siteConfig.description,
    developerName: siteConfig.title,
    developerURL: siteConfig.url,
    background: siteConfig.theme,
    theme_color: siteConfig.theme,
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
