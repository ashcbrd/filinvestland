import Content from "@/components/pages/about-us/structures/organizational-chart/Content";
import { getPageContent } from "../../../page";
import { metaBuilder } from "@/helpers/metaBuilder";

const ORGANIZATIONAL_PAGE_ID = "63fb6c287f9f67508c875455";
export async function generateMetadata() {
  const content = await getPageContent("639a5782b60dc36e6fc86c93");
  return metaBuilder(content);
}

const OrganizationalChartPage = async () => {
  const content = await getPageContent(ORGANIZATIONAL_PAGE_ID);
  return <Content content={content} />;
};

export default OrganizationalChartPage;
