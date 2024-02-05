import Content from "@/components/pages/about-us/structures/conglomerate-chart/Content";
import { metaBuilder } from "@/helpers/metaBuilder";
import { getPageContent } from "../../../page";

const CONGLOMERATE_CHART_PAGE = "63fb6b7f7f9f67508c875330";
export async function generateMetadata() {
  const content = await getPageContent(CONGLOMERATE_CHART_PAGE);
  return metaBuilder(content);
}

const ConglomerateChartPage = async () => {
  const content = await getPageContent(CONGLOMERATE_CHART_PAGE);
  return <Content content={content} />;
};

export default ConglomerateChartPage;
