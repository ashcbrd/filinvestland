"use client";
import React, { useState } from "react";
import PropertySearch from "@/components/search/PropertySearch";
import useAnimation from "../../../hooks/useAnimation";
import FadeDown from "@/components/animation/FadeDown";
import { useSearchParams } from "next/navigation";
import { T_SearchQuery } from "@/types/global";

const LookingForProperty = ({ content }: any) => {
  const { container } = useAnimation("#anim-text");
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<any>({
    propertyType: searchParams?.get("propertyType") || "",
    location: searchParams?.get("location") || "",
    unitSize: searchParams?.get("unitSize") || "",
    priceRange: searchParams?.get("priceRange")?.split(",") || "",
    bedrooms: searchParams?.get("bedrooms") || "",
    subLocation: searchParams?.get("subLocation") || "",
  });

  const getFilterData = (query: T_SearchQuery) => {
    setFilter(query);
  };

  return (
    <section ref={container} className="mx-6 pt-28 lg:mx-0">
      <h2
        id="anim-text"
        className="mt-2 text-center text-3xl font-extrabold text-jet md:text-4xl lg:text-[6vh] lg:leading-[6vh]"
      >
        {content?.content[2].title}
      </h2>
      <h4
        id="anim-text"
        className="mt-4 text-center text-dim-gray md:px-[30vw] lg:mt-[2vh] lg:text-[2.2vh]"
      >
        {content?.content[2].description}
      </h4>
      <FadeDown>
        <PropertySearch params={filter} getFilterData={getFilterData} />
      </FadeDown>
    </section>
  );
};

export default LookingForProperty;
