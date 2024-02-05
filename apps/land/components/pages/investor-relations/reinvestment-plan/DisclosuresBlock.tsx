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

export default function DisclosuresBlock({ content }: any) {
  const disclosuresTableBlock = content?.content?.find(
    (item: any) => item.blockType === "disclosures-table"
  );

  const [disclosures, setDisclosures] = useState<any>([]);
  const [years, setYears] = useState<any>([]);
  const [disclosuresFilter, setDisclosuresFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [rowData, setRowData] = useState(disclosuresTableBlock?.rowData);
  const countPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const rows = Object.values(rowData?.map((r: any) => Object.values(r)));
  let finalRows = rows.map((row: any) => row);

  finalRows = finalRows.map((val: any) => {
    val.pop();
    let r = val.map((item: any, index: number) => {
      switch (index) {
        case 0:
          return moment(item).format("MMM DD, YYYY");
        case 1:
          return (
            <Link href={val[3].url} target="_blank">
              <span className="flex items-center gap-2">
                <Pdf />
                <span className="flex max-w-[450px]">{item}</span>
              </span>
            </Link>
          );
        case 2:
          return (
            <span className="flex max-w-[270px] text-justify">
              {String(item)}
            </span>
          );
        case 3:
          return (
            <span className="flex cursor-pointer justify-center">
              <Link href={val[3].url} target="_blank">
                <Download />
              </Link>
            </span>
          );
        default:
          return "";
      }
    });
    return r;
  });

  finalRows = finalRows.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / countPerPage);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  const handleSearch = () => {
    if (yearFilter == "All") {
      let items = disclosuresTableBlock?.rowData;

      if (searchValue) {
        items = items?.filter((item: any) => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
      }
      setRowData(items);
      return;
    } else {
      let items = disclosuresTableBlock?.rowData;

      if (searchValue) {
        items = disclosuresTableBlock?.rowData?.filter((item: any) => {
          return item?.name?.includes(searchValue);
        });
      }
      items = items.filter((item: any) => item?.category == yearFilter);
      setRowData(items);
    }
  };

  useEffect(() => {
    const listYears = rowData.map((r: any) => moment(r?.date).format("YYYY"));
    const listDisclosures = rowData.map((r: any) => r?.category);
    const uniqueYears = [
      "All",
      ...Array.from(new Set(listYears)).sort(
        (a: any, b: any) => parseInt(a) - parseInt(b)
      ),
    ];
    const uniqueDisclosures = [
      "All",
      ...Array.from(new Set(listDisclosures)).sort((a: any, b: any) =>
        a.localeCompare(b)
      ),
    ];

    setDisclosures(uniqueDisclosures);
    setYears(uniqueYears);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="z-[999] mx-6 -mt-10 flex flex-col gap-9 lg:mx-9 xl:mx-16 2xl:mx-44 2xl:-mt-32">
      <Fade>
        <div className="z-10 flex flex-col items-center gap-8 bg-dark-cornflower-blue px-10 py-6 md:mx-10 lg:mx-16 lg:flex-row">
          <div className="w-full flex-1">
            <h3 className="text-white">Disclosures</h3>
            <MainInput
              placeholder="Write here..."
              onChange={(e: any) => {
                setSearchValue(e.target.value);
              }}
              value={searchValue}
            />
            {/* <MainDropdown
              values={disclosures}
              defaultValue={disclosuresFilter}
              onValueChange={setDisclosuresFilter}
            /> */}
          </div>
          <div className="w-full flex-1">
            <h3 className="text-white">Year</h3>
            <MainDropdown
              values={years}
              defaultValue={yearFilter}
              onValueChange={setYearFilter}
            />
          </div>
          <div className="w-auto flex-none md:w-72 lg:w-auto">
            <button
              onClick={() => {
                handleSearch();
              }}
              className="delay-50 w-full bg-white px-8 py-5 transition hover:bg-platinum focus:bg-platinum"
            >
              <div className="flex items-center gap-2 text-center font-bold text-dark-cornflower-blue">
                <Search /> Search
              </div>
            </button>
          </div>
        </div>
      </Fade>
      <div className="z-1 mb-6">
        <Fade>
          <Table
            header={["Date", "Name", "Category", "Download"]}
            rows={finalRows[currentPage - 1]}
          />
        </Fade>
      </div>
      <Pagination
        data={{
          page: currentPage,
          totalPages: finalRows.length,
        }}
        setPageNumber={setCurrentPage}
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
