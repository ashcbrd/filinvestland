"use client";

import Banner from "@/app/components/carousel/banner";
import React, { useEffect, useState } from "react";
import Search from "@/app/components/inputs/search";
import HeaderBanner from "@/app/components/carousel/headbanner";
import ProjectCard from "@/app/components/home/projectcard";
import qs from "qs";
import Request from "@/config/Request";
import { getters, setters } from "@/app/context/Project";
import VirtualTour from "@/app/components/virtual-tour/VirtualTour";

function Client({ req, searchParams }: any) {
  const [page, setPage] = useState(1);
  const property_search = req.property_search;
  const motionSettings = {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 10 },
    transition: { duration: 0.5 },
    viewport: { once: true },
  };

  const set = setters();
  const get = getters();
  const projects = get.projects;

  useEffect(() => {
    set.setProjects((ps: any) => ({
      ...ps,
      list: req.allprojects.docs,
      loader: false,
      hasNextPage: req.allprojects.hasNextPage,
    }));
  }, []);

  const onMore = () => {
    const query = qs.stringify({
      where: {
        _status: { equals: "published" },
        isVirtualTour: { equals: true },
      },
    });

    Request()
      .get(`${process.env.NEXT_PUBLIC_CMS_URL}/api/futura-projects?limit=6&page=${page + 1}&${query}`)
      .then((response: any) => {
        setPage(page + 1);

        set.setProjects((ps: any) => ({
          ...ps,
          list: [...ps.list, ...response.data.docs],
          hasNextPage: response.data.hasNextPage,
        }));
      });
  };

  return (
    <>
      <section className="w-screen h-[400px] mt-20 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-[26px] md:text-[35px] font-[700]">Virtual Tour</h1>
        </div>
      </section>
      <div className="bg-[#FFF8F8]">
        <div className="px-4 md:px-10 mx-auto w-full -m-16">
          <div className="flex flex-wrap">
            <div className="w-full mb-12 xl:mb-0 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 mt-20 md:mt-0">
                <Search data={property_search} projects={projects} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-10 md:mt-36 ">
          {projects?.list?.length && (
            <section className="container">
              <p className="mx-[70px] py-0 px-[20px] sm:px-0  sm:mx-0 md: mx-[25px]">
                Showing {projects?.list?.length ?? "0"} of {req.allprojects.totalDocs ?? "0"} Virtual Tours
              </p>
            </section>
          )}
          <section className="container mx-auto py-8 mb-14">
            <ProjectCard data={projects} motionSettings={motionSettings} slider={false} />
          </section>
        </div>
        {page > 1 && (
          <div className="pt-[80px] text-center md:pt-[50px] mb-10 sm:md:pt-[30px]">
            <button
              onClick={onMore}
              className="mx-auto flex h-[69px] w-full max-w-[195px] bg-[#E02926] text-white px-6 py-6 rounded-[100px] items-center justify-center !p-0 text-[17px] sm:max-w-[150px] sm:h-[50px]"
            >
              See More
            </button>
          </div>
        )}
      </div>
      <VirtualTour />
    </>
  );
}

export default Client;
