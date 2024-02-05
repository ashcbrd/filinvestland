"use client";
import Image from "next/image";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Diamond from "@/components/svg/Diamond";
import FeaturedArticles from "@/components/list/FeaturedArticles";
import Fade from "@/components/animation/Fade";

const MissionVisionCoreValues = ({ content, news }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "vision-mission-and-core-values"
  );

  return (
    <section className="-mt-6 2xl:-mt-36">
      <Fade>
        <div className="mx-6 flex flex-col gap-2 md:flex-row lg:mx-9 lg:gap-8 xl:mx-16 2xl:mx-44">
          <div className="z-40 flex flex-1 flex-col items-center gap-6 bg-white px-6 py-16 shadow-xl lg:w-1/4 lg:flex-none lg:px-12">
            <Image
              src={`${data.visionIcon.url}`}
              width={79}
              height={79}
              alt={`${data.visionIcon.alt}`}
            />
            <h3 className="text-jet text-4xl font-bold">Vision</h3>
            <p className="text-jet text-center text-lg">
              {data.visionDescription}
            </p>
          </div>
          <div className="z-40 flex flex-1 flex-col items-center gap-6 bg-white py-16 pl-10 pr-6 shadow-xl lg:pl-12">
            <Image
              src={`${data.missionIcon.url}`}
              width={79}
              height={79}
              alt={`${data.missionIcon.alt}`}
            />
            <h3 className="text-jet text-4xl font-bold">Mission</h3>
            <div>
              {data.missionBulletDescription.map(
                (bulletDescription: any, index: number) => (
                  <div key={index} className="mt-1 flex items-center gap-3">
                    <div className="mt-1 flex-none">
                      <Diamond color={`#163E82`} />
                    </div>
                    <p className="text-jet flex-1 text-lg">
                      {bulletDescription.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="z-40 flex flex-1 flex-col items-center gap-6 bg-white px-6 py-16 shadow-xl lg:w-1/4 lg:flex-none lg:px-12">
            <Image
              src={`${data.coreValuesIcon.url}`}
              width={79}
              height={79}
              alt={`${data.coreValuesIcon.alt}`}
            />
            <h3 className="text-jet text-center text-4xl font-bold">
              Core Values
            </h3>
            <p className="text-jet text-center text-lg">
              {data.coreValuesDescription}
            </p>
          </div>
        </div>
      </Fade>
      <div className="bg-ghost-white py-24">
        <Fade>
          <h3 className="text-center text-4xl font-bold">Latest News</h3>
        </Fade>
        <FeaturedArticles
          className="mx-9 mt-16 md:mx-24"
          sliderOnMobile
          articles={news}
        />
      </div>
    </section>
  );
};

export default MissionVisionCoreValues;
