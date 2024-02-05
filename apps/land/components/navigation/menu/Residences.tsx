"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LocationGroupCategory, PropertyCategory, Site } from "shared-types";
import useGetLocationGroup from "../MainNavigation/hooks/useGetLocationGroup";
import useGetPropertyTypes from "../MainNavigation/hooks/useGetPropertyTypes";
import useGetSites from "../MainNavigation/hooks/useGetSites";
import useGetNavigation from "../MainNavigation/hooks/useGetNavigation";
import usePropertySearch from "@/components/search/hooks/usePropertySearch";
import { getDomainRedirection } from "../../../utils";

const Residences = ({
  property,
  featuredType,
  propertyTypes,
  locationGroupTypes,
  brandsTypes
}: {
  property: any;
  featuredType: string;
  propertyTypes?: any[];
  locationGroupTypes: any[],
  brandsTypes: any[]
}) => {
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    if (window !== undefined) {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <div className="flex divide-x divide-sonic-silver py-8">
      <div className="w-96 flex-none pr-24">
        <h3 className="text-xl text-white">
          {featuredType === "news" ? "Featured News" : "Featured Projects"}
        </h3>
        <Link
          href={`/${featuredType === "news" ? "article" : "projects"}/${property?.value.slug
            }`}
          className="cursor-pointer transition delay-150 hover:opacity-70"
        >
          <h2 className="mt-4 text-4xl text-white">{property?.value?.title}</h2>
          <h4 className="mt-4 text-white opacity-50">
            {featuredType === "news"
              ? property?.value?.shortDescription
              : property?.value?.description}
          </h4>
          <div className="mt-9">
            <Image
              src={`${property?.value?.coverImage?.url || "/filinvest-cover.png"
                }`}
              width={350}
              height={property?.value?.coverImage?.height || 350}
              alt="property"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-1 gap-6 px-24">
        <div className="flex flex-1 flex-col gap-12">
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
                            project: "Residentials",
                            group: location.title,
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
        </div>
        <div className="flex flex-1 flex-col gap-12">
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
                      {brand?.title}
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
      </div>
    </div>
  );
};

export default Residences;
