import React from "react";
import qs from "qs";
import Client from "./client/Client";

async function getData(searchParams: any) {
  const query = qs.stringify({
    where: {
      _status: { equals: "published" },
      isVirtualTour: { equals: true },
      ...(searchParams.keyword
        ? { title: { like: searchParams.keyword } }
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
      ...(searchParams.city
        ? { subLocationTwo: { equals: searchParams.city } }
        : {}),
    },
  });

  const projects = fetch(
    `${process.env.CMS_URL}/api/globals/futura-featured-projects`
  );
  const page = fetch(
    `${process.env.CMS_URL}/api/futura-pages/654c8980386037465bbbea82`,
    { cache: "no-store" }
  );
  const property_search = fetch(
    `${process.env.CMS_URL}/api/globals/futura-property-search`
  );
  const allprojects = fetch(
    `${process.env.CMS_URL}/api/futura-projects?limit=6${
      query ? `&${query}` : ""
    }`
  );
  const req = await Promise.all([projects, page, property_search, allprojects]);

  return {
    projects: (await req[0].json()) as any,
    page: (await req[1].json()) as any,
    property_search: (await req[2].json()) as any,
    allprojects: (await req[3].json()) as any,
  };
}

async function Virtual({ searchParams }: any) {
  const req = (await getData(searchParams)) as any;
  return <Client req={req} searchParams={searchParams} />;
}

export default Virtual;
