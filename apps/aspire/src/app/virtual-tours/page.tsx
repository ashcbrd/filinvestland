import React from "react";
import qs from "qs";
import Client from "./_client/client";

export const metadata = {
  title: "Virtual Tours |  Aspire By Filinvest",
  description:
    "View all Virtual Tours of Aspire by Filinvest Properties in the Philippines.",
};

async function getData(searchParams: any) {
  const query = qs.stringify({
    where: {
      _status: { equals: "published" },
      isVirtualTour: { equals: true },
      ...(searchParams.location
        ? { location: { equals: searchParams.location } }
        : {}),
      ...(searchParams.propertyType
        ? { propertyType: { equals: searchParams.propertyType } }
        : {}),
      and: [
        {
          "where[or][0][title]": { like: searchParams.keyword },
          "where[or][1][location.title]": { like: searchParams.keyword },
          "where[or][2][propertyType.title]": { like: searchParams.keyword },
        },
      ],
    },
  });

  const projects = fetch(
    `${process.env.CMS_URL}/api/aspire-projects?limit=4${
      query ? `&${query}` : ""
    }`,
    { cache: "no-store" }
  );
  const search = fetch(
    `${process.env.CMS_URL}/api/globals/aspire-property-search`,
    { cache: "no-store" }
  );
  const req = await Promise.all([projects, search]);

  return {
    projects: (await req[0].json()) as any,
    search: (await req[1].json()) as any,
  };
}

const VirtualTours = async ({ searchParams }: any) => {
  const req = await getData(searchParams);
  const projects = req.projects;
  const search = req.search;

  return <Client projects={projects} search={search} />;
};

export default VirtualTours;
