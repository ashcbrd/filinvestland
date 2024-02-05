"use client";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import React, { useState } from "react";
import Charters from "./Charters";
import Members from "./Members";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import Tabs from "@/components/header/Tabs";
import MainHeader from "@/components/header/MainHeader";

import FadeLeft from "@/components/animation/FadeLeft";

const Content = ({ content }: any) => {
  const [currentTab, setCurrentTab] = useState("member");
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
      <section className="mx-6 mb-16 flex flex-col gap-5 lg:mx-9 lg:mb-28 lg:mt-16 lg:gap-9 xl:mx-16 2xl:mx-44">
        <div className="gap-12 lg:flex">
          <div className="mb-5 lg:mb-0 lg:w-1/4 lg:flex-none">
            <FadeLeft>
              <div className="divide-gainsboro flex flex-row gap-[2rem] bg-white lg:flex-col lg:gap-0 lg:divide-y lg:px-9 lg:py-4 lg:shadow-xl">
                <h4
                  className={`pb-5 pt-5 text-lg font-bold ${
                    currentTab === "member" && "text-dark-cornflower-blue"
                  } hover:cursor-pointer hover:border-b-2 focus:cursor-pointer focus:border-b`}
                  onClick={() => setCurrentTab("member")}
                >
                  Committees And Members
                </h4>
                <h4
                  className={`pb-3 pt-5 text-lg font-bold ${
                    currentTab === "charter" && "text-dark-cornflower-blue"
                  } hover:cursor-pointer hover:border-b-2 focus:cursor-pointer focus:border-b`}
                  onClick={() => setCurrentTab("charter")}
                >
                  Board Committee Charters
                </h4>
              </div>
            </FadeLeft>
          </div>
          {currentTab === "member" ? (
            <Members content={content} />
          ) : (
            <Charters content={content} />
          )}
        </div>
        <div className="mt-32 flex w-full">
          <PageNextPrevButton content={content} />
        </div>
      </section>
    </>
  );
};

export default Content;
