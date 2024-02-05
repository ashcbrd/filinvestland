"use client";
import FadeLeft from "@/components/animation/FadeLeft";
import FadeRight from "@/components/animation/FadeRight";
import FeaturedArticles from "@/components/list/FeaturedArticles";
import Image from "next/image";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageRightTextLeft = ({ content, news }: any) => {
  const data = content?.content?.find(
    (item: any) => item.id === "63f07a3acac4bd45ced7816e"
  );

  return (
    <>
      <div className="mb-20 mt-20 flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-0">
        <div className="flex-1 px-8 md:px-24 lg:pl-24">
          <FadeLeft>
            <h2 className="text-jet text-2xl font-bold md:text-4xl">
              {data.title}
            </h2>
            {data.description.map((description: any, index: number) => (
              <p className="text-dim-gray mt-4" key={index}>
                {description.description}
              </p>
            ))}
          </FadeLeft>
        </div>
        <div className="flex-1">
          <FadeRight>
            <Image
              src={`${data.image.url}`}
              width={1834}
              height={1414}
              alt={data?.image?.alt || "alt"}
            />
          </FadeRight>
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

export default ImageRightTextLeft;
