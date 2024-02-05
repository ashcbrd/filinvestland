import Content from "@/components/pages/about-us/dreams-built-green/Content";
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
  const content = await getPageContent("639a5859b60dc36e6fc86daa");
  return metaBuilder(content);
}

const DreamsBuiltGreen = async () => {
  const content = await getPageContent("639a5859b60dc36e6fc86daa");
  return <Content content={content} />;
};

export default DreamsBuiltGreen;
