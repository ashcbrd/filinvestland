import Content from "@/components/pages/financials/annual-reports/Content";
import { metaBuilder } from "@/helpers/metaBuilder";
import { getPageContent } from "../../page";
const ANNUAL_REPORTS_PAGE = "6405e15317553e0c63002470";
export async function generateMetadata() {
  const content = await getPageContent(ANNUAL_REPORTS_PAGE);
  return metaBuilder(content);
}

const AnnualReportsPage = async () => {
  const content = await getPageContent(ANNUAL_REPORTS_PAGE);
  return <Content content={content} />;
};

export default AnnualReportsPage;
