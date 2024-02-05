"use client";
import React, { useState } from "react";
import Button from "@/app/components/general/button";
import Link from "next/link";
import BasicSearch from "@/app/components/inputs/basic-search";
import moment from "moment";
import { getters, setters } from "@/context/News";
import NewsHero from "@/app/components/carousel/newshero";
import { Typography } from "@/app/components/typography/typography";
import { InvestorsConcerge } from "@/app/components/general/investorsconcerge";
import { FeaturedNew } from "../components/featurednew";
import qs from "qs";
import Request from "@/config/API";

async function getData(keyword: any) {
  const query = qs.stringify({
    where: {
      _status: { equals: "published" },
      ...(keyword ? { title: { like: keyword } } : {}),
    },
  });

  const featured = fetch(
    `${process.env.CMS_URL}/api/globals/prestige-featured-news`
  );

  const news = fetch(
    `${process.env.CMS_URL}/api/prestige-news?sort=-Date${
      query ? `&${query}` : ""
    }`
  );

  const investor = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/64d34fc0281bd2de8791c8b4`,
    { cache: "no-store" }
  );
  const req = await Promise.all([news, featured, investor]);

  return {
    news: (await req[0].json()) as any,
    featured: (await req[1].json()) as any,
    investor: (await req[2].json()) as any,
  };
}

function Client({ req }: any) {
  const set = setters();
  const get = getters();
  
  const [page, setPage] = useState(1);
  const news = get.news;
  const featured = req.featured;
  const investor = {
    page: req.investor.content,
  };

  console.log("%c  req:", "color: #0e93e0;background: #aaefe5;", req);
  console.log("%c  news:", "color: #0e93e0;background: #aaefe5;", news);
  const onMore = () => {
    const titleQuery = qs.stringify({
      where: {
        title: { like: get.keyword },
        ...{ "newsTypeTag.title": { equals: "Blogs" } },
      },
    });

    Request()
      .get(`${process.env.NEXT_PUBLIC_CMS_URL}/api/prestige-news?limit=6&sort=-Date&page=${page + 1}&${titleQuery}`)
      .then((response: any) => {
        setPage(page + 1);

        set.setNews((ps: any) => ({
          ...ps,
          docs: [...ps.docs, ...response.data.docs],
          hasNextPage: response.data.hasNextPage,
        }));
      });
  };

  return (
    <>
      <NewsHero type="blog" data={featured?.FeaturedBlogs?.length ?? featured.FeaturedNews} />
      <section className="min-h-fit w-full space-y-20 bg-[#F4EBD0] px-8 pb-20 pt-12 md:px-12 md:pb-[100px]">
        <div className="mx-auto h-auto w-full max-w-[1650px] space-y-12">
          <BasicSearch isBlog />
          <p>
            Showing {news.docs.length} of {news.totalDocs} Blogs
          </p>
          {news.docs.length > 0 ? (
            <FeaturedNew data={news.docs} type="blog" />
          ) : (
            <Typography className="pt-8 text-center" size="24" color="dark" text="No blogs found" />
          )}
          {news.hasNextPage && (
            <div className="pt-[80px] text-center sm:md:pt-[30px] md:pt-[50px]">
              <Button onClick={onMore} label="See More" />
            </div>
          )}
        </div>
      </section>

      <InvestorsConcerge data={investor} />
    </>
  );
}

export default Client;
