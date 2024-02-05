import { metaBuilder } from "@/helpers/metaBuilder";
import qs from "qs";
import Content from "@/components/pages/pusong-filinvest/Content";

const query = {
  "site.title": {
    equals: "Land",
  },
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
  const content = await getPageContent("639a57cab60dc36e6fc86cc7");
  return metaBuilder(content);
}

const PusongFilinvestPage = async () => {
  const news = await getNews();
  const content = await getPageContent("639a57cab60dc36e6fc86cc7");
  return <Content content={content} news={news} />;
};

export default PusongFilinvestPage;
