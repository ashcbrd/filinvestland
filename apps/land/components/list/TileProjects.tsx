"use client";
import Link from "next/link";
import React from "react";
import { Project } from "shared-types";
import ProjectCard from "./ProjectCard";
import Pagination from "../pagination/Pagination";
import useGetScreen from "../../hooks/useGetScreen";

type T_TileProjects = {
  className?: string;
  projects: Project[];
  totalPages?: number;
  page: number;
  changePage: Function;
};

const TileProjects = ({
  projects,
  totalPages,
  page,
  changePage,
}: T_TileProjects) => {
  const screen = useGetScreen();

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project, index) => {
          return (
            <Link
              className="group relative flex shadow-[0_3px_60px_rgba(0,0,0,0.10)]"
              key={index}
              href={`/projects/${project.slug}`}
            >
              <ProjectCard key={project.id} project={project} />
            </Link>
          );
        })}
      </div>
      <Pagination
        currentPage={+page}
        setPage={changePage}
        totalPages={totalPages ?? 0}
        size={screen.width <= 425 ? 5 : 10}
      />
    </>
  );
};

export default TileProjects;
