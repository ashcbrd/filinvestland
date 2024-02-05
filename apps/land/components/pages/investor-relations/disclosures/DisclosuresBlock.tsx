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
import useGetDisclosuresByCategory from "@/components/list/hooks/useGetDisclosuresByCategory";
import useGetDisclosuresAllCategories from "@/components/list/hooks/useGetDisclosuresCategories";
import MainInput from "@/components/input/MainInput";
import generateYearsArray from "@/helpers/yearsGenerator";
import { useRouter } from "next/navigation";

export default function DisclosuresBlock({ content, searchParams, slug }: any) {
  const disclosuresTableBlock = content?.content?.find(
    (item: any) => item.blockType === "disclosures-table"
  );
  const navigate = useRouter();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [disclosures, setDisclosures] = useState<any>([]);
  const [years, setYears] = useState<any>([]);
  const [disclosuresFilter, setDisclosuresFilter] = useState(
    slug.toLowerCase() === "all" ? "All" : slug
  );
  const [yearFilter, setYearFilter] = useState("All");
  const [rowData, setRowData] = useState<any>([]);
  const countPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [orderBy, setOrderBy] = useState("Descending");

  const { data, isFetching, refetch } = useGetDisclosuresByCategory({
    category: disclosuresFilter === "All" ? "" : disclosuresFilter,
    limit,
    page,
    search: searchValue,
    years: yearFilter === "All" ? "" : yearFilter,
    sort: orderBy === "Ascending" ? "publishedDate" : "-publishedDate",
    type: searchParams.type ?? disclosuresFilter,
    slug: slug?.toLowerCase() === "all" ? "" : slug,
  });
  const { data: dataCategories } = useGetDisclosuresAllCategories({
    limit: 1000,
    page,
  });

  function getYearsArray(startYear: any, endYear: any) {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];

    for (let year = startYear; year <= Math.min(endYear, currentYear); year++) {
      yearsArray.push(year.toString());
    }

    return yearsArray;
  }

  useEffect(() => {
    setPage(1);
  }, [searchValue, yearFilter, disclosuresFilter]);

  // Example usage:
  useEffect(() => {
    if (data) {
      console.log(data);
      const rows = Object.values(data?.docs?.map((r: any) => Object.values(r)));
      let finalRows = rows?.map((row: any) => row.slice(1, -2));

      const finalData = finalRows
        .map((val: any) => {
          let r = val.map((item: any, index: number) => {
            switch (index) {
              case 3:
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
              case 2:
                return (
                  <span
                    className="block max-w-[270px] text-justify md:max-w-[350px]"
                    style={{ wordBreak: "break-word" }}
                  >
                    {String(item.title)}
                  </span>
                );
              case 1:
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

          const outputArray = [r[3], r[0], r[2], r[1]];

          return outputArray;
        })
        .filter((item) => item);

      setRowData(finalData);
    }
  }, [data]);

  useEffect(() => {
    if (dataCategories) {
      // setDisclosures(() => dataCategories.docs.map((e) => e.title));
      setDisclosures(() => dataCategories.docs.map((e) => e.slug));
    }
  }, [dataCategories]);

  return (
    <section className="z-[999] mx-6 -mt-10 flex flex-col gap-9 lg:mx-9 xl:mx-16 2xl:mx-44 2xl:-mt-32">
      <Fade>
        <div className="flex flex-col items-center gap-8 bg-dark-cornflower-blue px-10 py-6 md:mx-10 lg:mx-16 lg:flex-row">
          <div className="w-full flex-1">
            <h3 className="text-white">Search</h3>
            <MainInput
              placeholder="Write here..."
              onChange={(e: any) => {
                setSearchValue(e.target.value), setPage(1);
              }}
              value={searchValue}
            />
          </div>
          <div className="w-full flex-1">
            <h3 className="text-white">Disclosures</h3>
            <MainDropdown
              values={["All", ...disclosures]}
              defaultValue={searchParams?.filling_type ?? disclosuresFilter}
              onValueChange={setDisclosuresFilter}
              noneEnabled={false}
              refetch={() => refetch()}
              action={(category: string) => {
                //  Old implementation
                // navigate.push(
                //   `${window?.location?.pathname ? window.location.pathname : "/investor-relations/disclosures"}?page=${page}&year=${yearFilter}${
                //     !slug ? `&type=${type}` : ""
                //   }`
                // );
                navigate.push(
                  `/disclosures/${category}?page=${page}&year=${yearFilter}`
                );
              }}
            />
          </div>
          <div className="w-full flex-1">
            <h3 className="text-white">Year</h3>
            <MainDropdown
              values={["All", ...generateYearsArray()]}
              defaultValue={searchParams?.year ?? yearFilter}
              onValueChange={setYearFilter}
              action={(year: string) => {
                navigate.push(
                  `${
                    window?.location?.pathname
                      ? window.location.pathname
                      : "/investor-relations/disclosures"
                  }?page=${page}&year=${year}${
                    !slug ? `&type=${disclosuresFilter}` : ""
                  }`
                );
              }}
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
          <Table
            header={["Date", "Name", "Category", "Download"]}
            rows={rowData}
          />
        </Fade>
      </div>
      <Pagination
        data={{
          page: searchParams?.page ? Number(searchParams?.page) : page,
          totalPages: data?.totalPages,
        }}
        setPageNumber={setPage}
        action={(page: number) => {
          navigate.push(
            `${
              window?.location?.pathname
                ? window.location.pathname
                : "/investor-relations/disclosures"
            }?page=${page}&year=${yearFilter}${
              !slug ? `&type=${disclosuresFilter}` : ""
            }`
          );
        }}
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
