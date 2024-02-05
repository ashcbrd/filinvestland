import React from "react";
import Banner from "@/app/components/carousel/banner";
import Content from "@/app/components/cards/content";
import Card from "@/app/components/cards/card";
import ImageCarousel from "../components/slider";

const data = [
  {
    id: 1,
    imgSrc: "/assets/images/PPAS.png",
    title: "2021 Property Guru",
    subtitle: "Philippines Property Awards",
    description:
      "With its wide range of facilities, it is a restorative sanctuary of sports, entertainment and relaxation.",
  },
  {
    id: 2,
    imgSrc: "/assets/images/PPAS.png",
    title: "2022 Property Guru",
    subtitle: "Philippines Property Awards",
    description:
      "With its wide range of facilities, it is a restorative sanctuary of sports, entertainment and relaxation.",
  },
  {
    id: 3,
    imgSrc: "/assets/images/PPAS.png",
    title: "2023 Property Guru",
    subtitle: "Philippines Property Awards",
    description:
      "With its wide range of facilities, it is a restorative sanctuary of sports, entertainment and relaxation.",
  },
];

async function getData() {
  const page = fetch(
    `${process.env.CMS_URL}/api/futura-pages/654c9ec87010a4bb29b97173`,
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
    page: req.page.content,
  };

  return (
    <div className="px-4 md:px-0 pb-20">
      <Banner
        imageUrl={sections.page[0]?.aboutUsHeader.converImage.url}
        title={""}
      />
      <section className="container mx-auto shadow-none !mt-20 mb-14 px-4">
        <h1 className="text-[24px] md:text-[35px] font-bold  text-start">
          {sections.page[0]?.aboutUsHeader.title || "Welcome to Futura"}
        </h1>
        <p className="mt-4 text-start whitespace-pre-wrap">
          {sections.page[0]?.aboutUsHeader.description || "Description Here"}
        </p>
        <div className="flex justify-between w-full h-max mt-20 flex-col md:flex-row gap-x-10 gap-y-6">
          <img
            src="/assets/images/home/property/property_2.png"
            className="rounded-3xl w-[620px] h-[316px] object-cover"
          />
          <img
            src="/assets/images/home/property/property_1.png"
            className="rounded-3xl w-[620px] h-[316px] object-cover"
          />
        </div>
      </section>
      {sections.page[0]?.aboutUsAwards?.title && (
        <div className="w-full h-max min-h-screen py-20">
          <section className="container mx-auto py-4 pb-14 pt-[110px]">
            <Content title={sections.page[0]?.aboutUsAwards?.title}>
              <p className="whitespace-pre-wrap">
                {sections.page[0]?.aboutUsAwards?.awardDescription}
              </p>
            </Content>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.map((item) => (
                <Card key={item.id}>
                  <div className="flex justify-center">
                    <img src={item.imgSrc} className="h-40 w-40" />
                  </div>
                  <div className="p-4">
                    <p className="font-quicksand text-center text-[#343434] mb-2 text-[14px]">
                      {item.subtitle}
                    </p>
                    <h2 className="text-2xl md:text-[22px] font-quicksand font-normal mb-2 text-[#343434] text-center">
                      {item.title}
                    </h2>

                    <p className="text-base text-[#343434] text-center">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

type TeamType = {
  imgSrc: string;
  name: string;
  title: string;
};

const Team: React.FC<TeamType> = ({ imgSrc, name, title }) => {
  return (
    <div className="h-[400px] w-[260px] rounded-2xl overflow-hidden relative">
      <div className="flex w-full h-full flex-col items-center bg-gradient-to-t from-black/50 via-transparent to transparent justify-end pb-6 z-20 relative">
        <div className="flex flex-col items-center">
          <h3 className="text-[22px] text-white font-quicksand">{name}</h3>
          <p className=" text-white font-quicksand">{title}</p>
        </div>
      </div>
      <img
        src={imgSrc}
        className="w-full h-full absolute z-0 top-0 left-0 object-cover"
      />
    </div>
  );
};

export default About;
