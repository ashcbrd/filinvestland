export const INVESTOR_RELATIONS = {
  url: "/investor-relations",
  name: "Investor Relations",
  directory: ["Investor Relations"],
};
const OUR_COMPANY = {
  url: `${INVESTOR_RELATIONS.url}/our-company`,
  name: "Our Company",
  directory: [...INVESTOR_RELATIONS.directory, "Our Company"],
};
const OUR_LEADERSHIP = {
  url: `about-us/our-leadership/board-of-directors`,
  name: "Our Leadership",
  directory: [...INVESTOR_RELATIONS.directory, "Our Leadership"],
};
const STRUCTURES = {
  url: `${INVESTOR_RELATIONS.url}/structures`,
  name: "Structures",
  directory: [...INVESTOR_RELATIONS.directory, "Structures"],
};

// CORPORATE GOVERNANCE
const CORPORATE_GOVERNANCE = {
  url: `${INVESTOR_RELATIONS.url}/corporate-governance`,
  name: "Corporate Governance",
  directory: [...INVESTOR_RELATIONS.directory, "Corporate Governance"],
};
const BOARD_COMMITTEES = {
  url: `${CORPORATE_GOVERNANCE.url}/board-committees`,
  name: "Board Committees",
  directory: [...CORPORATE_GOVERNANCE.directory, "Board Committees"],
};
const ENTERPRISE_RISK_MANAGEMENT = {
  url: `${CORPORATE_GOVERNANCE.url}/enterprise-risk-management`,
  name: "Enterprise Risk Management",
  directory: [...CORPORATE_GOVERNANCE.directory, "Enterprise Risk Management"],
};
const COMPANY_POLICIES = {
  url: `${CORPORATE_GOVERNANCE.url}/company-policies`,
  name: "Company Policies",
  directory: [...CORPORATE_GOVERNANCE.directory, "Company Policies"],
};
const MANUAL_CORPORATE_GOVERNANCE = {
  url: `${CORPORATE_GOVERNANCE.url}/manual-corporate-governance`,
  name: "Manual on Corporate Governance",
  directory: [...CORPORATE_GOVERNANCE.directory, "Manual Corporate Governance"],
};
const CODE_BUSINESS_CONDUCT_ETHICS = {
  url: `${CORPORATE_GOVERNANCE.url}/code-business-conduct-ethics`,
  name: "Code Of Business Conduct & Ethics",
  directory: [
    ...CORPORATE_GOVERNANCE.directory,
    "Code Of Business Conduct & Ethics",
  ],
};
const ANNUAL_CORPORATE_GOVERNANCE_REPORT = {
  url: `${CORPORATE_GOVERNANCE.url}/annual-corporate-governance-report`,
  name: "Annual Corporate Governance & Report",
  directory: [
    ...CORPORATE_GOVERNANCE.directory,
    "Annual Corporate Governance & Report",
  ],
};
const CORPORATE_SOCIAL_RESPONSIBILITY = {
  url: `${CORPORATE_GOVERNANCE.url}/corporate-social-responsibility`,
  name: "Corporate Social Responsibility",
  directory: [
    ...CORPORATE_GOVERNANCE.directory,
    "Corporate Social Responsibility",
  ],
};
const COMBINED_CORPORATE_GOVERNANCE = {
  ...CORPORATE_GOVERNANCE,
  BOARD_COMMITTEES,
  ENTERPRISE_RISK_MANAGEMENT,
  COMPANY_POLICIES,
  MANUAL_CORPORATE_GOVERNANCE,
  CODE_BUSINESS_CONDUCT_ETHICS,
  ANNUAL_CORPORATE_GOVERNANCE_REPORT,
  CORPORATE_SOCIAL_RESPONSIBILITY,
};

const INVESTOR_RELATIONS_PROGRAM = {
  url: `${INVESTOR_RELATIONS.url}/investor-relations-program`,
  name: "Investor Relations Program",
  directory: [...INVESTOR_RELATIONS.directory, "Investor Relations Program"],
};
const DIVIDEND_HISTORY = {
  url: `${INVESTOR_RELATIONS.url}/dividend-history`,
  name: "Dividend History",
  directory: [...INVESTOR_RELATIONS.directory, "Dividend History"],
};
const DIVIDEND_POLICY = {
  url: `${INVESTOR_RELATIONS.url}/dividend-policy`,
  name: "Dividend Policy",
  directory: [...INVESTOR_RELATIONS.directory, "Dividend Policy"],
};
const STOCK_INFORMATION = {
  url: `${INVESTOR_RELATIONS.url}/stock-information`,
  name: "Stock Information",
  directory: [...INVESTOR_RELATIONS.directory, "Stock Information"],
};
const FINANCIAL_HIGHLIGHTS = {
  url: `financials/financial-highlights`,
  name: "Finance Highlights",
  directory: [...INVESTOR_RELATIONS.directory, "Finance Highlights"],
};
const PRESS_RELEASES = {
  url: `${INVESTOR_RELATIONS.url}/press-releases`,
  name: "Press Releases",
  directory: [...INVESTOR_RELATIONS.directory, "Press Releases"],
};
const PRESENTATIONS = {
  url: `${INVESTOR_RELATIONS.url}/presentations`,
  name: "Presentations",
  directory: [...INVESTOR_RELATIONS.directory, "Presentations"],
};
const RESEARCH_REPORTS = {
  url: `${INVESTOR_RELATIONS.url}/research-reports`,
  name: "Research Reports",
  directory: [...INVESTOR_RELATIONS.directory, "Research Reports"],
};
const DISCLOSURES = {
  url: `${INVESTOR_RELATIONS.url}/disclosures`,
  name: "Disclosures",
  directory: [...INVESTOR_RELATIONS.directory, "Disclosures"],
};
const REINVESTMENT_PLAN = {
  url: `${INVESTOR_RELATIONS.url}/reinvestment-plan`,
  name: "Reinvestment Plan",
  directory: [...INVESTOR_RELATIONS.directory, "Reinvestment Plan"],
};
const INVESTOR_RELATIONS_ROUTES = {
  ...INVESTOR_RELATIONS,
  DIVIDEND_HISTORY,
  DIVIDEND_POLICY,
  OUR_COMPANY,
  OUR_LEADERSHIP,
  STRUCTURES,
  CORPORATE_GOVERNANCE: COMBINED_CORPORATE_GOVERNANCE,
  INVESTOR_RELATIONS_PROGRAM,
  STOCK_INFORMATION,
  FINANCIAL_HIGHLIGHTS,
  PRESS_RELEASES,
  PRESENTATIONS,
  RESEARCH_REPORTS,
  DISCLOSURES,
  REINVESTMENT_PLAN,
};
export const INVESTOR_RELATIONS_SUB_ROUTES = [
  OUR_COMPANY,
  OUR_LEADERSHIP,
  STRUCTURES,
  COMBINED_CORPORATE_GOVERNANCE,
  INVESTOR_RELATIONS_PROGRAM,
  STOCK_INFORMATION,
  FINANCIAL_HIGHLIGHTS,
  PRESS_RELEASES,
  PRESENTATIONS,
  RESEARCH_REPORTS,
  DISCLOSURES,
  REINVESTMENT_PLAN,
];
export default INVESTOR_RELATIONS_ROUTES;
