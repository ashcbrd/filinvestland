import React from "react";
import Link from "next/link";

const Button = ({
    href,
    children,
    className = "",
    onClick = ""
}: {
    className?: string
    href?: string,
    children?: any,
    onClick?: any
}) => {
    const classes : string = className + " transition-all ease-in-out duration-[0.3s] bg-aqua-blue text-white text-[16px] py-[17px] px-[36px] border-[1px] border-aqua-blue hover:bg-transparent hover:text-aqua-blue";

    if( href ) {
        return (
            <Link className={ classes } href={ href }>{ children }</Link>
        )
    }

    return (
        <button onClick={ onClick } className={ classes }>{ children }</button>
    )
}

export default Button;