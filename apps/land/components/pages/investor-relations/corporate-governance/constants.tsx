import Breadcrumbs from "@/components/header/Breadcrumbs";
import Tabs from "@/components/header/Tabs";
import ROUTES from "@/helpers/routes";

const { INVESTOR_RELATIONS } = ROUTES;
const { CORPORATE_GOVERNANCE } = INVESTOR_RELATIONS;
const {
  BOARD_COMMITTEES,
  ENTERPRISE_RISK_MANAGEMENT,
  COMPANY_POLICIES,
  MANUAL_CORPORATE_GOVERNANCE,
  CODE_BUSINESS_CONDUCT_ETHICS,
  ANNUAL_CORPORATE_GOVERNANCE_REPORT,
  CORPORATE_SOCIAL_RESPONSIBILITY,
} = CORPORATE_GOVERNANCE;

const TAB_ITEMS = [
  {
    title: MANUAL_CORPORATE_GOVERNANCE.name,
    link: MANUAL_CORPORATE_GOVERNANCE.url,
  },
  {
    title: CODE_BUSINESS_CONDUCT_ETHICS.name,
    link: CODE_BUSINESS_CONDUCT_ETHICS.url,
  },
  {
    title: ANNUAL_CORPORATE_GOVERNANCE_REPORT.name,
    link: ANNUAL_CORPORATE_GOVERNANCE_REPORT.url,
  },
  {
    title: BOARD_COMMITTEES.name,
    link: BOARD_COMMITTEES.url,
  },
  {
    title: CORPORATE_SOCIAL_RESPONSIBILITY.name,
    link: CORPORATE_SOCIAL_RESPONSIBILITY.url,
  },
  {
    title: ENTERPRISE_RISK_MANAGEMENT.name,
    link: ENTERPRISE_RISK_MANAGEMENT.url,
  },
  {
    title: COMPANY_POLICIES.name,
    link: COMPANY_POLICIES.url,
  },
];

const BREADCRUMBS = [
  {
    title: INVESTOR_RELATIONS.name,
    link: INVESTOR_RELATIONS.url,
  },
  {
    title: CORPORATE_GOVERNANCE.name,
    link: CORPORATE_GOVERNANCE.url,
  },
];

const headerImage = "corporate-governance.png";

export const HEADER_INFO = {
  enterpriseRiskManagement: {
    title: CORPORATE_GOVERNANCE.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: ENTERPRISE_RISK_MANAGEMENT.name }]}
      />
    ),
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  companyPolicies: {
    title: CORPORATE_GOVERNANCE.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: COMPANY_POLICIES.name }]} />
    ),
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  manualCorporateGovernance: {
    title: CORPORATE_GOVERNANCE.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: MANUAL_CORPORATE_GOVERNANCE.name }]}
      />
    ),
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  codeBusinessConductEthics: {
    title: CORPORATE_GOVERNANCE.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: CODE_BUSINESS_CONDUCT_ETHICS.name }]}
      />
    ),
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  annualCorporateGovernanceReport: {
    title: CORPORATE_GOVERNANCE.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[
          ...BREADCRUMBS,
          { title: ANNUAL_CORPORATE_GOVERNANCE_REPORT.name },
        ]}
      />
    ),
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  boardCommittees: {
    title: CORPORATE_GOVERNANCE.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: BOARD_COMMITTEES.name }]} />
    ),
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  corporateSocialResponsibility: {
    title: CORPORATE_GOVERNANCE.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[
          ...BREADCRUMBS,
          { title: CORPORATE_SOCIAL_RESPONSIBILITY.name },
        ]}
      />
    ),
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
};
