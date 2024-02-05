import Content from "@/components/pages/investor-relations/dividend-policy/Content";
import { getPageContent } from "../../page";
import { metaBuilder } from "@/helpers/metaBuilder";

const DIVIDEND_POLICY_PAGE_ID = "640640c7f1b2d3552c7c5e02";
export async function generateMetadata() {
  const content = await getPageContent(DIVIDEND_POLICY_PAGE_ID);
  return metaBuilder(content);
}

const DividendPolicyPage = async () => {
  const content = await getPageContent(DIVIDEND_POLICY_PAGE_ID);
  return (
    <>
      <Content content={content} />
    </>
  );
};

export default DividendPolicyPage;
