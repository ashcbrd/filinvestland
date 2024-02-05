import Content from "@/components/pages/investor-relations/corporate-governance/corporate-social-responsibility/Content";
//
import { metaBuilder } from "@/helpers/metaBuilder";
import { getPageContent } from "../../../page";

const CORPORATE_SOCIAL_RESPONSIBILITY_PAGE_ID = "63f22159182491936d85fe44";
export async function generateMetadata() {
  const content = await getPageContent(CORPORATE_SOCIAL_RESPONSIBILITY_PAGE_ID);
  return metaBuilder(content);
}

const corporateSocialResponsibility = async () => {
  const content = await getPageContent(CORPORATE_SOCIAL_RESPONSIBILITY_PAGE_ID);
  return <Content content={content} />;
};

export default corporateSocialResponsibility;
