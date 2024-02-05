"use client";
import Image from "next/image";
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper";
import ChevronLeft from "@/components/svg/ChevronLeft";
import ChevronRight from "@/components/svg/ChevronRight";
import Link from "next/link";
import useAnimation from "../../../hooks/useAnimation";

const OurBusinesses = ({ content }: any) => {
  const { container } = useAnimation("#anim");
  const swiperRefMobile = useRef();

  return (
    <section ref={container} className="z-[1] pt-28">
      <div className="z-10">
        <h4
          id="anim"
          className="text-dark-cornflower-blue mx-6 text-center text-lg font-black tracking-widest md:mx-0 md:text-[2vh]"
        >
          {content?.content[3].title}
        </h4>
        <h2
          id="anim"
          className="text-jet mx-6 mt-2 text-center text-3xl font-black tracking-tighter md:mx-0 md:text-4xl lg:mt-[2vh] lg:text-[6vh] lg:leading-[6vh]"
        >
          {content?.content[3].subTitle}
        </h2>
        <h4
          id="anim"
          className="text-dim-gray mx-6 mt-4 text-center md:mx-0 lg:mt-[3vh] lg:text-[2.2vh]"
        >
          {content?.content[3].description}
        </h4>
      </div>
      <div className="hidden md:block">
        <div className="mx-6 mt-16 flex gap-8 lg:mx-9 xl:mx-16 2xl:mx-44">
          <Link
            href={`${content?.content[3].propertyTypes?.[0].link}`}
            className="group relative flex-1 transition duration-150"
          >
            <div id="anim" className="relative overflow-hidden">
              <div className="bg-gradient-effect absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full opacity-0 transition-opacity group-hover:opacity-95"></div>
              <Image
                src={`${
                  !content?.content[3].propertyTypes?.[0].image.url ? "/" : ""
                }${content?.content[3].propertyTypes?.[0].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes?.[0].image.alt}
                className={`relative scale-105 transition duration-500 group-hover:translate-x-2`}
              />
            </div>
            <div className="absolute z-10 -mt-16 ml-9 flex">
              <h3 id="anim" className="text-2xl font-bold text-white">
                {content?.content[3].propertyTypes?.[0].title}
              </h3>
            </div>
          </Link>
          <Link
            href={`${content?.content[3].propertyTypes[1].link}`}
            className="group relative mt-12 flex-1 transition duration-150"
          >
            <div id="anim" className="relative overflow-hidden">
              <div className="bg-gradient-effect absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full opacity-0 transition-opacity group-hover:opacity-95"></div>
              <Image
                src={`${
                  !content?.content[3].propertyTypes[1].image.url ? "/" : ""
                }${content?.content[3].propertyTypes[1].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes[1].image.alt}
                className={`relative scale-105 transition duration-500 group-hover:translate-x-2`}
              />
            </div>
            <div className="absolute z-10 -mt-16 ml-9 flex">
              <h3 id="anim" className="text-2xl font-bold text-white">
                {content?.content[3].propertyTypes[1].title}
              </h3>
            </div>
          </Link>
          <Link
            href={`${content?.content[3].propertyTypes[2].link}`}
            className="group relative mt-24 flex-1 transition duration-150"
          >
            <div id="anim" className="relative overflow-hidden">
              <div className="bg-gradient-effect absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full opacity-0 transition-opacity group-hover:opacity-95"></div>
              <Image
                src={`${
                  !content?.content[3].propertyTypes[2].image.url ? "/" : ""
                }${content?.content[3].propertyTypes[2].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes[2].image.alt}
                className={`relative scale-105 transition duration-500 group-hover:translate-x-2`}
              />
            </div>
            <div className="absolute z-10 -mt-16 ml-9 flex">
              <h3 id="anim" className="text-2xl font-bold text-white">
                {content?.content[3].propertyTypes[2].title}
              </h3>
            </div>
          </Link>
        </div>
        <div className="mx-6 flex gap-8 lg:mx-9 xl:mx-16 2xl:mx-44">
          <Link
            href={`${content?.content[3].propertyTypes[3].link}`}
            className="group relative flex-1 transition duration-150"
          >
            <div id="anim" className="relative overflow-hidden">
              <div className="bg-gradient-effect absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full opacity-0 transition-opacity group-hover:opacity-95"></div>
              <Image
                src={`${
                  !content?.content[3].propertyTypes[3].image.url ? "/" : ""
                }${content?.content[3].propertyTypes[3].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes[3].image.alt}
                className={`relative scale-105 transition duration-500 group-hover:translate-x-2`}
              />
            </div>
            <div className="absolute z-10 -mt-16 ml-9 flex">
              <h3 id="anim" className="text-2xl font-bold text-white">
                {content?.content[3].propertyTypes[3].title}
              </h3>
            </div>
          </Link>
          <Link
            href={`${content?.content[3].propertyTypes[4].link}`}
            className="group relative mt-12 flex-1 transition duration-150"
          >
            <div id="anim" className="relative overflow-hidden">
              <div className="bg-gradient-effect absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full opacity-0 transition-opacity group-hover:opacity-95"></div>
              <Image
                src={`${
                  !content?.content[3].propertyTypes[4].image.url ? "/" : ""
                }${content?.content[3].propertyTypes[4].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes[4].image.alt}
                className={`relative scale-105 transition duration-500 group-hover:translate-x-2`}
              />
            </div>
            <div className="absolute z-10 -mt-16 ml-9 flex">
              <h3 id="anim" className="text-2xl font-bold text-white">
                {content?.content[3].propertyTypes[4].title}
              </h3>
            </div>
          </Link>
          <Link
            href={`${content?.content[3].propertyTypes[5].link}`}
            className="group relative mt-24 flex-1 transition duration-150"
          >
            <div id="anim" className="relative overflow-hidden">
              <div className="bg-gradient-effect absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full opacity-0 transition-opacity group-hover:opacity-95"></div>
              <Image
                src={`${
                  !content?.content[3].propertyTypes[5].image.url ? "/" : ""
                }${content?.content[3].propertyTypes[5].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes[5].image.alt}
                className={`relative scale-105 transition duration-500 group-hover:translate-x-2`}
              />
            </div>
            <div className="absolute z-10 -mt-16 ml-9 flex">
              <h3 id="anim" className="text-2xl font-bold text-white">
                {content?.content[3].propertyTypes[5].title}
              </h3>
            </div>
          </Link>
        </div>
      </div>
      <div className="relative mt-12 flex items-center justify-center md:hidden">
        <div className="absolute z-40">
          <div className="flex gap-64 md:gap-[43rem]">
            <div
              className="rounded-full bg-white px-4 py-3 shadow-md"
              // @ts-expect-error
              onClick={() => swiperRefMobile.current?.slidePrev()}
            >
              <ChevronLeft color="#000000" />
            </div>
            <div
              className="rounded-full bg-white px-4 py-3 shadow-md"
              // @ts-expect-error
              onClick={() => swiperRefMobile.current?.slideNext()}
            >
              <ChevronRight color="#000000" />
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          centeredSlides={true}
          freeMode={true}
          loop={true}
          onBeforeInit={(swiper) => {
            // @ts-expect-error
            swiperRefMobile.current = swiper;
          }}
          modules={[Navigation, FreeMode]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link
              href={`${content?.content[3].propertyTypes?.[0].link}`}
              className="relative"
            >
              <Image
                src={`${
                  !content?.content[3].propertyTypes?.[0].image.url ? "/" : ""
                }${content?.content[3].propertyTypes?.[0].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes?.[0].image.alt}
              />
              <div className="absolute -mt-16 w-full">
                <h3 className="text-center text-2xl font-bold text-white">
                  {content?.content[3].propertyTypes?.[0].title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={`${content?.content[3].propertyTypes[1].link}`}
              className="relative"
            >
              <Image
                src={`${
                  !content?.content[3].propertyTypes[1].image.url ? "/" : ""
                }${content?.content[3].propertyTypes[1].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes[1].image.alt}
              />
              <div className="absolute -mt-16 w-full">
                <h3 className="text-center text-2xl font-bold text-white">
                  {content?.content[3].propertyTypes[1].title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={`${content?.content[3].propertyTypes[2].link}`}
              className="relative"
            >
              <Image
                src={`${
                  !content?.content[3].propertyTypes[2].image.url ? "/" : ""
                }${content?.content[3].propertyTypes[2].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes[2].image.alt}
              />
              <div className="absolute -mt-16 w-full">
                <h3 className="text-center text-2xl font-bold text-white">
                  {content?.content[3].propertyTypes[2].title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={`${content?.content[3].propertyTypes[3].link}`}
              className="relative"
            >
              <Image
                src={`${
                  !content?.content[3].propertyTypes[3].image.url ? "/" : ""
                }${content?.content[3].propertyTypes[3].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes[3].image.alt}
              />
              <div className="absolute -mt-16 w-full">
                <h3 className="text-center text-2xl font-bold text-white">
                  {content?.content[3].propertyTypes[3].title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={`${content?.content[3].propertyTypes[4].link}`}
              className="relative"
            >
              <Image
                src={`${
                  !content?.content[3].propertyTypes[4].image.url ? "/" : ""
                }${content?.content[3].propertyTypes[4].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes[4].image.alt}
              />
              <div className="absolute -mt-16 w-full">
                <h3 className="text-center text-2xl font-bold text-white">
                  {content?.content[3].propertyTypes[4].title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href={`${content?.content[3].propertyTypes[5].link}`}
              className="relative"
            >
              <Image
                src={`${
                  !content?.content[3].propertyTypes[5].image.url ? "/" : ""
                }${content?.content[3].propertyTypes[5].image.url}`}
                width={536}
                height={906}
                alt={content?.content[3].propertyTypes[5].image.alt}
              />
              <div className="absolute -mt-16 w-full">
                <h3 className="text-center text-2xl font-bold text-white">
                  {content?.content[3].propertyTypes[5].title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default OurBusinesses;
