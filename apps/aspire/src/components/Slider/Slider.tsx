"use client";

import React, { useEffect, useState } from "react";
import Slide from "./Slide/Slide";
import Arrows from "./Arrows/Arrows";
import FeaturedBanner from "@/components/Projects/FeaturedBanner/FeaturedBanner";
import FeaturedSlide from "@/components/Projects/FeaturedSlider/FeaturedSlide/FeaturedSlide";
import Link from "next/link";
import ReactSlider from "react-slick";
import Icons from "@/assets/icons";

const Slider = ({
  className = "",
  arrowsClassName = "",
  prevArrowClassName = "",
  nextArrowClassName = "",
  slideClassName = "",
  slides = [],
  slideType = "default",
  arrowType = "default",
  duration = 500,
  infinite = true,
  noOfSlides = 1,
  autoPlay,
  autoPlaySpeed,
  autoScroll = false,
  autoScrollDuration = 3000,
  href,
  fade = true,
  prevArrowIcon = null,
  nextArrowIcon = null,
  overlay,
}: {
  className?: string;
  arrowsClassName?: string;
  prevArrowClassName?: string;
  nextArrowClassName?: string;
  slideClassName?: string;
  height?: any;
  slides: any;
  slideType?: string;
  arrowType?: string;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  duration?: number;
  infinite?: boolean;
  noOfSlides?: number;
  autoScroll?: boolean;
  autoScrollDuration?: number;
  href?: string;
  fade?: boolean;
  prevArrowIcon?: any;
  nextArrowIcon?: any;
  overlay?: any;
}) => {
  const NextArrow = (props: any) => {
    if (arrowType === "bottom") {
      return (
        <button
          className={`${arrowsClassName} ${nextArrowClassName} pointer-events-auto absolute bottom-[30px] left-[95px] flex h-[52px] w-[52px] flex-shrink-0 rotate-[270deg] items-center justify-center rounded-[100%] border-[1px] border-white pt-[3px] transition-all duration-[0.3px] ease-in-out hover:opacity-50`}
          onClick={props.onClick}
        >
          {nextArrowIcon ? nextArrowIcon : Icons.ArrowWhite}
        </button>
      );
    }

    if (arrowType === "bottom-sm") {
      return (
        <button
          className={`${arrowsClassName} ${nextArrowClassName} pointer-events-auto absolute bottom-[15px] left-[52px] flex h-[28px] w-[28px] flex-shrink-0 rotate-[270deg] items-center justify-center rounded-[100%] border-[1px] border-white pt-[3px] transition-all duration-[0.3px] ease-in-out hover:opacity-50`}
          onClick={props.onClick}
        >
          {nextArrowIcon ? (
            nextArrowIcon
          ) : (
            <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 21 12"
              fill="none"
            >
              <path d="M1 1L10.5 10.5L20 1" stroke="white"></path>
            </svg>
          )}
        </button>
      );
    }

    return (
      <button
        className={`${arrowsClassName} ${nextArrowClassName} pointer-events-auto absolute right-[15px] top-[50%] z-[1] flex h-[52px] w-[52px] flex-shrink-0 translate-y-[-50%] rotate-[270deg] items-center justify-center rounded-[100%] border-[1px] border-white bg-[#171717]/50 pt-[3px] transition-all duration-[0.3s] ease-in-out hover:opacity-50`}
        onClick={props.onClick}
      >
        {nextArrowIcon ? nextArrowIcon : Icons.ArrowWhite}
      </button>
    );
  };

  const PrevArrow = (props: any) => {
    if (arrowType === "bottom") {
      return (
        <button
          className={`${arrowsClassName} ${prevArrowClassName} pointer-events-auto absolute bottom-[30px] left-[30px] z-[2] mr-[13px] flex h-[52px] w-[52px] flex-shrink-0 rotate-[90deg] items-center justify-center rounded-[100%] border-[1px] border-white pt-[2px] transition-all duration-[0.3px] ease-in-out hover:opacity-50`}
          onClick={props.onClick}
        >
          {prevArrowIcon ? prevArrowIcon : Icons.ArrowWhite}
        </button>
      );
    }

    if (arrowType === "bottom-sm") {
      return (
        <button
          className={`${arrowsClassName} ${prevArrowClassName} pointer-events-auto absolute bottom-[15px] left-[16px] z-[2] mr-[7px] flex h-[28px] w-[28px] flex-shrink-0 rotate-[90deg] items-center justify-center rounded-[100%] border-[1px] border-white pt-[2px] transition-all duration-[0.3px] ease-in-out hover:opacity-50`}
          onClick={props.onClick}
        >
          <svg
            className=""
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 21 12"
            fill="none"
          >
            <path d="M1 1L10.5 10.5L20 1" stroke="white"></path>
          </svg>
        </button>
      );
    }

    return (
      <button
        className={`${arrowsClassName} ${prevArrowClassName} pointer-events-auto absolute left-[15px] top-[50%] z-[1] mr-[13px] flex h-[52px] w-[52px] flex-shrink-0 translate-y-[-50%] rotate-[90deg] items-center justify-center rounded-[100%] border-[1px] border-white bg-[#171717]/50 pt-[2px] transition-all duration-[0.3s] ease-in-out hover:opacity-50`}
        onClick={props.onClick}
      >
        {prevArrowIcon ? prevArrowIcon : Icons.ArrowWhite}
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: infinite,
    speed: duration,
    slidesToShow: noOfSlides,
    slidesToScroll: 1,
    fade: fade,
    autoplay: autoPlay,
    autoplaySpeed: autoPlaySpeed || 3000,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 641,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex h-[100%] w-full">
        <ReactSlider {...settings} className="w-full">
          {slides.map((s: any, i: number) => {
            if (slideType === "featured-banner") {
              return <FeaturedBanner key={`slide_${i}`} slide={s} />;
            }

            if (slideType === "featured-thumbnail") {
              return <FeaturedSlide key={`slide_${i}`} slide={s} />;
            }

            return (
              <Slide
                key={`slide_${i}`}
                href={href ? href : s.url}
                className={slideClassName}
                header={s.header}
                content={s.content}
                image={s.image}
                arrowType={arrowType}
                overlay={overlay}
              />
            );
          })}
        </ReactSlider>
      </div>
    </div>
  );
};

export default Slider;
