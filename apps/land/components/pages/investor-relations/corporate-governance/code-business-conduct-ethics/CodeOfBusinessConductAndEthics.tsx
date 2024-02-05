"use client";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import Image from "next/image";
import React from "react";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";
const CodeOfBusinessConductAndEthics = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "code-of-business-conduct-and-ethics"
  );

  return (
    <section className="mx-6 -mt-20 mb-28 flex flex-col gap-6 md:-mt-16 lg:mx-9 lg:-mt-20 xl:mx-16 2xl:mx-44 2xl:-mt-20">
      {/* className="flex grid-cols-3 flex-col gap-12 px-6 md:grid md:p-0" */}
      <Fade>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {data.codeOfBusinessConductAndEthics.map(
            (item: any, index: number) => (
              <div
                key={index}
                className="flex h-[400px] w-full flex-col items-center gap-6 bg-white p-14 px-12 shadow-xl sm:w-[45%] xl:w-1/4"

                // className="flex flex-col items-center gap-6 bg-white p-16 px-12 shadow-xl"
              >
                <Fade>
                  <div className="bg-dark-cornflower-blue flex w-16 flex-none items-center justify-center rounded-full px-6 py-6 shadow-2xl">
                    <Image
                      src={`${item.icon.url}`}
                      width={1842}
                      height={1360}
                      alt="Picture of the author"
                    />
                  </div>
                </Fade>
                <FadeDown>
                  <h3 className="text-dim-gray text-center text-lg">
                    {item.description}
                  </h3>
                </FadeDown>
              </div>
            )
          )}
        </div>
      </Fade>
      <div className="mt-32 flex w-full">
        <PageNextPrevButton content={content} />
      </div>
    </section>
  );
};

export default CodeOfBusinessConductAndEthics;
