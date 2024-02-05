import React from "react";

const Testimonial = ({
    content,
    headshot,
    author
}: {
    content: string,
    headshot: string,
    author: string
}) => {
    return (
        <div className="relative bg-candy-blue text-center pt-[48px] leading-[28px] px-[44px] pb-[33px]">
            <div className="absolute top-0 translate-y-[-50%] left-0 right-0 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="39" viewBox="0 0 49 39" fill="none">
                    <path d="M9.64767 0H19.38L12.7789 18.9935H19.8031V39H0V20.8507L9.64767 0ZM38.8446 0H48.5769L41.9758 18.9935H49V39H29.1969V20.8507L38.8446 0Z" fill="#72CCEA"/>
                </svg>
            </div>
            <p className="pb-0">{ content }</p>
            <div className="flex flex-col justify-center items-center pt-[29px]">
                <img src={ headshot } width={ 48 } />
                <strong className="text-[20px] font-[400] mt-[7px]">{ author }</strong>
            </div>
        </div>
    );
}

export default Testimonial;