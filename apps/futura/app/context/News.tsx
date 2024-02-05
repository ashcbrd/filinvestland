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

export default function NewsProvider({ children, news }: any) {
    const searchParams = new URLSearchParams(window.location.search);
    
    const [n, setNews] = useState(news);
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

    useEffect(() => {
        setKeyword(searchParams.get("keyword") || "");
    }, []);

    return (
        <Context.Provider
            value={{
                news: n,
                keyword
            }}
        >
        <UpdateContext.Provider
            value={{
                setNews,
                setKeyword
            }}
        >
            {children}
        </UpdateContext.Provider>
        </Context.Provider>
    );
}
