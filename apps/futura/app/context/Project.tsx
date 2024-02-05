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
  const searchParams = useSearchParams();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    function successFunction(position: any) {
      console.log(position);
    }

    function errorFunction() {
      console.log("Unable to retrieve your location.");
    }
  }, []);

  const [projects, setProjects] = useState([] as any);
  const [filters, setFilters] = useState({
    keyword: "",
    type: null as any,
    location: null as any,
    price: 10000000,
  });

  const [filteredProjects, setFilteredProjects] = useState({
    count: 0,
    list: [],
    loader: false,
  });

  useEffect(() => {
    setFilters((fs: any) => ({
      ...fs,
      keyword: searchParams?.get("keyword"),
      location: searchParams?.get("location"),
      type: searchParams?.get("propertyType"),
      price: searchParams?.get("price"),
    }));
  }, [searchParams]);

  return (
    <Context.Provider
      value={{
        filters,
        projects,
        filteredProjects,
      }}
    >
      <UpdateContext.Provider
        value={{
          setFilters,
          setProjects,
          setFilteredProjects,
        }}
      >
        {children}
      </UpdateContext.Provider>
    </Context.Provider>
  );
}
