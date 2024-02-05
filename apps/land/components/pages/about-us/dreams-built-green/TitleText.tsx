"use client";
import React from "react";

const TitleText = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "dreams-built-green-title-text"
  );

  return (
    // "mx-9 mt-9 lg:mx-auto lg:max-w-[1024px] xl:max-w-[1200px]"
    <div className="mx-9 my-24 mt-9 flex flex-col gap-5 lg:mx-auto lg:max-w-[1024px] xl:max-w-[1200px]">
      <h3 className="text-jet text-3xl font-bold">{data.title}</h3>
      {data.descriptionParagraph.map((item: any, index: number) => (
        <p className="text-dim-gray" key={index}>
          {item.description}
        </p>
      ))}
    </div>
  );
};

export default TitleText;
