"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ChevronLeft from "@/components/svg/ChevronLeft";
import ChevronRight from "@/components/svg/ChevronRight";
import Link from "next/link";

import useAnimation from "../../../hooks/useAnimation";
/* import useParallax from "../../../hooks/useParallax";
import { useScroll } from "framer-motion"; */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";
import FadeUp from "@/components/animation/FadeUp";
//import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ content }: any) => {
  const { container } = useAnimation("#anim-hero-title");

  /*const ref = useRef(null);
   const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 30);
 */
  const swiperRef = useRef(null);
  const bgsipwerRef = useRef(null);
  const background = () => {
    if (content?.content?.[0]?.backgroundType === "image") {
      if (content?.content?.[0]?.imageBackgrounds?.length > 1) {
        return (
          <div className="">
            <Swiper
              className="animateBg !absolute inset-0 z-0 h-full w-full bg-transparent"
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 8000,
                disableOnInteraction: false,
              }}
              onBeforeInit={(swiper) => {
                // @ts-expect-error
                bgsipwerRef.current = swiper;
              }}
              modules={[Navigation]}
            >
              {content?.content?.[0]?.imageBackgrounds?.map(
                (item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={item?.mediaBackground2?.url}
                      fill
                      alt={
                        item.mediaBackground2.alt
                          ? item.mediaBackground2.alt
                          : ""
                      }
                      className="object-cover"
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
            <div className="absolute bottom-0 left-10 right-10 top-0 z-50 hidden justify-between bg-transparent md:flex">
              <button
                onClick={() => {
                  // @ts-expect-error'
                  bgsipwerRef.current?.slidePrev();
                }}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => {
                  // @ts-expect-error
                  bgsipwerRef.current?.slideNext();
                }}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <Image
            src={
              content?.content?.[0]?.imageBackgrounds?.[0]?.mediaBackground2
                ?.url
            }
            fill
            alt={
              content?.content?.[0].imageBackgrounds?.[0]?.mediaBackground2
                ?.alt || "alt"
            }
            className="object-cover"
          />
        );
      }
    } else if (content?.content?.[0].backgroundType === "video") {
      if (content?.content?.[0]?.videoBackgrounds?.length > 1) {
        return (
          <div className="absolute inset-0 z-0 h-full w-full bg-transparent">
            <Swiper
              className="absolute inset-0 z-0 h-full w-full bg-transparent"
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={true}
              onBeforeInit={(swiper) => {
                // @ts-expect-error
                bgsipwerRef.current = swiper;
              }}
              modules={[Navigation]}
            >
              {content?.content?.[0]?.videoBackgrounds?.map(
                (item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <video
                      autoPlay
                      muted
                      loop
                      className="h-full w-full object-cover"
                    >
                      <source
                        src={item?.videoBackground2?.url}
                        type={item?.videoBackground2?.mimeType}
                      />
                    </video>
                  </SwiperSlide>
                )
              )}
            </Swiper>
            <div className="z-1 absolute bottom-0 left-10 right-10 top-0 hidden justify-between bg-transparent md:flex">
              <button
                onClick={() => {
                  // @ts-expect-error'
                  bgsipwerRef.current?.slidePrev();
                }}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => {
                  // @ts-expect-error
                  bgsipwerRef.current?.slideNext();
                }}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <video
            autoPlay
            muted
            loop
            className="absolute bottom-0 right-0 h-full w-full object-cover"
          >
            <source
              src={
                content?.content?.[0]?.videoBackgrounds?.[0]?.videoBackground2
                  ?.url
              }
              type={
                content?.content?.[0]?.videoBackgrounds?.[0]?.videoBackground2
                  ?.mimeType
              }
            />
          </video>
        );
      }
    } else if (content?.content?.[0].backgroundType === "youtube") {
      if (content?.content?.[0]?.youtubeBackgrounds?.length > 1) {
        const formatYouTubeLinks = (youtubeLinks: string[]) => {
          return youtubeLinks.map((item: any) => {
            if (
              item.youtubeBackground2.includes(
                "https://www.youtube.com/watch?v="
              )
            ) {
              return item.youtubeBackground2.replace(
                "https://www.youtube.com/watch?v=",
                ""
              );
            }
            return "";
          });
        };
        return (
          <div className="absolute inset-0 z-0 h-full w-full bg-transparent">
            <Swiper
              className="absolute inset-0 z-0 h-full w-full bg-transparent"
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={true}
              onBeforeInit={(swiper) => {
                // @ts-expect-error
                bgsipwerRef.current = swiper;
              }}
              modules={[Navigation]}
            >
              {formatYouTubeLinks(content?.content?.[0].youtubeBackgrounds).map(
                (item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <iframe
                      className="pointer-events-none h-full w-full object-cover"
                      src={`https://www.youtube.com/embed/${item}?autoplay=1&mute=1&cc_load_policy=1&controls=0&loop=1&showinfo=0&modestbranding=1`}
                      allow="autoplay; modestbranding"
                    ></iframe>
                  </SwiperSlide>
                )
              )}
            </Swiper>
            <div className="z-1 absolute bottom-0 left-10 right-10 top-0 hidden justify-between bg-transparent md:flex">
              <button
                onClick={() => {
                  // @ts-expect-error'
                  bgsipwerRef.current?.slidePrev();
                }}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => {
                  // @ts-expect-error
                  bgsipwerRef.current?.slideNext();
                }}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        );
      } else {
        const urlYt =
          content?.content?.[0].youtubeBackgrounds?.[0].youtubeBackground2;
        const formattedUrlYt = urlYt?.includes(
          "https://www.youtube.com/watch?v="
        )
          ? urlYt.replace("https://www.youtube.com/watch?v=", "")
          : "";

        return (
          <iframe
            className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover"
            src={`https://www.youtube.com/embed/${formattedUrlYt}?autoplay=1&mute=1&cc_load_policy=1&controls=0&loop=1&showinfo=0&modestbranding=1`}
            allow="autoplay; modestbranding"
          ></iframe>
        );
      }
    } else if (content?.content?.[0]?.backgroundType === "vimeo") {
      // console.log("vimeo");
      if (content?.content?.[0]?.vimeoBackgrounds?.length > 1) {
        const formatVimeoLinks = (vimeoLinks: string[]) => {
          return vimeoLinks.map((item: any) => {
            if (item.vimeoBackground2.includes("https://vimeo.com/")) {
              return item.vimeoBackground2.replace("https://vimeo.com/", "");
            }
            return "";
          });
        };
        return (
          <div className="absolute inset-0 z-0 h-full w-full bg-transparent">
            <Swiper
              className="absolute inset-0 z-0 h-full w-full bg-transparent"
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={true}
              onBeforeInit={(swiper) => {
                // @ts-expect-error
                bgsipwerRef.current = swiper;
              }}
              modules={[Navigation]}
            >
              {formatVimeoLinks(content?.content?.[0]?.vimeoBackgrounds).map(
                (item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <iframe
                      className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover"
                      src={`https://player.vimeo.com/video/${item}?background=1&autoplay=1&loop=1&muted=1`}
                      allow="autoplay; fullscreen; picture-in-picture"
                    ></iframe>
                  </SwiperSlide>
                )
              )}
            </Swiper>
            <div className="absolute bottom-0 left-10 right-10 top-0 z-10 hidden justify-between bg-transparent md:flex">
              <button
                onClick={() => {
                  // @ts-expect-error'
                  bgsipwerRef.current?.slidePrev();
                }}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => {
                  // @ts-expect-error
                  bgsipwerRef.current?.slideNext();
                }}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        );
      } else {
        const urlVim =
          content?.content?.[0]?.vimeoBackgrounds?.[0]?.vimeoBackground2;
        const formattedUrlVim = urlVim?.includes("https://vimeo.com/")
          ? urlVim.replace("https://vimeo.com/", "")
          : "";
        return (
          <iframe
            className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover"
            src={`https://player.vimeo.com/video/${formattedUrlVim}?background=1&autoplay=1&loop=1&muted=1`}
            allow="autoplay; fullscreen; picture-in-picture"
          ></iframe>
        );
      }
    }
  };

  return (
    <>
      <section ref={container} className={`relative h-[100vh] md:h-[120.5vh]`}>
        <div className="relative z-10 py-44 text-center text-white md:pb-96 md:pt-56 lg:pt-72">
          <FadeUp>
            <h1 className="w-full px-12 text-[6vh] font-extrabold leading-[7vh] md:text-[12vh] md:leading-[13vh]">
              {content?.content?.[0]?.title}
            </h1>
          </FadeUp>
          <FadeDown>
            <div className="flex w-full justify-center pt-5 md:pt-1">
              <h4 className="w-[90vw] font-semibold text-white md:w-[50vw]">
                {content?.content?.[0]?.description}
              </h4>
            </div>
          </FadeDown>
        </div>
        {/* <div className="flex w-full flex-col justify-center pb-[40px] md:pb-[80px] md:pt-[100px]">
          <div className="flex pb-[20px] md:pb-[80px]">
            <div className="fixHeader z-10 mx-auto flex flex-col items-center py-[30px] text-center md:pb-[80px] md:pt-[100px]">
              <FadeUp>
                <h1 className="w-[75vw] text-[6vh] font-extrabold leading-[7vh] text-white md:text-[12vh] md:leading-[13vh]">
                  {content?.content?.[0].title}
                </h1>
              </FadeUp>
              <FadeDown>
                <h4 className="mt-[4vh] w-[90vw] font-semibold text-white md:mt-[6vh] md:w-[50vw]">
                  .description}
                </h4>
              </FadeDown>
            </div>
          </div>
        </div>

        <div className="border-2 border-red-500"></div> */}

        {background()}
      </section>

      <div className="z-20 -mt-[30vh] hidden w-full items-center justify-center gap-12 md:flex">
        <Link
          href={`${content?.content?.[0]?.prestigeLink}`}
          className="group relative z-50 overflow-hidden object-fill opacity-100"
        >
          <Fade>
            <Image
              src={`${!content?.content?.[0]?.prestigeImage.url ? "/" : ""}${
                content?.content?.[0].prestigeImage.url
              }`}
              width={434}
              height={500}
              alt={content?.content?.[0]?.prestigeImage.alt}
              className="relative h-[60vh] w-[27vw] cursor-pointer group-hover:scale-105"
              style={{ transition: "all 1s ease-in-out" }}
            />

            <div className="absolute -mt-24 flex w-full items-center justify-center">
              <Image
                src={`${!content?.content?.[0]?.prestigeLogo.url ? "/" : ""}${
                  content?.content?.[0].prestigeLogo.url
                }`}
                width={190}
                height={68}
                alt={content?.content?.[0]?.prestigeLogo.alt}
              />
            </div>
          </Fade>
        </Link>

        <Link
          href={`${content?.content?.[0]?.aspireLink}`}
          className="group relative z-50 overflow-hidden object-fill opacity-100"
        >
          <Fade>
            <Image
              src={`${!content?.content?.[0]?.aspireImage.url ? "/" : ""}${
                content?.content?.[0].aspireImage.url
              }`}
              width={434}
              height={500}
              alt={content?.content?.[0]?.aspireImage.alt}
              className="relative block h-[60vh] w-[27vw] cursor-pointer group-hover:scale-105"
              style={{ transition: "all 1s ease-in-out" }}
            />
            <div className="absolute -mt-24 flex w-full items-center justify-center">
              <Image
                src={`${!content?.content?.[0]?.aspireLogo.url ? "/" : ""}${
                  content?.content?.[0].aspireLogo.url
                }`}
                width={190}
                height={68}
                alt={content?.content?.[0]?.aspireLogo.alt}
              />
            </div>
          </Fade>
        </Link>

        <Link
          href={`${content?.content?.[0]?.futuraLink}`}
          className="group relative z-50 overflow-hidden object-fill opacity-100"
        >
          <Fade>
            <Image
              src={`${!content?.content?.[0]?.futuraImage?.url ? "/" : ""}${
                content?.content?.[0]?.futuraImage?.url
              }`}
              width={434}
              height={500}
              alt={content?.content?.[0]?.futuraImage?.alt}
              className="relative block h-[60vh] w-[27vw] cursor-pointer group-hover:scale-105"
              style={{ transition: "all 1s ease-in-out" }}
            />
            <div className="absolute -mt-24 flex w-full items-center justify-center">
              <Image
                src={`${!content?.content?.[0]?.futuraLogo?.url ? "/" : ""}${
                  content?.content?.[0]?.futuraLogo?.url
                }`}
                width={198}
                height={67}
                alt={content?.content?.[0].futuraLogo?.alt}
              />
            </div>
          </Fade>
        </Link>
      </div>

      <div className="z-[100] -mt-[14vh] flex w-full items-center justify-center md:hidden">
        <div className="absolute z-40">
          <div className="flex gap-64 md:gap-[43rem]">
            <div
              className="rounded-full bg-white px-4 py-3 shadow-md"
              // @ts-expect-error
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft color="#000000" />
            </div>
            <div
              className="rounded-full bg-white px-4 py-3 shadow-md"
              // @ts-expect-error
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight color="#000000" />
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={2}
          spaceBetween={16}
          centeredSlides={true}
          freeMode={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          onBeforeInit={(swiper) => {
            // @ts-expect-error
            swiperRef.current = swiper;
          }}
          modules={[Navigation, FreeMode]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative">
              <Link
                href={`${content?.content?.[0]?.prestigeLink}`}
                className="z-10"
              >
                <Image
                  src={`${
                    !content?.content?.[0]?.prestigeImage.url ? "/" : ""
                  }${content?.content?.[0].prestigeImage.url}`}
                  width={434}
                  height={500}
                  alt={content?.content?.[0]?.prestigeImage?.alt}
                />

                <div className="absolute -mt-24 flex w-full items-center justify-center">
                  <Image
                    src={`${
                      !content?.content?.[0]?.prestigeLogo?.url ? "/" : ""
                    }${content?.content?.[0]?.prestigeLogo?.url}`}
                    width={190}
                    height={68}
                    alt={content?.content?.[0]?.prestigeLogo?.alt}
                  />
                </div>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <Link
                href={`${content?.content?.[0]?.aspireLink}`}
                className="z-10"
              >
                <Image
                  src={`${!content?.content?.[0]?.aspireImage?.url ? "/" : ""}${
                    content?.content?.[0]?.aspireImage?.url
                  }`}
                  width={434}
                  height={500}
                  alt={content?.content?.[0]?.aspireImage?.alt}
                />
                <div className="absolute -mt-24 flex w-full items-center justify-center">
                  <Image
                    src={`${
                      !content?.content?.[0]?.aspireLogo?.url ? "/" : ""
                    }${content?.content?.[0]?.aspireLogo?.url}`}
                    width={190}
                    height={68}
                    alt={content?.content?.[0]?.aspireLogo?.alt}
                  />
                </div>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <Link
                href={`${content?.content?.[0]?.futuraLink}`}
                className="z-10"
              >
                <Image
                  src={`${!content?.content?.[0]?.futuraImage?.url ? "/" : ""}${
                    content?.content?.[0].futuraImage.url
                  }`}
                  width={434}
                  height={500}
                  alt={content?.content?.[0]?.futuraImage?.alt}
                />
                <div className="absolute -mt-24 flex w-full items-center justify-center">
                  <Image
                    src={`${
                      !content?.content?.[0]?.futuraLogo?.url ? "/" : ""
                    }${content?.content?.[0]?.futuraLogo?.url}`}
                    width={198}
                    height={67}
                    alt={content?.content?.[0]?.futuraLogo?.alt}
                  />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default HeroSection;
