import React from "react";

const Dots = ({
    dotType
}: {
    dotType: string
}) => {
    if( dotType === "thumbnail" ) {
        return (
            <div className="flex">
                
            </div>
        )
    }

    return (
        <div className="flex">

        </div>
    )
}

export default Dots;