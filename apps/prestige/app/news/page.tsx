import React from "react";
import qs from "qs";
import Client from "./client/Client";
import NewsProvider from "@/context/News";

async function getData(searchParams: any) {
  const query = qs.stringify({
    where: {
      _status: { equals: "published" },
      ...(searchParams.keyword
        ? { title: { like: searchParams.keyword } }
        : {}),
      ...(searchParams.location
        ? { location: { equals: searchParams.location } }
        : {}),
      ...(searchParams.propertyType
        ? { propertyType: { equals: searchParams.propertyType } }
        : {}),
      ...(searchParams.province
        ? { location: { equals: searchParams.province } }
        : {}),
      ...(searchParams.city
        ? { subLocationTwo: { equals: searchParams.city } }
        : {}),
      ...{ "newsTypeTag.title": { equals: "News" } },
    },
  });

  const featured = fetch(
    `${process.env.CMS_URL}/api/globals/prestige-featured-news`
  );

  const news = fetch(
    `${process.env.CMS_URL}/api/prestige-news?limit=6&sort=-Date${
      query ? `&${query}` : ""
    }`
  );

  const investor = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/64d34fc0281bd2de8791c8b4`,
    { cache: "no-store" }
  );

  const req = await Promise.all([featured, news, investor]);

  return {
    featured: (await req[0].json()) as any,
    news: (await req[1].json()) as any,
    investor: (await req[2].json()) as any,
  };
}

async function News({ searchParams }: any) {
  const req = (await getData(searchParams)) as any;
  const news = req.news;
  return (
    <NewsProvider news={news}>
      <Client req={req} searchParams={searchParams} />
    </NewsProvider>
  );
}

export default News;
