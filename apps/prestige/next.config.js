/** @type {import('next').NextConfig} */

function removeHttp(url) {
  return url.replace(/^https?:\/\//, "");
}

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    CMS_URL: process.env.CMS_URL,
    ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    GOOGLE_RECAPTCHA_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
  },
  images: {
    domains: [
      "localhost",
      removeHttp(process.env.CMS_URL),
      `${process.env.PAYLOAD_PUBLIC_S3_BUCKET}.s3.amazonaws.com`,
      "filinvest.com",
    ],
  },
};

module.exports = nextConfig;
