"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import FadeDown from "@/components/animation/FadeDown";

const Gallery = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item?.blockType === "pusong-filinvest-gallery"
  );

  return (
    <div className="my-16 text-center lg:my-24">
      <FadeDown>
        <h3 className="text-dark-cornflower-blue mx-6 text-center text-lg font-black tracking-widest md:mx-0 md:text-[2vh]">
          {data?.title}
        </h3>
        <h2 className="text-jet mx-6 mt-2 text-center text-3xl font-black tracking-tighter md:mx-0 md:text-4xl lg:mt-[2vh] lg:text-[6vh] lg:leading-[6vh]">
          {data?.subTitle}
        </h2>
        <h3 className="text-dim-gray mx-6 mt-4 text-center md:mx-0 lg:mt-[3vh] lg:text-[2.2vh]">
          {data?.description}
        </h3>
      </FadeDown>
      <div>
        {!!data && (
          <Swiper
            slidesPerView="auto"
            breakpoints={
              {
                // when window width is >= 320px
                320: {
                  slidesPerView: 2,
                },
                // when window width is >= 640px
                640: {
                  slidesPerView: 3,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 4,
                },
                // when window width is >= 1024px
                1024: {
                  slidesPerView: 5,
                },
              } as any
            }
            centeredSlides={true}
            freeMode={true}
            loop={true}
            pagination={{
              clickable: true,
              bulletActiveClass: "!mt-20 swiper-pagination-bullet-active",
            }}
            modules={[Pagination, FreeMode]}
            className="mt-8 h-[400px] min-w-[100%] md:h-[569px]"
          >
            {data?.image?.map((item: any, index: number) => (
              <SwiperSlide
                className="flex h-[400px] w-[329px] md:h-[569px]"
                key={index}
              >
                <Image
                  src={`${item.image.url ? item.image.url : ""}`}
                  width={329}
                  height={569}
                  alt={item.image.alt ? item.image.alt : ""}
                  className={"h-[400px] w-[329px] object-cover md:h-[569px] "}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Gallery;
