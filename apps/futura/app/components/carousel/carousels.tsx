"use client";

import React, { useState, useEffect } from "react";

const circleIcon = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="89"
      height="12"
      viewBox="0 0 89 12"
      fill="none"
    >
      <circle cx="25.1666" cy="5.92993" r="5.72876" fill="white" />
    </svg>
  </>
);

interface Props {
  data: any[];
}

const Carousels = ({ data }: Props) => {
  const [current, setCurrent] = useState(0);
  const length = data.length;
  const autoSlideInterval = 8000; // Change slide every 5 seconds (adjust as needed)

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

  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }

  return (
    <div className="relative h-[800px]">
      {data.map((item, index) => (
        <div
          key={index}
          className={`absolute left-0 top-0 h-full w-full transition-opacity ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.imgSrc}
            alt={`Slide ${index + 1}`}
            className="h-800 h-full w-full object-cover"
          />

          {item.title && (
            <div
              className={`absolute ${
                item.alignment === "left"
                  ? "left-[-120px] top-[-120px]"
                  : "right-[120px] top-[120px]"
              } flex h-[800px] w-[900px] items-center justify-center`}
            >
              <div>
                <h1 className="font-marcellus text-[50px] font-normal text-white md:text-6xl">
                  {item.title}
                </h1>
                {item.description && (
                  <p className="mt-7 w-[500px] text-[22px] font-normal text-white">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="absolute bottom-[180px] left-[100px] flex items-center">
            {/* <Link
              href="/project"
              className="rounded-full text-white bg-[#A0672D] font-normal text-[20px] px-12 tracking-wide py-4"
            >
              Investors concierge
            </Link> */}
          </div>
        </div>
      ))}
      {/* Circular Buttons Container */}
      <div className="absolute bottom-[80px] left-[100px] flex items-center ">
        {/* Previous Button */}
        {length > 1 && (
          <button
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white "
          >
            {circleIcon}
          </button>
        )}

        {/* Next Button */}
        {length > 1 && (
          <button
            onClick={nextSlide}
            className="flex h-10 w-10 items-center  justify-center rounded-full text-white "
          >
            {circleIcon}
          </button>
        )}

        {/* Third Button (assuming you want a total of 3 buttons) */}
        {length > 2 && (
          <button
            onClick={() => setCurrent(2)} // Assuming this button goes to the third slide
            className="flex h-10 w-10 items-center  justify-center rounded-full text-white "
          >
            {circleIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousels;
