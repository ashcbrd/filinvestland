"use client"

import React, { useState, useContext, useEffect } from "react";

const Context = React.createContext({} as any);
const UpdateContext = React.createContext({} as any);

export function getters() {
    return useContext( Context );
}

export function setters() {
    return useContext( UpdateContext );
}

export default function CommonProvider({ children, header, footer, floating }: any) {
    const [headerContents, setHeaderContents] = useState(header);
    const [footerContents, setFooterContents] = useState(footer);
    const [floatingContents, setFloatingContents] = useState(floating);

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
    
    return (
        <Context.Provider value={{
            headerContents,
            footerContents,
            floatingContents
        }}>
            <UpdateContext.Provider value={{
                setFooterContents,
                setHeaderContents,
                setFloatingContents
            }}>
                { children }
            </UpdateContext.Provider>
        </Context.Provider>
    )
}