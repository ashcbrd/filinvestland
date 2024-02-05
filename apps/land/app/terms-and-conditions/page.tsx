import Content from "@/components/pages/terms/Content";

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
  const content = await getPageContent("63ff147e8679598934b40327");
  return metaBuilder(content);
}

const TermsPage = async () => {
  const content = await getPageContent("63ff147e8679598934b40327");
  return <Content content={content} />;
};

export default TermsPage;
