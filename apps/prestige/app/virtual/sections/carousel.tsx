"use client";

import React, { useState, useEffect } from "react";
import cn from "classnames";
import styled from "styled-components";
import Button from "@/app/components/general/button";
import { Typography } from "@/app/components/typography/typography";

interface Props {
  data: any[];
  opacity?: string;
}

export const Carousel = ({ data }: Props) => {
  const [showFrame, setShowFrame] = useState(false);
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

  const openFrame = () => {
    setShowFrame(true);
    document.body.style.overflowY = "hidden";
  };

  const closeFrame = () => {
    setShowFrame(false);
    document.body.style.overflowY = "auto";
  };

  return (
    <StyledCarousel className="relative w-full h-[500px] lg:h-[730px] 2xl:h-[982px]">
      {data &&
        data.map((item, index) => {
          if (showFrame)
            return (
              <div className="fixed inset-0 z-[9999] block w-screen h-screen bg-black/50">
                <div className="relative w-full h-full">
                  <button
                    onClick={closeFrame}
                    className="cursor-pointer outline-none absolute top-5 right-5 w-12 h-12 rounded-full bg-black/50 before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-5 before:h-[3px] before:bg-white before:shadow before:rotate-45 after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:w-5 after:h-[3px] after:bg-white after:shadow after:-rotate-45"
                  />
                  <iframe
                    frameBorder="0"
                    src={item?.Project?.virtualTour?.embedUrl}
                    className="w-full h-full"
                  />
                </div>
              </div>
            );

          return (
            <div
              key={index}
              className={cn(
                { ["ACTIVE_" + current]: index === current },
                "absolute inset-0",
                index === current
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              )}
            >
              <div className="relative flex h-full w-full items-end px-8 py-16 transition-all sm:px-12 sm:py-20 md:px-16 md:py-[100px] lg:items-start">
                {item.Project?.headerImage?.url && <div
                  className={cn(
                    "absolute inset-0 h-full w-full bg-cover bg-top bg-no-repeat transition-all before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/60 before:via-black/30 before:via-30% before:to-transparent before:content-[''] before:lg:bg-gradient-to-r before:lg:via-50%",
                    index === current ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    backgroundImage: `url(${item.Project?.headerImage?.url})`,
                  }}
                />}
                <div className="relative mx-auto h-full w-full max-w-[1650px]">
                  <div className="ml-auto mr-auto flex h-full w-full max-w-[625px] items-end transition-all lg:ml-0 lg:items-start">
                    {item.Project?.title && (
                      <div
                        className={cn(
                          "relative grid gap-4 mb-12 text-center transition-all lg:text-left",
                          item.oferringText
                            ? "grid-rows-[auto,_1fr,_auto,_auto]"
                            : "grid-rows-[auto,_1fr,_auto]"
                        )}
                      >
                        <Typography
                          color="light"
                          font="cormorant"
                          size="heading2"
                          className="leading-none"
                          text={item.location?.title}
                        />
                        {item.description && (
                          <Typography
                            color="white"
                            size="20"
                            font="nunito"
                            className="sentence-line-height line-clamp-5"
                            text={item.description}
                          />
                        )}
                        <Typography
                          color="light"
                          size="20"
                          font="nunito"
                          className="sentence-line-height lg:mt-12"
                          text={item.oferringText}
                        />
                        <div className="mt-4 inline-flex justify-center transition-all lg:mt-12 lg:justify-start">
                          <button
                            onClick={openFrame}
                            className="rounded-full bg-[#A0672D] px-6 py-2 font-juana text-lg tracking-wide text-white sm:px-12 sm:py-4 sm:text-xl outline-none"
                          >
                            View Virtual Tour
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <div className="carousel-indicators absolute bottom-7 h-auto w-full px-4 transition-all sm:bottom-8 sm:px-8 md:bottom-12 md:px-12">
        <div className="relative mx-auto h-full w-full max-w-[1650px]">
          <div className="ml-auto mr-auto flex h-auto w-full max-w-[625px] items-center justify-center gap-3 transition-all lg:ml-0 lg:justify-start">
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

const StyledCarousel = styled.div`
  .ACTIVE_0 ~ .carousel-indicators button:nth-child(1),
  .ACTIVE_1 ~ .carousel-indicators button:nth-child(2),
  .ACTIVE_2 ~ .carousel-indicators button:nth-child(3) {
    background-color: #a0672d !important;
  }
`;
