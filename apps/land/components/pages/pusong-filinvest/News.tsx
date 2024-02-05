"use client";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import NEWS_ROUTES from "@/helpers/routes/news";
import Link from "next/link";
import BorderButton from "@/components/button/BorderButton";
import FeaturedArticles from "@/components/list/FeaturedArticles";
import FadeLeft from "@/components/animation/FadeLeft";

const News = ({ news }: any) => {
  return (
    <div className="mx-6 mb-24 mt-12 lg:mx-9 xl:mx-16 2xl:mx-44">
      <div className="flex flex-col justify-center md:flex-row md:items-center">
        <div className="flex-1">
          <FadeLeft>
            <h2 className="text-jet mt-2 text-2xl font-extrabold md:text-4xl">
              News
            </h2>
            <h4 className="text-dim-gray mt-4 text-base">{`Get updated to Filinvest Land's latest happenings.`}</h4>
          </FadeLeft>
        </div>
        <div className="mt-8 flex-none lg:mt-12">
          <Link href={`${NEWS_ROUTES.url}`}>
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
        className="mt-10 lg:mt-16"
        sliderOnMobile
        articles={news}
        withExtras={false}
        isTwoLines={true}
      />
    </div>
  );
};

export default News;
