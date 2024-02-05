"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useContext, useEffect } from "react";

const Context = React.createContext({} as any);
const UpdateContext = React.createContext({} as any);

export function getters() {
  return useContext(Context);
}

export function setters() {
  return useContext(UpdateContext);
}

export default function ProjectProvider({ children }: any) {
  const [featuredSelected, setFeaturedSelected] = useState(null);
  const [inquireTo, setInquireTo] = useState(null);
  const [generalInquiry, setGeneralInquiry] = useState(false);
  const [searchInquiry, setSearchInquiry] = useState(null);

  const [projects, setProjects] = useState({
    count: 0,
    hasNextPage: false,
    list: [],
    loader: true,
  });

  const [filteredProjects, setFilteredProjects] = useState({
    count: 0,
    list: [],
    loader: false,
  });

  const [filters, setFilters] = useState({
    keyword: "",
    type: {} as any,
    location: {} as any,
    price: null as any,
    noResult: [],
  });

  const onSetInquireTo = (v: any) => {
    setSearchInquiry(null);
    setInquireTo(v);
  };

  const searchParams = useSearchParams();
  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const keyword = params.get("keyword");
    const location = params.get("location");
    const type = params.get("propertyType");

    setFilters((fs: any) => ({
      ...fs,
      keyword: searchParams?.get("keyword") ?? "",
      location: searchParams?.get("location") ?? "",
      type: searchParams?.get("type") ?? "",
    }));
  }, [searchParams]);

  return (
    <Context.Provider
      value={{
        featuredSelected: featuredSelected,
        inquireTo: inquireTo,
        generalInquiry: generalInquiry,
        searchInquiry: searchInquiry,
        filters,
        filteredProjects,
        projects,
      }}
    >
      <UpdateContext.Provider
        value={{
          setFeaturedSelected,
          setGeneralInquiry,
          setInquireTo: onSetInquireTo,
          setSearchInquiry,
          setFilters,
          setFilteredProjects,
          setProjects,
        }}
      >
        {children}
      </UpdateContext.Provider>
    </Context.Provider>
  );
}
