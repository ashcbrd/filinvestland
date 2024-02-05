"use client"

import React, { useEffect, useState } from "react";
import Slide from "./Slide";
import Arrows from "./Arrows";
import Link from "next/link";
import ReactSlider from "react-slick";
import Icons from "./Icons";

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
    autoScroll = false,
    autoScrollDuration = 3000,
    href,
    fade = true,
    prevArrowIcon = null,
    nextArrowIcon = null,
    overlay
}: {
    className?: string,
    arrowsClassName?: string,
    prevArrowClassName?: string,
    nextArrowClassName?: string,
    slideClassName?: string
    height?: any,
    slides: any,
    slideType?: string,
    arrowType?: string,
    duration?: number,
    infinite?: boolean,
    noOfSlides?: number,
    autoScroll?: boolean,
    autoScrollDuration?: number,
    href?: string,
    fade?: boolean,
    prevArrowIcon?: any,
    nextArrowIcon?: any,
    overlay?: any
}) => {
    
    const NextArrow = (props: any) => {
        if (arrowType === "bottom") {
            return (
                <button className={`${arrowsClassName} ${nextArrowClassName} absolute bottom-[30px] left-[95px] flex-shrink-0 pointer-events-auto transition-all duration-[0.3px] ease-in-out hover:opacity-50 rotate-[270deg] w-[52px] h-[52px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[3px]`} onClick={props.onClick}>
                    {nextArrowIcon ? nextArrowIcon : Icons.ArrowWhite}
                </button>
            )
        }

        if (arrowType === "bottom-sm") {
            return (
                <button className={`${arrowsClassName} ${nextArrowClassName} absolute bottom-[15px] left-[52px] flex-shrink-0 pointer-events-auto transition-all duration-[0.3px] ease-in-out hover:opacity-50 rotate-[270deg] w-[28px] h-[28px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[3px]`} onClick={props.onClick}>
                    {nextArrowIcon ? nextArrowIcon : (
                        <svg className="" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 21 12" fill="none"><path d="M1 1L10.5 10.5L20 1" stroke="white"></path></svg>
                    )}
                </button>
            )
        }

        return (
            <button className={`${arrowsClassName} ${nextArrowClassName} absolute top-[50%] translate-y-[-50%] right-[15px] z-[1] flex-shrink-0 pointer-events-auto transition-all duration-[0.3s] ease-in-out hover:opacity-50 bg-[#171717]/50 rotate-[270deg] w-[52px] h-[52px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[3px]`} onClick={props.onClick}>
                {nextArrowIcon ? nextArrowIcon : Icons.ArrowWhite}
            </button>
        )
    }

    const PrevArrow = (props: any) => {
        if (arrowType === "bottom") {
            return (
                <button className={`${arrowsClassName} ${prevArrowClassName} absolute bottom-[30px] left-[30px] z-[2] flex-shrink-0 pointer-events-auto transition-all duration-[0.3px] ease-in-out hover:opacity-50 rotate-[90deg] w-[52px] h-[52px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[2px] mr-[13px]`} onClick={props.onClick}>
                    {prevArrowIcon ? prevArrowIcon : Icons.ArrowWhite}
                </button>
            )
        }

        if (arrowType === "bottom-sm") {
            return (
                <button className={`${arrowsClassName} ${prevArrowClassName} absolute bottom-[15px] left-[16px] z-[2] flex-shrink-0 pointer-events-auto transition-all duration-[0.3px] ease-in-out hover:opacity-50 rotate-[90deg] w-[28px] h-[28px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[2px] mr-[7px]`} onClick={props.onClick}>
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 21 12" fill="none"><path d="M1 1L10.5 10.5L20 1" stroke="white"></path></svg>
                </button>
            )
        }

        return (
            <button className={`${arrowsClassName} ${prevArrowClassName} absolute top-[50%] translate-y-[-50%] left-[15px] z-[1] flex-shrink-0 pointer-events-auto transition-all duration-[0.3s] ease-in-out hover:opacity-50 bg-[#171717]/50 rotate-[90deg] w-[52px] h-[52px] flex items-center justify-center rounded-[100%] border-[1px] border-white pt-[2px] mr-[13px]`} onClick={props.onClick}>
                {prevArrowIcon ? prevArrowIcon : Icons.ArrowWhite}
            </button>
        )
    }

    const settings = {
        dots: false,
        infinite: infinite,
        speed: duration,
        slidesToShow: noOfSlides,
        slidesToScroll: 1,
        fade: fade,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 641,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            }
        ]
    };

    return (
        <div className={`relative ${className}`}>
            <div className="h-[100%] flex w-full">
                <ReactSlider {...settings} className="w-full">
                    {slides.map((s: any, i: number) => {
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
                        )
                    })}
                </ReactSlider>
            </div>
        </div>
    )
}

export default Slider;