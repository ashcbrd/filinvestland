"use client";
import ChevronRight from "@/components/svg/ChevronRight";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type T_InvestorRelationsMenu = {
  title: string;
  subTitle?: string;
  link: string;
  newTab: boolean;
};
const InvestorRelations = ({
  investorRelationsMenu,
  news,
}: {
  investorRelationsMenu?: T_InvestorRelationsMenu[];
  news: any;
}) => {

  return (
    <div className="flex divide-x divide-wild-blue-yonder py-8">
      <div className="flex flex-1 flex-col gap-20 pr-12">
        <div className="grid grid-cols-3 gap-x-6 gap-y-9">
          {investorRelationsMenu &&
            investorRelationsMenu.map(
              (routes: T_InvestorRelationsMenu, index: number) => {
                return (
                  <div key={index}>
                    <Link
                      href={`${routes.link}`}
                      target={routes.newTab ? "_blank" : "_self"}
                      className="text-white transition delay-150 hover:opacity-70"
                    >
                      <h3 className="text-xl text-white">{routes.title}</h3>
                      <h4 className="text-white opacity-50">
                        {routes.subTitle}
                      </h4>
                    </Link>
                  </div>
                );
              }
            )}
        </div>
      </div>
      <div className="w-96 flex-none pl-12">
        <h3 className="text-xl text-white">News</h3>
        <h2 className="mt-4 text-4xl text-white">Featured blog posts</h2>
        <div className="mt-6">
          {console.log(news)}
          {news?.value?.coverImage && (
            <Image
              src={`${news?.value?.coverImage?.url || "/filinvest-cover.png"}`}
              width={350}
              height={news?.value?.coverImage?.height || 500}
              alt="news"
            />
          )}
        </div>
        <h3 className="mt-3 truncate text-xl font-bold text-white">
          {news?.value?.title}
        </h3>
        <h4 className="mb-8 mt-2 text-white opacity-50">
          {news?.value?.shortDescription}
        </h4>
        <Link
          href={`/article/${news?.value?.slug}`}
          className="text-white hover:underline"
        >
          <span className="flex items-center gap-3">
            Read more
            <ChevronRight classes="h-[10px] w-[10px]" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default InvestorRelations;
