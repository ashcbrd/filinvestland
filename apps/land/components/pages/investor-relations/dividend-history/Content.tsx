"use client";
import React from "react";
import MainHeader from "@/components/header/MainHeader";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import Tabs from "@/components/header/Tabs";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import Dividends from "./Dividends";

type TotalDividend = {
  totalDividend: string;
  id: string;
};

type PayoutRate = {
  payoutRate: string;
  id: string;
};

type TotalDividendsRow = {
  totalDividendsRowTitle: string;
  totalDividends: TotalDividend[];
};

type PayoutRateRow = {
  payoutRateRowTitle: string;
  payoutRates: PayoutRate[];
};

type DividendHistoryTable = {
  totalDividendsRow: TotalDividendsRow;
  payoutRateRow: PayoutRateRow;
};

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

  const tabItems = header?.tabs.map((tab: any) => {
    return {
      title: tab.link.label,
      link: tab.link.url,
    };
  });

  const dividendsContent = content?.content?.find(
    (item: any) => item.blockType === "dividend-history"
  );

  const { totalDividendsRow, payoutRateRow } = content?.content?.find(
    (item: any) => item.blockType === "dividend-history-table"
  ) as DividendHistoryTable;

  return (
    <>
      <MainHeader
        title={header.title}
        breadcrumbs={<Breadcrumbs items={breadcrumbsItems} />}
        bgUrl={header.coverImage.url}
        tabs={<Tabs items={tabItems} />}
      />
      <Dividends
        totalDividendsRow={totalDividendsRow}
        payoutRateRow={payoutRateRow}
        dividendsContent={dividendsContent}
      />
      <div className="p-4 lg:p-16">
        <PageNextPrevButton content={content} />
      </div>
    </>
  );
};

export default Content;
