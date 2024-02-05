import Content from "@/components/pages/investor-relations/corporate-governance/company-policies/Content";
import { metaBuilder } from "@/helpers/metaBuilder";

async function getPageContent(id: string) {
  const res = await fetch(`${process.env.CMS_URL}/api/pages/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const COMPANY_POLICIES_PAGE_ID = "640991881e1eb35f621ef423";
export async function generateMetadata() {
  const content = await getPageContent(COMPANY_POLICIES_PAGE_ID);
  return metaBuilder(content);
}

const CompanyPoliciesPage = async () => {
  const content = await getPageContent(COMPANY_POLICIES_PAGE_ID);
  return <Content content={content} />;
};

export default CompanyPoliciesPage;
