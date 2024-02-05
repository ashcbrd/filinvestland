import Breadcrumbs from "../../header/Breadcrumbs";
import Tabs from "../../header/Tabs";
import ROUTES from "@/helpers/routes";

const { INVESTOR_RELATIONS, HOME } = ROUTES;
const {
  STOCK_INFORMATION,
  DIVIDEND_HISTORY,
  DIVIDEND_POLICY,
  DISCLOSURES,
  REINVESTMENT_PLAN,
  INVESTOR_RELATIONS_PROGRAM,
} = INVESTOR_RELATIONS;

const TAB_ITEMS = [
  {
    title: STOCK_INFORMATION.name,
    link: STOCK_INFORMATION.url,
  },
  {
    title: DIVIDEND_HISTORY.name,
    link: DIVIDEND_HISTORY.url,
  },
  {
    title: DIVIDEND_POLICY.name,
    link: DIVIDEND_POLICY.url,
  },
];

const BREADCRUMBS = [
  {
    title: HOME.name,
    link: HOME.url,
  },
  {
    title: INVESTOR_RELATIONS.name,
    link: INVESTOR_RELATIONS.url,
  },
];

const dividendHistoryImage = "dividend-history.png";
const dividendHistoryImageSmall = "dividend-history-small.png";
const investorRelationsImage = "investor-relations.png";
const investorRelationsImageSmall = "investor-relations-small.png";
const investorRelationsProgramImage = "investor-relations-program.png";
const investorRelationsProgramSmallImage =
  "investor-relations-program-small.png";
const disclosuresImage = "disclosures.png";
const disclosuresSmallImage = "disclosures-small.png";
const reinvestmentPlanImage = "reinvestment-plan.png";
const reinvestmentPlanSmallImage = "reinvestment-plan-small.png";

export const HEADER_INFO = {
  investorRelations: {
    title: INVESTOR_RELATIONS.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[BREADCRUMBS[0], { title: INVESTOR_RELATIONS.name }]}
      />
    ),
    image: investorRelationsImage,
    imageSmall: investorRelationsImageSmall,
  },
  dividendPolicy: {
    title: DIVIDEND_POLICY.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: DIVIDEND_POLICY.name }]} />
    ),
    image: dividendHistoryImage,
    imageSmall: dividendHistoryImageSmall,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  dividendHistory: {
    title: DIVIDEND_HISTORY.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: DIVIDEND_HISTORY.name }]} />
    ),
    image: dividendHistoryImage,
    imageSmall: dividendHistoryImageSmall,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  stockInformation: {
    title: STOCK_INFORMATION.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: STOCK_INFORMATION.name }]}
      />
    ),
    image: dividendHistoryImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  disclosures: {
    title: DISCLOSURES.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: DISCLOSURES.name }]} />
    ),
    image: disclosuresImage,
    imageSmall: disclosuresSmallImage,
  },
  reinvestmentPlan: {
    title: REINVESTMENT_PLAN.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: REINVESTMENT_PLAN.name }]}
      />
    ),
    image: reinvestmentPlanImage,
    imageSmall: reinvestmentPlanSmallImage,
  },
  investorRelationsProgram: {
    title: INVESTOR_RELATIONS_PROGRAM.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: INVESTOR_RELATIONS_PROGRAM.name }]}
      />
    ),
    image: investorRelationsProgramImage,
    imageSmall: investorRelationsProgramSmallImage,
  },
};

export const TOP_20_SHAREHOLDERS = [
  {
    shareholder: "Filinvest Development Corporation",
    shares: "15,681,457,022",
    percentage: "64.67%",
  },
  {
    shareholder: "PCD Nominee Corporation (Filipino)",
    shares: "4,593,989,925",
    percentage: "18.94%",
  },
  {
    shareholder: "PCD Nominee Corporation (Non-Filipino)",
    shares: "3,373,331,093",
    percentage: "13.91%",
  },
  {
    shareholder: "PGI Retirement Fund Inc.",
    shares: "115,281,500",
    percentage: "00.48%",
  },
  {
    shareholder: "Philippines International Life Insurance Co. Inc",
    shares: "60,000,000",
    percentage: "00.25%",
  },
  {
    shareholder: "Josefina Multi-Ventures Corporation",
    shares: "54,809,000",
    percentage: "00.23%",
  },
  {
    shareholder: "Pryce Corporation",
    shares: "50,802,000",
    percentage: "00.21%",
  },
  {
    shareholder: "Don Manuel Investments Corporation",
    shares: "47,918,000",
    percentage: "00.20%",
  },
  {
    shareholder: "F. Yap Securities, Inc.",
    shares: "32,000,000",
    percentage: "00.13%",
  },
  {
    shareholder: "Michael Gotianun",
    shares: "11,235,913",
    percentage: "00.05%",
  },
  {
    shareholder: "Lucio W. Yan &/or Clara Y. Yan",
    shares: "10,687,500",
    percentage: "00.04%",
  },
  {
    shareholder: "Joseph M. Yap &/or Josephine G. Yap",
    shares: "7,694,843",
    percentage: "00.03%",
  },
  {
    shareholder: "Joseph M. Yap",
    shares: "6,444,115",
    percentage: "00.03%",
  },
  {
    shareholder: "Hinundayan Holdings Corporation",
    shares: "5,100,000",
    percentage: "00.02%",
  },
  {
    shareholder: "Executive Optical, Inc.",
    shares: "5,040,647",
    percentage: "00.02%",
  },
  {
    shareholder:
      "Berck Y. Cheng or Alving Y. Cheng or Diana Y. Cheng or Cheryl Y. Cheng",
    shares: "5,000,000",
    percentage: "00.02%",
  },
  {
    shareholder: "Jonathan Dee Co",
    shares: "5,000,000",
    percentage: "00.02%",
  },
  {
    shareholder: "R Magdalena Bosch",
    shares: "4,877,928",
    percentage: "00.02%",
  },
  {
    shareholder: "Veronica P. Fernandez",
    shares: "4,064,940",
    percentage: "00.02%",
  },
  {
    shareholder: "Luis L. Fernandez",
    shares: "4,064,940",
    percentage: "00.02%",
  },
];

export const TABLE_TITLE_DIVIDENDS = [
  "Total Dividends (Php M)",
  "1,212.48",
  "1,357.94",
  "1,500",
  "1,500",
  "1,500",
  "1,500",
  "1,571",
  "747",
  "1,140",
];

export const TABLE_VALUES_DIVIDENDS = [
  "Pay-out rate (%)",
  "31%",
  "30%",
  "30%",
  "29%",
  "26%",
  "25%",
  "25%",
  "20%",
  "30%",
];
