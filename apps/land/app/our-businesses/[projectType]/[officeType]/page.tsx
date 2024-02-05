import Content from "@/components/pages/our-businesses/Content";
import { decode } from "@/helpers/getProperties";
import { getRequest } from "@/helpers/getRequest";
import { metaBuilder } from "@/helpers/metaBuilder";
import qs from "qs";

async function getPageContent(id: string) {
  const res = await fetch(`${process.env.CMS_URL}/api/pages/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const pagesParams = (projectType: string) => {
  const query = {
    title: {
      like: decodeURIComponent(decode(decodeURIComponent(projectType))),
    },
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query, // ensure that `qs` adds the `where` property, too!
    },
    { addQueryPrefix: true }
  );

  return stringifiedQuery;
};

export async function generateMetadata({ params }: any) {
  const pageInfo = await getRequest(
    `/api/pages${pagesParams(params.officeType)}`
  );
  if (pageInfo.length) {
    const content = await getPageContent(pageInfo[0].id);
    return metaBuilder(content);
  } else {
    const capitalizedTitle =
      params.officeType.charAt(0).toUpperCase() + params.officeType.slice(1);
    return {
      title: capitalizedTitle,
    };
  }
}

const TownscapesPage = async ({ params }: any) => {
  const pageInfo = await getRequest(
    `/api/pages${pagesParams(params.projectType)}`
  );
  const locations = await getRequest(`/api/location-categories?limit=1000`);
  const projectStatus = await getRequest(
    `/api/project-status-categories?limit=1000`
  );
  let content = {
    title: "No Page Content",
  };
  if (pageInfo.length) {
    content = await getPageContent(pageInfo[0]?.id);
  }
  return (
    <Content
      content={content}
      locations={locations}
      projectStatus={projectStatus}
    />
  );
};

export default TownscapesPage;
