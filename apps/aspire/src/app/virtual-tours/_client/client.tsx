"use client";

import React, { useEffect, useState } from "react";
import Section from "@/components/Section/Section";
import Card from "@/components/Projects/Card/Card";
import Button from "@/components/Button/Button";
import ProjectFilter from "@/components/Projects/Filter/Filter";
import Page from "@/components/Page/Page";
import Request from "@/config/API";
import qs from "qs";
import { getters, setters } from "@/context/Projects";
import { Skeleton } from "@mui/material";

const Client = ({ projects, search }: any) => {
  const [page, setPage] = useState(1);
  const [isSticky, setIsStick] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const get = getters();
  const set = setters();

  const totalProjectDocs = projects?.totalDocs;

  useEffect(() => {
    set.setProjects((ps: any) => ({
      ...ps,
      list: projects.docs,
      loader: false,
      hasNextPage: projects.hasNextPage,
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
      .get(`${process.env.CMS_URL}/api/aspire-projects?limit=4&page=${page + 1}&${query}`)
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
        setHideHeader(true);
      } else {
        setIsStick(false);
        setHideHeader(false);
      }
    });
  }, []);

  return (
    <Page id="virtual-tours" disableHeader={hideHeader}>
      <Section
        id="banner"
        className="virtual-tour-banner relative flex h-[568px] items-center justify-center pt-[50px] text-center"
        style={{
          background: `url('/images/calculate-now.jpg')`,
          backgroundRepeat: `no-repeat`,
          backgroundPosition: `center`,
          backgroundSize: `cover`,
        }}
      >
        <div className="relative z-10 text-white">
          <h1 className="pb-[8px] text-[50px] font-[500] leading-[75px] text-white md:text-[38px] md:leading-[1.2]">Take a Virtual Tour</h1>
          <p className="text-[17px] leading-none">Experience our homes from the comfort of yours.</p>
        </div>
      </Section>
      <Section id="properties" className="bg-candy-blue pb-[146px] md:pb-[3px]">
        <ProjectFilter search={search} isSticky={isSticky} isVirtual={true} />
        {!get.filters.keyword && (
          <p className="pb-0 pt-[50px] sm:pt-[20px]">
            Showing {get!.projects.list.length} of {totalProjectDocs} Virtual Tours
          </p>
        )}

        <div className="mx-[-43px] flex flex-wrap justify-between pt-[100px] sm:pt-[50px] md:mx-[0px]">
          {!get.projects?.loader && get.projects?.list?.length === 0 && (
            <div className="relative w-full px-[43px] text-center text-[20px]">
              <p>
                No projects found in this selection. You can visit our{" "}
                <a href="/virtual-tours" className="border-b-[2px] border-b-aqua-blue text-aqua-blue">
                  list
                </a>{" "}
                for our recommendations.
              </p>
            </div>
          )}
          {!get.projects?.loader &&
            get.projects?.list &&
            get.projects?.list.map((p: any) => (
              <div className="w-3/6 px-[43px] md:w-full md:px-[0px]">
                <Card
                  key={`v_${p.id}`}
                  project={p}
                  type="virtual-tour"
                  onOpenVirtual={() => {
                    setIsStick(false);
                    setHideHeader(true);
                  }}
                  onCloseVirtual={() => setHideHeader(false)}
                />
              </div>
            ))}
          {get.projects?.loader && (
            <>
              <div className="w-3/6 px-[43px] md:w-full md:px-[0px]">
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
              <div className="w-3/6 px-[43px] md:w-full md:px-[0px]">
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
        {!get.projects?.loader && get.projects?.hasNextPage && (
          <div className="pt-[80px] text-center sm:pt-[30px]">
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
