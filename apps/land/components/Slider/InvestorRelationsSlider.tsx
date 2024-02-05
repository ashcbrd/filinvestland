import React, { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import BorderButton from "../button/BorderButton";
import ChevronCircleLeft from "../svg/ChevronCircleLeft";
import ChevronCircleRight from "../svg/ChevronCircleRight";
import FadeLeft from "../animation/FadeLeft";
import { InvestorRelationSection } from "@/types/global";
import { defaultCoverImage } from "@/helpers/constants";

const sliderItem = (
  section: InvestorRelationSection,
  sliderIndex: number,
  itemIndex: number
) => {
  const item = section?.sliderItems[sliderIndex].sliderItem[itemIndex];
  return (
    <div className="flex items-center gap-6 md:min-w-[450px] md:gap-9">
      <div className="flex-none">
        <Image
          src={item?.logo?.url || defaultCoverImage}
          width={90}
          height={90}
          alt={item?.logo?.alt || "alt"}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h2 className="text-xl font-bold md:text-2xl">
          {item?.title || "no title"}
        </h2>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-center">
          <h3 className="text-2xl font-bold text-dark-cornflower-blue">
            {item?.cost || "no cost"}
          </h3>
          <p className="text-normal text-dark-cornflower-blue">
            {item?.year || "no year"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function InvestorRelationsSlider({ content }: any) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const section: InvestorRelationSection = content?.content[7];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      swiperRef.current?.slideNext();
    }, 7000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <section className="flex flex-col items-center justify-center px-6 pt-28 md:items-stretch md:justify-start lg:flex-row lg:items-start lg:justify-between xl:pl-16 xl:pr-0 2xl:pl-40">
        {/* <div className="mx-6 flex w-1/3 flex-col items-start justify-center px-4 text-center md:px-0 md:text-left lg:mx-9 lg:w-1/4 xl:mx-16 2xl:mx-44"> */}
        <div className="flex flex-col items-center justify-center text-center md:items-start md:px-0 md:text-left xl:w-1/3 xl:pr-12">
          <FadeLeft>
            <h4 className="text-lg font-black tracking-widest text-dark-cornflower-blue md:text-[2vh]">
              {section?.title}
            </h4>
            <h2 className="mt-2 text-3xl font-black tracking-tighter  text-jet md:text-4xl lg:text-[6vh] lg:leading-[6vh]">
              {section?.subTitle}
            </h2>
            <h4 className="mt-4 text-dim-gray lg:mt-[3vh] lg:text-[2.2vh]">
              {section?.description}
            </h4>
            <button type="button" className="mt-16">
              <Link href={`${section?.learnMoreLink}`}>
                <BorderButton
                  buttonText="Learn More"
                  textColor="dark-cornflower-blue"
                  borderColor="dark-cornflower-blue"
                />
              </Link>
            </button>
          </FadeLeft>
        </div>
        <Swiper
          tag="div"
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          className="mySwiper lg:flex-2 mt-16 w-full lg:mt-0 lg:w-2/3"
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
        >
          {section?.sliderItems.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-16 pb-[1.5rem] lg:flex-row">
                <div className="flex flex-col gap-12 xl:gap-20">
                  <div className="flex flex-1 flex-col gap-9 xl:flex-row">
                    {sliderItem(section, i, 0)}
                    {sliderItem(section, i, 1)}
                  </div>
                  <div className="flex flex-1 flex-col gap-9 xl:flex-row">
                    {sliderItem(section, i, 2)}
                    {sliderItem(section, i, 3)}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <div className="mt-[5rem] flex w-full items-center justify-center gap-6">
        <button
          className="hover:opacity-70"
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
        >
          <ChevronCircleLeft color="#163E82" />
        </button>
        <button
          className="hover:opacity-70"
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
        >
          <ChevronCircleRight color="#163E82" />
        </button>
      </div>
    </>
  );
}
