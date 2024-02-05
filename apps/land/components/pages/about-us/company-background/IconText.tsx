"use client";
import Fade from "@/components/animation/Fade";
import Image from "next/image";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const IconText = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "company-background-icon-text"
  );

  return (
    <section className="lg:mt-24">
      <Fade>
        <div className="mx-3 flex flex-col gap-16 md:flex-row md:px-[10vw]">
          {data?.iconText.map((item: any, index: number) => (
            <div
              key={index}
              className="flex flex-1 flex-col items-center gap-4"
            >
              <Image
                src={`${item.iconImage.url}`}
                width={1834}
                height={1414}
                alt={item?.iconImage?.alt || "alt"}
                className="w-1/3 md:w-4/6"
              />
              <span className="bg-jet h-16 w-[1px]"></span>

              <h3 className="text-jet text-center text-2xl font-bold">
                {item.description.map((description: any, index: number) => (
                  <div key={index}>
                    {description.textLine}
                    <br />
                  </div>
                ))}
              </h3>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
};

export default IconText;
