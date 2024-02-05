"use client";
import React, { useEffect, useState } from "react";
import ProjectsContent from "./Projects";
import MainHeader from "@/components/header/MainHeader";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import useGetProjects from "@/components/list/hooks/useGetProjects";
import { useParams } from "next/navigation";
import Overview from "./Overview";
import { decode } from "@/helpers/getProperties";

const Content = ({ content, locations, projectStatus }: any) => {
  const [page, setPage] = useState<number>(1);
  const [location, setLocation] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [origin, setOrigin] = useState<any>(null);
  const { projectType } = useParams() as any;
  const header = content?.content?.find(
    (item: any) => item.blockType === "header"
  );
  const breadcrumbs = header?.breadcrumbs.map((tab: any, index: number) => {
    return {
      title: tab.link.label,
      ...(index + 1 < header?.breadcrumbs?.length && { link: tab.link.url }),
    };
  });
  const { data: projects, isLoading } = useGetProjects({
    page,
    project: decodeURIComponent(
      decode(decodeURIComponent(projectType as string))
    ),
    location,
  });

  const officeParksOverview = content?.content?.find(
    (item: any) => item?.officeParks
  );
  const overview = content?.content?.find(
    (item: any) => item?.title && item?.description
  );

  useEffect(() => {
    if (window !== undefined) {
      setOrigin(window?.location.origin);
    }
  }, []);

  return (
    <>
      <MainHeader
        title={content.title}
        breadcrumbs={
          <Breadcrumbs
            items={
              breadcrumbs ?? [
                {
                  title: "Click here to create",
                  link: origin?.includes("beta")
                    ? "https://backoffice.filinvestland.com/admin/collections/pages/create"
                    : "https://dev-cms.stagingurls.com/admin/collections/pages/create",
                },
              ]
            }
          />
        }
        bgUrl={content?.content?.[0].coverImage?.url}
      />
      <section className="mx-9 mt-9 lg:mx-auto lg:max-w-[1024px] xl:max-w-[1200px]">
        <Overview content={officeParksOverview ?? overview} />
        <ProjectsContent
          status={status}
          setStatus={setStatus}
          projectStatus={projectStatus}
          projects={projects?.docs}
          locations={locations}
          isFetching={isLoading}
          totalDocs={projects?.totalDocs}
          page={page}
          setPage={setPage}
          location={location}
          setLocation={setLocation}
        />
      </section>
    </>
  );
};

export default Content;
