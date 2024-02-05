import React from "react";
import Section from "@/components/Section/Section";
import Project from "@/components/Projects/Card/Card";
import Overlay from "@/components/Overlay/Overlay";
import Page from "@/components/Page/Page";
import moment from "moment-timezone";
import qs from "qs";
import Content from "@/app/not-found";

export const generateMetadata = async ({ params }: any) => {
  const query = qs.stringify(
    {
      where: { slug: { equals: params.id } },
    },
    {
      addQueryPrefix: true,
    }
  );

  const project = await fetch(
    `${process.env.CMS_URL}/api/aspire-news/${query}`,
    { cache: "no-store" }
  );
  const projectData = await project.json();

  return {
    title: `${projectData.docs[0]?.title || "Aspire by Filinvest"}  `,
    description:
      "Filinvest offers quality horizontal home projects perfect for you and your family. Aspire for your own place, contact us today!",
  };
};

async function getData(id: any) {
  try {
    const query = qs.stringify(
      {
        where: { slug: { equals: id } },
      },
      {
        addQueryPrefix: true,
      }
    );

    const news = await fetch(
      `${process.env.CMS_URL}/api/aspire-news/${query}`,
      {
        cache: "no-store",
      }
    );

    return {
      news: (await news.json()) as any,
    };
  } catch (error) {
    return { error };
  }
}

const Item = async ({ params }: any) => {
  const req = await getData(params.id);

  if (req.error || !req.news.docs.length) return <Content />;
  const details = req.news.docs[0];

  return (
    <Page id="news" className="bg-candy-blue">
      <Section
        fw
        style={{ backgroundImage: `url(${details.coverImage?.url})` }}
        className="relative flex h-[626px] items-center justify-center bg-cover bg-center text-white"
      >
        <Overlay className="bg-black/30" />
        <Overlay className="bg-black/40" />
        <div className="relative max-w-[883px] px-[20px] text-center">
          <h1 className="pb-[13px] text-[45px] font-[400] leading-[55px] md:text-[38px] md:leading-[1.2]">
            {details.title}
          </h1>
          <p>
            {moment
              .tz(details.Date, "Asia/Manila")
              .format("MMMM DD, YYYY")
              .toString()}
          </p>
        </div>
      </Section>
      <Section className="bg-candy-blue pb-[127px] pt-[133px] md:!pb-[60px] md:!pt-[60px] tablet:pb-[100px] tablet:pt-[100px]">
        <div className="flex w-full justify-between tablet:flex-col">
          <div
            className={`${
              details.ProjectRecommendation &&
              (details.ProjectRecommendation?.recommendation1?.id ||
                details.ProjectRecommendation?.recommendation2?.id)
                ? "pr-[58px] md:!mb-[30px] tablet:mb-[50px] tablet:pr-[0px]"
                : ""
            }`}
          >
            {details.content &&
              details.content.map((c: any) => (
                <>
                  {c.type !== "upload" && (
                    <p>{c.children.map((t: any) => t.text)}</p>
                  )}
                  {c.type === "upload" && (
                    <p>
                      <img
                        src={c.value.url}
                        alt={c.value.alt}
                        className="w-full"
                      />
                    </p>
                  )}
                </>
              ))}
          </div>
          {details.ProjectRecommendation &&
            (details.ProjectRecommendation?.recommendation1?.id ||
              details.ProjectRecommendation?.recommendation2?.id) && (
              <div className="w-[335px] tablet:w-full">
                <h3 className="pb-[33px] text-[25px] font-[400] leading-[31px]">
                  Recommended Properties
                </h3>
                {details.ProjectRecommendation?.recommendation1?.id && (
                  <div className="">
                    <Project
                      expandable={false}
                      project={details.ProjectRecommendation?.recommendation1}
                      className="!pb-[34px]"
                      imageClasses="!h-[297px]"
                      arrowClasses="!w-[38px] !h-[38px]"
                      prevArrowClassName="!left-[14px] !bottom-[16px]"
                      nextArrowClassName="!left-[63px] !bottom-[16px]"
                      titleClassName="!text-[25px]"
                      contentContainerClassName="!pb-[17px] !pl-[20px] !pt-[11px]"
                    />
                  </div>
                )}
                {details.ProjectRecommendation?.recommendation2?.id && (
                  <div className="">
                    <Project
                      expandable={false}
                      project={details.ProjectRecommendation?.recommendation2}
                      className="tablet:pb-[0px]"
                      imageClasses="!h-[297px]"
                      arrowClasses="!w-[38px] !h-[38px]"
                      prevArrowClassName="!left-[14px] !bottom-[16px]"
                      nextArrowClassName="!left-[63px] !bottom-[16px]"
                      titleClassName="!text-[25px]"
                      contentContainerClassName="!pb-[17px] !pl-[20px] !pt-[11px]"
                    />
                  </div>
                )}
              </div>
            )}
        </div>
      </Section>
    </Page>
  );
};

export default Item;
