"use client";

import React, { useState } from "react";
import { Autocomplete } from "@mui/material";
import Request from "@/config/API";
import { useRouter } from "next/navigation";
import { getters, setters } from "@/context/Project";
import qs from "qs";
import Button from "../general/button";

interface Props {
  onClick?: () => void;
  data?: any;
  handleSlickGoTo?: any;
}

const Input = (props: any) => {
  return (
    <div
      ref={props.InputProps.ref}
      className={`border-b border-b-[#D2D2D2] pb-4`}
    >
      <div className="relative">
        <input
          {...props.inputProps}
          placeholder={props.placeholder}
          className="h-[20px] w-full border-b-0 !pb-0 text-[18px] outline-none"
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
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.391968 1.19336L4.92901 5.7304L9.46604 1.19336"
              stroke="black"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

function Search({ data, handleSlickGoTo }: Props) {
  const router = useRouter();
  const get = getters();
  const set = setters();
  const [projects, setProjects] = useState([] as any);
  const [loader, setLoader] = useState(false);

  const filters = get.filters;
  const setFilters = set.setFilters;

  const onFetchProjects = () => {
    if (projects.length === 0) {
      setLoader(true);

      Request()
        .get(`/prestige-projects?limit=100&sort=title`)
        .then((res) => {
          setProjects(res.data.docs);
          setLoader(false);
        });
    }
  };

  const onSearch = () => {
    if (filters.project) {
      router.push(`/project/${filters.project.value}`);
    } else {
      if (filters.location || filters.type) {
        setLoader(true);

        const query = qs.stringify({
          where: {
            ...(filters.location && filters.location.value
              ? {
                  location: { equals: filters.location.value },
                }
              : filters.location
              ? {
                  location: { equals: filters.location.value },
                }
              : null),
            ...(filters.type && filters.type.value
              ? {
                  propertyType: { equals: filters.type.value },
                }
              : filters.type
              ? {
                  propertyType: { equals: filters.type.value },
                }
              : null),
          },
        });

        Request()
          .get(
            `${process.env.CMS_URL}/api/prestige-projects?limit=100&${query}`
          )
          .then((res) => {
            set.setProjects(res.data.docs);
            setLoader(false);
            handleSlickGoTo();
          });
      }
    }
  };

  const getProjects = () => {
    let list = [] as any;

    for (const proj of projects) {
      if (filters.location && filters.type) {
        if (
          proj.location &&
          proj.location.id === filters.location.value &&
          proj.propertyType &&
          proj.propertyType.id === filters.type.value
        ) {
          list = [
            ...list,
            {
              value: proj.slug,
              label: proj.title,
            },
          ];
        }
      } else if (!filters.location && filters.type) {
        if (proj.propertyType && proj.propertyType.id === filters.type.value) {
          list = [
            ...list,
            {
              value: proj.slug,
              label: proj.title,
            },
          ];
        }
      } else if (filters.location && !filters.type) {
        if (proj.location && proj.location.id === filters.location.value) {
          list = [
            ...list,
            {
              value: proj.slug,
              label: proj.title,
            },
          ];
        }
      } else {
        list = [
          ...list,
          {
            value: proj.slug,
            label: proj.title,
          },
        ];
      }
    }

    return list;
  };

  return (
    <div className="S E A R C H grid w-full grid-cols-1 lg:grid-cols-[1fr,_auto]">
      <div className="z-[1] grid min-h-[125px] grid-cols-1 gap-6 bg-white p-8 lg:grid-cols-3">
        <div className="flex items-center justify-center">
          <Autocomplete
            className="flex-1"
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
            onChange={(e: any, v: any) =>
              setFilters((fs: any) => ({ ...fs, location: v }))
            }
          />
        </div>

        <div className="flex items-center justify-center">
          <Autocomplete
            className="flex-1"
            disablePortal
            options={data.propertyTypes
              .filter((type: any) => type.propertyType)
              .map((type: any) => ({
                value: type.propertyType.reference.value.id,
                label: type.propertyType.reference.value.title,
              }))}
            renderInput={(params: any) => (
              <Input {...params} placeholder="Category" />
            )}
            onOpen={() => console.log(data.location)}
            onChange={(e: any, v: any) =>
              setFilters((fs: any) => ({ ...fs, type: v }))
            }
          />
        </div>

        <div className="flex items-center justify-center">
          <Autocomplete
            className="flex-1"
            disablePortal
            getOptionLabel={(option) => option.label}
            options={getProjects()}
            renderInput={(params: any) => (
              <Input {...params} placeholder="Search Project" />
            )}
            onOpen={onFetchProjects}
            value={filters.project}
            onChange={(e: any, v: any) =>
              setFilters((fs: any) => ({ ...fs, project: v }))
            }
            loading={loader}
          />
        </div>
      </div>

      <Button
        label="Search"
        corner="flat"
        onClick={onSearch}
        className="z-[1] !h-[80px] !w-full !text-[30px] lg:!h-[125px] lg:!w-[246px]"
      />
    </div>
  );
}

export default Search;
