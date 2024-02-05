import React from "react";
import Search from "@/app/components/inputs/search";
import Link from "next/link";
import HeaderBanner from "@/app/components/carousel/headbanner";
import Button from "./components/button";
import MotionCard from "./components/home/motioncard";
import CondoCard from "./components/home/condocard";
import MapContainer from "./components/home/mapcontainer";
import ArticleCard from "./components/home/articlecard";
import qs from "qs";
import CondoCardCarousel from "./components/home/condocard-slider";
import Propcard from "./components/cards/propcard";

async function getData() {
  const reqQuery = qs.stringify({
    where: {
      _status: { equals: "published" },
    },
  });

  const page = fetch(
    `${process.env.CMS_URL}/api/futura-pages/654c8980386037465bbbea82`,
    { cache: "no-store" }
  );

  const featured = fetch(
    `${process.env.CMS_URL}/api/globals/futura-featured-projects`,
    { cache: "no-cache" }
  );

  const featured_news = fetch(
    `${process.env.CMS_URL}/api/globals/futura-featured-news`,
    { cache: "no-cache" }
  );

  const property_search = fetch(
    `${process.env.CMS_URL}/api/globals/futura-property-search`
  );

  const projects = fetch(
    `${process.env.CMS_URL}/api/futura-projects?limit=100&${reqQuery}`
  );

  const req = await Promise.all([
    page,
    featured,
    featured_news,
    property_search,
    projects,
  ]);

  return {
    page: (await req[0].json()) as any,
    featured: (await req[1].json()) as any,
    featured_news: (await req[2].json()) as any,
    property_search: (await req[3].json()) as any,
    projects: (await req[4].json()) as any,
  };
}

const Home = async () => {
  const req = (await getData()) as any;
  const sections = {
    page: req.page.content,
  };
  const featured = req.featured;
  const news = req.featured_news;
  const property_search = req.property_search;
  const projects = req.projects;

  const motionSettings = {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 10 },
    transition: { duration: 0.5 },
    viewport: { once: true },
  };

  return (
    <div className="overflow-hidden">
      <section className="mx-auto w-[95%]">
        <HeaderBanner
          imageClassName={""}
          opacity="bg-[#130A01] bg-opacity-10"
          imageUrl={sections.page[0]?.mediaBackground.url}
          title={sections.page[0].title}
          description={
            <p className="mt-7 whitespace-pre-wrap font-sans text-[18px] font-light leading-[26px] text-[#060606]">
              {sections.page[0].subTitle}
            </p>
          }
          callToActionLink={sections.page[0].callToActionLink}
          callToActionText={sections.page[0].callToActionText}
        />
      </section>

      <div className="mb-14 bg-[#FFF8F8]">
        <div className="-m-16 mx-auto w-full px-4 lg:px-10 ">
          <div className="flex flex-wrap">
            <div className="mb-12 w-full px-4 xl:mb-0">
              <div className="relative mb-6 flex w-full min-w-0 flex-col break-words">
                <Search data={property_search} projects={projects} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-36 min-h-screen w-full ">
          <div className="bg-base-100 mt-6 flex w-full flex-col items-center">
            <label className="mb-6 text-center font-quicksand text-[26px] font-bold lg:text-[35px]">
              {sections.page[1].title}
            </label>

            <div className="relative w-[800px] max-w-screen-lg pb-6">
              <div className="flex items-center justify-center">
                <p className="mb-2 w-[40%] whitespace-pre-wrap text-center font-light lg:w-[66%] lg:text-[18px]">
                  {sections.page[1].subTitle}
                </p>
              </div>
            </div>
          </div>

          <MotionCard
            data={sections.page[1].PropertyTypes}
            motionSettings={motionSettings}
          />

          <section className="relative mx-auto mt-20 w-screen lg:container">
            <div className="relative mx-auto h-max w-full overflow-hidden from-black via-black/60 to-transparent after:absolute after:bottom-0 after:z-40  after:h-[50%] after:w-full after:bg-transparent after:content-[''] md:after:bg-gradient-to-t lg:rounded-2xl">
              <div className="absolute  left-0 right-0 top-0 z-50 mt-10 md:top-[100px] lg:top-[200px] lg:mt-0">
                <h3 className="text-center text-[26px] font-bold text-white lg:text-[35px]">
                  {featured.title || "Featured Projects"}
                </h3>
                <p className="mb-4 mt-2 whitespace-pre-wrap text-center text-[14px] text-white lg:mb-0 lg:text-[18px]">
                  {featured.description ||
                    "Check out our latest offerings in prime locations"}
                </p>
              </div>
              <div className="relative z-20">
                <div className="absolute left-0 top-0 z-30 block h-full w-full bg-black/30 lg:hidden" />
                <img
                  src="/assets/images/home/home-condo-bg.png"
                  className="z-20 h-[250px] w-full object-cover md:h-full"
                  alt="Background"
                />
              </div>
            </div>
            <CondoCard
              data={featured.FeaturedProjects}
              motionSettings={motionSettings}
              slider={true}
            />
            <CondoCardCarousel items={featured.FeaturedProjects} />
          </section>
        </div>
      </div>
      <MapContainer data={property_search} projects={projects} />
      <section className="container mx-auto items-center">
        <div className="mb-20 flex flex-col items-center justify-between gap-2 p-2 lg:flex-row">
          <div>
            <img
              src="/assets/images/home/home-future.png"
              alt="Image"
              className="w-full"
            />
          </div>
          <div className="px-2 lg:w-1/2 lg:px-0">
            <p className="mb-5 px-5 text-center font-quicksand text-[24px] font-[700] text-[#060606] lg:text-start lg:text-[35px] lg:leading-10">
              {sections.page[2].healthCommunity.title}
            </p>
            <p className="whitespace-pre-wrap px-4 text-center font-[400] lg:w-[80%] lg:text-start lg:text-[18px] lg:leading-[30px]">
              {sections.page[2].healthCommunity.description}
            </p>
            <div className="flex items-center">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              ></svg> */}

              <Button className="mx-auto mt-10 cursor-pointer px-16 py-5 lg:mx-0 lg:mt-20">
                <Link href={sections.page[2].healthCommunity.callToActionLink}>
                  {sections.page[2].callToActionText || "Learn More"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full">
        <section className="container mx-auto">
          <div className="mb-10 flex flex-col items-start">
            <div className="flex w-full flex-col items-center justify-between px-12 lg:flex-row">
              <div>
                <h2 className="mb-2 text-center font-quicksand text-[26px] font-[700] text-[#060606] lg:text-start lg:text-[35px]">
                  {news.title}
                </h2>
                <p className="whitespace-pre-wrap text-center text-[#343434] lg:px-0 lg:text-start lg:text-[18px]">
                  {news.description}
                </p>
              </div>

              <Link
                href={news.callToActionLink}
                className="-mb-4 mt-2 w-full rounded-[100px] bg-transparent text-end font-normal text-[#E02926] transition-all lg:mb-0 lg:mt-0 lg:w-max lg:bg-[#E02926] lg:px-14 lg:py-4 lg:text-white lg:hover:bg-red-400"
              >
                {news.callToActionText}
              </Link>
            </div>
          </div>

          <ArticleCard
            data={news.FeaturedNews}
            motionSettings={motionSettings}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
