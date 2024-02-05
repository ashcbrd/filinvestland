"use client";
import React from "react";
import AspireHomes from "@/components/pages/our-businesses/residential/AspireHomes";
import FuturaHomes from "@/components/pages/our-businesses/residential/FuturaHomes";
import PrestigeHomes from "@/components/pages/our-businesses/residential/PrestigeHomes";
import TitleText from "@/components/pages/our-businesses/residential/TitleText";
import MainHeader from "@/components/header/MainHeader";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import Tabs from "@/components/header/Tabs";

// import FullPropertySlider from "@/components/Slider/FullPropertySlider";

const Content = ({ content }: any) => {
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
      <section className=" -mt-[20vh] mb-24 flex flex-col gap-9">
        <TitleText content={content} />
        <PrestigeHomes content={content} />
        <AspireHomes content={content} />
        <FuturaHomes content={content} />
      </section>
    </>
  );
};

export default Content;
