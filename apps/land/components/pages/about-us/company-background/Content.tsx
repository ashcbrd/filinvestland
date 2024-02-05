"use client";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import IconText from "./IconText";
import YearsOfExperience from "./YearsOfExperience";
import ImageRightTextLeft from "./ImageRightTextLeft";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import Tabs from "@/components/header/Tabs";
import MainHeader from "@/components/header/MainHeader";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import MediaSection from "./MediaSection";

const Content = ({ news, content }: any) => {
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
    <div className="overflow-hidden">
      <MainHeader
        title={header.title}
        breadcrumbs={breadcrumbs}
        bgUrl={header.coverImage.url}
        tabs={tabs}
      />
      <MediaSection content={content} />
      <IconText content={content} />
      <YearsOfExperience content={content} />
      <ImageRightTextLeft content={content} news={news} />
      <div className="p-4 lg:p-16">
        <PageNextPrevButton content={content} />
      </div>
    </div>
  );
};

export default Content;
