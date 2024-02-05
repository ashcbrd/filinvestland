"use client";
// import Image from "next/image";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import FadeDown from "@/components/animation/FadeDown";

const OurStory = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "pusong-filinvest-our-story"
  );

  return (
    <div className="mt-24 text-center md:mt-0 lg:mx-9 xl:mx-16 2xl:mx-44">
      <FadeDown>
        <h3 className="text-dark-cornflower-blue mx-6 text-center text-lg font-black tracking-widest md:mx-0 md:text-[2vh]">
          {data?.title}
        </h3>
        <h2 className="text-jet mx-6 mt-2 text-center text-3xl font-black tracking-tighter md:mx-0 md:text-4xl lg:mt-[2vh] lg:text-[6vh] lg:leading-[6vh]">
          {data?.subTitle}
        </h2>
        <h4 className="text-dim-gray mx-6 mt-4 text-center md:mx-0 lg:mt-[3vh] lg:text-[2.2vh]">
          {data?.description}
        </h4>
        {/* {data.coverImage.url && (
          <div className="mx-6 mt-8 md:mt-10 lg:mx-9 lg:mt-12 xl:mx-16 2xl:mx-44">
            <video loop autoPlay muted height={635} className="w-full">
              <source src={data?.coverImage?.url || ""} type="video/mp4" />
            </video>
          </div>
        )} */}
      </FadeDown>
    </div>
  );
};

export default OurStory;
