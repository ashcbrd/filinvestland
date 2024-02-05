import Content from "@/components/pages/investor-relations/corporate-governance/enterprise-risk-management/Content";

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

export async function generateMetadata() {
  const content = await getPageContent("64082a5c59011a71b0e60996");
  return metaBuilder(content);
}

const ShareInformationPage = async () => {
  const content = await getPageContent("64082a5c59011a71b0e60996");
  return (
    <>
      <Content content={content} />
    </>
  );
};

export default ShareInformationPage;
