"use client";
import FadeUp from "@/components/animation/FadeUp";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import MainHeader from "@/components/header/MainHeader";
import Tabs from "@/components/header/Tabs";
import { serializeRichText } from "@/helpers/serializeRichText";
import React from "react";

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

  const dividendPolicyContent = content?.content?.find(
    (item: any) => item.blockType === "dividend-policy"
  );

  return (
    <>
      <MainHeader
        title={header.title}
        breadcrumbs={<Breadcrumbs items={breadcrumbsItems} />}
        bgUrl={header.coverImage.url}
        tabs={<Tabs items={tabItems} />}
      />
      <section className="mx-3 mb-28 mt-16 flex flex-col gap-6 px-6 lg:mx-9 xl:mx-16 2xl:mx-44">
        <FadeUp>
          <h1 className="text-center text-4xl font-bold text-jet">
            {dividendPolicyContent.title}
          </h1>
        </FadeUp>
        {serializeRichText(dividendPolicyContent.content)}
      </section>
      <div className="p-4 lg:p-16">
        <PageNextPrevButton content={content} />
      </div>
    </>
  );
};

export default Content;
