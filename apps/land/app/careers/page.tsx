import Content from "@/components/pages/careers/Content";
import { getPageContent } from "../page";

import { metaBuilder } from "@/helpers/metaBuilder";

const CAREERS_PAGE_ID = "63fb25cb12db8fb902e691f5";

export async function generateMetadata() {
  const content = await getPageContent(CAREERS_PAGE_ID);
  return metaBuilder(content);
}

const CareersPage = async () => {
  const content = await getPageContent(CAREERS_PAGE_ID);
  return <Content content={content} />;
};

export default CareersPage;
