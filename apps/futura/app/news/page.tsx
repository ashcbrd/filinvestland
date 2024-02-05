import React from "react";
import Client from "./client/Client";
import NewsProvider from "@/app/context/News";
import qs from "qs";

const typeID = "63d743dbb7b2cb2bb619fbd4";

async function getData(searchParams: any) {
  const query = qs.stringify({
    where: {
      _status: { equals: "published" },
      ...(searchParams.keyword
        ? { title: { like: searchParams.keyword } }
        : {}),
      "newsTypeTag.title": { equals: "News" },
    },
  });

  const featured = fetch(
    `${process.env.CMS_URL}/api/globals/futura-featured-news`
  );

  const news = fetch(
    `${process.env.CMS_URL}/api/futura-news?limit=6&sort=-Date${
      query ? `&${query}` : ""
    }`
  );

  const req = await Promise.all([featured, news]);

  return {
    featured: (await req[0].json()) as any,
    news: (await req[1].json()) as any,
  };
}

async function News({ searchParams }: any) {
  const req = (await getData(searchParams)) as any;
  const news = req.news;
  const featured = req.featured;
  return (
    <NewsProvider news={news}>
      <Client
        req={req}
        searchParams={searchParams}
        typeID={typeID}
        featured={featured}
      />
    </NewsProvider>
  );
}

export default News;
