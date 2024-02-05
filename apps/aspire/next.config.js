/** @type {import('next').NextConfig} */

function removeHttp(url) {
  return url.replace(/^https?:\/\//, "");
}

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    CMS_URL: process.env.CMS_URL,
    ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    GOOGLE_RECAPTCHA_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
    GMAPS_TOKEN: process.env.GMAPS_TOKEN,
  },
  rewrites() {
    return [
      {
        source: `/project/:path*`,
        destination: `/projects/:path*`,
      },
      {
        source: `/about-us`,
        destination: `/about`,
      },
    ];
  },
  images: {
    domains: [
      "localhost",
      removeHttp(process.env.CMS_URL),
      `${process.env.PAYLOAD_PUBLIC_S3_BUCKET}.s3.amazonaws.com`,
      "filinvest-bucket-stg.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
