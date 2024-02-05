"use client";
import React, { useState } from "react";
import BasicSearch from "@/app/components/inputs/basic-search";
import { getters, setters } from "@/app/context/News";
import qs from "qs";
import NewsSection from "@/app/components/news/news-section";
import Request from "@/config/Request";
import NewsBanner from "@/app/components/news/banner";
import { Typography } from "@mui/material";

function Client({ typeID, featured }: any) {
  const set = setters();
  const get = getters();

  const [page, setPage] = useState(1);
  const news = get.news;

  const onMore = () => {
    const titleQuery = qs.stringify({
      where: {
        _status: { equals: "published" },
        newsTypeTag: { equals: typeID },
      },
    });

    Request()
      .get(
        `${
          process.env.NEXT_PUBLIC_CMS_URL
        }/api/futura-news?limit=6&sort=-Date&page=${page + 1}&${titleQuery}`
      )
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
    <div className="px-4 md:px-0">
      <NewsBanner featured={featured.FeaturedBlogs} newsType="blogs" title="Blogs" />
      <div className="min-h-screen w-full bg-[#FFF8F8] pb-[117px] pt-[61px]">
        <div className="mx-auto w-full pb-[30px]">
          <BasicSearch isfor="Blogs" />
        </div>
        {news.docs.length > 0 && (
          <section className="container">
            <p className="mx-[70px] py-0 px-[20px] sm:px-0 sm:mx-0 md: mx-[25px]">
              Showing {news.docs.length ?? "0"} of {news.totalDocs ?? "0"} Blogs
            </p>
          </section>
        )}
        {news.docs.length > 0 ? (
          <NewsSection news={news.docs} isfor="blogs" />
        ) : (
          <Typography textAlign="center" color="gray" className="pt-12">
            No blogs found
          </Typography>
        )}
        {news.hasNextPage && (
          <div className="pt-[80px] text-center sm:md:pt-[30px] md:pt-[50px]">
            <button
              onClick={onMore}
              className="mx-auto flex h-[69px] w-full max-w-[195px] items-center justify-center rounded-[100px] bg-[#E02926] !p-0 px-6 py-6 text-[17px] text-white sm:h-[50px] sm:max-w-[150px]"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Client;
