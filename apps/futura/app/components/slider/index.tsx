"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import CustomNavigation from "./custom-navigation";

interface Images {
  images: string[];
}

const ImageCarousel: React.FC<Images> = ({ images }) => {
  return (
    <div className="md:mx-36 mt-10 relative">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={6}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 2,
        }}
        navigation={{
          prevEl: ".custom-prev-button", // Use your custom previous button class or ID here
          nextEl: ".custom-next-button", // Use your custom next button class or ID here
        }}
        loop={true}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        className="md:!mx-8 overflow-hidden"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
      >
        {images?.map((image: any) => (
          <SwiperSlide key={image}>
            <img
              src={image?.image?.url}
              alt=""
              className="object-cover rounded-3xl h-[160px] w-[240px] mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute flex w-full left-0 right-0 items-center m-auto top-0 bottom-0 justify-between z-[999]">
        <CustomNavigation onClick={() => {}} direction="prev" />
        <CustomNavigation onClick={() => {}} direction="next" />
      </div>
    </div>
  );
};

export default ImageCarousel;
