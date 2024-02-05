import Breadcrumbs from "../../header/Breadcrumbs";
import Tabs from "../../header/Tabs";
import ROUTES from "@/helpers/routes";

const { FINANCIALS, HOME } = ROUTES;
const { FINANCIAL_HIGHLIGHTS, ANNUAL_REPORTS } = FINANCIALS;

const TAB_ITEMS = [
  {
    title: FINANCIAL_HIGHLIGHTS.name,
    link: FINANCIAL_HIGHLIGHTS.url,
  },
  {
    title: ANNUAL_REPORTS.name,
    link: ANNUAL_REPORTS.url,
  },
];

const BREADCRUMBS = [
  {
    title: HOME.name,
    link: HOME.url,
  },
  {
    title: FINANCIALS.name,
    link: FINANCIALS.url,
  },
];

const headerImage = "financial-highlights.png";
const headerImageSmall = "financial-highlights-small.png";

export const HEADER_INFO = {
  financialHighlights: {
    title: FINANCIAL_HIGHLIGHTS.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: FINANCIAL_HIGHLIGHTS.name }]}
      />
    ),
    image: headerImage,
    imageSmall: headerImageSmall,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  annualReports: {
    title: ANNUAL_REPORTS.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: ANNUAL_REPORTS.name }]} />
    ),
    image: headerImage,
    imageSmall: headerImageSmall,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
};
