"use client";
import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";
import React from "react";

const TitleText = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "townscapes-title-and-text"
  );

  return (
    <>
      <div>
        <Fade>
          <h2 className="text-center text-4xl font-bold text-jet">
            {data?.title}
          </h2>
        </Fade>
        <FadeDown>
          <p className="mt-8 text-dim-gray">{data?.description}</p>
        </FadeDown>
      </div>
    </>
  );
};

export default TitleText;
