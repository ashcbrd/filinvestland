import Content from "@/components/pages/investor-relations/investor-relations-program/Content";
import { getPageContent } from "../../page";
import { metaBuilder } from "@/helpers/metaBuilder";

const INVESTOR_RELATIONS_PROGRAM_PAGE_ID = "640be8732aff53ceb80cfebd";
export async function generateMetadata() {
  const content = await getPageContent(INVESTOR_RELATIONS_PROGRAM_PAGE_ID);
  return metaBuilder(content);
}

const InvestorRelationsProgramPage = async () => {
  const content = await getPageContent(INVESTOR_RELATIONS_PROGRAM_PAGE_ID);
  return <Content content={content} />;
};

export default InvestorRelationsProgramPage;
