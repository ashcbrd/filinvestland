import React from "react";
import FadeUp from "@/components/animation/FadeUp";

const TitleYear = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "board-committees-title-and-year"
  );

  return (
    <FadeUp>
      <div>
        {data?.titleLine?.map((item: any, index: number) => (
          <h2
            className="text-jet text-2xl font-bold md:text-3xl lg:text-4xl"
            key={index}
          >
            {item?.line}
            <br />
          </h2>
        ))}
        <h4 className="text-jet mt-2 text-base font-bold md:text-xl lg:mt-5 lg:text-2xl">
          For {data?.year}
        </h4>
      </div>
    </FadeUp>
  );
};

export default TitleYear;
