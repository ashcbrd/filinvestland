"use client";
import ChevronCircleLeft from "@/components/svg/ChevronCircleLeft";
import ChevronCircleRight from "@/components/svg/ChevronCircleRight";
import Image from "next/image";
import React, { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
const EnvironmentalPreservation = ({ content }: any) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const datas: any[] = content?.content?.filter(
    (item: any) =>
      item.blockType ===
      "corporate-social-responsibility-environmental-preservation"
  );

  return (
    <div className="relative">
      {datas && (
        <div className="z-10 flex gap-3 px-1 py-5 md:w-full md:px-20 lg:absolute lg:bottom-[50%] lg:left-0 lg:justify-between lg:px-0">
          <button onClick={() => swiperRef.current?.slidePrev()}>
            <ChevronCircleLeft />
          </button>
          <button onClick={() => swiperRef.current?.slideNext()}>
            <ChevronCircleRight />
          </button>
        </div>
      )}
      <Swiper
        loop
        slidesPerView="auto"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {datas?.map((data: any, index0: number) => (
          <SwiperSlide key={index0}>
            <div className="flex flex-col px-1 pb-10 md:px-20">
              <div className="flex flex-col gap-20 lg:flex-row">
                <div className="w-full lg:w-[70%]">
                  <h3 className="text-jet text-4xl font-bold">{data.title}</h3>
                  {data.descriptionParagraphs.map(
                    (item: any, index: number) => (
                      <p className="text-dim-gray mt-8 text-2xl" key={index}>
                        {item.description}
                      </p>
                    )
                  )}
                </div>
                <div className="flex w-full flex-col justify-center md:justify-start lg:w-[30%]">
                  <Image
                    src={`${data.image.url}`}
                    width={800}
                    height={500}
                    alt={data.image.alt}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EnvironmentalPreservation;
