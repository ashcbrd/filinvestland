"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import styled from "styled-components";
import Button from "../general/button";
import { Typography } from "../typography/typography";

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

// const circleIconActive = (
//   <>
//     <svg
//       width="16px"
//       height="16px"
//       viewBox="0 0 24 24"
//       fill="#A0672D"
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
}

const HomeHero = ({ data }: Props) => {
  const [current, setCurrent] = useState(0);
  const length = data.length;
  const autoSlideInterval = 80000; // Change slide every 5 seconds (adjust as needed)

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
  // console.log("dd", current);

  return (
    <StyledHeroSection className="relative min-h-screen lg:min-h-fit h-auto lg:h-[764px] xl:h-[917px] 2xl:h-[1146px] w-full transition-all">
      {data &&
        data.map((item, index) => (
          <div
            key={index}
            className={cn(
              { ["ACTIVE_" + current]: index === current },
              "absolute inset-0",
              index === current ? "visible opacity-100" : "invisible opacity-0"
            )}
          >
            <div className="relative flex h-full w-full items-end px-8 py-16 transition-all sm:px-12 sm:py-20 md:px-16 md:py-[100px] md:pt-[180px] lg:items-start">
              <div
                className={cn(
                  "absolute inset-0 h-full w-full bg-cover bg-top bg-no-repeat transition-all before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/60 before:via-black/30 before:via-30% before:to-transparent before:content-[''] before:lg:bg-gradient-to-r before:lg:via-50%",
                  index === current ? "opacity-100" : "opacity-0"
                )}
                style={{
                  backgroundImage: `url(${item?.prestigeProject?.headerImage?.url})`,
                }}
              />
              <div className="relative mx-auto h-full w-full max-w-[1650px]">
                  <div className="ml-auto mr-auto flex h-full w-full max-w-[625px] items-end transition-all lg:mr-0 lg:items-start">
                  {item.prestigeProject?.title && (
                    <div
                      className={cn(
                        "relative w-full grid gap-4 mb-12 text-center transition-all lg:text-left",
                        item.oferringText
                          ? "grid-rows-[auto,_1fr,_auto,_auto]"
                          : "grid-rows-[auto,_1fr,_auto]"
                      )}
                    >
                      <Typography
                        text={item.prestigeProject?.title}
                        color="light"
                        font="cormorant"
                        size="heading2"
                        className="leading-none text-center lg:text-left"
                      />
                      {item.prestigeProject.descriptiveOverview[0] && (
                        <Typography
                          text={
                            item.prestigeProject.descriptiveOverview[0]
                              .children[0].text
                          }
                          color="white"
                          size="20"
                          font="nunito"
                          className="sentence-line-height"
                        />
                      )}

                      <div className="mt-4 mb-6 inline-flex justify-center transition-all lg:mt-12 lg:justify-start">
                        <Link href={item.callToActionLink}>
                          <Button label={item.callToActionText} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="carousel-indicators absolute bottom-7 h-auto w-full px-4 transition-all sm:bottom-8 sm:px-8 md:bottom-12 md:px-12">
        <div className="relative mx-auto h-full w-full max-w-[1650px]">
          <div className="ml-auto mr-auto flex h-auto w-full max-w-[625px] items-center justify-center gap-3 transition-all lg:mr-0 lg:justify-start">
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
    </StyledHeroSection>
  );
};

const StyledHeroSection = styled.section`
  .ACTIVE_0 ~ .carousel-indicators button:nth-child(1),
  .ACTIVE_1 ~ .carousel-indicators button:nth-child(2),
  .ACTIVE_2 ~ .carousel-indicators button:nth-child(3) {
    background-color: #a0672d !important;
  }

  @media screen and (max-height: 850px) {
    .image-name {
      bottom: -4rem !important;
    }
  }

  @media screen and (max-height: 650px) {
    min-height: 650px !important;
    .image-name {
      position: unset !important;
    }
  }
`;

export default HomeHero;
