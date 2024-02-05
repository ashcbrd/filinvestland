"use client";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import React from "react";
import Table from "./Table";
import MainHeader from "@/components/header/MainHeader";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import Tabs from "@/components/header/Tabs";
import Link from "next/link";
import PDFIcon from "@/components/svg/PDFIcon";
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

  const structureTitleAndText = content?.content?.find(
    (item: any) => item.blockType === "structures-title-and-text"
  );

  const shareholdingStructureTable = content?.content?.find(
    (item: any) => item.blockType === "structures-chart-table"
  );

  const tableColumns = shareholdingStructureTable.tableColumn.map(
    (col: any) => col?.header
  );

  let rows = shareholdingStructureTable?.tableColumn?.[0].tableData?.map(
    (r: any, index: number) => {
      return shareholdingStructureTable?.tableColumn?.map(
        (x: any, i: number) => {
          switch (i) {
            case 1:
              return (
                <span className="flex max-w-[323px] flex-col gap-3">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: x?.tableData[index]?.data,
                    }}
                  ></div>
                </span>
              );
            case 4:
              return (
                <span className="flex max-w-[170px] flex-col gap-3">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: x?.tableData[index]?.data,
                    }}
                  ></div>
                </span>
              );
            default:
              return (
                <div
                  dangerouslySetInnerHTML={{
                    __html: x?.tableData[index]?.data,
                  }}
                ></div>
              );
          }
        }
      );
    }
  );

  const downloadLink = content?.content?.find(
    (item: any) => item.blockType === "structures-download-button"
  );

  return (
    <>
      <MainHeader
        title={header.title}
        breadcrumbs={breadcrumbs}
        bgUrl={header.coverImage.url}
        tabs={tabs}
      />
      <section className="mb-24 mt-9 flex flex-col gap-9 lg:mx-9 xl:mx-16 2xl:mx-44">
        <h2 className="text-jet text-center text-3xl font-bold md:text-4xl">
          {structureTitleAndText.title}
        </h2>
        <p className="text-dim-gray mx-6 lg:mx-0">
          {structureTitleAndText.description}
        </p>
        <Table isAlignedTop={true} header={tableColumns} rows={rows} />
        <p className="text-dim-gray mx-6 lg:mx-0">
          {shareholdingStructureTable?.tableFooter}
        </p>
        <p className="text-dim-gray mx-6 lg:mx-0">
          {shareholdingStructureTable?.tableSubFooter}
        </p>
        <div className="mt-4 flex justify-center">
          <Link
            href={downloadLink.file.url}
            target="_blank"
            className="border-sonic-silver hover:bg-oxford-blue flex items-center gap-4 border bg-[#163E82] px-12 py-6 text-white focus:shadow-lg"
          >
            <PDFIcon />
            <span>FDC Shareholding Structure</span>
          </Link>
        </div>
        <div className="m-4 mt-32">
          <PageNextPrevButton content={content} />
        </div>
      </section>
    </>
  );
};

export default Content;
