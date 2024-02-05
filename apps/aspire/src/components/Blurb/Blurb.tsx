import React from "react";

const Blurb = ({
    image,
    header,
    subheader,
    content,
    contentWidth = null
}: {
    image?: string,
    header: string,
    subheader?: string,
    content: string,
    contentWidth?: any
}) => {
    return (
        <div className="text-center">
            { image && (
                <div className="flex justify-center pb-[26px] max-w-[256px] m-auto">
                    <img src={ image } />
                </div>
            )}
            <div className="leading-[30px] text-[#5F5F5F] mx-auto" style={{ maxWidth: contentWidth ? `${ contentWidth }px` : null as any }}>
                { subheader && <h5 className="uppercase pb-[7px] leading-0">{ subheader }</h5> }
                <div className="max-w-[367px] mx-auto leading-[30px] md:max-w-full">
                    <h3 className="text-[25px] pb-[13px] text-black">{ header }</h3>
                    <p>{ content }</p>
                </div>
            </div>
        </div>
    )
}

export default Blurb;