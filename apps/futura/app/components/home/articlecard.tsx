"use client";

import React from "react";
import { motion } from "framer-motion";
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

interface Props {
  data: any;
  motionSettings: any;
}

function ArticleCard({ data, motionSettings }: Props) {
  return (
    <div className="mb-12 flex flex-col items-center justify-center px-4 md:flex-row md:px-0">
      <motion.div
        {...motionSettings}
        className="flex flex-col flex-wrap gap-3 md:flex-row md:gap-6"
      >
        {data.slice(0, 3).map((item: any) => (
          <Card style="md:flex-1">
            <div className="group relative overflow-hidden rounded-[20px]">
              <img
                src={item?.Project?.coverImage?.url}
                alt={item?.Project?.title}
                className="object-cover transition-all group-hover:scale-110  md:h-[260px] lg:h-[300px]"
              />
              <div className="absolute -bottom-4 right-0 flex space-x-4">
                <Link
                  href={`/news/${item?.Project?.slug}`}
                  aria-label="Next"
                  className="transition-all group-hover:scale-125"
                >
                  {redNextIcon}
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href={`/news/${item?.Project?.slug}`}
                className="mb-2 text-[18px] font-medium hover:text-[#E12827] hover:underline lg:text-[25px]"
              >
                {item?.Project?.title}
              </Link>
              <p className="mb-4 text-[12px] font-bold text-[#E12827]">
                {moment(item?.Project?.Date).format("MMMM DD, YYYY")}
              </p>
              <p className="lead-7 mb-9 font-quicksand font-normal text-[#343434] lg:text-[18px]">
                {item?.Project?.shortDescription}
              </p>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}

export default ArticleCard;
