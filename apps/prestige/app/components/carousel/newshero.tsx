"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import styled from "styled-components";
import { Typography } from "@/app/components/typography/typography";

// const circleIcon = (
//   <>
//     <svg
//       width="16px"
//       height="16px"
//       viewBox="0 0 24 24"
//       fill="#fff"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//       <g
//         id="SVGRepo_tracerCarrier"
//         stroke-linecap="round"
//         stroke-linejoin="round"
//       ></g>
//       <g id="SVGRepo_iconCarrier">
//         {" "}
//         <path
//           d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
//           stroke="#000000"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         ></path>{" "}
//       </g>
//     </svg>
//   </>
// );

interface Props {
  data: any[];
  opacity?: string;
  type:string;
}

const NewsHero = ({ data, type }: Props) => {
  const [current, setCurrent] = useState(0);
  const length = data.length;
  const autoSlideInterval = 8000; // Change slide every 5 seconds (adjust as needed)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  // const prevSlide = () => {
  //   setCurrent((prev) => (prev - 1 + length) % length);
  // };

  useEffect(() => {
    const autoSlideTimer = setTimeout(nextSlide, autoSlideInterval);

    return () => {
      clearTimeout(autoSlideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }

  return (
    <StyledCarousel className="relative min-h-[840px] w-full">
      {data &&
        data.map((item, index) => {
          return (
            <div
              key={index}
              className={cn(
                { ["ACTIVE_" + current]: index === current },
                "absolute inset-0",
                index === current ? "visible opacity-100" : "invisible opacity-0"
              )}
            >
              <div className="relative flex h-full w-full items-end px-4 py-16 transition-all sm:px-8 sm:py-20 md:px-12 md:py-[100px] lg:items-start">
                <div
                  className={cn(
                    "absolute inset-0 h-full w-full bg-cover bg-top bg-no-repeat transition-all before:absolute before:inset-0 before:bg-[#130A01]/80 before:content-['']",
                    index === current ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    backgroundImage: `url(${item.Project?.coverImage?.url})`,
                  }}
                />
                <div className="relative mx-auto flex h-full w-full max-w-[1650px] items-end justify-start">
                  {item.Project?.title && (
                    <div className="space-y-12 pb-12">
                      <div className="space-y-4">
                        <Typography
                          color="white"
                          size="16"
                          font="nunito"
                          text="Featured"
                          className="uppercase"
                        />
                        <Typography
                          color="light"
                          font="cormorant"
                          size="heading2"
                          text={item?.Project?.title}
                          className="leading-none"
                        />
                        <Typography
                          color="white"
                          size="20"
                          text={String(item?.Project?.shortDescription)}
                        />
                      </div>
                      <Typography
                        color="white"
                        size="20"
                        text={item?.oferringText}
                      />
                      <div className="">
                        <Link
                          // href={`/news/${item.Project?.slug}`}
                          href={`/${type}/${item?.Project?.slug}`}
                          className=" py-2 text-lg font-normal tracking-wide text-white underline sm:py-4 sm:text-xl"
                        >
                          Continue Reading
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

      <div className="carousel-indicators absolute bottom-7 h-auto w-full px-4 transition-all sm:bottom-8 sm:px-8 md:bottom-12 md:px-12">
        <div className="relative mx-auto h-full w-full max-w-[1650px]">
          <div className="ml-auto mr-auto flex h-auto w-full max-w-[625px] items-center justify-center gap-3 transition-all lg:mr-0 lg:justify-end">
            {/* Previous Button */}
            {length > 1 && (
              <button
                // onClick={prevSlide}
                onClick={() => setCurrent(0)}
                className="h-[14px] w-[14px] rounded-full bg-white outline-none transition-all hover:scale-125"
              />
            )}

            {/* Next Button */}
            {length > 1 && (
              <button
                // onClick={nextSlide}
                onClick={() => setCurrent(1)}
                className="h-[14px] w-[14px] rounded-full bg-white outline-none transition-all hover:scale-125"
              />
            )}

            {/* Third Button (assuming you want a total of 3 buttons) */}
            {length > 2 && (
              <button
                onClick={() => setCurrent(2)} // Assuming this button goes to the third slide
                className="h-[14px] w-[14px] rounded-full bg-white outline-none transition-all hover:scale-125"
              />
            )}
          </div>
        </div>
      </div>
    </StyledCarousel>
  );
};

const StyledCarousel = styled.section`
  .ACTIVE_0 ~ .carousel-indicators button:nth-child(1),
  .ACTIVE_1 ~ .carousel-indicators button:nth-child(2),
  .ACTIVE_2 ~ .carousel-indicators button:nth-child(3) {
    background-color: #a0672d !important;
  }

  @media screen and (max-height: 840px) {
    min-height: 100vh;
  }
  @media screen and (max-width: 640px) and (orientation: portrait) {
    min-height: 100vh;
  }
  @media screen and (max-height: 600px) {
    min-height: 600px;
  }
`;

export default NewsHero;
