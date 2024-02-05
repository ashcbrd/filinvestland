"use client";
import BorderButton from "@/components/button/BorderButton";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";

const ManualCorporateGovernance = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "manual-corporate-governance"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageLength = Math.ceil(
    data?.codeOfBusinessEthics?.length / itemsPerPage
  );

  const [active, setActive] = useState(
    data.codeOfBusinessEthics.slice(startIndex, endIndex)
  );
  // const [lastEnd, setLastEnd] = useState(1);

  const paginationHandler = (page: number) => {
    // console.log({ page, currentPage });
    setCurrentPage(page);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setActive(data.codeOfBusinessEthics.slice(startIndex, endIndex));
    // setLastEnd(endIndex);
  }, [currentPage, data.codeOfBusinessEthics, itemsPerPage]);

  return (
    <section className="mx-6 -mt-16 mb-28 flex flex-col gap-6 lg:mx-9 xl:mx-16 2xl:mx-44 2xl:-mt-20">
      {/* className="flex flex-col gap-10 px-6 md:grid md:grid-cols-2 md:p-0 lg:grid-cols-3 lg:gap-12" */}
      <Fade>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {active?.map((item: any, index: number) => (
            <div
              className="flex h-[400px] w-full flex-col items-center justify-center gap-6 bg-white p-14 px-12 shadow-xl sm:w-[45%] xl:w-1/4"
              key={index}
            >
              <div className="bg-dark-cornflower-blue flex w-16 flex-none items-center justify-center rounded-full px-6 py-6 shadow-2xl">
                <Fade>
                  <Image
                    src={`${item?.icon?.url}`}
                    width={1842}
                    height={1360}
                    alt="Picture of the author"
                    className="scale-75 md:scale-100"
                  />
                </Fade>
              </div>

              <FadeDown>
                <h3 className="text-jet text-center text-base font-bold md:text-lg lg:text-xl">
                  {item?.title}
                </h3>
              </FadeDown>
              <Link href={`${item?.viewLink}`}>
                <BorderButton
                  buttonText="View"
                  textColor="dark-cornflower-blue"
                  borderColor="dark-cornflower-blue"
                />
              </Link>
            </div>
          ))}
        </div>
      </Fade>
      <div className="mt-20 flex items-center justify-center gap-5">
        {Array.from(Array(pageLength).keys()).map((item, index) => (
          <button
            className={
              currentPage === item + 1
                ? "bg-dark-cornflower-blue border-dark-cornflower-blue border px-3 py-1.5 text-white"
                : 'text-black" border-dark-cornflower-blue border px-3 py-1.5'
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
      <div className="mt-32 flex">
        <div className="flex-none">
          <PageNextPrevButton
            imgName="investor-relations-program-next-prev.png"
            pageName="Structures"
            isLeft={true}
          />
        </div>
        <div className="grow"></div>
        <div className="flex-none">
          <PageNextPrevButton
            imgName="investor-relations-program-next-prev.png"
            pageName="Investor Relations Program"
            isLeft={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ManualCorporateGovernance;
