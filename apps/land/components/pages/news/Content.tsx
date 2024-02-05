"use client";
import Grid from "@/components/svg/Grid";
import List from "@/components/svg/List";
import React, { useEffect, useState } from "react";
import NewsTileList from "./NewsTileList";
import SelectCategory from "@/components/select/SelectCategory";
import useGetNewsByCategory from "@/components/list/hooks/useGetNewsByCategory";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination/Pagination";
import { NewsCategory } from "shared-types";
import useGetScreen from "../../../hooks/useGetScreen";
import { useRouter } from "next/navigation";
import SelectOrder from "@/components/select/SelectOrder";

const Content = ({
  categories,
  category,
  slug,
  searchParams,
}: {
  categories: NewsCategory[];
  category?: string;
  slug?: string;
  searchParams?: any;
}) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>(
    category ?? ""
  );
  const router: any = useSearchParams();
  const navigate = useRouter();
  const type_tag = router.get("type_tag");
  const property_type_tag = router.get("property_type");
  const location_tag = router.get("location_tag");
  const brand = router.get("brand");
  const [newType, setNewsType] = useState("");
  const [position, setPosition] = useState<"list" | "grid">("grid");
  const [pageNumber, setPageNumber] = useState(1);
  const params = useSearchParams();
  const screen = useGetScreen();
  const [orderBy, setOrderBy] = useState("Latest");
  const { data, isFetching } = useGetNewsByCategory(
    {
      projectType: selectedPropertyType,
      sort: orderBy === "Latest" ? "-publishedDate" : "publishedDate",
    },
    pageNumber,
    { type_tag: selectedPropertyType, property_type_tag, location_tag, brand }
  );

  const categoriesString =
    categories?.length > 0
      ? categories?.map((category: any) => {
          return category.title;
        })
      : [];

  const orderByList = ["Latest", "Oldest"];

  useEffect(() => {
    const category = params?.get("category");
    if (category) setSelectedPropertyType(category);
  }, [params]);

  return (
    <section className="mx-9 my-12 gap-9 xl:mx-16 xl:my-24 2xl:mx-44">
      <div className="mb-2 flex w-full items-center justify-between pb-8">
        <SelectOrder list={orderByList} value={orderBy} handleChange={setOrderBy} />
        <div className="flex items-center justify-end gap-7">
          <List
            color={position === "list" ? "#0550E3" : "#303030"}
            className="hidden hover:cursor-pointer focus:cursor-pointer md:block"
            onClick={() => setPosition("list")}
          />
          <Grid
            color={position === "grid" ? "#0550E3" : "#303030"}
            className="hidden hover:cursor-pointer focus:cursor-pointer md:block"
            onClick={() => setPosition("grid")}
          />
          <SelectCategory
            navigate={navigate}
            values={categoriesString}
            defaultValue={selectedPropertyType ?? "All"}
            onValueChange={setSelectedPropertyType}
            paramValue={type_tag}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
      {!isFetching && data && data?.docs?.length != null ? (
        <>
          <h3 className="text-2xl text-jet">
            {`${selectedPropertyType == "" ? "" : `Showing ${data && data.docs.length} of ${data && data.totalDocs} ${category ?? ""}`}`}
            <NewsTileList news={data.docs} position={position} expandHeight={true} category={selectedPropertyType.toLowerCase()} />
          </h3>
          <Pagination
            currentPage={searchParams?.page ? Number(searchParams?.page) : pageNumber}
            setPage={setPageNumber}
            action={(page: number) => {
              navigate.push(`/${slug ? slug : "news"}?page=${page}`);
            }}
            totalPages={data ? data.totalPages : 0}
            size={screen.width <= 425 ? 5 : 10}
          />
        </>
      ) : (
        <h3 className="min-h-[600px] text-2xl text-jet">Loading...</h3>
      )}
    </section>
  );
};

export default Content;
