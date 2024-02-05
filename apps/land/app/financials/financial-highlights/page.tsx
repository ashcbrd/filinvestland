import Content from "@/components/pages/financials/financial-highlights/Content";
import { getPageContent } from "../../page";
import { metaBuilder } from "@/helpers/metaBuilder";

const FINANCIAL_HIGHLIGHTS_PAGE = "640594d60b410795a32daac1";

export async function generateMetadata() {
  const content = await getPageContent(FINANCIAL_HIGHLIGHTS_PAGE);
  return metaBuilder(content);
}

const FinancialHighlightsPage = async () => {
  const content = await getPageContent(FINANCIAL_HIGHLIGHTS_PAGE);
  // return <Content content={content} />;
  return (
    <div className="sketch-bg-dividend">
      <Content content={content} />
    </div>
  );
};

export default FinancialHighlightsPage;
