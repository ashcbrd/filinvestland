import React from "react";
import Download from "@/components/svg/Download";
import Link from "next/link";
import Image from "next/image";
import DownloadLink from "@/components/button/DownloadLink";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";
export default function Statements({ content }: any) {
  const financialStatementsBlock = content?.content?.find(
    (item: any) =>
      item.blockType === "financial-highlights-financial-statements"
  );
  return (
    <div className="mt-9 flex flex-col gap-6">
      <FadeDown>
        <h3 className="text-jet text-2xl font-bold">
          {financialStatementsBlock?.title}
        </h3>
      </FadeDown>
      {financialStatementsBlock?.financialStatements?.map((report: any) => (
        <div
          key={report?.id}
          className="hover:bg-ghost-white hover:cursor-pointer"
        >
          <div className="flex items-center gap-6">
            <Fade>
              <div className="flex flex-1 items-center gap-6">
                <div className="bg-dark-cornflower-blue flex max-h-[45px] max-w-[45px] flex-none items-center justify-center rounded-full shadow-2xl">
                  <Image
                    src={report?.icon?.url}
                    width={60}
                    height={60}
                    alt={report?.icon?.alt}
                  />
                </div>
                <h4 className="flex-1 underline">
                  <Link href={`${report?.document?.url}`} target="_blank">
                    {report?.financialStatementTitle}
                  </Link>
                </h4>
              </div>
            </Fade>
            <DownloadLink href={report?.document?.url}>
              <Download />
            </DownloadLink>
          </div>
        </div>
      ))}
    </div>
  );
}
