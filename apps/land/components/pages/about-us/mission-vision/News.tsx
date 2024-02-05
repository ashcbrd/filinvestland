"use client";
import PageNextPrevButton from "@/components/button/PageNextPrevButtonOld";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FeaturedArticles from "@/components/list/FeaturedArticles";

const News = ({ news }: any) => {
  return (
    <>
      <div className="mx-6 my-24 flex justify-end lg:mx-9 xl:mx-16 2xl:mx-44">
        <div className="flex-none">
          <PageNextPrevButton
            imgName="investor-relations-program-next-prev.png"
            pageName="Our Leadership"
            isLeft={false}
          />
        </div>
      </div>
      <div className="bg-ghost-white py-24">
        <h3 className="text-center text-4xl font-bold">Latest News</h3>
        <FeaturedArticles
          className="mx-9 mt-16 md:mx-24"
          sliderOnMobile
          articles={news}
        />
      </div>
    </>
  );
};

export default News;
