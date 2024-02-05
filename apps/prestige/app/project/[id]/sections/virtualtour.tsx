"use client";

import React, { useState } from "react";
import { Typography } from "@/app/components/typography/typography";

type Props = {
  data: any;
};

export const VirtualTour: React.FC<Props> = ({ data }) => {
  const [showIframe, setShowIframe] = useState(null as any);

  return (
    <section className="min-h-fit w-full bg-[#F4EBD0] px-8 py-16 sm:py-20 md:px-12 md:py-[100px]">
      <div className="mx-auto h-auto w-full max-w-[1650px] space-y-20">
        {/* <div className="grid grid-cols-1 gap-y-4 md:gap-y-8">
          <Typography
            size="heading2"
            color="dark"
            font="cormorant"
            text={"Virtual Tour"}
            className="font-medium"
          />
          <Typography
            size="20"
            color="dark"
            text={data?.virtualTourDescription}
          />
          <img
            src={"/assets/images/property/virtualbg.png"}
            className="h-full w-full object-cover"
            alt="Banner"
          />
          <div>
            <button
              onClick={() => setShowIframe(data.featuredVideo.url)}
              className="inline-flex"
            >
              <Typography
                size="20"
                color="dark"
                text={"View Virtual Tour"}
                className="cursor-pointer font-bold underline md:!text-2xl"
              />
            </button>
          </div>
          {showIframe && (
            <div className="fixed inset-0 z-20 !m-0 bg-black">
              <video
                src={data.featuredVideo.url}
                controls
                autoPlay
                className="h-full w-full"
              />
              <button
                onClick={() => {
                  setShowIframe(null);
                }}
                className="fixed right-0 top-0 z-20 !m-0"
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
            </div>
          )}
        </div> */}
        {data?.virtualTourEmbedUrls?.length > 0 && <div className="w-full leading-[30px] text-custom-black-2">
          <h2 className="font-medium transition-all font-cormorant text-[#261119] text-[40px] lg:text-[70px] mb-10">
            Virtual Tour
          </h2>
          <p className="whitespace-pre-wrap mb-7 transition-all font-nunito text-[#261119] text-[15px] lg:text-[20px]">{data.virtualTourDescription}</p>
          <div className="mb-[-30px]">
            {data.virtualTourEmbedUrls.map((v: any) => (
              <iframe
                src={
                  v.virtualTourEmbedUrl.includes("exsight360")
                    ? v.virtualTourEmbedUrl
                    : `${v.virtualTourEmbedUrl}&play=1&brand=0&dh=0&mls=1&mt=0`
                }
                height={522}
                width="100%"
                className="mb-[50px]"
              />
            ))}
          </div>
        </div>}
        {data?.ViewFloorplans.length > 0 && (
          <div className="grid grid-cols-1 gap-y-4 md:gap-y-8">
            <Typography
              size="heading2"
              color="dark"
              font="cormorant"
              text={"View Floor Plans"}
              className="font-medium"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-4 md:gap-8">
              {data?.ViewFloorplans &&
                data?.ViewFloorplans.map((item: any, index: any) => (
                  <div key={index} className="p-4 sm:p-0">
                    <img
                      src={item?.floorPlanImage?.url}
                      alt={`Image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
