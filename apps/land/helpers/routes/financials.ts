export const FINANCIALS = {
  url: "/financials",
  name: "Financials",
  directory: ["Financials"],
};
const FINANCIAL_HIGHLIGHTS = {
  url: `${FINANCIALS.url}/financial-highlights`,
  name: "Financial Highlights",
  directory: [...FINANCIALS.directory, "Financial Highlights"],
};
const ANNUAL_REPORTS = {
  url: `${FINANCIALS.url}/annual-reports`,
  name: "Annual Reports",
  directory: [...FINANCIALS.directory, "Annual Reports"],
};
const FINANCIAL_ROUTES = {
  ...FINANCIALS,
  FINANCIAL_HIGHLIGHTS,
  ANNUAL_REPORTS,
};
export const FINANCIALS_SUB_ROUTES = [FINANCIAL_HIGHLIGHTS, ANNUAL_REPORTS];
export default FINANCIAL_ROUTES;
