import React from "react";
import Client from "../projects/_client/clientt";
import qs from "qs";

export const metadata = {
  title: "Projects | Aspire by Filinvest",
  description:
    "Filinvest offers quality horizontal home projects perfect for you and your family. Aspire for your own place, contact us today!",
};

async function getData(searchParams: any) {
  let ids = [] as any;

  if (searchParams.keyword) {
    const query = qs.stringify({
      "where[or][0][title]": { like: searchParams.keyword },
      "where[or][1][location.title]": { like: searchParams.keyword },
    });

    const q = await fetch(
      `${process.env.CMS_URL}/api/aspire-projects?limit=100&${query}`,
      { cache: "no-store" }
    );
    const r = await q.json();

    ids = r.docs;
  }

  if (searchParams.keyword) {
    ids = ids.filter((p: any) => {
      if (
        ["63c89fc21111c5320a1c76b5", "63c89fc81111c5320a1c76bf"].indexOf(
          p.propertyType.id
        ) > -1
      ) {
        return true;
      }

      return false;
    });
  } else {
    const query = qs.stringify({
      "where[or][0][propertyType]": { equals: "63c89fc21111c5320a1c76b5" },
      "where[or][1][propertyType]": { equals: "63c89fc81111c5320a1c76bf" },
    });

    const q = await fetch(
      `${process.env.CMS_URL}/api/aspire-projects?limit=100&${query}`,
      { cache: "no-store" }
    );
    const r = await q.json();

    ids = r.docs;
  }

  const query = qs.stringify({
    where: {
      _status: { equals: "published" },
      ...(ids.length > 0
        ? { id: { in: ids.map((p: any) => p.id).join(",") } }
        : {}),
      ...(searchParams.location
        ? { location: { equals: searchParams.location } }
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
  const home = fetch(
    `${process.env.CMS_URL}/api/aspire-pages/64d352ad281bd2de8791cca9?locale=en`,
    { cache: "no-store" }
  );
  const req = await Promise.all([projects, featured, search, home]);

  return {
    projects: (await req[0].json()) as any,
    featured: (await req[1].json()) as any,
    search: (await req[2].json()) as any,
    home: (await req[3].json()) as any,
  };
}

const Projects = async ({ searchParams }: any) => {
  const req = await getData(searchParams);
  const projects = req.projects;
  const featured = req.featured;
  const search = req.search;
  const home = req.home;
  const category = home.content[1]?.PropertyTypes?.find(
    (t: any) => t.propertyTypeName.slug === "homes"
  );

  return (
    <Client
      title="Homes"
      projects={projects}
      featured={featured}
      search={search}
      searchParams={searchParams}
      propertyType={["63c89fc21111c5320a1c76b5", "63c89fc81111c5320a1c76bf"]}
      category={category}
    />
  );
};

export default Projects;
