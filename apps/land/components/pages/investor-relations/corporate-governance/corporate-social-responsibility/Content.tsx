import React from "react";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import Tabs from "@/components/header/Tabs";
import MainHeader from "@/components/header/MainHeader";
import TitleText from "./TitleText";
import EnvironmentalPreservation from "./EnvironmentalPreservation";
import Programs from "./Programs";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";

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
      <section>
        <div className="md:pb-26 flex flex-col gap-9 px-4 pb-6 pt-12 md:px-16 md:pt-32">
          <TitleText content={content} />
          <EnvironmentalPreservation content={content} />
        </div>
        <Programs content={content} />
      </section>
      <section className="px-4 py-16 md:px-36">
        <PageNextPrevButton content={content} />
      </section>
    </>
  );
};

export default Content;
