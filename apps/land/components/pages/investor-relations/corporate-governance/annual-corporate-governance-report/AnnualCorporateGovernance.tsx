"use client";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";

const AnnualCorporateGovernance = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "annual-corporate-governance-and-report"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageLength = Math.ceil(data?.reportList.length / itemsPerPage);

  const [active, setActive] = useState(
    data.reportList.slice(startIndex, endIndex)
  );
  // const [lastEnd, setLastEnd] = useState(1);

  const paginationHandler = (page: number) => {
    // console.log({ page, currentPage });
    setCurrentPage(page);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setActive(data.reportList.slice(startIndex, endIndex));
    // setLastEnd(endIndex);
  }, [currentPage, data.reportList, itemsPerPage]);

  return (
    <section className="mx-6 -mt-20 mb-28 flex flex-col gap-6 md:-mt-16 lg:mx-9 lg:-mt-20 xl:mx-16 2xl:mx-44 2xl:-mt-20">
      <Fade>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {active?.map((item: any, index: number) => (
            <div
              className="scroll-md flex h-[400px] w-full flex-col items-center justify-start gap-8 overflow-hidden bg-white p-14 px-12 shadow-xl hover:overflow-y-auto sm:w-[45%] xl:w-1/4"
              key={index}
            >
              <div className="flex flex-col space-y-6">
                <Fade>
                  <div className="flex w-16 flex-none items-center justify-center rounded-full bg-dark-cornflower-blue px-6 py-6 shadow-2xl">
                    <Image
                      src={`${item?.icon?.url}`}
                      width={50}
                      height={50}
                      alt={item?.icon?.alt}
                    />
                  </div>
                </Fade>
                <FadeDown>
                  <h3 className="text-2xl font-bold text-[#444444] md:text-3xl">
                    {item?.year}
                  </h3>
                </FadeDown>
              </div>
              <div className="text-base text-report underline lg:text-lg">
                {item?.reportBullets.map((bullet: any, i: number) => (
                  <div key={i} className="mt-2">
                    <div className="relative flex">
                      <div className="absolute bottom-0 left-0 right-0 top-0 mt-2 h-2 w-2 rotate-45 bg-dark-cornflower-blue" />
                      <Link href={`${bullet?.report_link}`} className="ml-5">
                        {bullet?.report}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Fade>
      <div className="mt-20 flex items-center justify-center gap-5">
        {Array.from(Array(pageLength).keys()).map((item, index) => (
          <button
            className={
              currentPage === item + 1
                ? "border border-dark-cornflower-blue bg-dark-cornflower-blue px-3 py-1.5 text-white"
                : 'text-black" border border-dark-cornflower-blue px-3 py-1.5'
            }
            key={index}
            onClick={() => {
              paginationHandler(item + 1);
            }}
          >
            {item + 1}
          </button>
        ))}
      </div>
      <div className="p-4 lg:p-16">
        <PageNextPrevButton content={content} />
      </div>
    </section>
  );
};

export default AnnualCorporateGovernance;
