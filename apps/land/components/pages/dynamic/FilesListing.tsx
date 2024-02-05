"use client";
import React from "react";
import Image from "next/image";
import Download from "@/components/svg/Download";
import Link from "next/link";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";
export default function FilesListing({ content }: any) {
  
  return (
    <section className="mx-3 mb-28 mt-16 flex flex-col gap-9 px-6 lg:mx-9 xl:mx-16 2xl:mx-44">
      <FadeDown>
        <h2 className="text-jet text-4xl font-bold">
          {content.title}
        </h2>
      </FadeDown>
      <div className="mt-4 flex flex-col gap-16">
        {content?.Files?.map(
          (item: any, index: number) => (
            <div key={index} className="flex flex-col gap-8">
              <Fade>
                <h3 className="text-jet text-2xl font-bold">{item?.year}</h3>
              </Fade>
              {item?.file?.map((item: any) => (
                <div
                  key={item?.id}
                  className="hover:bg-ghost-white hover:cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex flex-1 items-center gap-6">
                      <div className="bg-dark-cornflower-blue flex max-h-[45px] max-w-[45px] flex-none items-center  justify-center rounded-full shadow-2xl">
                        <Image
                          src={'/pdf-icon.png'}
                          width={60}
                          height={60}
                          alt={item?.icon?.alt || "alt"}
                        />
                      </div>

                      <Link href={`${item?.file?.url}`} target="_blank"> <h4 className="flex-1 underline">
                        {item?.name}
                      </h4> </Link>
                    </div>

                    <Link href={`${item?.file?.url}`} target="_blank">
                      <Download />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
}
