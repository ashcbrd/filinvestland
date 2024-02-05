"use client";
import FeaturedArticles from "@/components/list/FeaturedArticles";
import React from "react";
import useGetNews from "../../../hooks/useGetNews";

const RelatedArticles = ({ selectedNews }: { selectedNews: any }) => {
  const query = {
    propertyType: selectedNews?.propertyType?.title
      ? selectedNews.propertyType.title
      : "",
    location: selectedNews?.location?.title ? selectedNews.location.title : "",
    unitSize: "",
    unitSizeFrom: 0,
    unitSizeTo: 0,
    bedroomsFrom: 0,
    bedroomsTo: 0,
    priceRangeFrom: 0,
    priceRangeTo: 0,
    priceRange: [0, 0],
    brand: selectedNews?.brand?.title ? selectedNews.brand.title : "",
    subLocation: selectedNews?.subLocation?.title
      ? selectedNews.subLocation.title
      : "",
    projectType: selectedNews?.projectType?.title
      ? selectedNews.projectType.title
      : "",
    locationGroup: selectedNews?.locationGroup?.title
      ? selectedNews.locationGroup.title
      : "",
    propertyName: "",
    bedrooms: "",
  };
  const { data } = useGetNews({
    searchParams: query,
  });
  return (
    <>
      <div className="mx-6 mt-24 flex w-full items-center gap-8">
        <h3 className="text-jet flex-none text-4xl font-bold">
          Related Articles
        </h3>
        <hr className="w-full flex-1" />
      </div>
      <FeaturedArticles
        className="mb-24 mt-5 w-full lg:mt-10"
        sliderOnMobile
        articles={data ? data : []}
        withExtras={true}
        isTwoLines={true}
      />
    </>
  );
};

export default RelatedArticles;
