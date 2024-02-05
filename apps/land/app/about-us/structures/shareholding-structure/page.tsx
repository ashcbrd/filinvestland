import Content from "@/components/pages/about-us/structures/shareholding-structure/Content";
import { getPageContent } from "../../../page";
import { metaBuilder } from "@/helpers/metaBuilder";
const SHAREHOLDING_STRUCTURE_PAGE_ID = "63fb2a6d12db8fb902e69afa";

export async function generateMetadata() {
  const content = await getPageContent(SHAREHOLDING_STRUCTURE_PAGE_ID);
  return metaBuilder(content);
}

const ShareholdingStructurePage = async () => {
  const content = await getPageContent(SHAREHOLDING_STRUCTURE_PAGE_ID);
  return <Content content={content} />;
};

export default ShareholdingStructurePage;
