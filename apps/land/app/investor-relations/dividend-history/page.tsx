import Content from "@/components/pages/investor-relations/dividend-history/Content";
import { getPageContent } from "../../page";
import { metaBuilder } from "@/helpers/metaBuilder";

const DIVIDEND_HISTORY_PAGE_ID = "6405a9a99736d66cfb1b15f2";

export async function generateMetadata() {
  const content = await getPageContent(DIVIDEND_HISTORY_PAGE_ID);
  return metaBuilder(content);
}

const DividendHistoryPage = async () => {
  const content = await getPageContent(DIVIDEND_HISTORY_PAGE_ID);
  return (
    <div className="sketch-bg-dividend">
      <Content content={content} />
    </div>
  );
};

export default DividendHistoryPage;
