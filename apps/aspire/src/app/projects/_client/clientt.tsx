"use client";

import React, { useEffect, useState } from "react";
import Section from "@/components/Section/Section";
import Card from "@/components/Projects/Card/Card";
import Button from "@/components/Button/Button";
import Slider from "@/components/Slider/Slider";
import ProjectFilter from "@/components/Projects/Filter/Filter";
import Request from "@/config/API";
import { getters, setters } from "@/context/Projects";
import { Skeleton } from "@mui/material";
import Page from "@/components/Page/Page";
import qs from "qs";
// import Masonry from '@mui/lab/Masonry';

const Client = ({
  featured,
  search,
  projects,
  title,
  searchParams,
  propertyType,
  category,
}: {
  featured: any;
  search: any;
  projects: any;
  title?: any;
  searchParams?: any;
  propertyType?: any;
  category?: any;
}) => {
  const [page, setPage] = useState(1);
  const get = getters();
  const set = setters();
  const [isSticky, setIsStick] = useState(false);

  useEffect(() => {
    set.setProjects((ps: any) => ({
      ...ps,
      list: projects.docs,
      loader: false,
      hasNextPage: projects.hasNextPage,
    }));
  }, []);

  const onMore = async () => {
    let ids = [] as any;

    if (get.filters.keyword) {
      const query = qs.stringify({
        "where[or][0][title]": { like: get.filters.keyword },
        "where[or][1][location.title]": { like: get.filters.keyword },
      });

      const q = await Request().get(
        `${process.env.CMS_URL}/api/aspire-projects?limit=100&${query}`
      );

      ids = q.data.docs;
    }

    if (!get.filters.type) {
      if (propertyType && propertyType.length > 1) {
        if (get.filters.keyword) {
          ids = ids.filter((p: any) => {
            if (propertyType.indexOf(p.propertyType.id) > -1) {
              return true;
            }

            return false;
          });
        } else {
          let ts = {};

          for (const [i, t] of propertyType.entries()) {
            ts = { ...ts, [`where[or][${i}][propertyType]`]: { equals: t } };
          }

          const typequery = qs.stringify({
            ...ts,
            ...(ids.length > 0
              ? {
                  [`where[or][${propertyType.length - 1}][and][1][id]`]: {
                    in: ids.map((p: any) => p.id).join(","),
                  },
                }
              : {}),
          });

          const q = await Request().get(
            `/aspire-projects?limit=${
              ids.length > 0 ? ids.length : 100
            }&${typequery}`
          );

          ids = q.data.docs;
        }
      }
    }

    let queries = {
      _status: { equals: "published" },
    } as any;

    if (get.filters.location) {
      queries = {
        ...queries,
        location: { equals: get.filters.location.value },
      };
    }

    if (get.filters.type) {
      queries = {
        ...queries,
        propertyType: { equals: get.filters.type.value },
      };
    }

    if (!get.filters.type) {
      const properties = ids.filter(
        (p: any) => projects.docs.filter((x: any) => x.id === p.id).length === 0
      );

      if (propertyType && propertyType.length > 1) {
        if (properties.length > 0) {
          queries = {
            ...queries,
            id: { in: properties.map((p: any) => p.id).join(",") },
          };
        }
      } else if (propertyType && propertyType.length > 0) {
        queries = {
          ...queries,
          propertyType: { equals: propertyType[0] },
        };
      } else if (!propertyType) {
        if (properties.length > 0) {
          queries = {
            ...queries,
            id: { in: properties.map((p: any) => p.id).join(",") },
          };
        }
      }
    }

    if (get.filters.price) {
      queries = {
        ...queries,
        minPrice: { less_than_equal: get.filters.price },
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
    });

    Request()
      .get(
        `${process.env.CMS_URL}/api/aspire-projects?limit=4&page=${
          page + 1
        }&${query}`
      )
      .then((response: any) => {
        setPage(page + 1);

        set.setProjects((ps: any) => ({
          ...ps,
          list: [...ps.list, ...response.data.docs],
          hasNextPage: response.data.hasNextPage,
        }));
      });
  };
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 756) {
        setIsStick(true);
      } else {
        setIsStick(false);
      }
    });
  }, []);

  return (
    <Page id="projects" disableHeader={isSticky}>
      <Section id="featured" fw>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 h-[1093px] bg-sky"></div>
        <Slider
          autoScroll
          slideType="featured-banner"
          slides={
            category
              ? category.projects
              : featured.FeaturedProjects.map((p: any) => ({
                  project: p.Project,
                }))
          }
          prevArrowClassName="md:!bottom-[50px] md:!top-auto md:!right-[70px] md:right-auto"
          nextArrowClassName="md:!bottom-[50px] md:!top-auto md:!right-[20px] md:!mr-[-80px] md:left-auto"
        />
      </Section>
      <Section id="properties" className="bg-candy-blue pb-[146px] md:pb-[3px]">
        <ProjectFilter search={search} isSticky={isSticky} propertyType={propertyType} />
        {get.filters.keyword === "" && (
          <p className="relative pb-0 pt-[50px] sm:pb-0 sm:pt-[25px]">
            Showing {get.projects!.list.length} of {get.projects!.list.length >= projects!.totalDocs ? get.projects.list.length : projects!.totalDocs}{" "}
            Projects
          </p>
        )}

        {title && (
          <div className="relative pt-[80px] text-center text-[17px] sm:pt-[50px]">
            <div>
              <h3 className="pb-[5px] leading-[52px] text-black">{title ? title : "Homes"}</h3>
              <p className="text-charcoal">Explore our {category?.description?.toLowerCase()}.</p>
            </div>
          </div>
        )}
        {(!get.projects.loader && get.projects.count.length === 0) ||
          (get.filters.keyword && get.filters.noResult && get.filteredProjects.list.length === 0 && get.projects.list.length === 0 && (
            <div className="relative w-full px-[43px] pt-12 text-center text-[20px]">
              <p>
                No projects found in this selection. You can visit our{" "}
                <a href="/projects" className="border-b-[2px] border-b-aqua-blue text-aqua-blue">
                  list
                </a>{" "}
                for our recommendations.
              </p>
            </div>
          ))}
        <div className="mx-[-43px] flex flex-wrap justify-between pt-[70px] sm:pt-[50px]">
          {!get.projects.loader && get.projects.list.length > 0 && (
            <>
              {get.projects.list.map((p: any) => (
                <div className="w-3/6 px-[43px] md:w-full">
                  <Card project={p} />
                </div>
              ))}
            </>
          )}
          {get.projects.list.length < 1 && (
            <div className="relative w-full px-[43px] pt-12 text-center text-[20px]">
              <p>No property found</p>
            </div>
          )}
          {get.projects.loader && (
            <>
              <div className="mb-[57px] w-3/6 px-[43px]">
                <div className="relative">
                  <div className="relative">
                    <Skeleton variant="rectangular" width="100%" height={405} />
                  </div>
                </div>
                <div className="bg-white">
                  <div className="relative border-b border-b-custom-gray-1 pb-[24px] pl-[28px] pt-[19px] last:border-b-0">
                    <Skeleton variant="rectangular" height={35} width={150} className="mb-[10px]" />
                    <Skeleton variant="rectangular" height={20} width={80} />
                  </div>
                </div>
              </div>
              <div className="mb-[57px] w-3/6 px-[43px]">
                <div className="relative">
                  <div className="relative">
                    <Skeleton variant="rectangular" width="100%" height={405} />
                  </div>
                </div>
                <div className="bg-white">
                  <div className="relative border-b border-b-custom-gray-1 pb-[24px] pl-[28px] pt-[19px] last:border-b-0">
                    <Skeleton variant="rectangular" height={35} width={150} className="mb-[10px]" />
                    <Skeleton variant="rectangular" height={20} width={80} />
                  </div>
                </div>
              </div>
              <div className="mb-[57px] w-3/6 px-[43px]">
                <div className="relative">
                  <div className="relative">
                    <Skeleton variant="rectangular" width="100%" height={405} />
                  </div>
                </div>
                <div className="bg-white">
                  <div className="relative border-b border-b-custom-gray-1 pb-[24px] pl-[28px] pt-[19px] last:border-b-0">
                    <Skeleton variant="rectangular" height={35} width={150} className="mb-[10px]" />
                    <Skeleton variant="rectangular" height={20} width={80} />
                  </div>
                </div>
              </div>
              <div className="mb-[57px] w-3/6 px-[43px]">
                <div className="relative">
                  <div className="relative">
                    <Skeleton variant="rectangular" width="100%" height={405} />
                  </div>
                </div>
                <div className="bg-white">
                  <div className="relative border-b border-b-custom-gray-1 pb-[24px] pl-[28px] pt-[19px] last:border-b-0">
                    <Skeleton variant="rectangular" height={35} width={150} className="mb-[10px]" />
                    <Skeleton variant="rectangular" height={20} width={80} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {!get.projects.loader && get.projects.hasNextPage && (
          <div className="pt-[80px] text-center md:pt-[50px] sm:md:pt-[30px]">
            <Button
              onClick={onMore}
              className="mx-auto flex h-[69px] w-full max-w-[195px] items-center justify-center !p-0 text-[17px] sm:h-[50px] sm:max-w-[150px]"
            >
              See More
            </Button>
          </div>
        )}
      </Section>
    </Page>
  );
};

export default Client;
