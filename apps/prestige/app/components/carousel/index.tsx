'use client';

import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: '/assets/images/home/bg1.png',
  },
  {
    image: '/assets/images/home/bg2.png',
  },
];

const prevIcon = (
  <>
    <svg
      width="137"
      height="135"
      viewBox="0 0 137 135"
      className="h-20 w-20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_75_34)">
        <ellipse
          cx="68.1206"
          cy="63.2296"
          rx="26.1206"
          ry="25.2296"
          fill="#171717"
          fillOpacity="0.5"
          shape-rendering="crispEdges"
        />
        <path
          d="M93.7412 63.2296C93.7412 76.8712 82.287 87.9592 68.1206 87.9592C53.9542 87.9592 42.5 76.8712 42.5 63.2296C42.5 49.588 53.9542 38.5 68.1206 38.5C82.287 38.5 93.7412 49.588 93.7412 63.2296Z"
          stroke="white"
          shape-rendering="crispEdges"
        />
      </g>
      <path
        d="M71.0225 57.6233L64.4923 63.9307L71.0225 70.2381"
        stroke="white"
      />
      <defs>
        <filter
          id="filter0_d_75_34"
          x="0"
          y="0"
          width="136.241"
          height="134.459"
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
            result="effect1_dropShadow_75_34"
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
            result="effect1_dropShadow_75_34"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_75_34"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </>
);

const nextIcon = (
  <>
    <svg
      width="137"
      height="135"
      viewBox="0 0 137 135"
      className="h-20 w-20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_75_31)">
        <ellipse
          cx="68.1206"
          cy="63.7704"
          rx="26.1206"
          ry="25.2296"
          transform="rotate(-180 68.1206 63.7704)"
          fill="#171717"
          fillOpacity="0.5"
          shape-rendering="crispEdges"
        />
        <path
          d="M42.5 63.7704C42.5 50.1288 53.9542 39.0408 68.1206 39.0408C82.287 39.0408 93.7412 50.1288 93.7412 63.7704C93.7412 77.412 82.287 88.5 68.1206 88.5C53.9542 88.5 42.5 77.412 42.5 63.7704Z"
          stroke="white"
          shape-rendering="crispEdges"
        />
      </g>
      <path
        d="M65.2183 69.377L71.7484 63.0696L65.2183 56.7621"
        stroke="white"
      />
      <defs>
        <filter
          id="filter0_d_75_31"
          x="0"
          y="0.540771"
          width="136.241"
          height="134.459"
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
            result="effect1_dropShadow_75_31"
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
            result="effect1_dropShadow_75_31"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_75_31"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </>
);

interface Props {
  title?: string;
  description?: string;
}

function Carousel({ title, description }: Props) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const autoSlideInterval = 5000; // Change slide every 5 seconds (adjust as needed)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  useEffect(() => {
    const autoSlideTimer = setTimeout(nextSlide, autoSlideInterval);

    return () => {
      clearTimeout(autoSlideTimer);
    };
  }, [current]);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <>
      <div className="h-[800px] relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover h-800"
            />

            {title && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-[900px]">
                  {title.length > 50 ? (
                    <div className="w-[900px]">
                      <h1 className="text-[40px] md:text-6xl font-marcellus text-white font-normal">
                        {title}
                      </h1>
                      {description && (
                        <>
                          <p className="text-[25px] font-normal text-white mt-7">
                            {description}
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <h1 className="text-[50px] md:text-6xl font-marcellus text-white font-normal">
                      {title}
                    </h1>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 text-white rounded transform -translate-y-1/2"
        >
          {prevIcon}
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 rounded transform -translate-y-1/2"
        >
          {nextIcon}
        </button>
      </div>
    </>
  );
}

export default Carousel;
