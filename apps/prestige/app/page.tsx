"use server";
import React from "react";
import Carousels from "@/app/components/carousel/carousels";
import HeaderBanner from "@/app/components/carousel/headerbanner";
import Link from "next/link";
import HomeHero from "./components/carousel/homehero";
import cn from "classnames";
import Button from "./components/general/button";
import { Typography } from "./components/typography/typography";
import { InvestorsConcerge } from "./components/general/investorsconcerge";

async function getData() {
  const page = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/64d34fc0281bd2de8791c8b4`,
    { cache: "no-store" }
  );

  const featured = fetch(
    `${process.env.CMS_URL}/api/globals/prestige-featured-projects`
  );
  const req = await Promise.all([page, featured]);

  return {
    page: (await req[0].json()) as any,
    featured: (await req[1].json()) as any,
  };
}

async function Home() {
  const req = (await getData()) as any;
  const sections = {
    slug: req.page.slug,
    page: req.page.content,
  };
  const featured = req.featured;

  return (
    <>
      <HeaderBanner data={sections?.page?.[0]}>
        <div className="absolute inset-0 left-0 top-0 z-[1] flex items-center justify-center px-8 pt-[100px] lg:px-12">
          <div className="relative mx-auto flex h-full w-full max-w-[855px] flex-col items-center justify-center">
            <Typography
              text={sections?.page?.[0]?.title}
              color="light"
              font="brittany"
              size="heading"
              className="text-center leading-[unset]"
            />
            <div className="ml-10 mt-6 lg:ml-16 lg:mt-9">
              <svg
                width="228"
                height="6"
                viewBox="0 0 230 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[140px] lg:w-[228px]"
              >
                <path
                  d="M0.823242 5.36426V1.55919C112.473 -1.46195 198.906 2.76305 228.928 5.30668C229.166 5.32555 229.39 5.34474 229.602 5.36426C229.381 5.34516 229.156 5.32597 228.928 5.30668C206.381 3.51381 67.9191 4.5919 0.823242 5.36426Z"
                  fill="#F4EBD0"
                />
              </svg>
            </div>
            <Typography
              text={String(sections?.page?.[0]?.subTitle)}
              color="light"
              size="20"
              font="nunito"
              className="mt-8 whitespace-pre-wrap text-center font-light leading-[25px] tracking-wide lg:mt-6 lg:!leading-[35px]"
            />
            <Link href={sections?.page?.[0]?.callToActionLink ?? "/projects"}>
              <Button
                label={
                  sections?.page?.[0]?.callToActionText ?? "Explore Prestige"
                }
                className="mb-20 mt-16"
              />
            </Link>
          </div>
        </div>
      </HeaderBanner>
      <HomeHero data={sections?.page?.[1]?.prestigeHomeProperties} />

      <section className="min-h-fit w-full space-y-10 bg-[#F4EBD0] px-0 py-16 sm:px-8 sm:py-20 md:px-12 md:py-[100px]">
        <article className="mx-auto grid h-auto w-full max-w-[1650px] grid-cols-1 items-center gap-8 px-8 text-center sm:px-0 lg:text-left xl:grid-cols-2 2xl:grid-cols-[1fr,_600px] 2xl:gap-44">
          <div className="flex items-center">
            <div className="space-y-4">
              <Typography
                text={sections.page[2].headerLeftSection.title}
                color="dark"
                font="cormorant"
                size="heading2"
                className="font-medium leading-none"
              />
              <Typography
                text={sections.page[2].headerLeftSection.description}
                color="dark"
                size="20"
                font="nunito"
                className="sentence-line-height whitespace-pre-wrap"
              />
            </div>
          </div>

          <div className="space-y-2 border-4 border-[#995816] p-8">
            <Typography
              text={sections.page[2].headerRightSection.context1}
              color="dark"
              font="cormorant"
              size="26"
              className="!text-[26px] font-bold"
            />
            <Typography
              text={sections.page[2].headerRightSection.context2}
              color="dark"
              font="nunito"
              size="18"
              className="whitespace-pre-wrap"
            />
            <div className="!mt-6">
              <Link
                href={`#${sections.page[3].id}`}
                className="block min-[376px]:inline-flex"
              >
                <Button
                  className="max-[375px]:w-full max-[375px]:!p-0"
                  label={sections.page[2].headerRightSection.callToActionText}
                />
              </Link>
            </div>
          </div>
        </article>

        <article className="mx-auto h-auto w-full max-w-[1650px]">
          <Carousels slug={sections.slug} data={featured.FeaturedProjects} />
        </article>
      </section>

      <InvestorsConcerge data={sections} />
    </>
  );
}

export default Home;
