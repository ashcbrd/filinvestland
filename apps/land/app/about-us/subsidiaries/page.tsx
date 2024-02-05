import Content from "@/components/pages/about-us/subsidiaries/Content";
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
  const content = await getPageContent("639a5888b60dc36e6fc86e12");
  return metaBuilder(content);
}

const Subsidiaries = async () => {
  const content = await getPageContent("639a5888b60dc36e6fc86e12");
  return <Content content={content} />;
};

export default Subsidiaries;
