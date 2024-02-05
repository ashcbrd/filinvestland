"use client";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import MainHeader from "@/components/header/MainHeader";
import Tabs from "@/components/header/Tabs";
import CorporateSocialResponsibility from "@/components/pages/pusong-filinvest/CorporateSocialResponsibility";
import Gallery from "@/components/pages/pusong-filinvest/Gallery";
import News from "@/components/pages/pusong-filinvest/News";
import OurStory from "@/components/pages/pusong-filinvest/OurStory";

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
      <OurStory content={content} />
      <CorporateSocialResponsibility content={content} />
      <Gallery content={content} />
      <News news={news} />
      <div className="p-4 lg:p-16">
        <PageNextPrevButton content={content} />
      </div>
    </>
  );
};

export default Content;
