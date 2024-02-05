import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ChevronLeft from "@/components/svg/ChevronLeft";
import ChevronRight from "@/components/svg/ChevronRight";
import Image from "next/image";
import BorderButton from "@/components/button/BorderButton";
import Link from "next/link";
import ChevronCircleLeft from "../svg/ChevronCircleLeft";
import ChevronCircleRight from "../svg/ChevronCircleRight";
import Button360 from "../svg/Button360";
import SwiperCore, { Autoplay } from "swiper";
const FullPropertySlider = ({
  sliders,
  withThumbnail = false,
  isDefault = true,
  with360 = false,
}: any) => {
  const swiperRef = useRef();
  const swiperRefMobile = useRef();
  const [nextSlide, setNextSlide] = useState("");
  SwiperCore.use([Autoplay]);
  return (
    <>
      <div className="relative hidden md:block">
        {with360 && (
          <div className="absolute right-0 top-[60px] z-10 hidden cursor-pointer transition hover:opacity-60 lg:inline-block">
            <Button360 />
          </div>
        )}
        <div
          className={`absolute ${
            withThumbnail ? "left-16" : "right-6"
          } bottom-12 z-40`}
        >
          <div className={`flex ${isDefault ? "gap-7" : "-gap-2"}`}>
            <div
              className={`cursor-pointer rounded-full ${
                isDefault && "bg-white  shadow-md"
              }  px-2 py-3 opacity-100 transition duration-150 hover:opacity-70`}
              // @ts-expect-error
              onClick={() => swiperRef.current?.slidePrev()}
            >
              {isDefault ? (
                <ChevronLeft color="#000000" />
              ) : (
                <ChevronCircleLeft color="white" />
              )}
            </div>
            <div
              className={`cursor-pointer rounded-full ${
                isDefault && "bg-white  shadow-md"
              }  px-2 py-3 opacity-100 transition duration-150 hover:opacity-70`}
              // @ts-expect-error
              onClick={() => swiperRef.current?.slideNext()}
            >
              {isDefault ? (
                <ChevronRight color="#000000" />
              ) : (
                <ChevronCircleRight color="white" />
              )}
            </div>
          </div>
        </div>
        {withThumbnail && nextSlide && (
          <div className="absolute bottom-12 right-6 z-40 h-[180px] max-h-[180px] w-[180px] max-w-[180px] rounded-[5px] opacity-[0.8]">
            <div className="relative h-full w-full object-cover object-center">
              <Image
                src={nextSlide}
                fill
                className="relative block object-cover"
                alt={`single-house`}
              />
            </div>
          </div>
        )}
        <Swiper
          autoplay={{ delay: 5000 }}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          onBeforeInit={(swiper) => {
            // @ts-expect-error
            swiperRef.current = swiper;
            setNextSlide(
              sliders?.length
                ? sliders[swiper?.activeIndex % sliders?.length]
                    ?.slideBackgroundImage.url
                : 0
            );
          }}
          onSlideChange={(swiper) => {
            setNextSlide(
              sliders?.length
                ? sliders[swiper?.activeIndex % sliders?.length]
                    ?.slideBackgroundImage.url
                : 0
            );
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {sliders
            ? sliders.map((slider: any, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="relative mt-28">
                      {slider?.blockLogo && (
                        <div className="absolute flex w-1/2 flex-col items-center gap-6 bg-white px-12 pb-12 pt-4 lg:w-1/3 lg:gap-12">
                          <div className="hidden lg:block">
                            <Image
                              src={`${!slider?.blockLogo?.url ? "/" : ""}${
                                slider?.blockLogo?.url
                              }`}
                              width={228}
                              height={50}
                              alt={slider?.blockLogo?.alt}
                            />
                          </div>
                          <div className="block lg:hidden">
                            <Image
                              src={`${!slider?.blockLogo?.url ? "/" : ""}${
                                slider?.blockLogo?.url
                              }`}
                              width={114}
                              height={25}
                              alt={slider?.blockLogo?.alt}
                            />
                          </div>
                          <div>
                            <h2 className="mb-2 text-center text-xl font-bold text-jet lg:text-3xl">
                              {slider.blockTitle}
                            </h2>
                            <h4 className="lg:text-normal text-md text-center text-dim-gray">
                              {slider.blockDescription}
                            </h4>
                          </div>
                          {slider.blockLearnMoreLink && (
                            <div className="mt-2 lg:mt-0">
                              <button type="button">
                                <Link href={`${slider?.blockLearnMoreLink}`}>
                                  <BorderButton
                                    buttonText="Learn More"
                                    textColor="dark-cornflower-blue"
                                    borderColor="dark-cornflower-blue"
                                  />
                                </Link>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      <Image
                        className="h-[40rem] object-cover"
                        src={`${!slider.slideBackgroundImage.url ? "/" : ""}${
                          slider.slideBackgroundImage.url
                        }`}
                        width={2840}
                        height={560}
                        alt={slider.slideBackgroundImage.alt}
                      />
                    </div>
                  </SwiperSlide>
                );
              })
            : null}
        </Swiper>
      </div>
      <div className="relative flex items-center justify-center md:hidden">
        <div className="absolute bottom-0 z-40">
          <div className="flex gap-6 md:gap-[43rem]">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_3px_60px_rgba(0,0,0,0.5)] "
              // @ts-expect-error
              onClick={() => swiperRefMobile.current?.slidePrev()}
            >
              <ChevronLeft color="#000000" />
            </div>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_3px_60px_rgba(0,0,0,0.5)]"
              // className="rounded-full bg-white px-4 py-3 shadow-md transition duration-150 hover:opacity-70"
              // @ts-expect-error
              onClick={() => swiperRefMobile.current?.slideNext()}
            >
              <ChevronRight color="#000000" />
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          onBeforeInit={(swiper) => {
            // @ts-expect-error
            swiperRefMobile.current = swiper;
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {sliders
            ? sliders.map((slider: any, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="relative mt-28">
                      <Image
                        src={`${!slider.slideBackgroundImage.url ? "/" : ""}${
                          slider?.slideBackgroundImage?.url
                        }`}
                        width={2840}
                        height={300}
                        alt={slider?.slideBackgroundImage?.alt}
                        className="!h-[300px]"
                      />
                      {slider?.blockLogo && (
                        <div className="relative mx-8 -mt-20 mb-12 flex flex-col items-center gap-6 bg-white px-12 pb-12 pt-4">
                          <div className="hidden lg:block">
                            <Image
                              src={`${!slider?.blockLogo?.url ? "/" : ""}${
                                slider?.blockLogo?.url
                              }`}
                              width={228}
                              height={50}
                              alt={slider?.blockLogo?.alt}
                            />
                          </div>
                          <div className="block lg:hidden">
                            <Image
                              src={`${!slider?.blockLogo?.url ? "/" : ""}${
                                slider?.blockLogo?.url
                              }`}
                              width={114}
                              height={25}
                              alt={slider?.blockLogo?.alt}
                            />
                          </div>
                          <div>
                            <h2 className="mb-2 text-center text-xl font-bold text-jet lg:text-3xl">
                              {slider?.blockTitle}
                            </h2>
                            <h4 className="lg:text-normal text-md text-center text-dim-gray">
                              {slider?.blockDescription}
                            </h4>
                          </div>
                          {slider?.blockLearnMoreLink && (
                            <div className="mt-2 lg:mt-0">
                              <button type="button">
                                <Link href={`${slider?.blockLearnMoreLink}`}>
                                  <BorderButton
                                    buttonText="Learn More"
                                    textColor="dark-cornflower-blue"
                                    borderColor="dark-cornflower-blue"
                                  />
                                </Link>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })
            : null}
        </Swiper>
      </div>
    </>
  );
};

export default FullPropertySlider;
