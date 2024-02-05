export const OUR_BUSINESSES = {
  url: "/our-businesses",
  name: "Our Businesses",
  directory: ["Our Businesses"],
};
const RESIDENTIAL = {
  url: `${OUR_BUSINESSES.url}/residential`,
  name: "Residential",
  directory: [...OUR_BUSINESSES.directory, "Residential"],
};
const CORPORATE_CENTERS = {
  url: `${OUR_BUSINESSES.url}/corporate-centers`,
  name: "Corporate Centers",
  directory: [...OUR_BUSINESSES.directory, "Corporate Centers"],
};

const OFFICES = {
  url: `${OUR_BUSINESSES.url}/offices`,
  name: "Offices",
  directory: [...OUR_BUSINESSES.directory, "Offices"],
};
const OFFICE_PARKS = {
  url: `${OUR_BUSINESSES.url}/office-parks`,
  name: "Office Parks",
  directory: [...OUR_BUSINESSES.directory, "Office Parks"],
};

const MALLS = {
  url: `${OUR_BUSINESSES.url}/malls`,
  name: "Malls",
  directory: [...OUR_BUSINESSES.directory, "malls"],
};
const TOWNSCAPES = {
  url: `${OUR_BUSINESSES.url}/townscapes`,
  name: "Townscapes",
  directory: [...OUR_BUSINESSES.directory, "Townscapes"],
};
const INDUSTRIAL = {
  url: `${OUR_BUSINESSES.url}/industrial`,
  name: "Industrial",
  directory: [...OUR_BUSINESSES.directory, "industrial"],
};
const COLIVING = {
  url: `${OUR_BUSINESSES.url}/co-living`,
  name: "Co-living",
  directory: [...OUR_BUSINESSES.directory, "co-living"],
};
const MIXEDUSE_ESTATES = {
  url: `${OUR_BUSINESSES.url}/mixeduse-estates`,
  name: "Mixed-Use & Estates",
  directory: [...OUR_BUSINESSES.directory, "mixeduse-estates"],
};
const OUR_BUSINESSES_ROUTES = {
  ...OUR_BUSINESSES,
  RESIDENTIAL,
  CORPORATE_CENTERS,
  OFFICES,
  OFFICE_PARKS,
  MALLS,
  TOWNSCAPES,
  INDUSTRIAL,
  COLIVING,
  MIXEDUSE_ESTATES,
};
export const OUR_BUSINESSES_SUB_ROUTES = [
  RESIDENTIAL,
  CORPORATE_CENTERS,
  OFFICES,
  OFFICE_PARKS,
  MALLS,
  TOWNSCAPES,
  INDUSTRIAL,
  COLIVING,
  MIXEDUSE_ESTATES,
];
export default OUR_BUSINESSES_ROUTES;
