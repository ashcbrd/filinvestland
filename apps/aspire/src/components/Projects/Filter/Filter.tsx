"use client";

import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import numbro from "numbro";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useRouter, useSearchParams } from "next/navigation";
import { getters, setters } from "@/context/Projects";
import Request from "@/config/API";
import qs from "qs";
import Link from "next/link";
import _ from "lodash";
import { Skeleton, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

const ProjectFilter = ({
  search,
  isSticky,
  propertyType,
  isVirtual,
}: {
  search?: any;
  isSticky?: any;
  propertyType?: any;
  isVirtual?: any;
}) => {
  const [price, setPrice] = useState(20000000);
  const [advanced, setAdvanced] = useState(false);
  const [searching, setSearching] = useState(false);
  const get = getters();
  const set = setters();
  const pathname = usePathname();
  console.log(
    "%c 👽: pathname ",
    "font-size:16px;background-color:#c10a79;color:white;",
    pathname
  );
  const searchParams = useSearchParams();

  const Input = (props: any) => {
    return (
      <div
        ref={props.InputProps.ref}
        className={`border-b border-b-[#D2D2D2] pb-[15px]`}
      >
        <div className="relative">
          <input
            {...props.inputProps}
            placeholder={props.placeholder}
            className="border-b-0 !pb-0"
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
              width="11"
              height="7"
              viewBox="0 0 11 7"
              fill="none"
              className="pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L5.53704 5.53704L10.0741 1" stroke="black" />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  const onSearch = async (e?: any) => {
    e?.preventDefault();

    const recents = getCookie("_searches")
      ? JSON.parse(getCookie("_searches") as any)
      : [];
    const params = {
      ...(get.filters.keyword ? { keyword: get.filters.keyword } : {}),
      ...(get.filters.location && get.filters.location.value
        ? {
            location: get.filters.location.value,
          }
        : {}),
      ...(get.filters.type && get.filters.type.value
        ? {
            propertyType: get.filters.type.value,
          }
        : {}),
    };

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
            searchParams: `propertyType=${get.filters.type.value}&location=${get.filters.location.value}`,
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
            searchParams: `location=${get.filters.location.value}`,
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
            searchParams: `propertyType=${get.filters.type.value}`,
          },
        ])
      );
    }
    // if (
    //   pathname.indexOf("/virtual-tours") > -1
    // ) {
    setSearching(false);
    setAdvanced(false);

    set.setProjects((ps: any) => ({
      ...ps,
      loader: true,
    }));

    let ids = [];

    if (get.filters.keyword) {
      const query = qs.stringify({
        and: [{

        "where[or][0][title]": { like: get.filters.keyword },
        "where[or][1][location.title]": { like: get.filters.keyword },
        "where[or][2][propertyType.title]": { like: get.filters.keyword },
        }],
        ...(price !== 0 ? { minPrice: { less_than_equal: price } } : {}),
      });
      const q = await Request().get(`${process.env.CMS_URL}/api/aspire-projects?limit=100&${query}`);
      ids = q.data.docs;
      await set.setFilters({
        ...get.filters,
        noResult: q.data.docs.length === 0,
      });
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
            ts = {
              ...ts,
              [`where[or][${i}][propertyType]`]: { equals: t },
            };
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
            ...(price !== 0 ? { minPrice: { less_than_equal: price } } : {}),
          });

          const q = await Request().get(
            `${process.env.CMS_URL}/api/aspire-projects?limit=${
              ids.length > 0 ? ids.length : 100
            }&${typequery}`
          );

          ids = q.data.docs;
        }
      }
    }

      const query = qs.stringify({
        where: {
          _status: { equals: "published" },
          ...(ids.length > 0 ? { id: { in: ids.map((p: any) => p.id).join(",") } } : {}),
          ...(get.filters.location ? { location: { equals: get.filters.location.value } } : {}),
          ...(get.filters.type
            ? {
                propertyType: { equals: get.filters.type.value },
              }
            : {
                ...(propertyType && propertyType.length === 1 ? { propertyType: { equals: propertyType[0] } } : {}),
              }),
          ...(isVirtual
            ? {
                isVirtualTour: { equals: true },
              }
            : {}),
          ...(price !== 0 ? { minPrice: { less_than_equal: price } } : {}),
          and: [{
            "where[or][0][title]": { like: get.filters.keyword },
            "where[or][1][location.title]": { like: get.filters.keyword },
            "where[or][2][propertyType.title]": { like: get.filters.keyword },
            }],
        },
    });

    Request()
      .get(
        `${process.env.CMS_URL}/api/aspire-projects/?limit=4${
          query ? `&${query}` : ""
        }`
      )
      .then((res: any) => {
        set.setProjects((ps: any) => ({
          ...ps,
          loader: false,
          list: res.data.docs,
          hasNextPage: res.data.hasNextPage,
        }));
      });

    const redirect = pathname === "/" ? "/projects" : pathname;
    window.location.href = `${redirect}?${new URLSearchParams(params)}`;
  };

  const onSetKeyword = (e: any) => {
    set.setFilters((fs: any) => ({ ...fs, keyword: e.target.value }));

    const locationquery = qs.stringify({
      "where[or][0][and][1][location.title]": {
        like: e.target.value,
      },
    });

    const titlequery = qs.stringify({
      "where[or][1][and][1][title]": {
        like: e.target.value,
      },
    });

    set.setFilteredProjects((fps: any) => ({
      ...fps,
      loader: true,
    }));

    Request()
      .get(
        `${process.env.CMS_URL}/api/aspire-projects?limit=5&${locationquery}&${titlequery}`
      )
      .then((res: any) => {
        set.setFilteredProjects((fps: any) => ({
          ...fps,
          loader: false,
          list: res.data.docs,
          count: res.data.totalDocs,
        }));
      });
  };

  const onSetAdvanced = () => {
    setAdvanced(!advanced);
    setSearching(false);
  };

  const onSetSearching = () => {
    if (get.filters.keyword) {
      if (!searching) {
        setSearching(true);

        set.setFilteredProjects((fps: any) => ({
          ...fps,
          loader: true,
        }));

        const reqQuery = qs.stringify({
          ...(get.filters.keyword
            ? {
                "where[or][0][title]": { like: get.filters.keyword },
                "where[or][1][location.title]": { like: get.filters.keyword },
              }
            : {}),
          ...(price !== 0 ? { minPrice: { less_than_equal: price } } : {}),
        });

        Request()
          .get(`${process.env.CMS_URL}/api/aspire-projects?limit=5&${reqQuery}`)
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
  useEffect(() => {
    Request()
      .get(
        `https://backoffice.filinvestland.com/api/globals/aspire-property-search?locale=en&draft=true`
      )
      .then((res: any) => {
        console.log(
          "%c ☣️: res ",
          "font-size:16px;background-color:#68eb71;color:black;",
          res
        );
      });
  }, [searchParams]);
  return (
    <div
      id="property-filter"
      className={`${
        isSticky ? "!fixed left-0 right-0 top-0 !mt-0" : ""
      } relative z-[2] mt-[-62.5px]`}
    >
      <ClickAwayListener
        onClickAway={() => {
          setAdvanced(false);
          setSearching(false);
        }}
      >
        <div>
          <div
            className="bg-white"
            style={{ boxShadow: "0px 4px 40px 2px rgba(0, 0, 0, 0.10)" }}
          >
            <form className="flex justify-between" onSubmit={onSearch}>
              <div className="flex w-full flex-col items-start justify-center pl-[34px] pr-[28px] pt-[20px] md:pb-[20px] md:pl-[20px] md:pr-[20px]">
                <div className="mb-[10px] w-full">
                  <input
                    type="text"
                    placeholder="Search for a location, property type, or project name"
                    className="w-full md:!pb-[10px] md:!text-[15px]"
                    onClick={onSetSearching}
                    defaultValue={get.filters.keyword}
                    onChange={_.debounce(onSetKeyword, 300)}
                  />
                </div>
                <div className="flex w-full items-center justify-between">
                  <button
                    type="button"
                    onClick={onSetAdvanced}
                    className="inline-flex items-center text-[15px] text-[#1C1C1C]"
                  >
                    Advanced
                    <svg
                      className={`${advanced ? "rotate-180" : ""} ml-[12px]`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="7"
                      viewBox="0 0 11 7"
                      fill="none"
                    >
                      <path d="M1 1L5.53704 5.53704L10.0741 1" stroke="black" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    className="hidden items-center text-[15px] font-[700] text-aqua-blue md:inline-flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="mr-[10px]"
                    >
                      <path
                        d="M2.40472 2.399C5.78895 -0.864371 10.8254 -0.734301 13.9576 2.399C16.9528 5.39522 17.1359 10.1393 14.5069 13.3492L19.1564 18.0007L18.0011 19.1564L13.3512 14.5053C10.1423 17.1352 5.39992 16.952 2.40472 13.9558C-0.727511 10.8225 -0.874791 5.5614 2.40472 2.399ZM12.8023 3.55468C10.2501 1.00162 6.1122 1.00162 3.56001 3.55468C1.00782 6.10774 1.00782 10.2471 3.56001 12.8001C6.1122 15.3532 10.2501 15.3532 12.8023 12.8001C15.3545 10.2471 15.3545 6.10774 12.8023 3.55468Z"
                        className="fill-aqua-blue"
                      />
                    </svg>
                    Search
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="flex h-[125px] w-full max-w-[246px] flex-shrink-0 items-center justify-center bg-aqua-blue text-white transition-all duration-[0.3s] ease-in-out hover:!opacity-70 xs:!h-[85px] xs:!max-w-[70px] md:hidden md:max-w-[100px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mr-[20px] md:mr-[0px]"
                >
                  <path
                    d="M2.40472 2.399C5.78895 -0.864371 10.8254 -0.734301 13.9576 2.399C16.9528 5.39522 17.1359 10.1393 14.5069 13.3492L19.1564 18.0007L18.0011 19.1564L13.3512 14.5053C10.1423 17.1352 5.39992 16.952 2.40472 13.9558C-0.727511 10.8225 -0.874791 5.5614 2.40472 2.399ZM12.8023 3.55468C10.2501 1.00162 6.1122 1.00162 3.56001 3.55468C1.00782 6.10774 1.00782 10.2471 3.56001 12.8001C6.1122 15.3532 10.2501 15.3532 12.8023 12.8001C15.3545 10.2471 15.3545 6.10774 12.8023 3.55468Z"
                    fill="white"
                  />
                </svg>
                <span className="text-[18px] font-[500] leading-none md:hidden">
                  Search
                </span>
              </button>
            </form>
          </div>
          {advanced && (
            <div
              className="absolute left-0 top-[100%] mt-[17px] w-[calc(100%-246px)] lg:w-full"
              style={{ boxShadow: "0px 4px 40px 2px rgba(0, 0, 0, 0.10)" }}
            >
              <div className="bg-white pb-[44px] pl-[34px] pr-[50px] pt-[38px] md:!p-[20px]">
                <div className="mx-[-27px] flex md:block">
                  <div className="w-4/12 px-[27px] md:mb-[20px] md:w-full">
                    <Autocomplete
                      disablePortal
                      options={[
                        {
                          value: "all",
                          label: "All",
                        },
                        ...search.propertyTypes
                          .filter((type: any) =>
                            propertyType
                              ? propertyType.indexOf(
                                  type.propertyType.reference.value.id
                                ) > -1
                              : true
                          )
                          .map((type: any) => ({
                            value: type.propertyType.reference.value.id,
                            label: type.propertyType.reference.value.title,
                          })),
                      ]}
                      renderInput={(params: any) => (
                        <Input {...params} placeholder="Type" />
                      )}
                      onChange={(e: any, v: any) => {
                        if (v && v.value === "all") {
                          set.setFilters((fs: any) => ({ ...fs, type: null }));
                        } else {
                          set.setFilters((fs: any) => ({ ...fs, type: v }));
                        }
                      }}
                      value={
                        !get.filters?.type?.value
                          ? {
                              value: "all",
                              label: "All",
                            }
                          : get.filters?.type && get.filters?.type?.value
                          ? {
                              value: get.filters.type.value,
                              label: search.propertyTypes.find(
                                (type: any) =>
                                  type.propertyType.reference.value.id ===
                                  get.filters.type.value
                              ).propertyType.reference.value.title,
                            }
                          : null
                      }
                    />
                  </div>
                  <div className="w-4/12 px-[27px] md:mb-[20px] md:w-full">
                    <Autocomplete
                      disablePortal
                      options={[
                        {
                          value: "all",
                          label: "All",
                        },
                        ...(search.location
                          ? search.location
                              .filter((l: any) => l.value.id)
                              .map((l: any) => ({
                                value: l.value.id,
                                label: l.value.title,
                              }))
                          : []),
                      ]}
                      renderInput={(params: any) => (
                        <Input {...params} placeholder="Location" />
                      )}
                      onChange={(e: any, v: any) =>
                        set.setFilters((fs: any) => ({ ...fs, location: v }))
                      }
                      value={
                        !get.filters?.location?.value
                          ? {
                              value: "all",
                              label: "All",
                            }
                          : get.filters.location && get.filters.location.value
                          ? {
                              value: get.filters.location.value,
                              label:
                                get.filters.location.value === "all"
                                  ? "All"
                                  : search.location.find(
                                      (l: any) =>
                                        l.value.id ===
                                        get.filters.location.value
                                    ).value.title,
                            }
                          : null
                      }
                    />
                  </div>
                  {!isVirtual && (
                    <div className="w-4/12 px-[27px] md:w-full">
                      <label className="flex justify-between pt-[2px] text-[20px] leading-none md:text-[15px]">
                        Price Range
                        <span>₱{numbro(price).format("0,0.00")}</span>
                      </label>
                      <Slider
                        size="small"
                        value={price}
                        step={5.5}
                        max={20000000}
                        onChange={(e: any, v: any) => {
                          setPrice(v);
                          set.setFilters({ ...get.filters, price: v });
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {searching && (
            <div className="absolute left-0 top-[100%] mt-[17px] w-full">
              {!get.filters.keyword &&
                getCookie("_searches") &&
                JSON.parse(getCookie("_searches") as any).length > 0 && (
                  <div className="bg-white pb-[33px] pl-[34px] pr-[50px] pt-[42px] md:!p-[20px]">
                    <label className="mb-[17px] block font-[500]">
                      Recent Searches
                    </label>
                    {getCookie("_searches") &&
                      JSON.parse(getCookie("_searches") as any)
                        .reverse()
                        .slice(0, 5)
                        .map((s: any) => (
                          <a
                            href={`/projects?${s.searchParams}`}
                            className="mb-[10px] flex items-center text-[18px] font-[500]"
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
              {get.filters.keyword && (
                <div className="bg-white pb-[33px] pl-[34px] pr-[50px] pt-[42px] md:!p-[20px]">
                  <div className="mb-[25px] flex items-center justify-between">
                    <label className="block font-[500] ">
                      Suggested Searches
                    </label>
                    <label className="block font-[500]">
                      {get.filteredProjects.count} results
                    </label>
                  </div>
                  {!get.filteredProjects.loader &&
                    get.filteredProjects.count > 0 &&
                    get.filteredProjects.list.map((fp: any) => (
                      <div key={`project_${fp.id}`} className="mb-[8px]">
                        <Link
                          href={`/project/${fp.slug}`}
                          className="flex items-center text-left text-[18px] font-[500]"
                        >
                          <div
                            className="mr-[30px] h-[78px] w-[89px] bg-black/30 bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${fp.headerImage?.url})`,
                            }}
                          ></div>
                          <div>
                            <h4 className="pb-[15px] text-[20px] font-[500] leading-none underline underline-offset-4 md:text-[16px]">
                              {fp.title}
                            </h4>
                            <div className="flex items-center text-[20px] leading-none md:text-[14px]">
                              <svg
                                className="mr-[9px]"
                                width="12"
                                height="18"
                                viewBox="0 0 12 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 0C2.69166 0 0 2.69167 0 6.00001C0 6.99318 0.248308 7.9779 0.72035 8.85132L5.67189 17.8066C5.73781 17.926 5.86342 18 6 18C6.13658 18 6.26219 17.926 6.32811 17.8066L11.2815 8.84837C11.7517 7.9779 12 6.99314 12 5.99998C12 2.69167 9.30834 0 6 0ZM6 9C4.34583 9 3.00002 7.65418 3.00002 6.00001C3.00002 4.34584 4.34583 3.00002 6 3.00002C7.65417 3.00002 8.99998 4.34584 8.99998 6.00001C8.99998 7.65418 7.65417 9 6 9Z"
                                  fill="#9F4C03"
                                />
                              </svg>
                              <span>{fp.location.title}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  {!get.filteredProjects.loader &&
                    get.filteredProjects.count === 0 && (
                      <span>No suggestions found.</span>
                    )}
                  {get.filteredProjects.loader && (
                    <div className="mb-[8px]">
                      <div className="flex items-center text-left text-[18px] font-[500]">
                        <Skeleton
                          variant="rectangular"
                          height={78}
                          width={89}
                          className="mr-[30px]"
                        />
                        <div>
                          <Skeleton
                            variant="rectangular"
                            height={20}
                            width={150}
                            className="mb-[15px]"
                          />
                          <div className="flex items-center text-[20px] leading-none">
                            <Skeleton
                              variant="rectangular"
                              height={15}
                              width={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* <h1>No Property Found {JSON.stringify(filteredProjects)}</h1> */}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default ProjectFilter;
