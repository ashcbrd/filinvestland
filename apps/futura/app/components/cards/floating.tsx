"use client";

import React, { useState } from "react";

interface Props {
  imgSrc: any;
  title: string;
  location: string;
  type: string;
  addtionalCss?: string;
}

const prevIcon = (
  <div className="flex items-center">
    <svg
      width="120"
      height="120"
      viewBox="0 0 138 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_77_2265)">
        <path
          d="M94.766 63.7806C94.766 77.4983 83.2479 88.6481 69.0026 88.6481C54.7574 88.6481 43.2393 77.4983 43.2393 63.7806C43.2393 50.0629 54.7574 38.9131 69.0026 38.9131C83.2479 38.9131 94.766 50.0629 94.766 63.7806Z"
          stroke="white"
          shape-rendering="crispEdges"
        />
      </g>
      <path
        d="M71.9209 58.1436L65.3551 64.4854L71.9209 70.8273"
        stroke="white"
      />
      <defs>
        <filter
          id="filter0_d_77_2265"
          x="0.739258"
          y="0.413086"
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
            result="effect1_dropShadow_77_2265"
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
            result="effect1_dropShadow_77_2265"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_77_2265"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
);

const nextIcon = (
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
          stroke="white"
          shape-rendering="crispEdges"
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

function Propcard(props: Props) {
  const { imgSrc, title, location, type } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgSrc.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgSrc.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 z-[-1]">
        {/* Your card content here */}
        <div className="card w-full px-4 bg-base-100 flex flex-col mt-12">
          {/* ... (rest of your card content) ... */}
        </div>
      </div>
      <img
        src={imgSrc[currentImageIndex]}
        className="w-full h-[450px] object-cover transition-transform duration-500 transform rounded-t-[20px]"
      />
      <div className="absolute bottom-0 left-0 flex space-x-4">
        <button
          className="text-white"
          aria-label="Previous"
          onClick={prevImage}
        >
          {prevIcon}
        </button>
        <button
          className="text-white absolute pl-10"
          aria-label="Next"
          onClick={nextImage}
        >
          {nextIcon}
        </button>
      </div>
    </div>
  );
}

export default Propcard;
