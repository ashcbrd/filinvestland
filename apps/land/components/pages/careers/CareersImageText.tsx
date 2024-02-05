"use client";
import React from "react";
import Image from "next/image";
import Positions from "./Positions";
export default function CareersImageText({ content }: any) {
  const careersImageTextBlock = content?.content?.find(
    (item: any) => item.blockType === "careers-image-text"
  );

  const items = careersImageTextBlock?.item;

  return (
    <section className="mx-9 mt-24 xl:mx-16 2xl:mx-44">
      <h2 className="text-4xl font-bold text-dark-cornflower-blue">
        {careersImageTextBlock?.title}
      </h2>
      <div className="mt-20 flex flex-col gap-12 md:flex-row">
        {items?.map((item: any) => (
          <div key={item?.id}>
            <div className="flex items-center gap-6">
              <div>
                <Image
                  src={item?.logo?.url}
                  width={105}
                  height={105}
                  alt={item?.logo?.alt || "alt"}
                />
              </div>
              <h3 className="text-2xl font-bold text-jet">{item?.title}</h3>
            </div>
            <p className="mt-6 text-dim-gray">{item?.description}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-20 text-center text-4xl font-bold text-dark-cornflower-blue">
        Open Positions
      </h2>
      <Positions content={content} />
    </section>
  );
}
