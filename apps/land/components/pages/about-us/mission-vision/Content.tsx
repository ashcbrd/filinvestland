"use client";
import React from "react";
import MainHeader from "@/components/header/MainHeader";
import MissionVisionCoreValues from "@/components/pages/about-us/mission-vision/MissionVisionCoreValues";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import Tabs from "@/components/header/Tabs";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";

const Content = ({ content, news }: any) => {
  const header = content?.content?.find(
    (item: any) => item.blockType === "header"
  );
  const breadcrumbsItems = header?.breadcrumbs.map(
    (tab: any, index: number) => {
      return {
        title: tab.link.label,
        ...(index + 1 < header?.breadcrumbs?.length && { link: tab.link.url }),
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
  return (
    <>
      <MainHeader
        title={header.title}
        breadcrumbs={breadcrumbs}
        bgUrl={header.coverImage.url}
        tabs={tabs}
      />
      <MissionVisionCoreValues content={content} news={news} />
      <div className="p-4 lg:p-16">
        <PageNextPrevButton content={content} />
      </div>
      {/* <News news={news} />  */}
    </>
  );
};

export default Content;
