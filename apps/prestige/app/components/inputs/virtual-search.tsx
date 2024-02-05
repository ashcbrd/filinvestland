"use client";

import Request from "@/config/API";
import { Autocomplete } from "@mui/material";
import React, { useState } from "react";
import qs from "qs";
import { setters } from "@/context/Project";
import Button from "../general/button";

const Input = (props: any) => {
  return (
    <div
      ref={props.InputProps.ref}
      className={`border-b border-b-[#D2D2D2] pb-[20px]`}
    >
      <div className="relative">
        <input
          {...props.inputProps}
          placeholder={props.placeholder}
          className="h-[20px] w-full border-b-0 !pb-0 text-[20px] outline-none"
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

function VirtualSearch() {
  const set = setters();
  const [projects, setProjects] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState(null);

  const onFetchProjects = () => {
    if (projects.length === 0) {
      setLoader(true);

      const query = qs.stringify({
        where: {
          isVirtualTour: {
            equals: "true",
          },
        },
      });

      Request()
        .get(`/prestige-projects?limit=100&sort=title&${query}`)
        .then((res) => {
          console.log(res.data.docs);
          setProjects(res.data.docs);
          setLoader(false);
        });
    }
  };

  return (
    <div className="S E A R C H grid w-full grid-cols-1 md:grid-cols-[1fr,_auto]">
      <div className="z-[1] grid min-h-[125px] grid-cols-1 bg-white p-8">
        <div className="flex items-center justify-center">
          <Autocomplete
            className="flex-1"
            disablePortal
            getOptionLabel={(option) => option.label}
            options={projects.map((proj: any) => ({
              value: proj.id,
              label: proj.title,
              project: proj,
            }))}
            renderInput={(params: any) => (
              <Input {...params} placeholder="Search Project" />
            )}
            onOpen={onFetchProjects}
            value={selected}
            onChange={(e: any, v: any) => {
              setSelected(v);
              set.setProjects([v.project]);
            }}
            loading={loader}
          />
        </div>

        {/* <button className="flex items-center justify-center bg-[#311700] text-[18px] text-white h-[107px] w-[246px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.40472 2.399C5.78895 -0.864371 10.8254 -0.734301 13.9576 2.399C16.9528 5.39522 17.1359 10.1393 14.5069 13.3492L19.1564 18.0007L18.0011 19.1564L13.3512 14.5053C10.1423 17.1352 5.39992 16.952 2.40472 13.9558C-0.727511 10.8225 -0.874791 5.5614 2.40472 2.399ZM12.8023 3.55468C10.2501 1.00162 6.1122 1.00162 3.56001 3.55468C1.00782 6.10774 1.00782 10.2471 3.56001 12.8001C6.1122 15.3532 10.2501 15.3532 12.8023 12.8001C15.3545 10.2471 15.3545 6.10774 12.8023 3.55468Z"
              fill="#DB8539"
            />
          </svg>
          <span className="ml-[19px]">Search</span>
        </button> */}
      </div>

      <Button
        label="Search"
        corner="flat"
        className="z-[1] !h-[80px] !w-full !text-[30px] md:!h-[125px] md:!w-[246px]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.40472 2.399C5.78895 -0.864371 10.8254 -0.734301 13.9576 2.399C16.9528 5.39522 17.1359 10.1393 14.5069 13.3492L19.1564 18.0007L18.0011 19.1564L13.3512 14.5053C10.1423 17.1352 5.39992 16.952 2.40472 13.9558C-0.727511 10.8225 -0.874791 5.5614 2.40472 2.399ZM12.8023 3.55468C10.2501 1.00162 6.1122 1.00162 3.56001 3.55468C1.00782 6.10774 1.00782 10.2471 3.56001 12.8001C6.1122 15.3532 10.2501 15.3532 12.8023 12.8001C15.3545 10.2471 15.3545 6.10774 12.8023 3.55468Z"
            fill="#DB8539"
          />
        </svg>
        <span className="leading-none">Search</span>
      </Button>
    </div>
  );
}

export default VirtualSearch;
