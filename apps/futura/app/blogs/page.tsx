import React from "react";
import Client from "./client/Client";
import NewsProvider from "@/app/context/News";
import qs from "qs";

const typeID = "63d743d4b7b2cb2bb619fbca";

async function getData(searchParams: any) {
  const query = qs.stringify({
    where: {
      _status: { equals: "published" },
      "newsTypeTag.title": { equals: "Blogs" },
      ...(searchParams.keyword
        ? { title: { like: searchParams.keyword } }
        : {}),
    },
  });

  const featured = fetch(
    `${process.env.CMS_URL}/api/globals/futura-featured-news`
  );

  const blogs = fetch(
    `${process.env.CMS_URL}/api/futura-news?limit=6&sort=-Date${
      query ? `&${query}` : ""
    }`
  );

  const req = await Promise.all([featured, blogs]);

  return {
    featured: (await req[0].json()) as any,
    blogs: (await req[1].json()) as any,
  };
}

async function News({ searchParams }: any) {
  const req = (await getData(searchParams)) as any;
  const blogs = req.blogs;
  const featured = req.featured;

  return (
    <NewsProvider news={blogs}>
      <Client
        req={req}
        searchParams={searchParams}
        featured={featured}
        typeID={typeID}
      />
    </NewsProvider>
  );
}

export default News;
