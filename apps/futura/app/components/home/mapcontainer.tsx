"use client";

import React, { useState } from "react";
import { Autocomplete, Slider, TextField } from "@mui/material";
import numbro from "numbro";
import Map from "../map";
import qs from "qs";
import Request from "@/config/Request";

const MapContainer = (props: any) => {
  const { data } = props;
  const [projects, setProjects] = useState(props.projects.docs);
  const [active, setActive] = useState({} as any);
  const [activeLocation, setActiveLocation] = useState(null);
  const [price, setPrice] = useState(20000000);
  const maxPrice = 20000000;

  const [filters, setFilters] = useState({
    location: null,
    type: null,
  } as any);

  const reqQuery = qs.stringify({
    where: {
      _status: { equals: "published" },
      ...(filters.keyword ? { title: { like: filters.keyword } } : {}),
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
      minPrice: { less_than_equal: price },
    },
  });

  const onSearch = async (e: any) => {
    Request()
      .get(`/futura-projects/?limit=100${reqQuery ? `&${reqQuery}` : ""}`)
      .then((res: any) => {
        setProjects((ps: any) => res.data.docs);
      });
  };

  return (
    <div
      id="property-locator"
      className="mx-auto flex h-max w-screen flex-col py-20"
    >
      <section className="w-full">
        <h1 className="text-center font-quicksand text-[35px] font-bold md:text-[45px]">
          Maps of Projects
        </h1>
        <p className="mb-16 mt-2 w-full px-10 text-center md:text-[18px]">
          Find your futura home in accessible locations across the country.
        </p>
        <div className="flex max-h-[607px] w-full flex-col justify-between overflow-hidden md:flex-row">
          <div className="h-max w-full bg-white px-4 md:w-[311px] md:px-0">
            <div
              className="h-full w-full px-[29px] pb-[32px] pt-[29px]"
              style={{ width: "inherit" }}
            >
              <h3 className="font-quicksand text-[22px] font-[700]">
                Property Locator
              </h3>
              <div className="mt-[25px] flex h-max flex-col items-center">
                <div className="mb-[8px] w-full">
                  <Autocomplete
                    disablePortal
                    options={
                      data.location
                        ? data.location
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
                      setFilters((fs: any) => ({
                        ...fs,
                        location: v,
                      }))
                    }
                  />
                </div>
                <div className="mb-[19px] w-full">
                  <Autocomplete
                    disablePortal
                    options={
                      data.propertyTypes
                        ? data.propertyTypes.map((type: any) => ({
                            value: type.propertyType.reference.value.id,
                            label: type.propertyType.reference.value.title,
                          }))
                        : []
                    }
                    renderInput={(params: any) => (
                      <TextField {...params} placeholder="Property Type" />
                    )}
                    onChange={(e: any, v: any) =>
                      setFilters((fs: any) => ({
                        ...fs,
                        type: v,
                      }))
                    }
                  />
                </div>
                <div className="mb-[21px] w-full">
                  <p className="mb-[-15px] text-[16px]">Price</p>
                  <Slider
                    size="small"
                    step={5.5}
                    color="error"
                    value={price}
                    max={maxPrice}
                    onChange={(e: any, v: any) => {
                      setPrice(v);
                    }}
                  />
                  <div className="mt-[5px] flex items-center justify-between">
                    <label className="text-[14px]">
                      {numbro(price).format("0,0.00")}
                    </label>
                    <label className="text-[14px]">
                      {numbro(maxPrice).format("0,0.00")}
                    </label>
                  </div>
                </div>
                <button
                  onClick={onSearch}
                  className="flex h-[44px] w-full items-center justify-center rounded-[50px] bg-[#E12827] text-[15px] font-[600] text-white"
                >
                  Search Property
                </button>
              </div>
            </div>
            <div className="max-h-[289px] overflow-y-scroll bg-[#F9F9F9]">
              {projects &&
                projects.map((x: any) => (
                  <button
                    onClick={() => setActive(x)}
                    className={`flex h-max w-full items-center px-[31px] py-[17px] text-left ${
                      active && active.id === x.id ? "bg-[#FFF3F3]" : ""
                    }`}
                  >
                    <div
                      className="h-[65px] w-[65px] flex-shrink-0 rounded-[10px] bg-black/30 bg-cover bg-center"
                      style={{ backgroundImage: `url(${x.headerImage?.url})` }}
                    />
                    <div className="ml-[17px]">
                      <h3 className="mb-[3px] font-quicksand text-[14px] font-[700]">
                        {x.title}
                      </h3>
                      <p className="font-quicksand text-[12px] uppercase">
                        ₱ {numbro(x.minPrice).format("0.0a")} -{" "}
                        {numbro(x.maxPrice).format("0.0a")}
                      </p>
                      <p className="mb-[7px] font-quicksand text-[12px] font-[500] leading-none text-[#a1a1a1]">
                        {x.location.title}
                      </p>
                      <div className="flex">
                        <p className="mr-[7px] flex items-center font-quicksand text-[10px]">
                          <svg
                            className="mr-[5px]"
                            width="11"
                            height="8"
                            viewBox="0 0 11 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.9544 4.84149V7.50505C10.9544 7.71509 10.7801 7.88556 10.5653 7.88556C10.3506 7.88556 10.1763 7.71509 10.1763 7.50505V7.12454H0.838678V7.50505C0.838678 7.71509 0.664377 7.88556 0.449613 7.88556C0.234848 7.88556 0.0605469 7.71509 0.0605469 7.50505V4.84149C0.0605469 4.21213 0.584229 3.69996 1.22774 3.69996H9.78719C10.4307 3.69996 10.9544 4.21213 10.9544 4.84149Z"
                              fill="#E12827"
                            />
                            <path
                              d="M1.22774 2.93895V0.655899C1.22774 0.445858 1.40205 0.275391 1.61681 0.275391H9.39812C9.61289 0.275391 9.78719 0.445858 9.78719 0.655899V2.93895H8.61999V2.55844C8.61999 2.13874 8.271 1.79742 7.84186 1.79742H6.67466C6.24552 1.79742 5.89653 2.13874 5.89653 2.55844V2.93895H5.1184V2.55844C5.1184 2.13874 4.76941 1.79742 4.34027 1.79742H3.17307C2.74393 1.79742 2.39494 2.13874 2.39494 2.55844V2.93895H1.22774Z"
                              fill="#E12827"
                            />
                          </svg>
                          {x.propertyDetails.numberOfBedrooms}
                        </p>
                        {/* <p className="font-quicksand text-[10px] flex items-center mr-[7px]">
                          <svg
                            className="mr-[4px]"
                            width="11"
                            height="9"
                            viewBox="0 0 11 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.61487 3.00935C4.6932 3.00935 4.77152 2.98324 4.83126 2.93098L4.99448 2.78829C5.114 2.68382 5.114 2.51443 4.99448 2.40995C4.87498 2.30547 4.6812 2.30547 4.56168 2.40995L4.39846 2.55264C4.2051 2.72168 4.3447 3.00935 4.61487 3.00935Z"
                              fill="#E12827"
                            />
                            <path
                              d="M5.92065 3.15203C5.99897 3.15203 6.0773 3.12592 6.13704 3.07366L6.30026 2.93098C6.41978 2.8265 6.41978 2.65712 6.30026 2.55264C6.18076 2.44816 5.98698 2.44816 5.86746 2.55264L5.70423 2.69532C5.51088 2.86436 5.65047 3.15203 5.92065 3.15203Z"
                              fill="#E12827"
                            />
                            <path
                              d="M4.61487 4.15081C4.6932 4.15081 4.77152 4.1247 4.83126 4.07244L4.99448 3.92976C5.114 3.82528 5.114 3.6559 4.99448 3.55142C4.87498 3.44694 4.6812 3.44694 4.56168 3.55142L4.39846 3.6941C4.2051 3.86315 4.3447 4.15081 4.61487 4.15081Z"
                              fill="#E12827"
                            />
                            <path
                              d="M0.677135 5.29228H10.5113C10.6803 5.29228 10.8173 5.1725 10.8173 5.02475C10.8173 4.877 10.6803 4.75722 10.5113 4.75722H10.144V1.41211C10.144 0.740077 9.52206 0.195312 8.75224 0.195312C8.43074 0.195312 8.11711 0.293568 7.86915 0.471387L7.67694 0.609237C7.24685 0.387953 6.68291 0.438498 6.31401 0.76098L5.85236 1.16454C5.73284 1.26902 5.73284 1.4384 5.85236 1.54288L7.00652 2.55182C7.12602 2.65629 7.31981 2.65631 7.43933 2.55182C7.9294 2.12341 7.89896 2.14825 7.901 2.14825C8.2567 1.83731 8.3232 1.36781 8.10052 0.997567L8.2574 0.885061C8.39556 0.785968 8.57011 0.731034 8.74884 0.730392C9.16699 0.727111 9.53194 1.0243 9.53194 1.41211V4.75723C9.21837 4.75723 0.987727 4.75723 0.677135 4.75723C0.508119 4.75723 0.371094 4.87702 0.371094 5.02477C0.371094 5.17251 0.508119 5.29228 0.677135 5.29228Z"
                              fill="#E12827"
                            />
                            <path
                              d="M1.2063 5.82734L1.3367 6.45424C1.53075 7.38724 2.32272 8.11184 3.3295 8.34866V8.73453C3.3295 8.88228 3.46652 9.00206 3.63554 9.00206C3.80455 9.00206 3.94158 8.88228 3.94158 8.73453V8.42947C4.0371 8.43263 7.1623 8.43225 7.24683 8.42947V8.73453C7.24683 8.88228 7.38385 9.00206 7.55287 9.00206C7.72188 9.00206 7.85891 8.88228 7.85891 8.73453V8.34866C8.86568 8.11184 9.65766 7.38724 9.85171 6.45426L9.9821 5.82736H1.2063V5.82734Z"
                              fill="#E12827"
                            />
                          </svg>
                          6
                        </p> */}
                        <p className="flex items-center font-quicksand text-[10px]">
                          <svg
                            className="mr-[6px]"
                            width="10"
                            height="9"
                            viewBox="0 0 10 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.86203 7.10573V7.56404C9.86203 7.65909 9.8025 7.74597 9.70826 7.78847C8.14638 8.49292 6.57064 8.49292 5.00875 7.78847C4.82574 7.70592 4.64296 7.63414 4.46037 7.57308L4.43529 7.27993C4.28646 6.2731 3.83077 5.51948 3.06732 5.03739C2.31841 4.56449 1.46603 4.36095 0.521469 4.42823L0.404297 4.43919V1.54183C0.404297 1.44678 0.463826 1.3599 0.558069 1.3174C1.52365 0.881896 2.49453 0.715625 3.46416 0.8186V1.16546C3.46775 2.07827 3.66936 2.76026 4.08537 3.20848C4.33792 3.48059 4.62729 3.65718 5.14649 3.89809C5.18116 3.91416 5.21677 3.93055 5.26429 3.95234C5.3234 3.97939 5.35578 3.99421 5.38266 4.00655C5.47875 4.05066 5.55002 4.08391 5.62022 4.11759C5.79967 4.20372 5.95035 4.28288 6.09331 4.36805C6.22547 4.4468 6.34852 4.52939 6.46543 4.61884C6.69558 4.79495 6.84603 4.9946 6.97557 5.2671C7.01995 5.36044 7.03545 5.39767 7.12601 5.62235C7.34434 6.16393 7.51545 6.42058 7.91284 6.64703C8.49163 6.97685 9.03999 7.13266 9.55675 7.10574L9.86203 7.10573ZM9.86203 6.60419L9.53109 6.60436C9.14017 6.62635 8.70018 6.5021 8.20995 6.22274C7.946 6.07234 7.8281 5.89549 7.64884 5.45083C7.5539 5.21532 7.53715 5.17509 7.48686 5.0693C7.32575 4.73038 7.12762 4.46745 6.8253 4.23613C6.69086 4.13325 6.55004 4.03873 6.3999 3.94928C6.24069 3.85443 6.07538 3.76757 5.88153 3.67453C5.80781 3.63915 5.73383 3.60464 5.63498 3.55927C5.60779 3.54679 5.57504 3.53179 5.51622 3.50487C5.46947 3.48345 5.43463 3.46742 5.40097 3.4518C4.94306 3.23934 4.70446 3.09373 4.51196 2.88632C4.19298 2.54262 4.02368 1.96998 4.0205 1.16455V0.907257C4.43348 0.995063 4.84602 1.13178 5.25758 1.3174C6.66284 1.95121 8.05423 1.95121 9.45947 1.3174C9.64442 1.23399 9.86205 1.3553 9.86205 1.54183L9.86203 6.60419ZM8.05394 3.80016C8.28439 3.80016 8.4712 3.63165 8.4712 3.42377C8.4712 3.21589 8.28439 3.04738 8.05394 3.04738C7.8235 3.04738 7.63669 3.21589 7.63669 3.42377C7.63669 3.63165 7.8235 3.80016 8.05394 3.80016ZM3.88945 7.41717C2.86208 7.19956 1.83821 7.32333 0.806855 7.78849C0.62192 7.8719 0.404297 7.75058 0.404297 7.56405V4.94365L0.572009 4.928C1.38247 4.87036 2.10637 5.04323 2.7483 5.44856C3.37405 5.84369 3.75253 6.46793 3.88284 7.33945L3.88945 7.41717Z"
                              fill="#E12827"
                            />
                          </svg>
                          {x.propertyDetails.minSize}-
                          {x.propertyDetails.maxSize}sqm
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
          <div className="w-full sm:hidden md:block">
            <Map
              projects={projects}
              active={active}
              activeLocation={activeLocation}
            />
          </div>
        </div>
      </section>
      <div className="w-full sm:block md:hidden">
        <Map
          projects={projects}
          active={active}
          activeLocation={activeLocation}
        />
      </div>
    </div>
  );
};

export default MapContainer;
