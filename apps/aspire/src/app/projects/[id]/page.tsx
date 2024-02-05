import React from "react";
import qs from "qs";
import Client from "./_client/clientt";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: any) => {
  const query = qs.stringify(
    {
      where: { slug: { equals: params.id } },
    },
    {
      addQueryPrefix: true,
    }
  );

  const project = await fetch(
    `${process.env.CMS_URL}/api/aspire-projects/${query}`,
    { cache: "no-store" }
  );
  const projectData = await project.json();

  if (!projectData.docs.length) notFound();

  return {
    title:
      projectData.docs && projectData.docs.length > 0
        ? `${projectData.docs[0].title} | Aspire by Filinvest`
        : "Aspire by Filinvest",
    description:
      "Filinvest offers quality horizontal home projects perfect for you and your family. Aspire for your own place, contact us today!",
  };
};

async function getData(id: any) {
  const query = qs.stringify(
    {
      where: { slug: { equals: id } },
    },
    {
      addQueryPrefix: true,
    }
  );
  const projectQuery = await fetch(
    `${process.env.CMS_URL}/api/aspire-projects/${query}`,
    { cache: "no-store" }
  );
  const project = await projectQuery.json();

  return {
    content: project,
  };
}

const Project = async ({ params }: any) => {
  const req = await getData(params.id);
  const content = req.content.docs[0];

  if (!content) return null;
  return <Client req={req} />;
};

export default Project;
