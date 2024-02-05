import { metaBuilder } from "@/helpers/metaBuilder";
import Content from "@/components/pages/buyers/filpay/Content";

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
  const content = await getPageContent("63fe98af7547f6d84570e653");
  return metaBuilder(content);
}

const AnnualReportsPage = async () => {
  const content = await getPageContent("63fe98af7547f6d84570e653");
  return <Content content={content} />;
};

export default AnnualReportsPage;
