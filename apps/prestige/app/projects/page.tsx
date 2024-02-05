import React from "react";
import Client from "../project/client/Client";
import ProjectProvider from "@/context/Project";

async function getData() {
  const page = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/65300b2f66d28b6d8120c01c`,
    { cache: "no-store" }
  );
  const featured = fetch(
    `${process.env.CMS_URL}/api/globals/prestige-featured-projects`
  );
  const search = fetch(
    `${process.env.CMS_URL}/api/globals/prestige-property-search`
  );
  const investor = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/64d34fc0281bd2de8791c8b4`,
    { cache: "no-store" }
  );

  const req = await Promise.all([page, featured, search, investor]);

  return {
    page: (await req[0].json()) as any,
    featured: (await req[1].json()) as any,
    search: (await req[2].json()) as any,
    investor: (await req[3].json()) as any,
  };
}

const Portfolio = async () => {
  const req = (await getData()) as any;

  return (
    <ProjectProvider>
      <Client req={req} />
    </ProjectProvider>
  );
};

export default Portfolio;
