"use client";
import CareersModal from "@/components/modal/CareersModal";
import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import useGetCareers from "./hooks/useGetCareers";
import CareersCallHr from "./CareersCallHr";
import { T_ManatalCareerJob } from "@/types/global";
import Pagination from "@/components/pagination/Pagination";
import MainInput from "@/components/input/MainInput";
import MainDropdown from "@/components/dropdown/MainDropdown";

const Positions = ({ content }: any) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [location, setLocation] = useState<string>("All");
  const [jobFamily, setJobFamily] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] =
    useState<T_ManatalCareerJob | null>(null);
  const [locations, setLocations] = useState([]);
  const [jobFamilies, setJobFamilies] = useState([]);
  const [limit, setLimit] = useState({ isSet: false, value: 0 });

  let {
    data: careersRes,
    isLoading,
    isSuccess,
  } = useGetCareers({
    page,
    searchValue,
    location,
    jobFamily,
  });

  const getAllCareers = async (limit: number) => {
    const res = await fetch(`/api/manatal-careers?limit=${limit}`, {
      cache: "no-store",

      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return await res.json();
  };

  useEffect(() => {
    if (!limit.isSet && isSuccess) {
      setLimit({ isSet: true, value: careersRes?.totalDocs });
    }
  }, [careersRes, isSuccess]);

  useEffect(() => {
    const setDropdownList = async (limit: number) => {
      const { docs } = await getAllCareers(limit);
      setLocations(
        Array.from(new Set(docs.map((doc: any) => doc.location_display)))
      );
      setJobFamilies(
        Array.from(new Set(docs.map((doc: any) => doc.organization_name)))
      );
    };

    setDropdownList(limit.value);
  }, [limit]);

  useEffect(() => {
    setPage(1);
  }, [searchValue, location, jobFamily]);

  const pageSize = 10;

  return (
    <div className="mt-12">
      <div className="border-b border-alice-blue">
        <nav
          className="flex items-center md:justify-center md:-space-x-4 lg:space-x-8"
          aria-label="Tabs"
        >
          <div className="flex w-full flex-col items-center gap-8 bg-dark-cornflower-blue px-10 py-6 md:mx-10 md:w-[70%] lg:mx-16 lg:flex-row">
            <div className="w-full flex-1">
              <h3 className="text-white">Search</h3>
              <MainInput
                placeholder="Write here..."
                onChange={(e: any) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
              />
            </div>
            <div className="w-full flex-1">
              <h3 className="text-white">Location</h3>
              <MainDropdown
                values={["All", ...locations]}
                defaultValue={location ?? "All"}
                onValueChange={setLocation}
                noneEnabled={false}
              />
            </div>
            {/* <div className="w-full flex-1">
              <h3 className="text-white">Job Family</h3>
              <MainDropdown
                values={["All", ...jobFamilies]}
                defaultValue={jobFamily ?? "All"}
                onValueChange={setJobFamily}
                noneEnabled={false}
              />
            </div> */}
            {/* <div className="w-auto flex-none md:w-72 lg:w-auto">
            <button
              onClick={() => {
                handleSearch();
              }}
              className="hover:bg-platinum focus:bg-platinum delay-50 w-full bg-white px-8 py-5 transition"
            >
              <div className="text-dark-cornflower-blue flex items-center gap-2 text-center font-bold">
                <Search /> Search
              </div>
            </button>
          </div> */}
          </div>
        </nav>
      </div>
      <div className="divide-y divide-alice-blue">
        <div className="mx-0 mt-9 lg:mx-32 2xl:mx-56">
          <div className="flex flex-col gap-5">
            {isLoading ? (
              <p className="text-dim-gray">Loading...</p>
            ) : careersRes && careersRes?.docs?.length ? (
              careersRes?.docs?.map(
                (career: T_ManatalCareerJob, index: number) => {
                  return (
                    <Accordion
                      key={index}
                      title={career.position_name}
                      description={career.description}
                      setCareer={() => {}}
                    >
                      <div
                        className="career-content mt-2 pl-10 text-dim-gray"
                        dangerouslySetInnerHTML={{ __html: career.description }}
                      ></div>
                      <button
                        className="mt-8 rounded-full bg-blue-ryb px-8 py-3 text-white"
                        onClick={() => {
                          setIsFormModalOpen(true);
                          setSelectedCareer(career);
                        }}
                      >
                        Apply for this Position Now
                      </button>
                    </Accordion>
                  );
                }
              )
            ) : (
              <p className="text-dim-gray">
                No available position
                {/* {category !== "All" ? ` for ${category}` : ""} */}
              </p>
            )}
            <Pagination
              currentPage={page}
              setPage={setPage}
              totalPages={careersRes?.totalPages}
            />
          </div>
        </div>
        <CareersCallHr content={content} />
      </div>
      {selectedCareer && (
        <CareersModal
          setOpen={setIsFormModalOpen}
          open={isFormModalOpen}
          selectedCareer={selectedCareer}
        />
      )}
    </div>
  );
};

export default Positions;
