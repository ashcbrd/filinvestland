import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

// import Link from "next/link";
import ChevronCircleLeft from "../../svg/ChevronCircleLeft";
import ChevronCircleRight from "../../svg/ChevronCircleRight";

const CorporateSocialResponsibility = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) =>
      item?.blockType === "pusong-filinvest-corporate-social-responsibility"
  );

  const swiperRef = useRef(null);
  return (
    <div className="bg-ghost-white mt-24 py-16">
      <div className="mx-6 lg:mx-9 xl:mx-16 2xl:mx-44">
        <div className="relative">
          {!!data && (
            <Swiper
              tag="div"
              slidesPerView={1}
              spaceBetween={10}
              centeredSlides={true}
              loop={true}
              onBeforeInit={(swiper) => {
                // @ts-expect-error
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              breakpoints={
                {
                  // when window width is >= 320px
                  320: {
                    slidesPerView: 1,
                  },
                } as any
              }
              className="mySwiper relative"
            >
              {data?.corporateSocialResponsibility?.map(
                (item: any, index: number) => (
                  <SwiperSlide
                    className="flex flex-col items-center justify-center gap-5  md:gap-8 lg:flex-row lg:gap-10"
                    key={index}
                  >
                    <div className="lg:w-2/4">
                      <Image
                        src={`${item?.image?.url || "/filinvest-cover.png"}`}
                        width={841}
                        height={644}
                        alt={item?.image?.alt || "alt"}
                      />
                    </div>
                    <div className="flex flex-col lg:w-2/4">
                      <h3 className="text-dark-cornflower-blue text-base font-bold ">
                        {item?.title}
                      </h3>
                      <h2 className="mt-4 text-2xl font-bold md:text-4xl ">
                        {item?.subTitle}
                      </h2>
                      {item?.descriptionParagraphs?.map(
                        (item: any, index: number) => (
                          <p className="text-dim-gray mt-4 " key={index}>
                            {item?.paragraph}
                          </p>
                        )
                      )}
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          )}
          <div className="mt-10 flex w-full items-center justify-center gap-6 lg:absolute lg:-top-12 lg:bottom-0 lg:left-0 lg:right-0 lg:mt-[5rem]">
            <button
              className="z-1 -left-12 block hover:opacity-70 lg:absolute xl:-left-12 xl:block"
              onClick={() => {
                // @ts-expect-error
                swiperRef.current?.slidePrev();
              }}
            >
              <ChevronCircleLeft />
            </button>
            <button
              className="z-1 -right-12 block hover:opacity-70 lg:absolute xl:-right-12 xl:block"
              onClick={() => {
                // @ts-expect-error
                swiperRef.current?.slideNext();
              }}
            >
              <ChevronCircleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateSocialResponsibility;
