"use client";
import React from "react";
import Image from "next/image";
import Download from "@/components/svg/Download";
import Link from "next/link";
import DownloadLink from "@/components/button/DownloadLink";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";

export default function ResearchReports({ content }: any) {
  const researchReportsBlock = content?.content?.find(
    (item: any) => item.blockType === "investor-relations-research-reports"
  );
  return (
    <section className="mx-3 mb-28 mt-16 flex flex-col gap-9 px-6 lg:mx-9 xl:mx-16 2xl:mx-44">
      <FadeDown>
        <h2 className="text-jet text-4xl font-bold">
          {researchReportsBlock?.title}
        </h2>
      </FadeDown>
      <div className="mt-4 flex flex-col gap-16">
        {researchReportsBlock?.investorRelationsResearchReports?.map(
          (item: any, index: number) => (
            <div key={index} className="flex flex-col gap-8">
              <Fade>
                <h3 className="text-jet text-2xl font-bold">{item?.year}</h3>
              </Fade>
              {item?.researchReports?.map((report: any) => (
                <div
                  key={report?.id}
                  className="hover:bg-ghost-white hover:cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex flex-1 items-center gap-6">
                      <div className="bg-dark-cornflower-blue flex max-h-[45px] max-w-[45px] flex-none items-center  justify-center rounded-full shadow-2xl">
                        <Image
                          src={report?.icon?.url || ""}
                          width={60}
                          height={60}
                          alt={report?.icon?.alt || ""}
                        />
                      </div>
                      <Link href={`${report?.file?.url}`} target="_blank">
                        <h4 className="flex-1 underline">
                          {report?.researchReportsTitle}
                        </h4>
                      </Link>
                    </div>

                    <DownloadLink href={`${report?.file?.url}`}>
                      <Download />
                    </DownloadLink>
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
