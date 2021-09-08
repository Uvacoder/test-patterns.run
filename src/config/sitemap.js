// @ts-check

const { url } = require("./site");

/**
 * https://github.com/iamvishnusankar/next-sitemap/blob/master/packages/next-sitemap/src/interface.ts#L15
 *
 * @type {import("next-sitemap").IConfig}
 */
const sitemapConfig = {
  changefreq: "daily",
  generateRobotsTxt: true,
  priority: 0.7,
  siteUrl: url,
};

module.exports = sitemapConfig;
