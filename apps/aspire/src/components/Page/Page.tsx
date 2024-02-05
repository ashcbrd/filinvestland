"use client"

import { setters } from "@/context/Common";
import { useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const Page = ({
    id,
    children,
    className = "",
    header,
    footer,
    disableHeader
}: {
    id: string,
    children: any,
    className?: string,
    header?: any,
    footer?: any,
    disableHeader?: any
}) => {
    const methods = setters();

    return (
        <div id={ id } className={ className }>
            {!disableHeader && <Header />}
            { children }
            <Footer />
        </div>
    )
}

export default Page;