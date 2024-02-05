import React from "react";
import ProjectProvider from "@/context/Project";
import { notFound } from "next/navigation";
import Client from "./Client";

const propertyTypes: any = {
  homes: {
    title: "Homes",
    coverImage: "https://filinvest.com/storage/imageable/brand-type/1679091c5a880faf6fb5e6087eb1b2dc/original-4c0d95dad673ca04a20467f4382bb959.jpg",
    content: {
      title: "Prestige by Filinvest | Homes"
    }
  },
  "mid-rise": {
    title: "Mid-Rise Condos",
    coverImage: "https://filinvest.com/storage/imageable/brand-type/8f14e45fceea167a5a36dedd4bea2543/original-2ab2283cc6bfff1c090791e61a4513b0.jpg",
    content: {
      title: "Prestige by Filinvest | Midrise"
    }
  },
  "high-rise": {
    title: "High-Rise Condos",
    coverImage: "https://filinvest.com/storage/imageable/brand-type/c9f0f895fb98ab9159f51fd0297e236d/original-7d76fe34f33c82e8bf3f5025f132ae9e.jpg",
    content: {
      title: "Prestige by Filinvest | Highrise"
    }
  },
}

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

export const generateMetadata = async ({ params }: any) => {
  return propertyTypes[params.propertyType].content
};

const PropertyType = async ({ params }: any) => {

  if (!propertyTypes.hasOwnProperty(params.propertyType)) {
    notFound()
  }
  const req = (await getData()) as any;

  return (
    <ProjectProvider>
      <Client page={propertyTypes[params.propertyType]} req={req} />
    </ProjectProvider>
  );
};

export default PropertyType;
