"use client";

import { ClickAwayListener, Slider } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import qs from "qs";
import numbro from "numbro";
import { Autocomplete } from "@mui/material";
import { getters, setters } from "@/app/context/Project";
import Request from "@/config/Request";
import _ from "lodash";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const SuggestedSearch = () => {
  const get = getters();
  const projects = get.filteredProjects;

  return (
    <div className="absolute left-0 right-0 top-[100%] z-[99] mx-auto mt-[17px] w-full max-w-[1116px]">
      <div
        className="max-h-[400px] overflow-y-scroll rounded-[10px] bg-white px-[32px] pb-[31px] pt-[33px]"
        style={{ boxShadow: "0px 4px 40px 2px #0000001A" }}
      >
        <p className="pb-[25px] text-[14px] font-[500] leading-[20px]">
          Suggested Searches
        </p>
        <div className="mb-[-8px] flex flex-col">
          {projects.count > 0 &&
            projects.list.map((x: any) => (
              <div className="mb-[8px] flex  items-center rounded-lg">
                <div
                  className="h-[78px] w-[89px] rounded-[10px] bg-black/10 bg-cover bg-center"
                  style={{ backgroundImage: `url(${x.headerImage?.url})` }}
                />
                <div className="ml-[30px] block">
                  <Link
                    href={`/project/${x.slug}`}
                    className="mb-[11px] block font-quicksand text-[18px] font-bold leading-[22px] underline"
                  >
                    {x.title}
                  </Link>
                  <div className="inline-flex h-[29px] items-center rounded-full bg-[#E12827] px-[12px]">
                    <svg
                      className="mr-[7px]"
                      width="6"
                      height="11"
                      viewBox="0 0 6 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 0.0859375C1.34583 0.0859375 0 1.58131 0 3.41928C0 3.97104 0.124154 4.51811 0.360175 5.00334L2.83594 9.97852C2.8689 10.0448 2.93171 10.0859 3 10.0859C3.06829 10.0859 3.1311 10.0448 3.16406 9.97852L5.64074 5.0017C5.87585 4.51811 6 3.97102 6 3.41926C6 1.58131 4.65417 0.0859375 3 0.0859375ZM3 5.08594C2.17292 5.08594 1.50001 4.33826 1.50001 3.41928C1.50001 2.50029 2.17292 1.75262 3 1.75262C3.82708 1.75262 4.49999 2.50029 4.49999 3.41928C4.49999 4.33826 3.82708 5.08594 3 5.08594Z"
                        fill="white"
                      />
                    </svg>
                    <p className="font-quicksand text-[12px] text-[#fff]">
                      {x.location.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const RecentSearch = () => {
  const recents =
    getCookie("_searches") && JSON.parse(getCookie("_searches") as any);

  return (
    <div className="absolute left-0 right-0 top-[100%] z-[5] mx-auto mt-[17px] w-full max-w-[1116px]">
      <div
        className="rounded-[10px] bg-white px-[32px] pb-[28px] pt-[26px]"
        style={{ boxShadow: "0px 4px 40px 2px #0000001A" }}
      >
        <p className="pb-[17px] text-[14px] font-[500] leading-[17.5px]">
          Recent Searches
        </p>
        {recents?.length === 0 ? (
          <p className="text-gray-500">No recent searches.</p>
        ) : (
          <div className="mb-[-10px]">
            {getCookie("_searches") &&
              JSON.parse(getCookie("_searches") as any)
                .reverse()
                .slice(0, 5)
                .map((s: any) => (
                  <a
                    href={`/projects/?${s.searchParams}`}
                    className="mb-[10px] flex items-center text-[16px] font-[500]"
                  >
                    <svg
                      width="28"
                      height="27"
                      viewBox="0 0 28 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-[14px]"
                    >
                      <path
                        d="M13.8731 14.2664L19.1229 18.2038C19.5096 18.4938 20.0578 18.4155 20.3478 18.0288C20.6379 17.642 20.5596 17.0939 20.1728 16.8038L15.3124 13.1246V5.68746C15.3124 5.20404 14.9209 4.8125 14.4375 4.8125C13.954 4.8125 13.5625 5.20404 13.5625 5.68746V13.5621C13.5625 13.8526 13.6841 14.1142 13.8731 14.2664Z"
                        fill="#9C9C9C"
                      />
                      <path
                        d="M14.8756 0C8.47134 0 3.0024 4.62241 1.93495 10.937L1.60247 10.4426C1.33167 10.0415 0.787442 9.93561 0.386273 10.2064C-0.0148964 10.4772 -0.120766 11.0214 0.150034 11.4226L1.89995 14.0475C2.04388 14.2662 2.27837 14.4093 2.53867 14.4368H2.62617C2.85803 14.436 3.07984 14.3432 3.24302 14.1787L5.43042 11.9913C5.77209 11.6497 5.77209 11.0949 5.43042 10.7533C5.08874 10.4116 4.53402 10.4116 4.19235 10.7533L3.64987 11.3001C4.65739 5.09927 10.5008 0.889834 16.7012 1.89735C22.9016 2.90487 27.1119 8.74785 26.1044 14.9487C25.2098 20.4548 20.4539 24.4997 14.8756 24.4989C11.3574 24.5627 8.02992 22.9029 5.96414 20.0541C5.68372 19.6603 5.1373 19.568 4.74357 19.8485C4.34984 20.1289 4.25753 20.6753 4.53796 21.069C6.9301 24.3816 10.7904 26.3157 14.8756 26.2488C22.1242 26.2488 28 20.373 28 13.1244C28 5.87579 22.1242 0 14.8756 0Z"
                        fill="#9C9C9C"
                      />
                    </svg>
                    <span>{s.label}</span>
                  </a>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Input = (props: any) => {
  return (
    <div
      ref={props.InputProps.ref}
      className={`border-b border-b-[#D2D2D2] pb-[8px] lg:pb-[17px]`}
    >
      <div className="relative flex">
        <input
          {...props.inputProps}
          placeholder={props.placeholder}
          className="h-[17px] w-full border-b-0 !pb-0 font-quicksand text-[10px] font-[700] outline-none lg:text-[13px]"
        />
        <div
          className={`absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer ${
            props.InputProps.endAdornment.props.ownerState.popupOpen
              ? "rotate-180"
              : ""
          }`}
          onClick={props.InputProps.onClick}
        >
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M0.927734 1.31641L4.11251 4.50118C4.50303 4.8917 5.1362 4.8917 5.52672 4.50118L8.71149 1.31641"
              stroke="black"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

function Search(props: any) {
  const searchParams = useSearchParams();
  const { data } = props;
  const [price, setPrice] = useState(
    (searchParams.get("price") as any) ?? 10000000
  );
  const [searching, setSearching] = useState(false);

  const get = getters();
  const set = setters();
  const setFilters = set.setFilters;
  const pathname = usePathname();

  const reqQuery = qs.stringify({
    where: {
      _status: { equals: "published" },
      ...(get.filters.keyword ? { title: { like: get.filters.keyword } } : {}),
      ...(get.filters.location && get.filters.location.value
        ? {
            location: { equals: get.filters.location.label },
          }
        : get.filters.location
        ? {
            location: { equals: get.filters.location.label },
          }
        : null),
      ...(get.filters.type && get.filters.type.value
        ? {
            propertyType: { equals: get.filters.type.label },
          }
        : get.filters.type
        ? {
            propertyType: { equals: get.filters.type.label },
          }
        : null),
      maxPrice: { less_than_equal: price },
    },
  });

  const onSearch = (e: any) => {
    e.preventDefault();

    const recents = getCookie("_searches")
      ? JSON.parse(getCookie("_searches") as any)
      : [];
    const params = {
      keyword: get.filters.keyword,
      propertyType: get.filters.type?.label ?? get.filters.type,
      location: get.filters.location?.label ?? get.filters.location,
      price: get.filters.price,
    } as any;
    let searchParams = {};

    Object.keys(params).map((key: any) => {
      if (params[key] || params[key] === 0) {
        searchParams = { ...searchParams, [key]: params[key] };
      }
    });

    if (
      get.filters.location &&
      get.filters.location.value &&
      get.filters.type &&
      get.filters.type.value
    ) {
      setCookie(
        "_searches",
        JSON.stringify([
          ...recents,
          {
            label: `${get.filters.type.label} in ${get.filters.location.label}`,
            searchParams: `propertyType=${get.filters.type.label}&location=${get.filters.location.label}`,
          },
        ])
      );
    } else if (
      get.filters.location &&
      get.filters.location.value &&
      !get.filters.type
    ) {
      setCookie(
        "_searches",
        JSON.stringify([
          ...recents,
          {
            label: `Property in ${get.filters.location.label}`,
            searchParams: `location=${get.filters.location.label}`,
          },
        ])
      );
    } else if (
      !get.filters.location &&
      get.filters.type &&
      get.filters.type.value
    ) {
      setCookie(
        "_searches",
        JSON.stringify([
          ...recents,
          {
            label: get.filters.type.label,
            searchParams: `propertyType=${get.filters.type.label}`,
          },
        ])
      );
    }

    if (pathname === "/project" || pathname === "/virtual-tours") {
      setSearching(false);

      set.setProjects((ps: any) => ({
        ...ps,
        loader: true,
      }));

      Request()
        .get(`/futura-projects/?${reqQuery ? `${reqQuery}` : ""}`)
        .then((res: any) => {
          set.setProjects((ps: any) => ({
            ...ps,
            loader: false,
            list: res.data.docs,
            hasNextPage: false,
          }));
        });
    }

    window.location.href = `/projects?${new URLSearchParams(searchParams)}`;
  };

  const onSetKeyword = (e: any) => {
    set.setFilters((value: any) => ({ ...value, keyword: e.target.value}))
    const query = qs.stringify({
      where: { title: { like: get.filters.keyword } },
      sort: "title",
    });

    setTimeout(() => {
      set.setFilteredProjects((fps: any) => ({
        ...fps,
        loader: true,
      }));
  
      Request()
        .get(`${process.env.CMS_URL}/api/futura-projects?limit=5${query ? `&${query}` : ""}`)
        .then((res: any) => {
          set.setFilteredProjects((fps: any) => ({
            ...fps,
            loader: false,
            list: res.data.docs,
            count: res.data.totalDocs,
          }));
        });
    }, 300)
  };

  const onSetSearching = () => {
    if (get.filters.keyword) {
      if (!searching) {
        setSearching(true);

        set.setFilteredProjects((fps: any) => ({
          ...fps,
          loader: true,
        }));

        Request()
          .get(`/futura-projects?limit=5${reqQuery ? `&${reqQuery}` : ""}`)
          .then((res: any) => {
            set.setFilteredProjects((fps: any) => ({
              ...fps,
              loader: false,
              list: res.data.docs,
              count: res.data.totalDocs,
            }));
          });
      }
    } else {
      setSearching(true);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setSearching(false)}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mx-auto flex w-full max-w-[680px] items-center justify-center rounded-[20px] bg-white shadow-xl shadow-gray-200/50 lg:max-w-[1116px]"
      >
        <div className="flex w-full flex-col justify-between px-6 py-10 md:flex-row md:px-0 md:py-0 ">
          <div className="mx-[-14px] flex w-full flex-col items-center gap-y-4 pl-[34px] pr-[24px] md:flex-row">
            <div className="mx-[14px] w-full lg:max-w-[264px]">
              <input
                value={get.filters?.keyword}
                type="text"
                className="block w-full border-b border-b-[#D2D2D2] pb-[8px] font-quicksand text-[10px] font-[700] leading-[17px] text-[#1C1C1C] placeholder-[#1C1C1C] outline-none placeholder:text-[10px] lg:pb-[17px] lg:text-[13px] lg:placeholder:text-[13px]"
                placeholder="Enter Keywords or Project Name"
                onClick={onSetSearching}
                onChange={onSetKeyword}
              />
            </div>

            <div className="mx-[14px] w-full md:max-w-[150px]">
              <Autocomplete
                disablePortal
                options={data.propertyTypes
                  .filter((type: any) => type.propertyType)
                  .filter((type: any) =>
                    props.typeID
                      ? type.propertyType.reference.value.id === props.typeID
                      : true
                  )
                  .map((type: any) => ({
                    value: type.propertyType.reference.value.id,
                    label: type.propertyType.reference.value.title,
                  }))}
                renderInput={(params: any) => (
                  <Input {...params} placeholder="Type" />
                )}
                value={get.filters.type}
                onChange={(e: any, v: any) =>
                  setFilters((fs: any) => ({ ...get.filters, type: v }))
                }
              />
            </div>

            <div className="mx-[14px] w-full md:max-w-[150px]">
              <Autocomplete
                disablePortal
                options={data.location
                  .filter((loc: any) => loc.value.id)
                  .map((loc: any) => ({
                    value: loc.value.id,
                    label: loc.value.title,
                  }))}
                renderInput={(params: any) => (
                  <Input {...params} placeholder="Location" />
                )}
                value={get.filters.location}
                onChange={(e: any, v: any) =>
                  setFilters((fs: any) => ({ ...get.filters, location: v }))
                }
              />
            </div>

            <div className="mx-[14px] w-full lg:max-w-[247px]">
              <div className="flex w-full justify-between gap-x-4 lg:gap-x-0">
                <p className="w-max font-quicksand text-[10px] font-[700] text-[#1C1C1C] lg:text-[13px]">
                  Price Range
                </p>
                <p className="font-quicksand text-[10px] font-[700] text-[#1C1C1C] lg:text-[13px]">
                  <span>₱{numbro(price).format("0,0.00")}</span>
                </p>
              </div>
              <Slider
                color="error"
                size="small"
                value={price}
                step={5.5}
                max={20000000}
                onChange={(e: any, v: any) => {
                  setPrice(v);
                  setFilters((fs: any) => ({ ...fs, price: v }));
                }}
              />
            </div>
          </div>

          <button
            onClick={onSearch}
            className="mx-auto mt-4 flex w-[169px] flex-shrink-0 items-center justify-center rounded-full bg-[#E12827] py-4 text-[15px] text-white transition-all duration-[0.3s] ease-in-out hover:bg-red-400 hover:opacity-70 md:mx-0 md:mt-0 md:h-[114px] md:rounded-none md:rounded-r-[20px] md:py-0"
          >
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-[17px]"
            >
              <path
                d="M2.53445 2.9524C5.43745 0.153072 9.75769 0.264646 12.4445 2.9524C15.0138 5.52256 15.1709 9.592 12.9157 12.3455L16.9041 16.3356L15.913 17.3269L11.9243 13.3372C9.17179 15.5931 5.10374 15.436 2.53445 12.8659C-0.152381 10.1781 -0.278718 5.66511 2.53445 2.9524ZM11.4535 3.94374C9.26425 1.75372 5.71473 1.75372 3.52546 3.94374C1.33619 6.13376 1.33619 9.68449 3.52546 11.8745C5.71473 14.0645 9.26425 14.0645 11.4535 11.8745C13.6428 9.68449 13.6428 6.13376 11.4535 3.94374Z"
                fill="white"
              />
            </svg>
            <span className="text-[14px] font-[700] lg:text-[17px]">
              Search
            </span>
          </button>
        </div>
        {searching && !get.filters.keyword && getCookie("_searches") && (
          <RecentSearch />
        )}
        {searching && get.filters.keyword && <SuggestedSearch />}
      </motion.div>
    </ClickAwayListener>
  );
}

export default Search;
