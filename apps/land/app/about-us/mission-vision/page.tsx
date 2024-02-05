import Content from "@/components/pages/about-us/mission-vision/Content";
import { metaBuilder } from "@/helpers/metaBuilder";
import qs from "qs";

const query = {
  "site.title": {
    equals: "Land",
  },
  limit: 3,
};

const stringifiedQuery = qs.stringify(
  {
    where: query, // ensure that `qs` adds the `where` property, too!
  },
  { addQueryPrefix: true }
);

async function getNews() {
  const res = await fetch(
    `${process.env.CMS_URL}/api/news${stringifiedQuery}&limit=3`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const jsonData = await res.json();
  return jsonData.docs ? jsonData.docs : null;
}

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
  const content = await getPageContent("639a586ab60dc36e6fc86dc4");
  return metaBuilder(content);
}

const MissionVisionPage = async () => {
  const news = await getNews();
  const content = await getPageContent("639a586ab60dc36e6fc86dc4");
  return <Content content={content} news={news} />;
};

export default MissionVisionPage;
