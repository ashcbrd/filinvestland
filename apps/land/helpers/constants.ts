export const FACEBOOK_URL = "https://www.facebook.com/filinvest/";
export const TWITTER_URL = "https://twitter.com/filinvest";
export const LINKEDIN_URL = "https://www.linkedin.com/company/filinvest";
export const PHONE_NUMBER = {
  number: "+639190764836",
  text: "(63 2) 8-850-0888",
};
export const TEL_NUMBER = { number: "+63288500888", text: "(63 919) 076-4836" };
export const EMAIL_ADD = "test@gmail.com";
export const OFFICE_ADDRESS =
  "Filinvest Building, 79 EDSA, Mandaluyong City, 1550 Philippines";
export const WEB_TITLE = "Filinvest Land, Inc.";
export const FAVICON_NAME = "favicon.png";
export const SAMPLE_NEWS = [
  {
    imgSrc: "/award-2-news.png",
    width: 1036,
    height: 806,
    alt: "Test",
    title:
      "Filinvest Land, Inc. honored at BCI Asia's Top 10 Best Developer Awards",
    desc: "Mattis molestie a iaculis at erat pellentesque adipiscing commodo nunc lobortis mattis.",
    slug: "test-slug-1",
  },
  {
    imgSrc: "/award-2-news.png",
    width: 1036,
    height: 806,
    alt: "Test",
    title:
      "Filinvest Activa recognized as the Best Mixed-use Development by Dot Property",
    desc: "Mattis molestie a iaculis at erat pellentesque adipiscing commodo nunc lobortis mattis.",
    slug: "test-slug-2",
  },
  {
    imgSrc: "/award-3-news.png",
    width: 1036,
    height: 806,
    alt: "Test",
    title:
      "Filinvest Activa recognized as the Best Mixed-use Development by Dot Property",
    desc: "Mattis molestie a iaculis at erat pellentesque adipiscing commodo nunc lobortis mattis.",
    slug: "test-slug-3",
  },
];

export const MM_ARR = [
  "Makati City",
  "Manila",
  "Muntinlupa",
  "Parañaque",
  "Pasay",
  "Pasig City",
  "Quezon City",
  "San Juan",
  "Taguig",
];
export const CALABARZON_ARR = ["Batangas", "Cavite", "Laguna", "Rizal"];
export const LUZON_ARR = [
  "Bulacan",
  "Pampanga",
  "Tarlac",
  "Pangasinan",
  "Palawan",
];
export const VISAYAS_ARR = [
  "Bacolod",
  "Cebu",
  "Dumaguete City",
  "Iloilo",
  "Negros Occidental",
];
export const MINDANAO_ARR = [
  "Butuan",
  "Cagayan de Oro",
  "Cotabato",
  "Davao",
  "Zamboanga",
];
export const LOCATION_OBJ = {
  "Metro Manila": MM_ARR,
  Calabarzon: CALABARZON_ARR,
  Luzon: LUZON_ARR,
  Visayas: VISAYAS_ARR,
  Mindanao: MINDANAO_ARR,
};
export const PROJECT_TYPE = [
  "Residential",
  "Corporate Centers",
  "Offices",
  "Malls",
  "Townscapes",
  "Industrial",
  "Co-living",
  "Mixed-use",
];
export const UNIT_SIZE = [
  "Less than 1 ha",
  "Less than 2 ha",
  "Less than 3 ha",
  "Less than 4 ha",
  "Less than 5 ha",
];

export const SAMPLE_PROJECTS = [
  {
    imgSrc: "/100-west-cyberzone.png",
    width: 507,
    height: 407,
    alt: "Test",
    title: "100 West Cyberzone",
    slug: "test-slug-1",
    type: "Offices",
    location: "Makati City",
  },
  {
    imgSrc: "/100-west-cyberzone.png",
    width: 507,
    height: 407,
    alt: "Test",
    title: "100 West Cyberzone",
    slug: "test-slug-1",
    type: "Offices",
    location: "Makati City",
  },
  {
    imgSrc: "/100-west-cyberzone.png",
    width: 507,
    height: 407,
    alt: "Test",
    title: "100 West Cyberzone",
    slug: "test-slug-1",
    type: "Offices",
    location: "Makati City",
  },
  {
    imgSrc: "/100-west-cyberzone.png",
    width: 507,
    height: 407,
    alt: "Test",
    title: "100 West Cyberzone",
    slug: "test-slug-1",
    type: "Offices",
    location: "Makati City",
  },
  {
    imgSrc: "/100-west-cyberzone.png",
    width: 507,
    height: 407,
    alt: "Test",
    title: "100 West Cyberzone",
    slug: "test-slug-1",
    type: "Offices",
    location: "Makati City",
  },
  {
    imgSrc: "/100-west-cyberzone.png",
    width: 507,
    height: 407,
    alt: "Test",
    title: "100 West Cyberzone",
    slug: "test-slug-1",
    type: "Offices",
    location: "Makati City",
  },
  {
    imgSrc: "/100-west-cyberzone.png",
    width: 507,
    height: 407,
    alt: "Test",
    title: "100 West Cyberzone",
    slug: "test-slug-1",
    type: "Offices",
    location: "Makati City",
  },
];

export const PROPERTY_TYPE = ["Condominium", "House & Lot", "Lot Only"];

export const BRAND_ARR = ["Prestige", "Futura", "Aspire"];
export const CACHE_REVALIDATE = 30;

export const SEARCH_PARAM_MAP: {
  [
    key:
      | "propertyType"
      | "location"
      | "unitSize"
      | "priceRangeFrom"
      | "priceRangeTo"
      | "propertyName"
      | "projectType"
      | "locationGroup"
      | "bedrooms"
      | "subLocation"
      | "brand"
      | string
  ]: string;
} = {
  propertyType: "type",
  location: "location",
  unitSize: "size",
  priceRangeFrom: "priceFrom",
  priceRangeTo: "priceTo",
  propertyName: "name",
  projectType: "project",
  locationGroup: "group",
  bedrooms: "rooms",
  subLocation: "sub",
  brand: "brand",
};

export const defaultCoverImage = "/filinvest-cover.png";
