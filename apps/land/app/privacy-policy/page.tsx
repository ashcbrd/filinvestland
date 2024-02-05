import Content from "@/components/pages/privacy-policy/Content";

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
  const content = await getPageContent("64059918a5ee128a26e97e5b");
  return metaBuilder(content);
}

const PrivacyPage = async () => {
  const content = await getPageContent("64059918a5ee128a26e97e5b");
  return <Content content={content} />;
};
// Comment

export default PrivacyPage;
