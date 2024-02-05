require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? "../../../.env" : "../../.env",
});

function removeHttp(url) {
  return url.replace(/^https?:\/\//, "");
}

module.exports = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost",
      removeHttp(process.env.CMS_URL),
      `${process.env.PAYLOAD_PUBLIC_S3_BUCKET}.s3.amazonaws.com`,
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  rewrites() {
    const BASE_URL = this.env.LAND_URL ?? "https://beta.filinvestland.com";
    return [
      {
        source: `/api/:path*`,
        destination: `${this.env.CMS_URL}/api/:path*`,
        basePath: false,
      },
      {
        source: `/files/:path*`,
        destination: `${this.env.CMS_URL}/files/:path*`,
        basePath: false,
      },
      {
        source: `/project/:path*`,
        destination: `/projects/:path*`,
      },
      {
        source: `/our-business/:path*`,
        destination: `${BASE_URL}/our-businesses/:path*`,
        basePath: false,
      },
      {
        source: `/our-company/mission-vision-and-values`,
        destination: `${BASE_URL}/about-us/mission-vision`,
        basePath: false,
      },
      {
        source: `/corporate-governance`,
        destination: `${BASE_URL}/investor-relations/corporate-governance/manual-corporate-governance`,
        basePath: false,
      },
      {
        source: `/corporate-governance/manual-corporate-governance`,
        destination: `${BASE_URL}/investor-relations/corporate-governance/manual-corporate-governance`,
        basePath: false,
      },
      {
        source: `/our-company/shareholding-structure`,
        destination: `${BASE_URL}/about-us/structures/shareholding-structure`,
        basePath: false,
      },
      {
        source: `/our-company/conglomerate-map`,
        destination: `${BASE_URL}/about-us/structures/conglomerate-chart`,
        basePath: false,
      },
      {
        source: `/our-company/organizational-chart`,
        destination: `${BASE_URL}/about-us/structures/organizational-chart`,
        basePath: false,
      },
      {
        source: `/our-company/leadership`,
        destination: `${BASE_URL}/investor-relations/our-leadership/board-of-directors`,
        basePath: false,
      },
      {
        source: `/our-company/company-background`,
        destination: `${BASE_URL}/about-us/company-background`,
        basePath: false,
      },
      {
        source: `/corporate-governance/annual-corp-gov-report`,
        destination: `${BASE_URL}/investor-relations/corporate-governance/annual-corporate-governance-report`,
        basePath: false,
      },
      {
        source: `/corporate-governance/board-committee-charters`,
        destination: `${BASE_URL}/investor-relations/corporate-governance/board-committees`,
        basePath: false,
      },
      {
        source: `/corporate-governance/enterprise-risk-management`,
        destination: `${BASE_URL}/investor-relations/corporate-governance/enterprise-risk-management`,
        basePath: false,
      },
      {
        source: `/corporate-governance/committees-and-members`,
        destination: `${BASE_URL}/investor-relations/corporate-governance/board-committees`,
        basePath: false,
      },
      {
        source: `/corporate-governance/code-business-conduct-and-ethics`,
        destination: `${BASE_URL}/investor-relations/corporate-governance/code-business-conduct-ethics`,
        basePath: false,
      },
      {
        source: `/corporate-governance/corporate-social-responsibility`,
        destination: `${BASE_URL}/investor-relations/corporate-governance/corporate-social-responsibility`,
        basePath: false,
      },
      {
        source: `/corporate-governance/company-policies`,
        destination: `${BASE_URL}/investor-relations/corporate-governance/company-policies`,
        basePath: false,
      },
      {
        source: `/investor-relations/clsa-report`,
        destination: `${BASE_URL}/investor-relations/research-reports`,
        basePath: false,
      },
      {
        source: `/investor-relations/annual-report-presentations`,
        destination: `${BASE_URL}/financials/annual-reports`,
        basePath: false,
      },
      {
        source: `/investor-relations/share-information`,
        destination: `${BASE_URL}/investor-relations/stock-information`,
        basePath: false,
      },
      {
        source: `/investor-relations/financial-highlights`,
        destination: `${BASE_URL}/financials/financial-highlights`,
        basePath: false,
      },
      {
        source: `/news/:path*`,
        destination: `/article/:path*`,
      },
    ];
  },
  env: {
    CMS_URL: process.env.CMS_URL,
    LAND_URL: process.env.LAND_URL,
    MANATAL_TOKEN: process.env.MANATAL_TOKEN,
    GMAPS_TOKEN: process.env.GMAPS_TOKEN,
    ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN,
    ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID,
    ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET,
    ZOHO_REFRESH_TOKEN_URL: process.env.ZOHO_REFRESH_TOKEN_URL,
    ZOHO_LEADS_URL: process.env.ZOHO_LEADS_URL,
    ZOHO_BOT_WIDGET_CODE: process.env.ZOHO_BOT_WIDGET_CODE,
    PSE_URL: process.env.PSE_URL,
    COMPANY_SYMBOL: process.env.COMPANY_SYMBOL,
    MANATAL_CLIENT_ID: process.env.MANATAL_CLIENT_ID,
    MANATAL_CAREER_SUBMIT_URL: process.env.MANATAL_CAREER_SUBMIT_URL,
    PAYLOAD_PUBLIC_S3_BUCKET: process.env.PAYLOAD_PUBLIC_S3_BUCKET,
    ZOHO_CMS_API: process.env.ZOHO_CMS_API,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    GOOGLE_RECAPTCHA_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
  },
};
