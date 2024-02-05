import Content from "@/components/pages/investor-relations/share-information/Content";
import { metaBuilder } from "@/helpers/metaBuilder";
import { getPageContent } from "../../page";
const STOCK_PAGE_ID = "63faed278a325ad49bd54642";

export async function generateMetadata() {
  const content = await getPageContent(STOCK_PAGE_ID);
  return metaBuilder(content);
}

const ShareInformationPage = async () => {
  const content = await getPageContent(STOCK_PAGE_ID);
  return <Content content={content} />;
};

export default ShareInformationPage;
