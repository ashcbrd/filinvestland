"use client";
import Image from "next/image";
import React from "react";
import ChevronRight from "@/components/svg/ChevronRight";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper";
import Link from "next/link";
import useAnimation from "../../../hooks/useAnimation";
const OurServices = ({ content }: any) => {
  const { container } = useAnimation("#anim");
  return (
    <section ref={container} className="pt-28">
      <div id="anim" className="flex w-full flex-col items-center px-6">
        <h4 className="text-dark-cornflower-blue text-center text-lg font-black tracking-widest md:text-[2vh]">
          {content?.content[4].title}
        </h4>
        <h2 className="text-jet mt-2 text-center text-3xl font-black tracking-tighter md:text-4xl lg:mt-[2vh] lg:w-[50vw] lg:text-[6vh] lg:leading-[6vh]">
          {content?.content[4].subTitle}
        </h2>
        <h4 className="text-dim-gray mt-4 text-center lg:mt-[3vh] lg:w-[40vw] lg:text-[2.2vh]">
          {content?.content[4].description}
        </h4>
      </div>
      <div className="mx-6 mt-12 hidden gap-4 md:flex lg:mx-9 xl:mx-16 2xl:mx-44">
        {content
          ? content?.content[4].serviceTypes.map(
              (serviceType: any, index: number) => {
                return (
                  <Link
                    href={`${serviceType.link}`}
                    className="flex-1 transition duration-150 hover:opacity-70"
                    key={index}
                  >
                    <div className="relative flex items-center justify-center">
                      <button
                        type="button"
                        className="bg-blue-ryb hover:bg-dark-cornflower-blue focus:bg-dark-cornflower-blue delay-50 absolute rounded-full px-7 py-6 text-white transition"
                      >
                        <ChevronRight />
                      </button>
                      <Image
                        src={`${!serviceType.image.url ? "/" : ""}${
                          serviceType.image.url
                        }`}
                        width={356}
                        height={364}
                        alt={serviceType.image.alt}
                        className="image-cover h-[20vw] w-[20vw]"
                      />
                    </div>
                    <h3 className="text-jet mt-6 text-center text-[3vh] font-bold">
                      {serviceType.title}
                    </h3>
                  </Link>
                );
              }
            )
          : null}
      </div>
      <div className="mt-14 block md:hidden">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          centeredSlides={true}
          freeMode={true}
          loop={true}
          navigation={true}
          modules={[Navigation, FreeMode]}
          className="mySwiper"
        >
          {content
            ? content?.content[4].serviceTypes.map(
                (serviceType: any, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <Link
                        href={`${serviceType.link}`}
                        className="flex-1 transition duration-150 hover:opacity-70"
                      >
                        <div className="relative flex items-center justify-center">
                          <Image
                            src={`${!serviceType.image.url ? "/" : ""}${
                              serviceType.image.url
                            }`}
                            width={456}
                            height={464}
                            alt={serviceType.image.alt}
                          />
                        </div>
                        <h3 className="text-jet mt-6 text-center text-2xl font-bold">
                          {serviceType.title}
                        </h3>
                      </Link>
                    </SwiperSlide>
                  );
                }
              )
            : null}
        </Swiper>
      </div>
    </section>
  );
};

export default OurServices;
