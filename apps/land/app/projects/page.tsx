import MainHeader from "@/components/header/MainHeader";
import useGetProjects from "@/components/list/hooks/useGetProjects";
import Content from "@/components/pages/property-search/Content";
import {
  checkValidSearchURL,
  formatSearchParams,
  getParams,
  getProperties,
} from "@/helpers/getProperties";
import { getRequest, getHeaderCover } from "@/helpers/getRequest";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Projects",
  description: "Projects",
};

const ProjectPage = async ({ props }: any) => {
  const params = formatSearchParams(
    getParams({
      propertyType: "",
      location: "",
      filters: props?.params.filters,
    })
  );
  // const projects = await getProperties({...params, page: props?.searchParams.page}, { returnMeta:true });
  // console.log('projects', projects)
  const header = await getHeaderCover(`/api/pages/65353fbcea87a3d27d00dc60`);

  return (
    <>
      <MainHeader
        header={header.content[0]}
        title="Property Search"
        bgUrl={header?.content[0]?.coverImage?.url}
      />
      <Content />
    </>
  );
};

export default ProjectPage;
