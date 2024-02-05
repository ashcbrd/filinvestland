"use client";
import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";
import PropertySearch from "@/components/search/PropertySearch";
import React from "react";

const TitleText = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "residential-title-and-text"
  );

  return (
    <>
      <Fade>
        <PropertySearch className="mx-9 mt-32 lg:mx-0 lg:mt-12" params={{}} />
      </Fade>
      <div className="z-0 mx-9 mt-9 lg:mx-auto lg:max-w-[1024px] xl:max-w-[1200px]">
        <Fade>
          <h2 className="text-jet text-center text-4xl font-bold">
            {data.title}
          </h2>
        </Fade>
        <FadeDown>
          <p className="text-dim-gray mt-5 text-center">{data.description}</p>
        </FadeDown>
      </div>
    </>
  );
};

export default TitleText;
