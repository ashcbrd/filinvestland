import React from "react";
import Link from "next/link";

const CTA = ({
    image,
    content,
    buttonText,
    buttonURL
}: {
    image: string,
    content: string,
    buttonText: string,
    buttonURL: string
}) => {
    return (
        <div className="text-center">
            <div className="pb-[73px] flex items-center justify-center">
                <img src={ image } />
            </div>
            <div className="text-[22px] leading-[27px]">
                <p className="pb-[44px]">{ content }</p>
                <Link href={ buttonURL } className="hover:bg-candy-blue hover:text-aqua-blue transition-all duration-[0.3s] ease-in-out text-[16px] font-[700] tracking-[1.6px] text-center w-full max-w-[353px] h-[67px] flex items-center justify-center mx-auto uppercase text-white border-2 border-candy-blue">{ buttonText }</Link>
            </div>
        </div>
    );
}

export default CTA;