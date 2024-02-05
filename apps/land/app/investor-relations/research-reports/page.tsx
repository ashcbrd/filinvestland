import Content from "@/components/pages/investor-relations/research-reports/Content";
import { metaBuilder } from "@/helpers/metaBuilder";
import { getPageContent } from "../../page";
const RESEARCH_REPORTS_PAGE = "643ffac1e163b51843b3a8bb";
export async function generateMetadata() {
  const content = await getPageContent(RESEARCH_REPORTS_PAGE);
  return metaBuilder(content);
}

const ResearchReportsPage = async () => {
  const content = await getPageContent(RESEARCH_REPORTS_PAGE);
  return <Content content={content} />;
};

export default ResearchReportsPage;
