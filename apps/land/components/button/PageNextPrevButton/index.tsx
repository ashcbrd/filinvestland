"use client";
import React from "react";
import FadeRight from "@/components/animation/FadeRight";
import FadeLeft from "@/components/animation/FadeLeft";
import Link from "next/link";
import ArrowLeft from "@/components/svg/ArrowLeft";
import Image from "next/image";
import ArrowRight from "@/components/svg/ArrowRight";

const PageNextPrevButton = ({ content }: any) => {
  const dataNext = content?.content?.find(
    (item: any) => item.blockType === "next-link"
  );
  const dataPrev = content?.content?.find(
    (item: any) => item.blockType === "previous-link"
  );

  return (
    <div className="flex justify-between">
      <div className="items-center gap-6 p-2 hover:cursor-pointer hover:bg-ghost-white">
        {dataPrev && (
          <FadeLeft>
            <Link href={dataPrev?.previousLink}>
              <div className="relative flex w-full items-center gap-4 lg:gap-6">
                <ArrowLeft color="#000000" width={20} height={20} />
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold text-jet">Previous</p>
                  <p className="w-[100px] truncate font-bold text-jet sm:w-auto sm:text-ellipsis md:text-lg lg:text-2xl">
                    {dataPrev?.previousPageTitle}
                  </p>
                </div>
                <Image
                  className="hidden rounded-md sm:block"
                  src={dataPrev?.image.url}
                  width={80}
                  height={60}
                  alt="Picture of the author"
                />
              </div>
            </Link>
          </FadeLeft>
        )}
      </div>
      <div className="items-center gap-6 p-2 hover:cursor-pointer hover:bg-ghost-white">
        {dataNext && (
          <FadeRight>
            <Link href={dataNext?.nextLink}>
              <div className="relative flex w-full items-center gap-4 lg:gap-6">
                <Image
                  className="hidden rounded-md sm:block"
                  src={dataNext?.image.url}
                  width={80}
                  height={60}
                  alt="Picture of the author"
                />
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm font-bold text-jet">Next</p>
                  <p className="w-[100px] truncate font-bold text-jet sm:w-auto sm:text-ellipsis md:text-lg lg:text-2xl">
                    {dataNext?.nextPageTitle}
                  </p>
                </div>
                <ArrowRight color="#000000" width={20} height={20} />
              </div>
            </Link>
          </FadeRight>
        )}
      </div>
    </div>
  );
};

export default PageNextPrevButton;
