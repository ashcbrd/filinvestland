"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ChevronRight from "@/components/svg/ChevronRight";
import useGetLocationGroup from "../MainNavigation/hooks/useGetLocationGroup";
import useGetPropertyTypes from "../MainNavigation/hooks/useGetPropertyTypes";
import useGetSites from "../MainNavigation/hooks/useGetSites";
import { LocationGroupCategory, PropertyCategory, Site } from "shared-types";
import { SEARCH_PARAM_MAP } from "@/helpers/constants";
import { encode } from "@/helpers/getProperties";
import useGetNavigation from "../MainNavigation/hooks/useGetNavigation";
import usePropertySearch from "@/components/search/hooks/usePropertySearch";
import { getDomainRedirection } from "../../../utils";

type T_OurBusinessesMenu = {
  title: string;
  subTitle?: string;
  link: string;
  featured: any;
  newTab: boolean;
};
const OurBusinesses = ({
  ourBusinessesMenu,
  propertyTypes,
  locationGroupTypes,
  brandsTypes
}: {
  ourBusinessesMenu?: T_OurBusinessesMenu[];
  propertyTypes?: any[];
  locationGroupTypes: any[],
  brandsTypes: any[]
}) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedFeatured, setSelectedFeatured] = useState<any>(null);
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    if (
      selectedMenu === "" &&
      ourBusinessesMenu &&
      ourBusinessesMenu?.length > 0
    ) {
      setSelectedMenu(ourBusinessesMenu[0].title);
    }
    if (ourBusinessesMenu && ourBusinessesMenu?.length > 0) {
      const menu = ourBusinessesMenu.find(
        (menu) => menu.title === selectedMenu
      );


      setSelectedFeatured(menu?.featured);
    }
  }, [ourBusinessesMenu, selectedMenu]);

  useEffect(() => {
    if (window !== undefined) {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <div className="flex divide-x divide-sonic-silver py-8">
      <div className="max-h-[500px] flex-none overflow-hidden pr-24 hover:overflow-auto">
        {ourBusinessesMenu &&
          ourBusinessesMenu.map(
            (routes: T_OurBusinessesMenu, index: number) => {
              return (
                <div key={index} className={`${index > 0 && "mt-9"}`}>
                  <Link
                    href={`/our-businesses/${encode(
                      encodeURIComponent(routes.title.toLowerCase())
                    )}`}
                    target={routes.newTab ? "_blank" : "_self"}
                    className={`cursor-pointer text-white transition delay-150 ${routes.title === "Residentials" &&
                      selectedMenu === "Residentials"
                      ? "opacity-70"
                      : "hover:opacity-70"
                      }`}
                    onMouseEnter={() => setSelectedMenu(routes.title)}
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl text-white">{routes.title}</h3>
                      {selectedMenu === routes.title &&
                        routes.title === "Residentials" ? (
                        <ChevronRight />
                      ) : null}
                    </div>
                    <h4 className="text-white opacity-50">{routes.subTitle}</h4>
                  </Link>
                </div>
              );
            }
          )}
      </div>
      <div className="flex flex-1 gap-6 px-24">
        {selectedMenu === "Residentials" ? (
          <>
            <div className="flex flex-1 flex-col gap-12 overflow-hidden hover:overflow-auto">
              <div className="flex gap-24">
                <div className="w-1/3 flex-none">
                  <h3 className="text-xl text-white">Browse by</h3>
                  <h3 className="text-xl text-white">Property Type</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {propertyTypes ? (
                    propertyTypes.map((type: PropertyCategory, index: number) => {
                      return (
                        <Link
                          key={index}
                          className="text-white opacity-50 transition delay-150 hover:opacity-100"
                          href={{
                            pathname: "/projects",
                            query: {
                              project: "Residentials",
                              propertyType: type.title,
                            },
                          }}
                        >
                          {type.title}
                        </Link>
                      );
                    })
                  ) : (
                    <p className="text-white opacity-50 hover:underline">
                      Loading...
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-24">
                <div className="w-1/3 flex-none">
                  <h3 className="text-xl text-white">Browse by</h3>
                  <h3 className="text-xl text-white">Location</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {locationGroupTypes ? (
                    locationGroupTypes.map(
                      (location: LocationGroupCategory, index: number) => {
                        return (
                          <Link
                            key={index}
                            className="text-white opacity-50 transition delay-150 hover:opacity-100"
                            href={{
                              pathname: "/projects",
                              query: {
                                [SEARCH_PARAM_MAP.locationGroup]:
                                  location.title,
                              },
                            }}
                          >
                            {location.title}
                          </Link>
                        );
                      }
                    )
                  ) : (
                    <p className="text-white opacity-50 hover:underline">
                      Loading...
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-24">
                <div className="w-1/3 flex-none">
                  <h3 className="text-xl text-white">Browse by</h3>
                  <h3 className="text-xl text-white">Brand</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {brandsTypes ? (
                    brandsTypes.map((brand: any, index: number) => {
                      return (
                        <Link
                          key={index}
                          className="text-white opacity-50 transition delay-150 hover:opacity-100"
                          href={
                            getDomainRedirection(origin, brand.url) ?? ""
                          }
                          target="_blank"
                        >
                          {brand.title}
                        </Link>
                      );
                    })
                  ) : (
                    <p className="text-white opacity-50 hover:underline">
                      Loading...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className="flex-1">
          <h3 className="text-xl text-white">
            {selectedFeatured?.relationTo === "news"
              ? "News and Awards"
              : "Featured Projects"}

          </h3>
          <Link
            href={`/${selectedFeatured?.relationTo === "news" ? "article" : "projects"
              }/${selectedFeatured?.value.slug}`}
            className="cursor-pointer transition delay-150 hover:opacity-70"
          >
            <h2 className="mt-4 text-4xl text-white">{selectedMenu}</h2>
            <h4 className="mt-4 text-white opacity-70">
              {selectedFeatured?.value.title}
            </h4>
            <p className="mt-6 text-white opacity-50">
              {selectedFeatured?.relationTo === "news"
                ? selectedFeatured?.value.shortDescription
                : selectedFeatured?.value.description}
            </p>
            <div className="mt-9">
              <Image
                src={`${selectedFeatured?.value?.coverImage?.url ||
                  "/filinvest-cover.png"
                  }`}
                width={350}
                height={selectedFeatured?.value?.coverImage?.height || 350}
                alt="property"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurBusinesses;
