"use client";

import Link from "next/link";
import ReactSlider from "react-slick";
import { getters } from "@/context/Project";
import cn from "classnames";
import styled from "styled-components";
import { Typography } from "../typography/typography";
import Button from "../general/button";
import { useState } from "react";

const PortfolioCarousel = ({
  featured,
  isfor,
  sliderRef,
}: {
  featured?: any;
  isfor?: any;
  sliderRef?: any;
}) => {
  const get = getters();
  const [selected, setSelected] = useState(null as any);
  const f =
    isfor === "virtual"
      ? (featured.map((proj: any) => ({
          ...proj.featuredVirtualTour,
          slideType: "featured",
          featured: proj.featuredVirtualTour,
        })) as any)
      : (featured.map((proj: any) => ({
          ...proj.Project,
          slideType: "featured",
          featured: proj,
        })) as any);
  const projects = get.projects.length > 0 ? get.projects : f;
  const settings = {
    dots: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // swipeToSlide: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const firstHeading = (proj: any) => {
    if (proj.descriptiveOverview.length > 0) {
      if (
        (proj.descriptiveOverview[0].type || "").charAt(0) === "h" &&
        proj.descriptiveOverview[0].children.length > 0
      ) {
        return proj.descriptiveOverview[0].children[0].text;
      }
    }

    return null;
  };

  return (
    <>
      <StyledSlider className="h-auto w-full">
        <ReactSlider ref={sliderRef} {...settings} className="h-auto w-full">
          {projects.map((proj: any, index: number) => (
            <div key={index}>
              <div
                //  before:via-black/30 before:via-30%
                className="relative flex h-[730px] w-full items-end bg-cover bg-fixed bg-center bg-no-repeat px-8 py-16 transition-all before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/70 before:to-black/30 before:content-[''] sm:px-12 sm:py-20 md:px-16 md:py-[100px] lg:items-start before:lg:bg-gradient-to-r 2xl:h-[982px]"
                style={{ backgroundImage: `url(${proj?.headerImage?.url})` }}
              >
                <div className="ml-auto mr-auto flex h-full w-full max-w-[900px] items-end transition-all lg:ml-0 lg:items-start">
                  {proj.slideType === "featured" && (
                    <div
                      className={cn(
                        "relative mb-12 grid gap-4 text-center transition-all lg:text-left",
                        proj?.featured?.oferringText
                          ? "grid-rows-[auto,_1fr,_auto,_auto]"
                          : "grid-rows-[auto,_1fr,_auto]"
                      )}
                    >
                      <Typography
                        color="light"
                        font="cormorant"
                        size="heading2"
                        className="leading-none"
                        text={proj?.featured?.location?.title}
                      />
                      {isfor !== "virtual" ? (
                        <Typography
                          color="white"
                          size="20"
                          font="nunito"
                          className="sentence-line-height line-clamp-5"
                          text={proj?.featured?.description}
                        />
                      ) : (
                        <>
                          <Typography
                            color="white"
                            size="20"
                            font="nunito"
                            text={
                              proj?.descriptiveOverview[0]?.children[0]?.text
                            }
                            className="sentence-line-height line-clamp-5"
                          />
                          {/* {proj.descriptiveOverview
                            .slice(
                              firstHeading(proj) ? 1 : 0,
                              firstHeading(proj) ? 4 : 3
                            )
                            .map((desc: any) => (
                              <>
                                {desc.children.map((t: any) => (
                                  <Typography
                                    color="white"
                                    size="20"
                                    font="nunito"
                                    text={t.text}
                                    className="sentence-line-height line-clamp-5"
                                  />
                                ))}
                              </>
                            ))} */}
                        </>
                      )}
                      <Typography
                        color="light"
                        size="20"
                        font="nunito"
                        className="sentence-line-height lg:mt-10"
                        text={proj?.featured?.oferringText}
                      />
                      <div className="mt-4 inline-flex justify-center transition-all lg:mt-12 lg:justify-start">
                        {isfor === "virtual" ? (
                          <Button
                            label={"View Virtual Tour"}
                            onClick={() => setSelected(proj)}
                          />
                        ) : (
                          <Link href={`/project/${proj?.slug}`}>
                            <Button label={proj?.title} />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}

                  {proj.slideType !== "featured" && (
                    <div className="relative mb-12 grid grid-rows-[auto,_1fr,_auto] gap-4 text-center transition-all lg:text-left">
                      <Typography
                        color="light"
                        font="cormorant"
                        size="heading2"
                        className="leading-none"
                        text={
                          firstHeading(proj) ? firstHeading(proj) : proj?.title
                        }
                      />
                      <Typography
                        color="white"
                        size="20"
                        font="nunito"
                        text={proj?.descriptiveOverview[0]?.children[0]?.text}
                        className="sentence-line-height line-clamp-5"
                      />
                      {/* {proj.descriptiveOverview
                        .slice(
                          firstHeading(proj) ? 1 : 0,
                          firstHeading(proj) ? 4 : 3
                        )
                        .map((desc: any) => (
                          <>
                            {desc.children.map((t: any) => (
                              <Typography
                                color="white"
                                size="20"
                                font="nunito"
                                text={t.text}
                                className="sentence-line-height line-clamp-5"
                              />
                            ))}
                          </>
                        ))} */}
                      <div className="mt-4 inline-flex justify-center transition-all lg:mt-12 lg:justify-start">
                        {isfor === "virtual" ? (
                          <Button
                            onClick={() => setSelected(proj)}
                            label="View Virtual Tour"
                          />
                        ) : (
                          <Link href={`/project/${proj?.slug}`}>
                            <Button label={"View Details"} />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-[34px] right-8 w-[calc(100%-210px)] truncate text-right text-base leading-[30px] text-white sm:bottom-[50px] sm:right-12 md:bottom-[80px] md:right-16 lg:text-[20px]">
                  {proj?.title}, {proj?.location?.title}
                </div>
              </div>
            </div>
          ))}
        </ReactSlider>
      </StyledSlider>
      {selected && (
        <>
          <style>
            {`header {
                        opacity: 0 !important;
                    }
                    
                    header * {
                        opacity: 0 !important;
                        pointer-events: none;
                    }`}
          </style>
          <div
            className={`fixed bottom-0 left-0 right-0 top-0 z-[9] !m-[0] bg-black`}
          >
            <iframe
              src={`${selected?.virtualTourEmbedUrls?.[0]?.virtualTourEmbedUrl}&play=1&brand=0&dh=0&mls=0&mt=1&title=0&search=0`}
              className={`absolute bottom-0 left-0 right-0 top-0 !m-[0] h-[100%]`}
              width="100%"
            />
          </div>
          <button
            onClick={() => {
              setSelected(null);
            }}
            className="fixed right-[0] top-[0] z-[25] !m-0"
          >
            <svg
              width="126"
              height="111"
              viewBox="0 0 126 111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_836_2807)">
                <ellipse
                  cx="63"
                  cy="58"
                  rx="21"
                  ry="20"
                  transform="rotate(-180 63 58)"
                  fill="white"
                />
                <path
                  d="M42.5 58C42.5 47.2532 51.6549 38.5 63 38.5C74.3451 38.5 83.5 47.2532 83.5 58C83.5 68.7468 74.3451 77.5 63 77.5C51.6549 77.5 42.5 68.7468 42.5 58Z"
                  stroke="#E2E2E2"
                />
              </g>
              <line
                x1="57.3536"
                y1="51.6464"
                x2="70.3536"
                y2="64.6464"
                stroke="black"
              />
              <line
                y1="-0.5"
                x2="18.3848"
                y2="-0.5"
                transform="matrix(-0.707107 0.707107 0.707107 0.707107 70 52)"
                stroke="black"
              />
              <defs>
                <filter
                  id="filter0_d_836_2807"
                  x="0"
                  y="0"
                  width="126"
                  height="124"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feMorphology
                    radius="2"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect1_dropShadow_836_2807"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="20" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_836_2807"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_836_2807"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </button>
        </>
      )}
    </>
  );
};

const StyledSlider = styled.section`
  opacity: 100;
  .slick-slider {
    .slick-dots {
      left: 2rem;
      bottom: 34px;
      width: auto;
      height: 30px;
      display: flex !important;
      align-items: center;
      gap: 0.75rem;

      li {
        margin: 0 !important;
        transition-property: all;
        transition-duration: 150ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        &:focus,
        &:hover {
          transform: scale(1.4);
        }
        &:active {
          transform: scale(1);
        }
      }

      @media screen and (min-width: 640px) {
        left: 3rem;
        bottom: 50px;
      }
      @media screen and (min-width: 768px) {
        left: 4rem;
        bottom: 80px;
      }
    }
  }
`;
export default PortfolioCarousel;
