"use client";

import React, { useState } from "react";
import Slider from "@/components/Slider/Slider";
import numbro from "numbro";
import Link from "next/link";

const Card = ({
  project = {},
  expandable = true,
  imageClasses = "",
  className = "",
  type = "default",
  arrowClasses = "",
  prevArrowClassName = "",
  nextArrowClassName = "",
  titleClassName = "",
  contentContainerClassName = "",
  onOpenVirtual,
  onCloseVirtual,
}: {
  project?: any;
  expandable?: boolean;
  className?: string;
  imageClasses?: string;
  type?: string;
  arrowClasses?: string;
  prevArrowClassName?: string;
  nextArrowClassName?: string;
  titleClassName?: string;
  contentContainerClassName?: string;
  onOpenVirtual?: any;
  onCloseVirtual?: any;
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const classes = { card: "project-card pb-[57px] " + className };
  const [isSelected, setIsSelected] = useState(false);
  const getVirtualID = (url: any) => {
    if (type === "virtual-tour") {
      const search = url.split("?");

      if (search.length > 1) {
        const params = new URLSearchParams(`?${search[1]}`);
        return params.get("m");
      }
    }

    return null;
  };

  const formatUnitArea = (details: any) => {
    const { minSize, maxSize } = details
    if (maxSize <= minSize) {
      return details?.minSize
    } else {
      return `${details?.minSize} - ${details?.maxSize}`
    }
  }

  return (
    <div className={classes.card}>
      <div className="relative">
        <div className="relative">
          <div className="bg-white">
            {type === "default" && (
              <div>
                <Slider
                  href={`/project/${project.slug}`}
                  slideClassName={`${imageClasses} h-[405px] md:h-[300px]`}
                  arrowType="bottom"
                  slides={project.PropertyImages.map((img: any) => ({
                    image: img.image.url,
                  }))}
                  arrowsClassName={arrowClasses}
                  prevArrowClassName={prevArrowClassName}
                  nextArrowClassName={nextArrowClassName}
                />
              </div>
            )}
            {type === "virtual-tour" && (
              <div className="relative flex h-[405px] items-end overflow-hidden bg-black bg-cover bg-center pb-[27px] pl-[27px] md:!h-[350px]">
                {project.virtualTour && project.virtualTourEmbedUrl && (
                  <>
                    <div
                      className={`pointer-events-none absolute bottom-0 left-0 right-0 top-0 bg-cover bg-center`}
                      style={{
                        backgroundImage: getVirtualID(
                          project.virtualTourEmbedUrls[0].virtualTourEmbedUrl
                        )
                          ? `url(https://my.matterport.com/api/v1/player/models/${getVirtualID(
                              project.virtualTourEmbedUrls[0]
                                .virtualTourEmbedUrl
                            )}/thumb)`
                          : (null as any),
                      }}
                    >
                      {/* <iframe
                                                src={`${project.virtualTourEmbedUrl}&play=1&brand=0&dh=0&mls=0&mt=1&f=0&fp=0&nozoom=1&search=0&wh=0&title=0&vr=0&tour=0&pin=0&portal=0&help=0`}
                                                className={`h-[405px]`}
                                                width="100%"
                                            /> */}
                    </div>
                    {isSelected && (
                      <>
                        <button
                          onClick={() => {
                            setIsSelected(false);
                            onCloseVirtual();
                          }}
                          className="fixed right-[0] top-[0] z-[23]"
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
                                <feFlood
                                  flood-opacity="0"
                                  result="BackgroundImageFix"
                                />
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
                        <div
                          className={`fixed bottom-0 left-0 right-0 top-0 z-[22] bg-cover bg-center`}
                        >
                          <iframe
                            src={
                              project.virtualTourEmbedUrl.includes(
                                "my.matterport.com"
                              )
                                ? `${project.virtualTourEmbedUrl}&play=1&brand=0&dh=0&mls=0&mt=1&title=0&search=0`
                                : project.virtualTourEmbedUrl
                            }
                            className={`h-[100vh]`}
                            width="100%"
                            frameBorder="0"
                            allowFullScreen
                            allow="xr-spatial-tracking"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[144px] bg-virtual-shadow"></div>
                <button
                  onClick={() => {
                    setIsSelected(true);
                    onOpenVirtual();
                  }}
                  className="absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] items-center text-[22px] text-white"
                >
                  <svg
                    className="mr-[17px]"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_792_11215)">
                      <path
                        d="M23.9999 41.7965C27.5917 41.7965 30.6325 37.9063 32.1147 32.1147C37.9063 30.6325 41.7965 27.5917 41.7965 23.9999C41.7965 18.9063 33.9793 14.916 23.9999 14.916C21.8805 14.9103 19.7652 15.1012 17.6811 15.4862C19.0208 10.9167 21.3754 8.60271 23.9999 8.60271C25.372 8.60271 26.5044 8.66161 27.3183 9.55783L26.1455 10.047C25.7379 10.2166 25.545 10.6845 25.7146 11.0922C25.7725 11.2313 25.8685 11.3513 25.9917 11.4381L29.9503 14.2368C30.3111 14.4917 30.8102 14.4059 31.0652 14.0452C31.1397 13.9397 31.1876 13.8177 31.2047 13.6897L31.8343 8.97728C31.8927 8.53938 31.5851 8.13712 31.1472 8.07872C31.0069 8.05998 30.8642 8.07889 30.7337 8.13327L28.867 8.91185C27.428 7.14477 25.7527 6.20312 23.9998 6.20312C20.4079 6.20312 17.3669 10.0932 15.8847 15.8847C10.0932 17.3669 6.20312 20.4079 6.20312 23.9998C6.20312 25.7526 7.14469 27.428 8.91177 28.867L8.13318 30.7337C7.96318 31.1414 8.15594 31.6097 8.56372 31.7797C8.69432 31.8342 8.83697 31.853 8.97719 31.8343L13.6896 31.2047C14.1274 31.1462 14.4349 30.7436 14.3763 30.3058C14.3592 30.1778 14.3113 30.0558 14.2368 29.9503L11.4381 25.9915C11.1835 25.6308 10.6847 25.5448 10.324 25.7994C10.2009 25.8863 10.1048 26.0062 10.0469 26.1453L9.55774 27.3182C8.66153 26.5044 8.60263 25.372 8.60263 23.9999C8.60263 21.3754 10.9166 19.0207 15.4861 17.6807C15.101 19.7649 14.9101 21.8804 14.916 23.9999C14.916 33.9793 18.9063 41.7965 23.9999 41.7965ZM23.9999 16.5158C32.7795 16.5158 39.3969 19.9432 39.3969 23.9999C39.3969 26.6242 37.0828 28.9787 32.5131 30.3187C32.8981 28.2346 33.089 26.1192 33.0832 23.9999C33.104 22.531 33.0126 21.0627 32.8097 19.6078C32.7568 19.1692 32.3583 18.8567 31.9198 18.9096C31.4813 18.9626 31.1687 19.3611 31.2216 19.7996C31.2229 19.8101 31.2244 19.8206 31.226 19.8312C31.4188 21.2121 31.5049 22.6057 31.4834 23.9999C31.487 26.2741 31.246 28.5421 30.7645 30.7647C28.5418 31.2462 26.2739 31.4872 23.9997 31.4837C22.6247 31.5069 21.25 31.4231 19.888 31.233C19.4519 31.1625 19.0413 31.4591 18.9709 31.8951C18.9004 32.3312 19.1969 32.7418 19.633 32.8122C19.6435 32.8139 19.6541 32.8154 19.6646 32.8167C21.1005 33.0181 22.55 33.1072 23.9998 33.0831C26.1192 33.0888 28.2345 32.898 30.3185 32.513C28.9785 37.083 26.624 39.3971 23.9997 39.3971C19.943 39.3971 16.5155 32.7796 16.5155 24C16.5119 21.7257 16.753 19.4576 17.2346 17.2349C19.4574 16.7532 21.7255 16.5121 23.9999 16.5158Z"
                        fill="white"
                      />
                      <path
                        d="M4.00034 34.0934C-1.57306 23.0514 2.86016 9.58197 13.9021 4.00865C22.277 -0.218509 32.399 1.22195 39.2621 7.61761L38.1455 8.73871C37.8337 9.05162 37.8346 9.55804 38.1475 9.86986C38.2541 9.97611 38.3884 10.0501 38.5353 10.0834L43.1 11.1191C43.1582 11.1322 43.2176 11.1389 43.2774 11.139C43.7191 11.1391 44.0774 10.7811 44.0775 10.3394C44.0775 10.2699 44.0685 10.2008 44.0506 10.1337L42.8727 5.69675C42.7589 5.26964 42.3203 5.01564 41.8932 5.12942C41.7565 5.16581 41.632 5.23777 41.5323 5.33783L40.3908 6.48403C30.714 -2.57049 15.5293 -2.06616 6.47472 7.61049C-0.403934 14.9617 -1.96219 25.8251 2.57252 34.8136C2.75976 35.2136 3.2359 35.3862 3.63598 35.1989C4.03607 35.0117 4.20858 34.5355 4.02134 34.1355C4.01473 34.1213 4.0077 34.1074 4.00026 34.0937L4.00034 34.0934Z"
                        fill="white"
                      />
                      <path
                        d="M45.428 13.1876C45.2224 12.7966 44.7388 12.6462 44.3478 12.8518C43.9659 13.0526 43.812 13.5202 44.0002 13.9085C49.5718 24.9513 45.1366 38.4201 34.0938 43.9917C25.7204 48.2164 15.6016 46.7764 8.73937 40.3834L9.8547 39.2632C10.1666 38.9502 10.1657 38.4434 9.85253 38.1315C9.74594 38.0253 9.61157 37.9514 9.46491 37.9181L4.90058 36.8826C4.46979 36.7849 4.04135 37.055 3.94363 37.4858C3.91501 37.612 3.91744 37.7433 3.95074 37.8683L5.12865 42.3049C5.20211 42.5817 5.41797 42.798 5.69456 42.872C5.76199 42.8903 5.83169 42.8995 5.90155 42.8993C6.11414 42.8992 6.31803 42.8146 6.46821 42.6642L7.61115 41.5172C17.289 50.5706 32.4736 50.0643 41.527 40.3864C48.4034 33.0359 49.9611 22.1748 45.428 13.1876Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_792_11215">
                        <rect width="48" height="48" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            )}
          </div>
          {type === "default" && project.propertyDetails.status && (
            <div className="z-2 pointer-events-none absolute left-[19px] right-[21px] top-[18px] flex items-center justify-between">
              <div className="flex h-[44px] items-center bg-aqua-blue px-[22px] pl-[18px] text-[14px] font-[500] uppercase text-white">
                <svg
                  className="mr-[15px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_341_1130)">
                    <path
                      d="M8.30374 15.4047L6.06062 17.6478C5.13067 18.5778 3.62469 18.5778 2.69551 17.648C1.76616 16.7186 1.76616 15.2125 2.69533 14.2833L7.18235 9.79632C8.11152 8.86711 9.61765 8.86711 10.5468 9.79632C10.8566 10.1061 11.3588 10.1061 11.6686 9.79632C11.9783 9.48657 11.9783 8.98434 11.6686 8.67459C10.1198 7.12589 7.60933 7.12589 6.06062 8.67459L1.57364 13.1616C0.0249331 14.7103 0.0249331 17.2208 1.57364 18.7695C3.12216 20.319 5.63286 20.319 7.18239 18.7695L9.42551 16.5264C9.73526 16.2166 9.73526 15.7144 9.42551 15.4047C9.11576 15.0949 8.61349 15.0949 8.30374 15.4047Z"
                      fill="#4CA4D8"
                    />
                    <path
                      d="M18.2861 2.05698C16.7374 0.508271 14.2261 0.508271 12.6774 2.05698L9.98614 4.74823C9.67639 5.05798 9.67639 5.56021 9.98614 5.86996C10.2959 6.17971 10.7981 6.17971 11.1079 5.86996L13.7991 3.1787C14.7283 2.24949 16.2352 2.24949 17.1644 3.1787C18.0936 4.10787 18.0936 5.61401 17.1644 6.54318L12.2293 11.4784C11.3 12.4076 9.79395 12.4076 8.86478 11.4784C8.55503 11.1686 8.0528 11.1686 7.74305 11.4784C7.43331 11.7881 7.43331 12.2903 7.74305 12.6001C9.29176 14.1488 11.8023 14.1488 13.351 12.6001L18.2861 7.66494C19.8348 6.11624 19.8348 3.60568 18.2861 2.05698Z"
                      fill="#4CA4D8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_341_1130">
                      <rect
                        width="19.0362"
                        height="19.0362"
                        fill="white"
                        transform="translate(0.412109 0.895447)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                {project.propertyDetails.status?.title}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white">
        <div
          className={`${contentContainerClassName} relative border-b border-b-custom-gray-1 pb-[24px] pl-[28px] pt-[19px] last:border-b-0`}
        >
          <h3
            className={`${titleClassName} text-[30px] font-[500] leading-[38px] transition-all duration-[0.3s] ease-in-out hover:text-aqua-blue`}
          >
            <Link href={`/project/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className="flex items-center pb-0">
            <svg
              className="mr-[14px]"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="18"
              viewBox="0 0 12 18"
              fill="none"
            >
              <path
                d="M6 0C2.69166 0 0 2.69167 0 6.00001C0 6.99318 0.248308 7.9779 0.72035 8.85132L5.67189 17.8066C5.73781 17.926 5.86342 18 6 18C6.13658 18 6.26219 17.926 6.32811 17.8066L11.2815 8.84837C11.7517 7.9779 12 6.99314 12 5.99998C12 2.69167 9.30834 0 6 0ZM6 9C4.34583 9 3.00002 7.65418 3.00002 6.00001C3.00002 4.34584 4.34583 3.00002 6 3.00002C7.65417 3.00002 8.99998 4.34584 8.99998 6.00001C8.99998 7.65418 7.65417 9 6 9Z"
                fill="#00D1FF"
              />
            </svg>
            {project.location.title}
          </p>
          {expandable && (
            <button
              onClick={() => setExpanded(!isExpanded)}
              className="absolute bottom-0 right-[36px] flex h-[55px] w-[55px] translate-y-[50%] items-center justify-center rounded-[100%] border border-custom-gray-1 bg-white"
            >
              <svg
                className={`${isExpanded ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="12"
                viewBox="0 0 21 12"
                fill="none"
              >
                <path d="M1 1L10.5 10.5L20 1" stroke="black" />
              </svg>
            </button>
          )}
        </div>
        {isExpanded && (
          <div className="flex p-[32px]">
            <div className="mr-[68px]">
              <label className="pb-[14px] leading-none text-custom-gray-4">
                Price Range
              </label>
              <p className="text-[25px] font-[500] uppercase leading-[29px]">
                ₱ {numbro(project.minPrice).format("0a")} -{" "}
                {numbro(project.maxPrice).format("0a")}
              </p>
            </div>
            {project.propertyDetails.numberOfBedrooms > 0 && (
              <div>
                <label className="pb-[14px] leading-none text-custom-gray-4">
                  Unit Type
                </label>
                <p className="text-[25px] font-[500] leading-[29px]">
                  {project.propertyDetails.numberOfBedrooms}BR
                </p>
              </div>
            )}
            <div className="ml-auto">
              <label className="pb-[14px] leading-none text-custom-gray-4">
                Unit Area
              </label>
              <p className="text-[25px] font-[500] leading-[29px]">
                {formatUnitArea(project.propertyDetails)} sqm ±
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
