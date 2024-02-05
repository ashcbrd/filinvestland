"use client";

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
    const [projects, setProjects] = useState([] as any);
    const [filters, setFilters] = useState({
        location: null,
        type: null,
        project: null
    } as any);

    return (
        <Context.Provider
            value={{
                filters,
                projects,
            }}
        >
        <UpdateContext.Provider
            value={{
                setFilters,
                setProjects,
            }}
        >
            {children}
        </UpdateContext.Provider>
    </Context.Provider>
  );
}
