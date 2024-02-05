"use client";

import Image from "next/image";
import React from "react";
import ReactSlider from "react-slick";

const SinglePropertyBanner = ({ images }: { images?: any }) => {
  const NextArrow = (props: any) => {
    return (
      <div className="absolute right-[10px] top-[44%] z-[1] md:right-[50px] md:top-[83%]">
        <button
          className={`pointer-events-auto flex h-[39px] w-[39px] flex-shrink-0 items-center justify-center rounded-[100%] bg-[#E12827] pt-[3px] transition-all duration-[0.3s] ease-in-out hover:opacity-50`}
          onClick={props.onClick}
        >
          <svg
            width="24"
            height="24"
            className="translate-x-[1px] translate-y-[-1px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 6L15 12L9 18" stroke="#fff" stroke-width="2" />
          </svg>
        </button>
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <div className="absolute left-[10px] top-[44%] z-[1] md:!right-[100px] md:left-[unset] md:top-[83%]">
        <button
          className={`pointer-events-auto mr-[13px] flex h-[39px] w-[39px] flex-shrink-0 items-center justify-center rounded-[100%] bg-[#E12827] pt-[2px] transition-all duration-[0.3s] ease-in-out hover:opacity-50 md:mr-[0]`}
          onClick={props.onClick}
        >
          <svg
            width="9"
            height="14"
            className="translate-x-[-1px] translate-y-[-1px]"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 1L2 7L8 13" stroke="#fff" stroke-width="2" />
          </svg>
        </button>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoPlaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="mx-auto max-w-[1223px] mt-[128px] overflow-hidden rounded-[20px] md:mt-12">
      <ReactSlider {...settings} className="h-full w-full">
        {images?.map((n: any) => (
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              fill
              src={n?.image?.url}
              alt="image"
              objectFit="cover"
              priority
              quality={100}
            />
          </div>
        ))}
      </ReactSlider>
    </div>
  );
};

export default SinglePropertyBanner;
