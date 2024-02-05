import React from "react";

const Section = ({ 
    id,
    children,
    fw = false,
    className = "",
    style = {}
}: {
    id?: string,
    children?: any,
    fw?: any,
    className?: string,
    style?: any
}) => {
    return (
        <div id={ id } className={`section ${ className }`} style={ style }>
            { fw && children }
            { !fw && (
                <div className="container">
                    { children }
                </div>
            )}
        </div>
    )
}

export default Section;