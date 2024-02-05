import React from "react";
import Client from "./_client/clientt";
import qs from "qs";

export const metadata = {
  title: "Projects | Aspire by Filinvest",
  description:
    "Filinvest offers quality horizontal home projects perfect for you and your family. Aspire for your own place, contact us today!",
};

async function getData(searchParams: any) {
  let projectsPhase1 = [];
  if (searchParams.keyword) {
    const query = qs.stringify({
      and: [{
        "where[or][0][title]": { like: searchParams.keyword },
        "where[or][1][location.title]": { like: searchParams.keyword },
        "where[or][2][propertyType.title]": { like: searchParams.keyword },
      }]
    });

    const q = await fetch(
      `${process.env.CMS_URL}/api/aspire-projects?limit=100&${query}`,
      { cache: "no-store" }
    );
    const r = await q.json();

    projectsPhase1 = r.docs;
  }

  const query = qs.stringify({
    where: {
      _status: { equals: "published" },
      ...(projectsPhase1.length > 0
        ? { id: { in: projectsPhase1.map((p: any) => p.id).join(",") } }
        : {}),
      ...(searchParams.location
        ? { location: { equals: searchParams.location } }
        : {}),
      ...(searchParams.propertyType
        ? { propertyType: { equals: searchParams.propertyType } }
        : {}),
      ...(searchParams.province
        ? { location: { equals: searchParams.province } }
        : {}),
      ...(searchParams.city ? { location: { equals: searchParams.city } } : {}),
    },
  });

  const projects = fetch(
    `${process.env.CMS_URL}/api/aspire-projects?limit=4${
      query ? `&${query}` : ""
    }`,
    { cache: "no-store" }
  );
  const featured = fetch(
    `${process.env.CMS_URL}/api/globals/aspire-featured-projects`,
    { cache: "no-store" }
  );
  const search = fetch(
    `${process.env.CMS_URL}/api/globals/aspire-property-search`,
    { cache: "no-store" }
  );
  const req = await Promise.all([projects, featured, search]);

  return {
    projects: (await req[0].json()) as any,
    featured: (await req[1].json()) as any,
    search: (await req[2].json()) as any,
  };
}

const Projects = async ({ searchParams }: any) => {
  const req = await getData(searchParams);
  const projects = req.projects;
  const featured = req.featured;
  const search = req.search;

  return (
    <Client
      projects={projects}
      featured={featured}
      search={search}
      searchParams={searchParams}
    />
  );
};

export default Projects;
