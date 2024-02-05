import React from "react";
import { OurHeritage } from "./sections/ourheritage";
import { GoBeyond } from "./sections/gobeyond";
import { ProjectAwards } from "./sections/awards";
import { InvestorsConcerge } from "../components/general/investorsconcerge";
import { Parallax } from "./sections/parallax";
import HeaderBanner from "../components/carousel/headerbanner";

async function getData() {
  const page = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/64d37a22e15ef603dbc05d84`,
    { cache: "no-store" }
  );
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

async function Heritage() {
  const req = (await getData()) as any;
  const investor = {
    page: req.investor.content,
  };
  const page = {
    banner: req.page?.content[0]?.mediaBackground,
    ourheritage: req.page?.content[0]?.firstSection,
    gobeyond: req.page?.content[0]?.secondSection,
    awards: req.page?.content[0]?.Awards,
  };

  return (
    <>
      <HeaderBanner data={page.banner} />
      <OurHeritage data={page.ourheritage} />
      {/* NOTE: image in Parallax is static since there's no data in CMS */}
      <Parallax imageUrl={req.page.content[0].parallaxCover.url} />
      <GoBeyond data={page.gobeyond} />
      <ProjectAwards data={page.awards} />
      <InvestorsConcerge data={investor} />
    </>
  );
}

export default Heritage;
