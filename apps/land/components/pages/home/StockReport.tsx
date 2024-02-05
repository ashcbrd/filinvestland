"use client";
import Image from "next/image";
import React from "react";
import BorderButton from "@/components/button/BorderButton";
import RedDownTriangle from "@/components/svg/RedDownTriangle";
import Link from "next/link";
import useStock from "../investor-relations/share-information/hooks/useStock";
import { round } from "@/helpers/methods";
import DownloadLink from "@/components/button/DownloadLink";

const StockReport = ({ content }: any) => {
  const { lowest, highest, change, open, close, loading, currentStock } =
    useStock();

  return (
    <section className="flex flex-col pt-24 lg:flex-row">
      <div className="flex-1 bg-[#143264] px-6 py-20 lg:px-9">
        <div className="mx-auto lg:w-1/2">
          <h2 className="text-center text-3xl font-bold tracking-tighter text-white md:text-left">
            {content?.content[8]?.stockInfoTitle}
          </h2>
          <div className="flex items-center justify-center py-6">
            <div className="flex flex-col">
              <h3 className="ml-7 text-2xl font-bold text-white ">FLI</h3>
              <div className="flex items-end gap-3">
                {Math.abs(open - close) < 1e-8 && (
                  <RedDownTriangle
                    style={{
                      transform: `rotate(${open > close ? `180deg` : 0})`,
                    }}
                  />
                )}
                <h3 className="text-5xl font-extrabold text-white">
                  {loading.stock ? "..." : round(currentStock.amount, 2)}
                </h3>
                <h4 className="text-lg text-white">
                  {loading.stock ? "..." : currentStock.currency || "PHP"}
                </h4>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b-[1px] border-solid border-white py-6 pb-2">
            <div className="flex">
              <h3 className="w-4/6 flex-none text-xl font-bold text-white">
                Open
              </h3>
              <h3 className="flex-none text-xl font-bold text-white">
                %Change
              </h3>
            </div>
            <div className="flex">
              <h3 className="w-4/6 flex-none text-xl text-white">
                {loading.stock ? "..." : round(open, 2)}
              </h3>
              <h3 className="flex-none text-xl text-white">
                {loading.lowest || loading.highest
                  ? "Loading..."
                  : `${round(((highest - lowest) / highest) * 100.0, 2)}`}
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b-[1px] border-solid border-white py-4">
            <div className="flex">
              <h3 className="w-4/6 flex-none text-xl font-bold text-white">
                Close
              </h3>
              <h3 className="flex-none text-xl font-bold text-white">
                52-Week High
              </h3>
            </div>
            <div className="flex">
              <h3 className="w-4/6 flex-none text-xl text-white">
                {loading.stock ? "..." : round(close, 2)}
              </h3>
              <h3 className="flex-none text-xl text-white">
                {loading.highest ? "..." : round(highest, 2)}
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-2 py-4">
            <div className="flex">
              <h3 className="w-4/6 flex-none text-xl font-bold text-white">
                Change
              </h3>
              <h3 className="flex-none text-xl font-bold text-white">
                52-Week Low
              </h3>
            </div>
            <div className="flex">
              <h3 className="w-4/6 flex-none text-xl text-white">
                {loading.stock ? "..." : round(change, 2)}
              </h3>
              <h3 className="flex-none text-xl text-white">
                {loading.lowest ? "..." : round(lowest, 2)}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-vivid-sky-blue flex-1 px-6 py-20 lg:px-16">
        <div className="gap-14">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="flex flex-col items-center gap-12">
              <h2 className="text-center text-4xl font-black tracking-tighter text-white md:text-left">
                {content?.content[8]?.annualReportTitle}
              </h2>
              <div className="flex w-60 items-center justify-center ">
                <Image
                  src={`${
                    !content?.content[8]?.annualReportImage?.url ? "/" : ""
                  }${content?.content[8]?.annualReportImage?.url}`}
                  width={487}
                  height={671}
                  alt={content?.content[8]?.annualReportImage?.url}
                />
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <DownloadLink
                href={
                  content?.content[8]?.file?.url
                    ? `${content?.content[8]?.file?.url}`
                    : ""
                }
                className="flex items-center gap-4"
              >
                <div className="ml-8 w-1/4 max-w-[99px] flex-none md:ml-0">
                  <Image
                    src="/download-stock-report.png"
                    width={143}
                    height={143}
                    alt="Picture of the author"
                  />
                </div>
                <h4 className="text-2xl text-white transition hover:opacity-70">
                  Download Annual Report For 2021
                </h4>
              </DownloadLink>
              <div>
                <button type="button" className="mt-28">
                  <Link href={`${content?.content[8].viewReportLink}`}>
                    <BorderButton
                      buttonText="View All Annual Report"
                      sidePadding="4"
                    />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockReport;
