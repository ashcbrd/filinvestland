"use client";
import BorderButton from "@/components/button/BorderButton";
import ArrowRight from "@/components/svg/ArrowRight";
import RedDownTriangle from "@/components/svg/RedDownTriangle";
import Image from "next/image";
import React from "react";
import NewsStories from "@/components/pages/home/NewsStories";
import Link from "next/link";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import MainHeader from "@/components/header/MainHeader";
import { round } from "@/helpers/methods";
import DownloadLink from "@/components/button/DownloadLink";

const Content = ({ content }: any) => {
  const relationLinks = content?.content?.find(
    (item: any) => item.blockType === "investor-relations-links"
  );
  const highlights = content?.content?.find(
    (item: any) => item.blockType === "investor-relations-financial-highlights"
  );
  const boxLinks = content?.content?.find(
    (item: any) => item.blockType === "investor-relations-box-links"
  );
  const header = content?.content?.find(
    (item: any) => item.blockType === "header"
  );
  const stock = content?.content?.find(
    (item: any) => item.blockType == "stock-information"
  );
  const informationGraph = content?.content?.find(
    (item: any) => item.blockType == "investor-relations-Stock-Information"
  );
  const FLI = content?.content?.find((item: any) => item.blockName === "FLI");
  const IRP = content?.content?.find(
    (item: any) => item.blockName === "FLI Investor Relations Program"
  );

  console.log(FLI);

  const breadcrumbsItems = header?.breadcrumbs.map(
    (tab: any, index: number) => {
      return {
        title: tab.link.label,
        ...(index + 1 < header?.breadcrumbs?.length && { link: tab.link.url }),
      };
    }
  );
  const breadcrumbs = <Breadcrumbs items={breadcrumbsItems} />;
  const { currentStock, highest, lowest, open, close, change } = stock.stock;

  return (
    <>
      <MainHeader
        title={header.title}
        breadcrumbs={breadcrumbs}
        bgUrl={header.coverImage.url}
      />
      <section className="-mt-6 2xl:-mt-36">
        <div className="hidden flex-wrap justify-center gap-12 md:flex lg:mx-9 xl:mx-16 2xl:mx-44">
          {relationLinks.investorRelationsLinks.map(
            (link: any, index: number) => {
              return (
                <div
                  className="relative flex w-[200px] flex-none flex-col items-center gap-6 bg-royal-dark-blue p-16 px-6 shadow-xl"
                  key={index}
                >
                  <h3 className="text-center text-white">{link.title}</h3>
                  <Link
                    href={`${link.link}`}
                    className="absolute -bottom-6 rounded-full bg-white px-4 py-[19px] shadow-xl hover:bg-ghost-white focus:bg-ghost-white"
                  >
                    <ArrowRight color="#000" />
                  </Link>
                </div>
              );
            }
          )}
        </div>
        <div className="mt-32 flex flex-col md:flex-row">
          <div className="flex flex-col bg-ghost-white px-12 pt-12 md:py-24 md:pl-24 lg:pl-48">
            <h2 className="text-4xl font-bold text-jet">{IRP.blockName}</h2>
            <ul className="mx-0 mt-8">
              {IRP.investorRelationsLinks.map((link: any, index: number) => {
                if (link.title !== "-") {
                  return (
                    <li className="mb-4 flex-1 text-lg text-jet" key={index}>
                      {link.title}
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
          </div>
          <div className="flex flex-col bg-ghost-white px-12 pt-12 md:py-24 md:pr-24 lg:pr-48">
            <h2 className="text-4xl font-bold text-jet">{FLI.blockName}</h2>
            <ul className="mx-0 mt-8">
              {FLI.investorRelationsLinks.map((link: any, index: number) => {
                return (
                  <li className="mb-4 flex-1 text-lg text-jet" key={index}>
                    {index + 1}. {link.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="mt-24 flex flex-col gap-1 px-12 md:pl-24 lg:pl-48">
          <h1 className="mb-4 text-lg font-bold">
            All data is constantly updated to reflect current data on the
            company.
          </h1>
          <p>Investor Relations Officer : Melissa Ortiz</p>
          <p>email address: ir@filinvestland.com</p>
          <p>phone: +63 2 918 8188 local 6143</p>
        </div>
        <div className="mt-16 flex flex-col flex-wrap gap-6 md:flex-row lg:mx-9 xl:mx-16 2xl:mx-44">
          <div className="flex-1">
            <div className="flex-none px-6 py-20">
              <div className="mx-12 flex flex-col items-center">
                <h2 className="text-4xl font-bold text-jet">
                  {informationGraph?.title}
                </h2>
                <p className="mt-6 text-dim-gray">
                  {informationGraph?.description}
                </p>
                <Image
                  src={`${
                    informationGraph?.Image?.url ??
                    "/investor-relations-graph.png"
                  }`}
                  width={498}
                  height={268}
                  alt="Picture of the author"
                  className="mt-6"
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1 px-16 py-20">
              <div className="border-[1px] border-jet">
                <div className="lg: flex items-center justify-center px-0 py-6">
                  <div className="mx-0 flex items-end gap-3 md:mx-8 lg:mx-12">
                    <h3 className="text-sm font-bold text-jet md:text-4xl">
                      FLI
                    </h3>
                    <RedDownTriangle />
                    <h3 className="text-5xl font-bold text-jet md:text-8xl">
                      {round(open)}
                    </h3>
                    <h4 className="text-base font-bold text-jet md:text-4xl">
                      {currentStock.currency}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b-[1px] border-solid border-jet py-6 pb-2">
                <div className="flex">
                  <h3 className="w-4/6 flex-none text-base font-bold text-jet">
                    Open
                  </h3>
                  <h3 className="flex-none text-base font-bold text-jet">
                    %Change
                  </h3>
                </div>
                <div className="flex">
                  <h3 className="w-4/6 flex-none text-xl text-jet">
                    {round(open)}
                  </h3>
                  <h3 className="flex-none text-xl text-jet">
                    {round(((highest - lowest) / highest) * 100.0, 2)}%
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b-[1px] border-solid border-jet py-4">
                <div className="flex">
                  <h3 className="w-4/6 flex-none text-base font-bold text-jet">
                    Close
                  </h3>
                  <h3 className="flex-none text-base font-bold text-jet">
                    52-Week High
                  </h3>
                </div>
                <div className="flex">
                  <h3 className="w-4/6 flex-none text-xl text-jet">
                    {round(close)}
                  </h3>
                  <h3 className="flex-none text-xl text-jet">
                    {round(highest)}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 py-4">
                <div className="flex">
                  <h3 className="w-4/6 flex-none text-base font-bold text-jet">
                    Change
                  </h3>
                  <h3 className="flex-none text-base font-bold text-jet">
                    52-Week Low
                  </h3>
                </div>
                <div className="flex">
                  <h3 className="w-4/6 flex-none text-xl text-jet">
                    {round(change)}
                  </h3>
                  <h3 className="flex-none text-xl text-jet">
                    {round(lowest)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-ghost-white px-12 py-24">
          <h2 className="text-center text-4xl font-bold text-jet">
            {highlights.title}
          </h2>
          <p className="mt-6 text-center text-dim-gray">
            {highlights.description}
          </p>
          <div className="mt-16 grid grid-cols-1 items-center justify-center gap-x-4 gap-y-12 px-8 md:px-0 lg:mx-9 lg:grid-cols-3 xl:mx-16 2xl:mx-44">
            {highlights.highlights.map((link: any, index: number) => {
              return (
                <div
                  className="flex flex-col items-center gap-6 md:flex-row"
                  key={index}
                >
                  <div className="flex-none">
                    <Image
                      src={link.logo.url ? link.logo.url : ""}
                      width={95}
                      height={95}
                      alt={link.logo.alt ? link.logo.alt : ""}
                    />
                  </div>
                  <div>
                    <h3 className="text-center text-2xl font-bold text-jet md:text-left">
                      {link.title}
                    </h3>
                    <div className="mt-4 flex items-center justify-center gap-4 md:justify-start">
                      <h4 className="text-2xl font-bold text-royal-dark-blue">
                        {link.cost}
                      </h4>
                      <p className="text-sm font-bold text-royal-dark-blue">
                        {link.year}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-24 flex justify-center">
            <Link href={`${highlights.seeAllLink}`}>
              <BorderButton
                buttonText="See All Complete Details"
                textColor="dark-cornflower-blue"
                borderColor="dark-cornflower-blue"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col divide-x divide-solid divide-gainsboro lg:flex-row">
          {boxLinks.investorRelationsBoxLinks.map(
            (link: any, index: number) => {
              return (
                <div className="flex-1 px-4 py-24 md:px-16" key={index}>
                  <h2 className="text-center text-4xl font-bold text-jet">
                    {link.title}
                  </h2>
                  <p className="mt-6 text-center text-dim-gray">
                    {link.description}
                  </p>
                  <div className="mt-12 flex justify-center">
                    <Link href={`${link?.buttonLink}`}>
                      <BorderButton
                        buttonText={link?.buttonText}
                        textColor={
                          link?.isButtonDownload === "yes"
                            ? "white"
                            : "dark-cornflower-blue"
                        }
                        borderColor="dark-cornflower-blue"
                        bgColor={
                          link?.isButtonBlue === "yes"
                            ? "dark-cornflower-blue"
                            : "transparent"
                        }
                      />
                    </Link>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>
    </>
  );
};

export default Content;
