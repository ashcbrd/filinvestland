"use client";
import React, { useEffect, useState } from "react";
import SelectLocation from "@/components/select/SelectLocation";
import Projects from "@/components/list/Projects";
import { LocationCategory, Project } from "shared-types";
import useGetProjectsByLocation from "@/components/list/hooks/useGetProjectsByLocation";
import Pagination from "@/components/pagination/Pagination";
import { useParams, usePathname } from "next/navigation";
import { decode } from "@/helpers/getProperties";
import SelectStatus from "@/components/select/SelectStatus";

const ProjectsContent = ({
  projects,
  locations,
  isFetching,
  totalDocs,
  page,
  setPage,
  location,
  setLocation,
  projectStatus,
  status,
  setStatus,
}: {
  projects: Project[];
  locations: LocationCategory[];
  isFetching: boolean;
  totalDocs: number;
  page: number;
  setPage: Function;
  location: string;
  setLocation: any;
  projectStatus: any[];
  status: string;
  setStatus: any;
}) => {
  const { projectType } = useParams() as any;
  const locationList = locations.map((item: any) => item.title).sort();
  const statusList = projectStatus.map((item: any) => item.title).sort();

  return (
    <>
      <div>
        <div className="mb-24 mt-16">
          <div className="flex flex-col items-center gap-7 md:flex-row">
            <div className="flex-1">
              {!isFetching ? (
                <h3 className="text-2xl text-jet">
                  {totalDocs}{" "}
                  {decodeURIComponent(
                    decode(decodeURIComponent(projectType as string))
                  )}{" "}
                  found
                </h3>
              ) : (
                <h3 className="text-2xl text-jet">Loading...</h3>
              )}
            </div>
            <div className="flex flex-none flex-col items-center gap-4 sm:flex-row sm:gap-8">
              <h3 className="text-xl text-jet">Filter by</h3>
              {projectType === "offices" && (
                <SelectStatus
                  status={statusList}
                  currentStatus={status}
                  setCurrentStatus={setStatus}
                  setPage={setPage}
                />
              )}
              <SelectLocation
                locations={locationList}
                currentLocation={location}
                setCurrentLocation={setLocation}
                setPage={setPage}
              />
            </div>
          </div>
          <Projects projects={projects} isLoading={false} />
          <Pagination
            currentPage={page}
            setPage={setPage}
            // totalPages={totalDocs}
            totalPages={projects ? Math.ceil(totalDocs / 12) : 0}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectsContent;
