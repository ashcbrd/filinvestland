"use client";
import TileProjects from "@/components/list/TileProjects";
import PropertySearch from "@/components/search/PropertySearch";
import { T_SearchQuery } from "@/types/global";
import ContentNews from "./ContentNews";
import useGetProjects from "@/components/list/hooks/useGetProjects";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Content = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<any>({
    propertyType: searchParams?.get("propertyType") || "",
    location: searchParams?.get("location") || "",
    unitSize: searchParams?.get("unitSize") || "",
    priceRange: searchParams?.get("priceRange")?.split(",") || "",
    bedrooms: searchParams?.get("bedrooms") || "",
    subLocation: searchParams?.get("subLocation") || "",
    brand: searchParams?.get("brand") || "",
    group: searchParams?.get("group") || "",
    project: searchParams?.get("project") || "",
    property: searchParams?.get("property") || "",
    page: page || "",
  });

  const { data, isLoading } = useGetProjects({
    page,
    propertyType: filter?.propertyType,
    location: filter?.location,
    unitSize: filter?.unitSize,
    priceRange: filter?.priceRange,
    bedroomRange: filter?.bedrooms,
    subLocation: filter?.subLocation,
    brand: filter?.brand,
    group: filter?.group,
    project: filter?.project,
    property: filter?.property,
  });

  const queryParams = (objParam: any) => {
    if (!objParam?.priceRange?.[0] && !objParam?.priceRange?.[1]) {
      delete objParam["priceRange"];
    }
    const params = new URLSearchParams(
      new URLSearchParams(objParam)
        .toString()
        .replace(/(?:\&|^)[^\&]*?\=(?=\&|$)/g, "")
    );

    return params.toString();
  };

  const getFilterData = (query: T_SearchQuery) => {
    setFilter(query);
    setPage(1);
    router.push(`/projects?${queryParams({ ...query, page: 1 })}`);
  };

  const changePage = (number: any) => {
    setPage(number);
    router.push(`/projects?${queryParams({ ...filter, page: number })}`);
  };

  useEffect(() => {
    setFilter({
      propertyType: searchParams?.get("propertyType") || "",
      location: searchParams?.get("location") || "",
      unitSize: searchParams?.get("unitSize") || "",
      priceRange: searchParams?.get("priceRange")?.split(",") || "",
      bedrooms: searchParams?.get("bedrooms") || "",
      subLocation: searchParams?.get("subLocation") || "",
      brand: searchParams?.get("brand") || "",
      group: searchParams?.get("group") || "",
      project: searchParams?.get("project") || "",
      property: searchParams?.get("property") || "",
      page: searchParams?.get("page") || "",
    });
  }, [searchParams]);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <section className="relative z-10 -mt-24 flex flex-col gap-9 2xl:-mt-44">
      <PropertySearch className="mx-9 lg:mx-0" showSearch={true} params={filter} getFilterData={getFilterData} />
      <div className="mx-9 mb-24 mt-16 xl:mx-16 2xl:mx-44">
        <div className="text-xl">
          {isLoading ? "Loading..." : `Showing ${data && data.docs.length} of ${data?.totalDocs} ${data?.totalDocs > 1 ? "Properties" : "Property"}`}
        </div>
        <TileProjects totalPages={data?.totalPages} projects={data?.docs} page={searchParams?.get("page") ?? (page as any)} changePage={changePage} />
      </div>
      <ContentNews params={{}} />
    </section>
  );
};

export default Content;
