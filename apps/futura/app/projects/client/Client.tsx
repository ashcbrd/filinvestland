"use client";

import React, { useEffect, useState } from "react";
import Search from "@/app/components/inputs/search";
import HeaderBanner from "@/app/components/carousel/headbanner";
import ProjectCard from "@/app/components/home/projectcard";
import qs from "qs";
import Request from "@/config/Request";
import { getters, setters } from "@/app/context/Project";
import PropertyBanner from "@/app/components/properties/banner";

function Client({ req, searchParams, typeID, propertyType, title }: any) {
  const [page, setPage] = useState(1);
  const [searchQ, setSearchQ] = useState<string>("");
  const [limit, setLimit] = useState<number>(6);
  const [paginate, setPaginate] = useState<any>({});
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
    set.setFilters((fs: any) => ({
      ...fs,
      ...(typeID ? { type: typeID } : {}),
    }));
  }, []);

  const loadProperties = async () => {
    let queries = {
      _status: { equals: "published" },
    } as any;

    if (searchParams.keyword) {
      queries = {
        ...queries,
        and: [{
          "where[or][0][title]": { like: searchParams.keyword },
          "where[or][1][location.title]": { like: searchParams.keyword },
          "where[or][2][propertyType.title]": { like: searchParams.keyword },
        }]
      };
    }

    if (searchParams.propertyType) {
      queries = {
        ...queries,
        "propertyType.title": { equals: searchParams.propertyType },
      };
    }

    if (searchParams.location) {
      queries = {
        ...queries,
        "location.title": { equals: searchParams.location },
      };
    }

    if (searchParams.price) {
      queries = {
        ...queries,
        minPrice: { less_than_equal: searchParams.price },
      };
    }

    if (searchParams.province) {
      queries = {
        ...queries,
        location: { equals: searchParams.province },
      };
    }

    if (searchParams.city) {
      queries = {
        ...queries,
        location: { equals: searchParams.city },
      };
    }

    const query = qs.stringify({
      where: {
        ...queries,
      },
      sort: "title",
    });

    Request()
      .get(`${process.env.NEXT_PUBLIC_CMS_URL}/api/futura-projects?limit=${limit}&${query}`)
      .then((response: any) => {
        set.setProjects((ps: any) => ({
          ...ps,
          list: response.data.docs,
          hasNextPage: response.data.hasNextPage,
        }));
        setPaginate({
          limit: response.data.limit,
          showMore: response.data?.docs.length === response.data.totalDocs,
        });
      })
      .finally(() => {
        set.setProjects((ps: any) => ({
          ...ps,
          loader: false,
        }));
      });
  };

  const handleShowMore = () => {
    setPage((page) => page + 1);
    setLimit((value) => value + 6);
  };

  useEffect(() => {
    set.setProjects((ps: any) => ({
      ...ps,
      loader: true,
    }));
    loadProperties();
  }, [limit, searchQ, page, searchParams]);

  return (
    <>
      {projects.list && projects.list.length === 0 && (
        <div className="mx-auto mt-[45px] w-full px-4">
          <div className="flex flex-wrap">
            <div className="w-full px-4 xl:mb-0">
              <div className="relative mb-6 flex w-full min-w-0 flex-col break-words">
                <Search data={property_search} projects={projects} typeID={typeID} />
              </div>
            </div>
          </div>
        </div>
      )}
      {projects.loader ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <h1 className="text-lg text-gray-500 md:text-2xl">Loading...</h1>
        </div>
      ) : (
        <>
          {projects?.list?.length > 0 ? (
            <>
              <section className="px-4 md:px-0">
                <PropertyBanner featured={projects?.list} />
              </section>
              <div className="bg-[#FFF8F8] pb-[35px]">
                <div className="-m-16 mx-auto w-full px-4 md:px-10">
                  <div className="flex flex-wrap">
                    <div className="mb-12 w-full px-4 xl:mb-0">
                      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words">
                        <Search data={property_search} projects={projects} typeID={typeID} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`w-full pt-[92px] ${title ? "!pt-[85px]" : ""}`}>
                  {title && (
                    <div className="pb-[57px] text-center text-[18px] font-[600]">
                      <h2 className="pb-[8px] text-[35px] font-[700] tracking-[-0.7px]">{title}</h2>
                      <p>Home / Properties / {title}</p>
                    </div>
                  )}
                  <section className="container mx-auto">
                    {projects.list.length > 0 && (
                      <section className="relative container">
                        <p className="mx-[70px] py-0 px-[20px] sm:px-0 sm:mx-0 md: mx-[25px]">
                          Showing {projects.list.length ?? "0"} of {req.allprojects.totalDocs ?? "0"} Projects
                        </p>
                      </section>
                    )}
                    <ProjectCard data={projects} motionSettings={motionSettings} slider={false} className={"!mt-0"} />
                  </section>
                </div>
                {!paginate?.showMore && (
                  <div className="relative z-[2] -mt-24 mb-10 pt-[80px] text-center sm:md:pt-[30px] md:pt-[50px]">
                    <button
                      disabled={get.projects?.loader}
                      onClick={handleShowMore}
                      className="mx-auto flex h-[69px] w-full max-w-[195px] items-center justify-center rounded-[100px] bg-[#E02926] !p-0 px-6 py-6 text-[17px] text-white sm:h-[50px] sm:max-w-[150px]"
                    >
                      See More
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex min-h-[60vh] items-center justify-center">
              <h1 className="text-lg text-gray-500 md:text-2xl">{projects.list ? "0 properties found" : "Loading..."}</h1>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Client;
