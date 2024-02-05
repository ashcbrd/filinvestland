import React from "react";
import Section from "@/components/Section/Section";
import Slider from "@/components/Slider/Slider";
import Card from "@/components/Card/Card";
import Button from "@/components/Button/Button";
import NewsCard from "@/components/News/Card/Card";
import Overlay from "@/components/Overlay/Overlay";
import FeaturedSlider from "@/components/Projects/FeaturedSlider/FeaturedSlider";
import ProjectFilter from "@/components/Projects/Filter/Filter";
import Locator from "@/components/Projects/Locator/Locator";
import Page from "@/components/Page/Page";
import qs from "qs";

export const metadata = {
  title: "Aspire by Filinvest | Lifestyle House and Condo for Sale",
  description: "Filinvest offers quality condos and houses perfect for you and your family. Aspire for your own place, contact us today!",
};

async function getData() {
  const reqQuery = qs.stringify({
    where: {
      _status: { equals: "published" },
    },
  });

  const page = fetch(`${process.env.CMS_URL}/api/aspire-pages/64d352ad281bd2de8791cca9?locale=en`, { cache: "no-store" });
  const featureProjects = fetch(`${process.env.CMS_URL}/api/globals/aspire-featured-projects`, { cache: "no-store" });
  const featuredNews = fetch(`${process.env.CMS_URL}/api/globals/aspire-featured-news`, { cache: "no-store" });
  const news = fetch(`${process.env.CMS_URL}/api/aspire-news?limit=3&sort=Date`, { cache: "no-store" });
  const search = fetch(`${process.env.CMS_URL}/api/globals/aspire-property-search`, { cache: "no-store" });
  const projects = fetch(`${process.env.CMS_URL}/api/aspire-projects?limit=100&${reqQuery}`, { cache: "no-store" });

  const req = await Promise.all([page, featureProjects, news, search, projects, featuredNews]);

  return {
    page: (await req[0].json()) as any,
    featureProjects: (await req[1].json()) as any,
    news: (await req[2].json()) as any,
    search: (await req[3].json()) as any,
    projects: (await req[4].json()) as any,
    featureNews: (await req[5].json()) as any,
  };
}

const App = async () => {
  const res = await getData();
  const featuredProjects = res.featureProjects as any;
  const featuredNews = res.featureNews as any;
  const news = res.news.docs;
  const search = res.search;
  const projects = res.projects.docs;

  const sections = {
    banner: res.page.content && res.page.content.length > 0 ? res.page.content[0] : {},
    categories: res.page.content && res.page.content.length > 1 ? res.page.content[1] : {},
  };

  console.log(sections.categories.PropertyTypes);
  return (
    <Page id="home">
      <Section id="banner" fw className="home-banner relative">
        <Overlay className="top-[172px] h-[1093px] bg-sky" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center overflow-hidden">
          <Overlay className="bg-black/30" />
          <Overlay className="bg-banner-radial" />
          {sections.banner.videoBackgrounds
            .slice(0, 1)
            .filter((v: any) => v.videoBackground2)
            .map((v: any) => (
              <video id="video-banner" className="w-full min-w-[1580px]" autoPlay muted loop playsInline>
                <source src={v.videoBackground2.url} type={v.videoBackground2.mimeType} />
                Your browser does not support the video tag.v
              </video>
            ))}
        </div>
        <div className="relative px-[20px] md:px-[30px]">
          <Slider
            autoScroll
            className="mx-auto h-[866px] max-w-[1449px] lg:h-[650px]"
            slides={[
              {
                header: sections.banner.title,
                content: sections.banner.subTitle,
              },
            ]}
          />
        </div>
      </Section>
      <Section id="categories" className="mx-[-12px] bg-candy-blue pb-[105px] tablet:pb-[60px] lg:mx-0">
        <ProjectFilter search={search} />
        <div className="relative mx-auto max-w-[1093px] pb-[54px] pt-[77px] text-center text-[22px] leading-[35px] text-charcoal tablet:pb-[30px] tablet:pt-[60px]">
          <h1
            className="pb-[18px] font-getlost leading-none tracking-[1.4px]"
            style={{
              background: "linear-gradient(180deg, #079C31 0%, #035F1D 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {sections.categories.title}
          </h1>
          <p className="whitespace-pre-wrap md:text-[18px]">{sections.categories.subTitle}</p>
        </div>
        <div className="relative mx-[-12px] mb-[-40px] flex flex-wrap justify-center md:flex-col">
          {sections.categories.PropertyTypes &&
            sections.categories.PropertyTypes.map((t: any) => (
              <Card
                images={t.projects
                  .filter((p: any) => p.project.id)
                  .map((p: any) => ({
                    url: `/${p.project.slug}`,
                    image: p.project.PropertyImages.length > 0 ? p.project.PropertyImages[0].image?.url : p.project.headerImage?.url,
                  }))}
                className="w-2/6 pb-[40px] md:!w-full md:pb-[30px] lg:w-6/12"
                header={t.label}
                content={t.description}
                url={`/${t.propertyTypeName.slug}`}
              />
            ))}
        </div>
      </Section>
      <Section className="relative bg-[#035A9A] pb-[125px] pt-[114px] text-white tablet:pb-[60px] tablet:pt-[60px]">
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 bg-[url('/images/home-featured-bg.png')] bg-cover bg-center mix-blend-soft-light"></div>
        <div className="sheader relative mx-auto max-w-[650px] pb-[54px] text-center text-[20px] leading-[30px] tablet:pb-[30px]">
          <h2 className="pb-[14px]">{featuredProjects.title}</h2>
          <p className="whitespace-pre-wrap">{featuredProjects.description}</p>
        </div>
        <FeaturedSlider projects={featuredProjects.FeaturedProjects ? featuredProjects.FeaturedProjects.filter((p: any) => p.Project.id) : []} />
      </Section>
      <Section fw>
        <Locator projects={projects} search={search} />
      </Section>
      <Section className="relative pb-[135px] pt-[98px] tablet:pb-[60px] tablet:pt-[60px]">
        <div className="sheader flex w-full justify-between pb-[40px] tablet:pb-[30px]">
          <div>
            <h2>{featuredNews?.title}</h2>
            <p className="text-[17px] text-[#1C1C1C]">{featuredNews?.description}</p>
          </div>
          <Button
            href={featuredNews?.callToActionLink ?? "/news"}
            className="group/article-more flex h-[57px] w-full max-w-[161px] items-center justify-center border-[2px] !border-blue-1 bg-transparent !p-0 font-[500] !text-black hover:!bg-blue-1 hover:!text-white md:hidden"
          >
            {featuredNews?.callToActionText}
            <svg className="ml-[14px]" xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path
                d="M0 8L17 8"
                className="stroke-black transition-all duration-[0.3s] ease-in-out group-hover/article-more:stroke-white"
                stroke-width="1.5"
              />
              <path
                d="M11 1L18 8L11 15"
                className="stroke-black duration-[0.3s] ease-in-out group-hover/article-more:stroke-white"
                stroke-width="1.5"
              />
            </svg>
          </Button>
        </div>
        <div className="news-blogs mx-[-12px] mb-[-24px] flex flex-wrap justify-center md:flex-col">
          {featuredNews &&
            featuredNews.FeaturedNews.map((n: any) => (
              <NewsCard
                background={n.Project.coverImage?.url}
                header={n.Project.title}
                content={n.Project.shortDescription}
                date={n.Project.Date}
                slug={n.Project.slug}
              />
            ))}
        </div>
        <div className="mt-[20px] hidden items-center justify-center md:flex">
          <Button
            href="/news"
            className="group/article-more flex h-[57px] w-full max-w-[161px] items-center justify-center border-[2px] !border-blue-1 bg-transparent !p-0 font-[500] !text-black hover:!bg-blue-1 hover:!text-white"
          >
            See More
            <svg className="ml-[14px]" xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path d="M0 8L17 8" className="stroke-black group-hover/article-more:stroke-white" stroke-width="1.5" />
              <path d="M11 1L18 8L11 15" className="stroke-black group-hover/article-more:stroke-white" stroke-width="1.5" />
            </svg>
          </Button>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 z-[-1] h-[1068px] rotate-[180deg] md:hidden"
          style={{
            background: "linear-gradient(180deg, #8FBEEA 0%, #F9FEFF 100%)",
          }}
        ></div>
      </Section>
    </Page>
  );
};

export default App;
