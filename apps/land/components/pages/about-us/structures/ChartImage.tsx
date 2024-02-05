"use client";
import React from "react";
import Image from "next/image";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import FadeUp from "@/components/animation/FadeUp";
export default function ChartImage({ content }: any) {
  const chartImageBlock = content?.content?.find(
    (item: any) => item.blockType === "structures-chart-image"
  );
  return (
    <section className="mb-24 mt-9 flex flex-col gap-9 p-1 lg:mx-9 lg:p-0 xl:mx-16 2xl:mx-44">
      <FadeUp>
        <h2 className="text-jet text-center text-3xl font-bold md:text-4xl">
          {chartImageBlock.title}
        </h2>
      </FadeUp>
      <div className="m-1 mx-auto mt-6 w-full overflow-auto rounded-md border-[1px] border-gray-300 md:mt-12 lg:w-full">
        <div className="flex  w-full max-w-[1729px] justify-center p-2">
          <Image
            src={chartImageBlock?.chartImage?.url}
            width={3458}
            height={2642}
            alt={chartImageBlock?.chartImage?.alt}
            className="select-none object-cover"
          />
        </div>
      </div>

      <div className="m-4 mt-32">
        <PageNextPrevButton content={content} />
      </div>
    </section>
  );
}
