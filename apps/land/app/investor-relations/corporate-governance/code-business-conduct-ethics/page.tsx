import Content from "@/components/pages/investor-relations/corporate-governance/code-business-conduct-ethics/Content";

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
  const content = await getPageContent("63f21891b063b608e2056b92");
  return metaBuilder(content);
}

const CodeBusinessConductEthicsPage = async () => {
  const content = await getPageContent("63f21891b063b608e2056b92");
  return <Content content={content} />;
};

export default CodeBusinessConductEthicsPage;
