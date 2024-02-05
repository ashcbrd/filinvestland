import React from "react";

const Overlay = ({ 
    className,
    onClick
}: {
    className?: string,
    onClick?: any
}) => {
    const classes = className + " absolute top-0 bottom-0 right-0 left-0 " + (!onClick ? "pointer-events-none" : "");

    return (
        <div className={ classes } onClick={ onClick }></div>
    )
}

export default Overlay;