/** @type {import('next-sitemap').IConfig} */
require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? "../../../.env" : "../../.env",
});
module.exports = {
  siteUrl: process.env.LAND_URL,
  generateRobotsTxt: true,
  sitemapSize: 1000,
  exclude: ["/server-sitemap.xml"],
};
