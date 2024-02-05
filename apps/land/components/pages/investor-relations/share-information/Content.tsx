"use client";
import React from "react";
import Stocks from "./Stocks";
import MainHeader from "@/components/header/MainHeader";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import Tabs from "@/components/header/Tabs";
import OutstandingSharesTable from "./OutstandingSharesTable";
import StockHolderTable from "./StockHolderTable";
import Image from "next/image";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import FadeUp from "@/components/animation/FadeUp";
const Content = ({ content }: any) => {
  const header = content?.content?.find(
    (item: any) => item.blockType === "header"
  );
  const breadcrumbsItems = header?.breadcrumbs.map(
    (tab: any, index: number) => {
      return {
        title: tab.link.label,
        ...(index + 1 < header?.breadcrumbs?.length && {
          link: tab.link.url,
        }),
      };
    }
  );
  const breadcrumbs = <Breadcrumbs items={breadcrumbsItems} />;
  const tabItems = header?.tabs.map((tab: any) => {
    return {
      title: tab.link.label,
      link: tab.link.url,
    };
  });
  const tabs = <Tabs items={tabItems} />;

  const title = content?.content?.find(
    (item: any) => item.blockType === "stock-information-title"
  )?.title;

  const OutstandingSection = content?.content?.find(
    (item: any) =>
      item.blockType === "stock-information-outstanding-number-of-shares-table"
  );

  return (
    <div className="sketch-bg-stock">
      <MainHeader
        title={header.title}
        breadcrumbs={breadcrumbs}
        bgUrl={header.coverImage.url}
        tabs={tabs}
      />
      <section className="mx-3 mb-28 mt-16 flex flex-col gap-9 lg:mx-9 xl:mx-16 2xl:mx-44">
        <FadeUp>
          <div>
            <h2 className="text-center text-3xl font-bold text-jet">{title}</h2>
          </div>
        </FadeUp>
        <Stocks />
        <OutstandingSharesTable content={content} />
        <StockHolderTable content={content} />
        {OutstandingSection?.dividends?.url && (
          <div className="relative flex w-full justify-center">
            <Image
              src={OutstandingSection.dividends.url || ""}
              width={1000}
              height={500}
              alt={OutstandingSection.dividends.alt || ""}
              className="max-w-[100%]"
            />
          </div>
        )}
        <div className="relative w-full">
          <Image
            priority
            className={`absolute -bottom-[28rem] -left-[105px] z-[-1] 2xl:-bottom-10`}
            src={`/sketch-house.png`}
            alt={`sketch-house.png`}
            width={1508}
            height={400}
          />
        </div>
      </section>
      <div className="p-4 lg:p-16">
        <PageNextPrevButton content={content} />
      </div>
    </div>
  );
};

export default Content;
