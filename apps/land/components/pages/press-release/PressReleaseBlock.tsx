"use client";
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Search from "@/components/svg/Search";
import MainDropdown from "@/components/dropdown/MainDropdown";
import Download from "@/components/svg/Download";
import DownloadLink from "@/components/button/DownloadLink";
import Pdf from "@/components/svg/Pdf";
import Link from "next/link";
import moment from "moment";
import Pagination from "./Pagination";
import Fade from "@/components/animation/Fade";
import MainInput from "@/components/input/MainInput";
import generateYearsArray from "@/helpers/yearsGenerator";
import useGetPressReleases from "@/components/list/hooks/useGetPressReleases";

export default function DisclosuresBlock({ content }: any) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [yearFilter, setYearFilter] = useState("All");
  const [rowData, setRowData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [orderBy, setOrderBy] = useState("Descending");

  const { data, isFetching, refetch } = useGetPressReleases({
    limit,
    page,
    search: searchValue,
    years: yearFilter === "All" ? "" : yearFilter,
    sort: orderBy === "Ascending" ? "publishedDate" : "-publishedDate",
  });

  console.log(data);
  // Example usage:
  useEffect(() => {
    if (data) {
      const rows = Object.values(data?.docs?.map((r: any) => Object.values(r)));
      let finalRows = rows?.map((row: any) => row.slice(1, -2));
      const finalData = finalRows
        .map((val: any) => {
          let r = val.map((item: any, index: number) => {
            switch (index) {
              case 2:
                return moment(item).format("MMM DD, YYYY");
              case 0:
                return (
                  <Link href={val?.[1]?.url} target="_blank">
                    <span className="flex items-center gap-2">
                      <Pdf />
                      <span className="flex max-w-[450px]">{item}</span>
                    </span>
                  </Link>
                );
              case 3:
                console.log(val?.[1]?.url);
                return (
                  <span className="flex cursor-pointer justify-center">
                    <DownloadLink
                      className="transition hover:opacity-50"
                      href={val?.[1]?.url}
                    >
                      <Download />
                    </DownloadLink>
                  </span>
                );

              default:
                return "";
            }
          });
          console.log(r);

          const outputArray = [r[2], r[0], r[3]];

          return outputArray;
        })
        .filter((item) => item);

      setRowData(finalData);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [searchValue, yearFilter]);

  return (
    <section className="z-[999] mx-6 -mt-10 flex flex-col gap-9 lg:mx-9 xl:mx-16 2xl:mx-44 2xl:-mt-32">
      <Fade>
        <div className="flex flex-col items-center gap-8 bg-dark-cornflower-blue px-10 py-6 md:mx-10 lg:mx-16 lg:flex-row">
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
            <h3 className="text-white">Year</h3>
            <MainDropdown
              values={["All", ...generateYearsArray()]}
              defaultValue={yearFilter}
              onValueChange={setYearFilter}
              noneEnabled={false}
              refetch={() => refetch()}
            />
          </div>
          <div className="w-full flex-1">
            <h3 className="text-white">Order by</h3>
            <MainDropdown
              values={["Ascending", "Descending"]}
              defaultValue={orderBy}
              onValueChange={setOrderBy}
              noneEnabled={false}
              refetch={() => refetch()}
            />
          </div>
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
      </Fade>
      <div className="z-0 mb-6">
        <Fade>
          <Table header={["Date", "Name", "Download"]} rows={rowData} />
        </Fade>
      </div>
      <Pagination
        data={{
          page,
          totalPages: data?.totalPages,
        }}
        setPageNumber={setPage}
      />
      {/* <div className="mb-24 flex justify-center gap-4">
        {finalRows.map((row: any, index: number) => {
          return (
            <div
              onClick={() => setCurrentPage(index + 1)}
              className={`${
                index === currentPage - 1
                  ? "bg-dark-cornflower-blue text-white"
                  : "border-dark-cornflower-blue text-dark-cornflower-blue border-[1px]"
              } cursor-pointer px-3 py-[5px]`}
              key={index}
            >
              {index + 1}
            </div>
          );
        })}
      </div> */}
    </section>
  );
}
