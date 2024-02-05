"use client";

import React from "react";
import Card from "@/app/components/cards/card";
import Link from "next/link";
import moment from "moment";

const redNextIcon = (
  <div className="flex items-center">
    <svg
      width="120"
      height="120"
      viewBox="0 0 137 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_77_2268)">
        <path
          d="M42.9127 63.7809C42.9127 50.0632 54.4309 38.9134 68.6761 38.9134C82.9213 38.9134 94.4395 50.0632 94.4395 63.7809C94.4395 77.4987 82.9213 88.6484 68.6761 88.6484C54.4309 88.6484 42.9127 77.4987 42.9127 63.7809Z"
          stroke="whiredte"
          shape-rendering="crispEdges"
          fill="red"
        />
      </g>
      <path
        d="M65.7578 69.418L72.3237 63.0761L65.7578 56.7342"
        stroke="white"
      />
      <defs>
        <filter
          id="filter0_d_77_2268"
          x="0.412598"
          y="0.413391"
          width="136.527"
          height="134.735"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
            result="effect1_dropShadow_77_2268"
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
            result="effect1_dropShadow_77_2268"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_77_2268"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
);

const NewsCard = (props: any) => {
  const { data } = props;

  return (
    <>
      {data &&
        data.FeaturedNews.map((item: any) => (
          <Card style="rounded-[20px] w-[400px]">
            <div className="relative">
              <img
                src={item?.Project?.coverImage?.url}
                alt={item?.Project?.title}
                className="w-full h-full object-cover rounded-t-[20px] rounded-[20px]"
              />
              <div className="absolute bottom-12 right-4 flex space-x-4">
                <button className="text-white ml-14 mt-5" aria-label="Next">
                  {redNextIcon}
                </button>
              </div>
            </div>
            <div className="p-4 px-10">
              <Link
                href="#"
                className="text-[25px] font-medium mb-2 hover:text-[#E12827] hover:underline"
              >
                {item?.Project?.title}
              </Link>
              <p className="text-[12px] mb-4 font-bold text-[#E12827]">
                {item?.Project?.author?.lastName}{" "}
                {item?.Project?.author?.lastName} |{" "}
                {moment(item?.Project?.Date).format("MMMM DD, YYYY")}
              </p>
              <p className="text-[18px] text-[#100e0e] font-quicksand mb-9 font-normal lead-7">
                {item?.Project?.shortDescription}
              </p>
            </div>
          </Card>
        ))}
    </>
  );
};

export default NewsCard;
