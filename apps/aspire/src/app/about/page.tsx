import Section from "@/components/Section/Section";
import React from "react";
import Blurb from "@/components/Blurb/Blurb";
import VideoModal from "@/components/Video/Modal/Modal";
import Page from "@/components/Page/Page";

export const metadata = {
  title: "About Aspire by Filinvest",
  description:
    "Filinvest Land Inc is a subsidiary of Filinvest Development Corporation, being the real estate arm offering a diverse range of developments.",
};

async function getData() {
  const page = fetch(
    `${process.env.CMS_URL}/api/aspire-pages/64d063bedc6f91aae8b12f2d`,
    { cache: "no-store" }
  );
  const req = await Promise.all([page]);

  return {
    page: (await req[0].json()) as any,
  };
}

const About = async () => {
  const req = (await getData()) as any;
  const sections = {
    general: req.page.content[0],
  };

  return (
    <Page id="about">
      <Section fw>
        <VideoModal
          video={sections.general.videoBackground}
          className="h-[607px] tablet:h-[460px]"
        />
      </Section>
      <Section className="bg-candy-blue pb-[114px] pt-[122px] tablet:pb-[60px] tablet:pt-[60px]">
        <div className="mx-[-20px] flex items-center justify-between">
          <div className="mx-[20px] max-w-[470px] text-center text-[22px] leading-[35px] md:text-[18px] lg:w-full lg:max-w-full">
            <h1
              className="pb-[42px] font-getlost text-[80px] leading-[88px] tracking-[1.4px] md:text-[46px] md:leading-[56px] tablet:pb-[30px]"
              style={{
                background: "linear-gradient(180deg, #079C31 0%, #035F1D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {sections.general.firstSection.title}
            </h1>
            <div className="hidden lg:block lg:pb-[42px]">
              <div className="flex w-1/2 items-start lg:w-full">
                <img
                  className="z-10 mx-auto "
                  src={sections.general.firstSection?.image1?.url}
                  alt="Family"
                  width={761}
                />
              </div>
            </div>
            <div className="mx-auto lg:max-w-full">
              {sections.general.firstSection.overviewDescription?.map(
                (t: any) => (
                  <p>{t.children.map((c: any) => c.text).join("")}</p>
                )
              )}
            </div>
          </div>
          <div className="mx-[20px] flex items-start lg:hidden">
            <img
              className="z-10 mx-auto "
              src={sections.general.firstSection?.image1?.url}
              alt="Family"
              width={761}
            />
          </div>
        </div>
      </Section>
      <Section className="pb-[98px] pt-[113px] tablet:pb-[60px] tablet:pt-[60px]">
        <div className="mx-auto w-full max-w-[1052px] pb-[69px] text-center tablet:pb-[30px]">
          <h2>{sections.general.CommunityAndHealth.title}</h2>
        </div>
        <div className="flex md:flex-col [&>*:last-child]:pb-[0px]">
          {sections.general.CommunityAndHealth.content.map((c: any) => (
            <div className="w-2/6 md:w-full md:pb-[20px]">
              <Blurb
                image={c.Image?.url}
                header={c.title}
                content={c.description}
              />
            </div>
          ))}
        </div>
      </Section>
      <Section className="bg-candy-blue pb-[114px] pt-[129px] text-center tablet:pb-[60px] tablet:pt-[60px]">
        <div className="w-full pb-[78px] tablet:pb-[30px]">
          <h2>{sections.general.Awards.title}</h2>
        </div>
        {sections.general.Awards.Content.map((c: any) => (
          <div>
            <div className="pb-[40px]">
              <img className="mx-auto" src={c.Image.url} alt="AEX IRP" />
            </div>
            <div>
              <p className="whitespace-pre-wrap pb-0 uppercase">{c.subTitle}</p>
              <p className="pb-[25px] text-[30px] md:text-[22px]">{c.title}</p>
              <div className="mx-auto max-w-[391px]">
                <p>{c.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Section>
    </Page>
  );
};

export default About;
