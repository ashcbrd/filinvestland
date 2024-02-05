"use client";
import React from "react";

export default function FinancialLegend({ content }: any) {
  const legendBlock = content?.content?.find(
    (item: any) => item.blockType === "financial-highlights-legends"
  );

  const legends = legendBlock?.legends;
  return (
    <div className="mt-9 flex gap-9">
      <div className="flex min-w-[41px] flex-col">
        {legends?.map((legend: any, index: number) => (
          <>
            {index === legends?.length - 1 ? (
              <span key={index} className="text-dim-gray mt-14 sm:mt-4 md:mt-2">
                {legend?.character}
              </span>
            ) : (
              <span key={index} className="text-dim-gray">
                {legend?.character}
              </span>
            )}
          </>
        ))}
      </div>
      <div className="flex flex-col">
        {legends?.map((legend: any, index: number) => (
          <span key={index} className="text-dim-gray">
            {legend?.description}
          </span>
        ))}
      </div>
    </div>
  );
}
