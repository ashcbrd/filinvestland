"use client";
import React, { useEffect, useRef } from "react";
import Carousels from "@/app/components/carousel/portfolio";
import Search from "@/app/components/inputs/search";
import Banner from "@/app/components/carousel/banner";
import { Typography } from "@/app/components/typography/typography";
import { InvestorsConcerge } from "@/app/components/general/investorsconcerge";

const Client = ({ page, req }: any) => {
  const featured = req.featured;
  const search = req.search;
  const investor = {
    page: req.investor.content,
  };
  const sliderRef = useRef<any>(null);

  const handleSlickGoTo = () => {
    sliderRef.current.slickGoTo(0);
  };

  return (
    <>
      <Banner
        opacity="bg-[#130A01]/80"
        title={page?.title}
        imageUrl={page?.coverImage}
      />
      <section className="z-1 min-h-fit w-full space-y-20 bg-[#F4EBD0] px-0 sm:px-8 sm:pb-20 md:px-12 md:pb-[100px]">
        <div className="mx-auto h-auto w-full max-w-[1650px] space-y-20">
          <div className="relative mx-auto -mt-16 max-w-[1280px] px-8 sm:px-0">
            <Search handleSlickGoTo={handleSlickGoTo} data={search} />
          </div>
          <div className="space-y-12">
            <Typography
              color="dark"
              font="cormorant"
              text={page?.title}
              className="text-center !text-[35px] font-medium xs:!text-[40px] sm:!text-[40px] lg:!text-[55px]"
            />
            <Carousels
              sliderRef={sliderRef}
              featured={featured.FeaturedProjects}
            />
          </div>
        </div>
      </section>
      <InvestorsConcerge data={investor} />
    </>
  );
};

export default Client;
