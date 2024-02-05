"use client";
import React from "react";
import BorderButton from "../../button/BorderButton";
import Link from "next/link";
import FeaturedArticles from "@/components/list/FeaturedArticles";

const NewsStories = ({ content, className, isHomePage = true }: any) => {
  const flattenNews = content
    ? content?.content[6].newsStories.map((newsStory: any) => newsStory.news)
    : [];

  return (
    <section className={`pt-36 xl:pt-44 ${className}`}>
      <div className="mx-6 lg:mx-9 xl:mx-16 2xl:mx-44">
        <div className="flex flex-col justify-center md:flex-row md:items-center">
          <div className="flex-1 px-4 text-center md:px-0 md:text-left">
            <h4 className="text-dark-cornflower-blue text-lg font-black tracking-widest md:text-[2vh]">
              {isHomePage ? content?.content[6].title : ""}
            </h4>
            <h2 className="text-jet mt-2 text-3xl font-black tracking-tighter md:text-4xl lg:text-[6vh] lg:leading-[6vh]">
              {isHomePage ? content?.content[6].subTitle : "Press Releases"}
            </h2>
            <h4 className="text-dim-gray mt-4 lg:mt-[3vh] lg:text-[2.2vh]">
              {isHomePage
                ? content?.content[6].description
                : "Get updated to Filinvest Land's latest happenings"}
            </h4>
          </div>
          <div className="mt-12 flex-none text-center">
            <Link
              href={
                content?.content[6].learnMoreLink
                  ? `${content?.content[6].learnMoreLink}`
                  : "/news"
              }
            >
              <button type="button">
                <BorderButton
                  buttonText="See More"
                  textColor="dark-cornflower-blue"
                  borderColor="dark-cornflower-blue"
                />
              </button>
            </Link>
          </div>
        </div>
        <FeaturedArticles
          className="mt-16 px-8 md:px-0"
          sliderImageClassName="object-cover h-72"
          sliderOnMobile
          articles={flattenNews}
          withExtras={false}
          isTwoLines={true}
        />
      </div>
    </section>
  );
};

export default NewsStories;
