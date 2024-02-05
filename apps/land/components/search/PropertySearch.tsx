"use client";
import React, { useEffect, useMemo, useState } from "react";
import Search from "@/components/svg/Search";
import { toCurrency } from "@/helpers/homeCalculator";
import MainDropdown from "../dropdown/MainDropdown";
import { useRouter } from "next/navigation";
import SecondaryDropdown from "../dropdown/SecondaryDropdown";
import RangeSliderStep from "../range-sliders/RangeSliderStep";
import MainInput from "../input/MainInput";
import { T_SearchQuery } from "@/types/global";
import usePropertySearch from "./hooks/usePropertySearch";
import { encode } from "@/helpers/getProperties";
import History from "./history/history";
import { getCookie, setCookie } from "cookies-next";

const PropertySearch = ({
  showSearch = true,
  className,
  params,
  getFilterData,
}: {
  showSearch?: boolean;
  className?: string;
  params: T_SearchQuery;
  getFilterData?: Function;
}) => {
  const router = useRouter();

  const {
    locationSettings,
    propertyTypeSettings,
    unitSizeSettings,
    bedroomsSettings,
    subLocationSettings,
    priceRangeSteps,
  } = usePropertySearch();

  const [propertyType, setPropertyType] = useState(params?.propertyType || "");
  const [location, setLocation] = useState(params.location || "");
  const [unitSize, setUnitSize] = useState(params?.unitSize || "");
  const [priceRange, setPriceRange] = useState(
    params?.priceRange || [
      Number(params?.priceRangeFrom) || 0,
      Number(params?.priceRangeTo) || 0,
    ]
  );

  const [propertyName, setPropertyName] = useState(params?.propertyName || "");
  const [bedrooms, setBedrooms] = useState(params?.bedrooms || "");
  const [subLocation, setSubLocation] = useState(params?.subLocation || "");
  const [searching, setSearching] = useState(false);

  const searchCookies = () => {
    let arr = unitSize?.split(" to ");
    let unitStr = "";
    if (arr && arr.length == 2 && Number(arr[1]) > 0) {
      unitStr = `${arr[0]}-${arr[1]}`;
    }

    const type = encode(encodeURIComponent(propertyType));
    const loc = encode(encodeURIComponent(location));

    const recents = getCookie("_searches")
      ? JSON.parse(getCookie("_searches") as any)
      : [];
    if (location && propertyType) {
      setCookie(
        "_searches",
        JSON.stringify([
          ...recents,
          {
            label: `${propertyType} in ${location}`,
            searchParams: `/${type}/${loc}`,
          },
        ])
      );
    } else if (location && !propertyType) {
      setCookie(
        "_searches",
        JSON.stringify([
          ...recents,
          {
            label: `Property in ${location}`,
            searchParams: `/all/${loc}`,
          },
        ])
      );
    } else if (!location && propertyType) {
      setCookie(
        "_searches",
        JSON.stringify([
          ...recents,
          {
            label: propertyType,
            searchParams: `/${type}/all`,
          },
        ])
      );
    }
  };

  const [formattedUnitSizes, setFormattedUnitSizes] = useState<any>([]);
  const [formattedBedroomRange, setFormattedBedroomRange] = useState<any>([]);
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);

  const queryParams = (objParam: any) => {
    if (!objParam?.priceRange[0] && !objParam?.priceRange[1]) {
      delete objParam["priceRange"];
    }
    const params = new URLSearchParams(
      new URLSearchParams(objParam)
        .toString()
        .replace(/(?:\&|^)[^\&]*?\=(?=\&|$)/g, "")
    );

    return params.toString();
  };

  useEffect(() => {
    if (unitSizeSettings && formattedUnitSizes.length === 0) {
      const dataT = unitSizeSettings.map((unitSize) => {
        return {
          text: `${unitSize?.[0]} to ${unitSize[1]}`,
          value: unitSize,
        };
      });
      setFormattedUnitSizes(dataT);
    }
  }, [unitSizeSettings, formattedUnitSizes]);
  useEffect(() => {
    if (bedroomsSettings && formattedBedroomRange.length === 0) {
      const dataT = bedroomsSettings.map((bedroom) => {
        return {
          text: `${bedroom?.[0]} to ${bedroom[1]}`,
          value: bedroom,
        };
      });
      setFormattedBedroomRange(dataT);
    }
  }, [bedroomsSettings, formattedBedroomRange]);
  useEffect(() => {
    if (!isAdvanceSearchOpen && (propertyName || bedrooms || subLocation)) {
      setIsAdvanceSearchOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyName, bedrooms, subLocation]);

  //https://app.asana.com/0/1204059442999640/1204080301274375

  const filteredSublocations = useMemo(() => {
    //@ts-expect-error
    if (subLocationSettings?.length) {
      const settings = subLocationSettings
        //@ts-expect-error
        ?.filter((loc: any) => {
          return loc.mainLocation === location;
        });

      if (settings.length === 0) return [];

      const filtered = settings?.[0].subLocations?.map((subLoc: any) => {
        return subLoc.title;
      });

      return filtered;
    }

    return [];
  }, [subLocationSettings, location]);

  useEffect(() => {
    if (location !== params?.location || !params?.location) {
      setSubLocation("");
    }
  }, [location]);

  const handleSearch = () => {
    router.push(
      `/projects?${queryParams({
        propertyType,
        location,
        unitSize,
        priceRange,
        bedrooms,
        subLocation,
        property: propertyName,
      })}`
    );
    if (getFilterData) {
      getFilterData({
        propertyType,
        location,
        unitSize,
        priceRange,
        bedrooms,
        subLocation,
        property: propertyName,
      });
      searchCookies();
    }
  };

  return (
    <>
      {/* Large Screen */}
      <div
        className={`relative z-40 mx-3 mt-12 hidden bg-dark-cornflower-blue px-10 py-6 lg:mx-9 lg:block xl:mx-16 2xl:mx-44 ${className}`}
      >
        <div className="items-center gap-8 lg:flex">
          <div className="w-full flex-1">
            <h3 className="text-white">Property Type</h3>
            <MainDropdown
              values={propertyTypeSettings}
              defaultValue={params?.propertyType ?? propertyType}
              onValueChange={setPropertyType}
              noneEnabled
            />
          </div>
          <div className="w-full flex-1">
            <h3 className="text-white">Location</h3>
            <MainDropdown
              values={locationSettings}
              defaultValue={params.location ?? location}
              onValueChange={setLocation}
              noneEnabled
            />
          </div>
          <div className="w-full flex-1">
            <h3 className="text-white">Unit Size (sqm)</h3>
            <SecondaryDropdown
              values={formattedUnitSizes}
              defaultValue={params?.unitSize ?? unitSize}
              onValueChange={setUnitSize}
            />
          </div>
          <div className="w-full flex-1">
            <h3 className="mb-1 text-white">Price Range</h3>
            <RangeSliderStep
              steps={priceRangeSteps}
              onValueChange={setPriceRange}
              value={priceRange}
            />
            <h4 className="mt-1 text-sm text-white">
              Php {toCurrency(Number(priceRange[0]))} - Php{" "}
              {toCurrency(Number(priceRange[1]))}
            </h4>
          </div>
          {showSearch && (
            <div className="flex-none">
              <button
                className="delay-50 bg-white px-8 py-4 transition hover:bg-platinum focus:bg-platinum"
                onClick={() => handleSearch()}
              >
                <div className="flex items-center gap-2 font-bold text-dark-cornflower-blue">
                  <Search /> Search
                </div>
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 bg-dark-cornflower-blue pt-6">
          <span
            className={`cursor-pointer text-white hover:underline ${
              isAdvanceSearchOpen && "font-bold underline"
            }`}
            onClick={() => setIsAdvanceSearchOpen(!isAdvanceSearchOpen)}
          >
            Advance Search
          </span>
          {isAdvanceSearchOpen && (
            <div className="flex gap-8">
              <div className="w-full flex-1">
                <h3 className="text-white">Project Name</h3>
                <MainInput
                  placeholder="Write here..."
                  onChange={(e: any) => setPropertyName(e.target.value)}
                  onClick={() => setSearching(true)}
                  onBlur={() => setTimeout(() => setSearching(false), 200)}
                  value={params?.propertyName ?? propertyName}
                />
              </div>
              <div className="w-full flex-1">
                <h3 className="text-white">No. of Bedrooms</h3>
                <SecondaryDropdown
                  values={formattedBedroomRange}
                  defaultValue={params?.bedrooms ?? bedrooms}
                  onValueChange={setBedrooms}
                />
              </div>
              <div className="w-full flex-1">
                <h3 className="text-white">Sub-Location</h3>
                <MainDropdown
                  values={filteredSublocations}
                  defaultValue={subLocation}
                  onValueChange={setSubLocation}
                />
              </div>
            </div>
          )}
        </div>
        <History keyword={propertyName} searching={searching} />
      </div>
      {/* Tablet and Mobile Phone */}
      <div
        className={`mt-12 flex flex-col items-center gap-8 bg-dark-cornflower-blue px-6 py-6 md:px-10 lg:mx-9 lg:hidden xl:mx-16 2xl:mx-44 ${className}`}
      >
        <div className="flex w-full flex-1 flex-col gap-8 md:flex-row">
          <div className="w-full flex-1">
            <h3 className="text-white">Property Type</h3>
            <MainDropdown
              values={propertyTypeSettings}
              defaultValue={params?.propertyType ?? propertyType}
              onValueChange={setPropertyType}
              noneEnabled
            />
          </div>
          <div className="w-full flex-1">
            <h3 className="text-white">Location</h3>
            <MainDropdown
              values={locationSettings}
              defaultValue={params.location ?? location}
              onValueChange={setLocation}
              noneEnabled
            />
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col gap-8 md:flex-row">
          <div className="w-full flex-1">
            <h3 className="text-white">Unit Size(sqm)</h3>
            <SecondaryDropdown
              values={formattedUnitSizes}
              defaultValue={params?.unitSize ?? unitSize}
              onValueChange={setUnitSize}
            />
          </div>
          <div className="w-full flex-1">
            <h3 className="mb-1 text-white">Price Range</h3>
            <RangeSliderStep
              steps={priceRangeSteps}
              onValueChange={setPriceRange}
              value={priceRange}
            />
            <h4 className="mt-1 text-sm text-white">
              Php {toCurrency(Number(priceRange[0]))} - Php{" "}
              {toCurrency(Number(priceRange[1]))}
            </h4>
          </div>
          {showSearch && (
            <div className="flex-none">
              <button
                className="delay-50 w-full bg-white px-8 py-4 transition hover:bg-platinum focus:bg-platinum md:w-auto"
                onClick={() => handleSearch()}
              >
                <div className="flex items-center justify-center gap-2 font-bold text-dark-cornflower-blue md:justify-start">
                  <Search /> Search
                </div>
              </button>
            </div>
          )}
        </div>
        <div className="w-full">
          <span
            className={`cursor-pointer text-white hover:underline ${
              isAdvanceSearchOpen && "font-bold underline"
            }`}
            onClick={() => setIsAdvanceSearchOpen(!isAdvanceSearchOpen)}
          >
            Advance Search
          </span>
          {isAdvanceSearchOpen && (
            <div className="mb-2 mt-6 grid grid-cols-1 gap-8">
              <div className="w-full flex-1">
                <h3 className="text-white">Project Name</h3>
                <MainInput
                  value={params?.propertyName ?? propertyName}
                  placeholder="Write here..."
                  onChange={(e: any) => setPropertyName(e.target.value)}
                />
              </div>
              <div className="w-full flex-1">
                <h3 className="text-white">No. of Bedrooms</h3>
                <SecondaryDropdown
                  values={formattedBedroomRange}
                  defaultValue={params?.bedrooms ?? bedrooms}
                  onValueChange={setBedrooms}
                />
              </div>
              <div className="w-full flex-1">
                <h3 className="text-white">Sub-Location</h3>
                <MainDropdown
                  values={filteredSublocations}
                  defaultValue={subLocation}
                  onValueChange={setSubLocation}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertySearch;
