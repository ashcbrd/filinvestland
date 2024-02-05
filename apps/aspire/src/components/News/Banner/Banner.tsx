"use client";

import React from "react";
import Section from "@/components/Section/Section";
import Link from "next/link";
import ReactSlider from "react-slick";

const Banner = ({ title, featured, typeID }: { title?: any; featured?: any; typeID?: any }) => {
  const NextArrow = (props: any) => {
    return (
      <div className="container absolute bottom-[40px] left-0 right-0 z-[1] flex justify-end pb-[1px]">
        <button
          className={`justify-center] pointer-events-auto flex h-[52px] w-[52px] flex-shrink-0 items-center pt-[3px] transition-all duration-[0.3s] ease-in-out hover:opacity-50`}
          onClick={props.onClick}
        >
          <svg width="34" height="16" viewBox="0 0 34 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M33.7071 8.70711C34.0976 8.31659 34.0976 7.68342 33.7071 7.2929L27.3431 0.928935C26.9526 0.53841 26.3195 0.53841 25.9289 0.928934C25.5384 1.31946 25.5384 1.95262 25.9289 2.34315L31.5858 8L25.9289 13.6569C25.5384 14.0474 25.5384 14.6805 25.9289 15.0711C26.3195 15.4616 26.9526 15.4616 27.3431 15.0711L33.7071 8.70711ZM-8.74228e-08 9L33 9L33 7L8.74228e-08 7L-8.74228e-08 9Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <div className="container absolute bottom-[40px] left-0 right-[80px] z-[2] flex justify-end md:!right-[60px] md:!w-auto">
        <button
          className={`pointer-events-auto mr-[13px] flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center pt-[2px] transition-all duration-[0.3s] ease-in-out hover:opacity-50 md:mr-[0]`}
          onClick={props.onClick}
        >
          <svg width="34" height="16" viewBox="0 0 34 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.292893 7.29289C-0.0976295 7.68341 -0.0976296 8.31658 0.292892 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31945 8.07107 0.92893C7.68054 0.538406 7.04738 0.538405 6.65686 0.92893L0.292893 7.29289ZM34 7L1 7L1 9L34 9L34 7Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoPlaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      {featured?.length > 0 && (
        <ReactSlider {...settings} className="w-full">
          {featured?.map((n: any) => (
            <div key={`new_${n.id}`}>
              <Section
                className="relative flex items-center justify-center bg-cover bg-center pb-[92px]"
                style={{
                  backgroundImage: `url(${n.Project?.coverImage?.url})`,
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/60"></div>
                <div className="relative flex h-[626px] max-w-[844px] items-end">
                  <div className="text-white">
                    <p className="pb-[14px] text-[18px] uppercase">featured</p>
                    <h1 className="pb-[20px] text-[50px] font-light leading-[55px] text-white md:text-[34px]  md:leading-[1.2]">
                      {n.Project?.title}
                    </h1>
                    <div className="max-w-[745px] pb-[40px]">
                      <p className="text-[22px] leading-[28px] md:text-[18px]">
                        {n.Project?.shortDescription?.split(" ").splice(0, 50).join(" ")}
                        {n.Project?.shortDescription?.split(" ").length > 50 ? "..." : ""}
                      </p>
                    </div>
                    <Link
                      href={`/${title.toLowerCase()}/${n.Project?.slug}`}
                      className="text-[20px] underline transition-all duration-[0.3s] ease-in-out hover:text-[#28D8FF]"
                    >
                      Continue Reading
                    </Link>
                  </div>
                </div>
              </Section>
            </div>
          ))}
        </ReactSlider>
      )}
      {featured?.length === 0 && (
        <Section id="banner" className="virtual-tour-banner relative flex h-[568px] items-center justify-center pt-[50px] text-center">
          <div className="relative z-10 text-white">
            <h1 className="pb-[8px] text-[50px] font-[500] leading-[75px] text-white md:text-[38px] md:leading-[1.2]">{title}</h1>
          </div>
        </Section>
      )}
    </div>
  );
};

export default Banner;
