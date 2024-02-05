import Banner from "@/app/components/carousel/banner";
import React from "react";
import SliderCard from "@/app/components/cards/slidercard";
import moment from "moment";
import { Typography } from "@/app/components/typography/typography";
import { NewsCard } from "@/app/components/cards/newscard";
import { InvestorsConcerge } from "@/app/components/general/investorsconcerge";
import qs from "qs";
import { serializeRichText } from "@/app/utils/serializeRichText";
import formatDate from "@/app/utils/formatDate";

async function getData(id: string) {
  const query = qs.stringify(
    {
      where: { slug: { equals: id } },
    },
    {
      addQueryPrefix: true,
    }
  );
  const page = fetch(`${process.env.CMS_URL}/api/prestige-news/${query}`, {
    cache: "no-store",
  });
  const investor = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/64d34fc0281bd2de8791c8b4`,
    { cache: "no-store" }
  );
  const req = await Promise.all([page, investor]);

  return {
    page: (await req[0].json()) as any,
    investor: (await req[1].json()) as any,
  };
}

const Index = async ({ params }: any) => {
  const req = await getData(params.id);
  const sections: any = {
    page: req.page.docs[0],
  };
  const investor = {
    page: req.investor.content,
  };

  // const formattedText = sections.page.content[1].children[0].text.replace(
  //   /\n/g,
  //   "\n"
  // );
  // const formattedText2 = sections.page.content[3].children[0].text.replace(
  //   /\n/g,
  //   "\n"
  // );

  return (
    <>
      <Banner
        opacity="bg-[#130A01]/80"
        title={sections.page.title}
        imageUrl={sections.page?.coverImage.url}
        description={formatDate(sections.page?.Date)}
      />

      <section className="min-h-fit w-full bg-[#F4EBD0] px-8 py-16 sm:py-20 md:px-12 md:py-[100px]">
        <div className="mx-auto h-auto w-full max-w-[1650px]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr,_385px]">
            <div className="space-y-6 lg:space-y-8">
              <Typography
                size="heading2"
                color="dark"
                font="cormorant"
                className="leading-none font-medium"
                text={sections.page?.meta.title}
              />
              <Typography
                size="20"
                color="dark"
                font="nunito"
                text={sections.page?.shortDescription}
                className="whitespace-pre-line"
              />
              <img
                alt="img"
                className="w-full h-[415px] object-cover bg-center"
                src={sections.page?.coverImage.url}
              />
              <div className="flex flex-1 flex-col justify-center gap-4">{serializeRichText(sections.page?.content, true)}</div>
            </div>

            <div className="mt-3 space-y-5">
              <Typography
                size="35"
                color="dark"
                font="cormorant"
                text={"Recommended Properties"}
                className="font-semibold"
              />
              <div className="flex-1 flex flex-row flex-wrap justify-center gap-8">
                <NewsCard
                  data={sections.page.ProjectRecommendation.recommendation1}
                />
                <NewsCard
                  data={sections.page.ProjectRecommendation.recommendation2}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <InvestorsConcerge data={investor} />
    </>
  );
};

export default Index;
