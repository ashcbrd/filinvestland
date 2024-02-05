"use client";
import ChevronCircleLeft from "@/components/svg/ChevronCircleLeft";
import ChevronCircleRight from "@/components/svg/ChevronCircleRight";
import Image from "next/image";
import React, { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";

const Programs = ({ content }: any) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const data = content?.content?.find(
    (item: any) => item.blockType === "corporate-social-responsibility-programs"
  );

  return (
    <div className="bg-ghost-white px-4 pb-16 pt-12 md:px-16 md:pb-36 md:pt-32">
      <div className="flex flex-col gap-8 md:px-20">
        <h2 className="text-4xl font-bold tracking-tighter text-jet">
          {data.title}
        </h2>
        <p className="text-2xl leading-9 text-dim-gray">{data.subtitle}</p>
        {data.descriptionParagraphs.map((item: any, index: number) => (
          <p className="text-2xl leading-9 text-dim-gray" key={index}>
            {item.description}
          </p>
        ))}
      </div>
      <div className="mt-16 flex gap-9">
        <button onClick={() => swiperRef.current?.slidePrev()}>
          <ChevronCircleLeft />
        </button>
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          loop={true}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            720: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            960: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {data.gallery.map((item: any) => (
            <SwiperSlide key={item.id}>
              <Image
                src={`${item.image.url}`}
                width={400}
                height={200}
                alt={item.image.alt}
                className="w-screen"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={() => swiperRef.current?.slideNext()}>
          <ChevronCircleRight />
        </button>
      </div>
    </div>
  );
};

export default Programs;
