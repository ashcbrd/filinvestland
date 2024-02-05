import Content from "@/components/pages/investor-relations/reinvestment-plan/Content";
import { getPageContent } from "../../page";
import { metaBuilder } from "@/helpers/metaBuilder";

const REINVESTMENT_PLAN_PAGE_ID = "644243ef1b3de600527632dd";

export async function generateMetadata() {
  const content = await getPageContent(REINVESTMENT_PLAN_PAGE_ID);
  return metaBuilder(content);
}

const ReinvestmentPlanPage = async () => {
  const content = await getPageContent(REINVESTMENT_PLAN_PAGE_ID);
  return <Content content={content} />;
};

export default ReinvestmentPlanPage;
