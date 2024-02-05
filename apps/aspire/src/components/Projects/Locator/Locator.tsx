"use client";

import React, { useState, useEffect, memo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import Button from "@/components/Button/Button";
import TextField from "@mui/material/TextField";
import Request from "@/config/API";
import { getters, setters } from "@/context/Projects";
import qs from "qs";
import _ from "lodash";
import numbro from "numbro";
import { useParams } from "next/navigation";
import MapLocator from "@/components/MapLocator/page";

const Locator = memo(function Locator({
  className = "",
  projects = [],
  disableSearch = false,
  activeLocation = {},
  search,
  type,
  specific,
}: {
  className?: any;
  projects?: any;
  disableSearch?: boolean;
  activeLocation?: any;
  search?: any;
  type?: any;
  specific?: any;
}) {
  const params = useParams()
  const [active, setActive] = useState(activeLocation);
  const [price, setPrice] = useState(20000000);
  const get = getters();
  const set = setters();
  const maxPrice = 20000000;

  useEffect(() => {
    if (!specific) {
      set.setProjects((ps: any) => ({
        ...ps,
        list: projects,
      }));
    }
  }, []);

  const reqQuery = qs.stringify({
    where: {
      _status: { equals: "published" },
      ...(get.filters.keyword ? { title: { like: get.filters.keyword } } : {}),
      ...(get.filters.projectPropertyLocation &&
      get.filters.projectPropertyLocation.value
        ? {
            "location.title": {
              equals: get.filters.projectPropertyLocation.label,
            },
          }
        : get.filters.projectPropertyLocation
        ? {
            "location.title": {
              equals: get.filters.projectPropertyLocation.label,
            },
          }
        : null),
      ...(get.filters.projectPropertyType &&
      get.filters.projectPropertyType.value
        ? {
            "propertyType.title": {
              equals: get.filters.projectPropertyType.label,
            },
          }
        : get.filters.projectPropertyType
        ? {
            "propertyType.title": {
              equals: get.filters.projectPropertyType.label,
            },
          }
        : null),
      minPrice: { less_than_equal: price },
    },
  });

  const onSearch = async (e: any) => {
    set.setProjects((ps: any) => ({
      ...ps,
      loader: true,
    }));

    Request()
      .get(
        `${process.env.CMS_URL}/api/aspire-projects/?limit=100${
          reqQuery ? `&${reqQuery}` : ""
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
  };

  const list = get.projects.list;
  const project = get.projects.list.find((project: any) => params?.id === project?.slug)

  return (
    <div
      id="property-locator"
      className={`${className} flex h-[775px] md:h-auto md:flex-col`}
    >
      {!disableSearch && (
        <div className="flex w-[397px] flex-shrink-0 flex-col bg-[#F1F1F1] md:w-full md:flex-row">
          <div className="bg-white p-[38px] pb-[42px] pt-[34px] xs:!w-full md:w-full tablet:px-[20px] tablet:py-[40px]">
            <h3 className="pb-[7px] text-[25px] font-[400] leading-[30px]">
              Interested in a particular city?
            </h3>
            <p className="pb-[21px]">Explore our properties nationwide.</p>
            <div className="relative w-full pb-[10px]">
              <Autocomplete
                disablePortal
                options={
                  search.location
                    ? search.location
                        .filter((l: any) => l.value.id)
                        .map((l: any) => ({
                          value: l.value.id,
                          label: l.value.title,
                        }))
                    : []
                }
                renderInput={(params: any) => (
                  <TextField {...params} placeholder="Location" />
                )}
                onChange={(e: any, v: any) =>
                  set.setFilters((fs: any) => ({
                    ...fs,
                    projectPropertyLocation: v,
                  }))
                }
              />
            </div>
            <div className="relative w-full pb-[26px]">
              <Autocomplete
                disablePortal
                options={
                  search.propertyTypes
                    ? search.propertyTypes.map((type: any) => ({
                        value: type.propertyType.reference.value.id,
                        label: type.propertyType.reference.value.title,
                      }))
                    : []
                }
                renderInput={(params: any) => (
                  <TextField {...params} placeholder="Property Type" />
                )}
                onChange={(e: any, v: any) =>
                  set.setFilters((fs: any) => ({
                    ...fs,
                    projectPropertyType: v,
                  }))
                }
              />
            </div>
            <div className="pb-[27px]">
              <label className="mb-[-8px] block text-[16px]">Price</label>
              <Slider
                size="small"
                step={5.5}
                value={price}
                max={maxPrice}
                onChange={(e: any, v: any) => {
                  setPrice(v);
                }}
              />
              <div className="mt-[-12px] flex items-center justify-between">
                <label className="text-[14px]">
                  ₱{numbro(price).format("0,0.00")}
                </label>
                <label className="text-[14px]">
                  ₱{numbro(maxPrice).format("0,0.00")}
                </label>
              </div>
            </div>
            <Button
              onClick={onSearch}
              className="flex h-[57px] w-full items-center justify-center py-[0] text-[17px]"
            >
              Search Property
            </Button>
          </div>
          <div className="h-[357px] overflow-auto bg-[#F1F1F1] pl-[40px] pr-[38px] pt-[28px] md:hidden md:w-2/4 tablet:h-[357px]">
            {list.map((p: any) => (
              <button
                onClick={() => setActive(p)}
                className="mb-[22px] flex w-full items-center border-b border-b-[#E4E4E4] pb-[26px] text-left"
              >
                <div className="mr-[22px] w-full max-w-[83px] flex-shrink-0">
                  <div
                    className="relative w-full bg-white bg-cover bg-no-repeat pb-[100%]"
                    style={{ backgroundImage: `url(${p.headerImage?.url})` }}
                  ></div>
                </div>
                <div className="flex flex-col leading-normal">
                  <h4 className="pb-[2px] text-[20px] font-[500] leading-none">
                    {p.title}
                  </h4>
                  <p className="pb-0 text-[14px] uppercase">
                    ₱ {numbro(p.minPrice).format("0.0a")} -{" "}
                    {numbro(p.maxPrice).format("0.0a")}
                  </p>
                  <p className="inline-block text-[12px] text-[#A1A1A1]">
                    {p.location?.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      <MapLocator currentMark={project ?? list.length > 0 ? list[0] : null} markers={list.length > 0 ? list : projects} />
    </div>
  );
});

export default Locator;
