import Content from "@/components/pages/article/Content";

import { metaBuilder } from "@/helpers/metaBuilder";
import { notFound } from "next/navigation";
import qs from "qs";

type PageProps = {
  params: {
    id: string;
  };
};

async function getNewsContent(slug: string) {
  const query = {
    slug: {
      equals: slug,
    },
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query, // ensure that `qs` adds the `where` property, too!
    },
    { addQueryPrefix: true }
  );
  const res = await fetch(
    `${process.env.CMS_URL}/api/news${stringifiedQuery}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const jsonData = await res.json();
  return jsonData ? jsonData.docs?.[0] : null;
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const content = await getNewsContent(id);
  return metaBuilder(content);
}

const ArticlePage = async ({ params: { id } }: PageProps) => {
  const content = await getNewsContent(id);
  if (!content) {
    notFound();
  }
  return (
    <>
      <Content {...content} />
    </>
  );
};

export default ArticlePage;
