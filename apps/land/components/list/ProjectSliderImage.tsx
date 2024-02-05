import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import Image from "next/image";
import ChevronLeft from "../svg/ChevronLeft";
import ChevronRight from "../svg/ChevronRight";

const ProjectSliderImage = ({ gallery }: any) => {
  const swiperRef = useRef();
  return (
    <div className="relative">
      <div className="absolute z-40 w-full">
        <div className="mx-4 mt-[50px] flex gap-7 md:mt-[60px] lg:mt-[93px] xl:mt-[70px] 2xl:mt-[93px]">
          <div className="flex-1">
            <div
              className="w-[43px] cursor-pointer rounded-full border-2 border-white bg-black px-4 py-3 opacity-80 shadow-md transition duration-150 hover:opacity-50"
              // @ts-expect-error
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft color="#ffffff" />
            </div>
          </div>
          <div className="flex-none">
            <div
              className="w-[43px] cursor-pointer rounded-full border-2 border-white bg-black px-4 py-3 opacity-80 shadow-md transition duration-150 hover:opacity-50"
              // @ts-expect-error
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight color="#ffffff" />
            </div>
          </div>
        </div>
      </div>
      <Swiper
        loop={true}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          // @ts-expect-error
          swiperRef.current = swiper;
        }}
        className="mySwiper2 z-10"
      >
        {gallery.map((item: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <Image
                src={item?.image?.url || "/filinvest-cover.png"}
                width={item.image.width || 507}
                height={item.image.height || 407}
                alt={item?.image?.alt || "alt"}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProjectSliderImage;
