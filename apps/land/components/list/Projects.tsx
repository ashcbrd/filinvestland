"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Project } from "shared-types";
import Flag from "../svg/Flag";
import Tag from "../svg/Tag";
import { SEARCH_PARAM_MAP } from "@/helpers/constants";
import FadeDown from "../animation/FadeDown";
import { encode } from "@/helpers/getProperties";

type T_Projects = {
  className?: string;
  projects: Project[];
  isLoading?: boolean;
};

const Projects = ({ className, projects, isLoading = false }: T_Projects) => {
  if (isLoading) return <div className="mt-12">...</div>;
  if (projects?.length === 0) return <div className="mt-12">No result</div>;
  return (
    <div
      className={`mt-16 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {projects?.map((project, index) => {
        return (
          <div className="group flex flex-1 flex-col gap-4" key={index}>
            <Link
              href={`/projects/${project.slug}`}
              className="flex flex-1 flex-col gap-4"
            >
              <Image
                src={project?.coverImage?.url || "/filinvest-cover.png"}
                width={project?.coverImage?.width || 507}
                height={project?.coverImage?.height || 407}
                alt={project?.coverImage?.alt || "alt"}
                className="h-[350px] w-[507px] object-cover object-center opacity-100 transition duration-150 group-hover:opacity-70 sm:w-full "
              />
              <FadeDown>
                <h3 className="truncate text-2xl font-bold text-jet">
                  {project.title}
                </h3>
              </FadeDown>
            </Link>
            <div className="flex flex-1 flex-row gap-4">
              <Link
                href={{
                  pathname: "/projects",
                  query: {
                    [SEARCH_PARAM_MAP.projectType]: project?.projectType?.title,
                  },
                }}
                className="flex items-center gap-3 rounded-full border-[1px] border-blue-ryb px-6 py-2 transition delay-75 hover:bg-cultured"
              >
                <Tag className="h-5 w-5 flex-none text-green-500" />
                <p className="text-sm text-jet">
                  {project?.projectType?.title}
                </p>
              </Link>
              <Link
                href={{
                  pathname: "/projects",
                  query: {
                    location: project?.location?.title,
                  },
                }}
                className="flex items-center gap-3 rounded-full bg-blue-ryb px-6 py-2 transition delay-75 hover:bg-blue"
              >
                <Flag color="#ffffff" classes="flex-none w-5 h-5" />
                <p className="text-sm text-white">{project?.location?.title}</p>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
