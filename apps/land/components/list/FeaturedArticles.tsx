"use client";
import Image from "next/image";
import React, { useRef } from "react";
import "swiper/swiper-bundle.css";
// import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ChevronLeft from "@/components/svg/ChevronLeft";
import ChevronRight from "@/components/svg/ChevronRight";
import Link from "next/link";
import BorderButton from "../button/BorderButton";
import useGetNews from "../../hooks/useGetNews";
import moment from "moment";
import Fade from "../animation/Fade";
import FadeDown from "../animation/FadeDown";
import combineTextWithoutCodeTrue from "@/helpers/extractTextOnly";

type T_ArticlesList = {
  sliderOnMobile?: boolean;
  className?: string;
  isList?: boolean;
  articles: any[];
  withExtras?: boolean;
  sliderImageClassName?: string;
  isTwoLines?: boolean;
};

const FeaturedArticles = ({
  sliderOnMobile = false,
  className,
  sliderImageClassName,
  articles = [],
  withExtras = true,
  isTwoLines = false,
}: T_ArticlesList) => {
  const query = {
    propertyType: "",
    location: "",
    unitSize: "",
    unitSizeFrom: 0,
    unitSizeTo: 0,
    bedroomsFrom: 0,
    bedroomsTo: 0,
    priceRangeFrom: 0,
    priceRangeTo: 0,
    priceRange: [0, 0],
    brand: "All",
    subLocation: "",
    projectType: "",
    locationGroup: "",
    propertyName: "",
    bedrooms: "",
  };
  const { data } = useGetNews({
    searchParams: query,
  });

  const swiperRef = useRef(null);
  const updatedArticle =
    articles.length > 0 ? articles : data && data.length > 0 ? data : [];
  if (updatedArticle.length === 0)
    return (
      <div className="mb-24 mt-12 w-full text-xl italic text-gainsboro">
        No result
      </div>
    );

  // function hasNonSpaceCharacters(inputString: string) {
  //   // Define the regular expression pattern
  //   var pattern = /[^ ]/;

  //   // Use the test() method to check if the input string contains non-space characters
  //   return pattern.test(inputString);
  // }  

  return (
    <div className={className}>
      <div
        className={`${
          sliderOnMobile ? "hidden md:grid" : ""
        } grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3`}
      >
        {updatedArticle?.map((article: any, index: any) => {
            const extractedDescription = combineTextWithoutCodeTrue(article?.content);
          return (
            <Link
              href={`/article/${article?.slug}`}
              key={index}
              className={`group `}
            >
              <Image
                src={article?.coverImage?.url ?? "/filinvest-cover.png"}
                width={1280}
                height={663}
                alt={article?.coverImage?.alt ?? "article"}
                className="h-[230px] w-full object-cover opacity-100 transition duration-150 group-hover:opacity-70 lg:h-[280px]"
              />
              <Fade>
                <h2
                  className={`mt-6 min-h-[72px] text-3xl font-bold leading-9 text-jet group-hover:text-dark-cornflower-blue ${
                    isTwoLines
                      ? "max-h-[80px] overflow-hidden text-ellipsis"
                      : "truncate"
                  }`}
                  style={
                    isTwoLines
                      ? {
                          WebkitLineClamp: 2,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                        }
                      : {}
                  }
                >
                  {article.title}
                </h2>
              </Fade>

              {withExtras && (
                <FadeDown>
                  <h4
                    className={`mb-4 mt-3 text-sm  text-dim-gray opacity-70 ${
                      isTwoLines && "mt-4"
                    }`}
                  >
                    {moment(article?.createdAt).format("MMM DD, YYYY")}
                  </h4>
                </FadeDown>
              )}

              <FadeDown>
                <h4
                  className={`mt-3 h-[60px] text-lg text-dim-gray  ${
                    isTwoLines
                      ? "max-h-[68px] overflow-hidden text-ellipsis"
                      : "mt-4 truncate"
                  }`}
                  style={
                    isTwoLines
                      ? {
                          WebkitLineClamp: 2,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                        }
                      : {}
                  }
                >
                  {extractedDescription}
                </h4>
              </FadeDown>

              {withExtras && (
                <div className="mt-8">
                  <BorderButton
                    buttonText="Read More"
                    textColor="dark-cornflower-blue"
                    borderColor="dark-cornflower-blue"
                    isAlt
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>
      <div
        className={`relative mt-10 flex w-full items-center justify-center ${
          sliderOnMobile ? "md:hidden" : "hidden"
        }`}
      >
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          centeredSlides={true}
          onBeforeInit={(swiper) => {
            // @ts-expect-error
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          className="relative"
          loop={true}
          pagination={true}
          direction={"horizontal"}
        >
          {updatedArticle?.map((article: any, index: any) => {
            const extractedDescription = combineTextWithoutCodeTrue(article?.content);
            return (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center"
              >
                <Link
                  href={`/article/${article.slug}`}
                  className="text-center md:text-left"
                >
                  <Image
                    src={article?.coverImage?.url || "/filinvest-cover.png"}
                    width={1364}
                    height={663}
                    alt={article?.coverImage?.alt || "article"}
                    className={`w-full ${sliderImageClassName}`}
                  />
                  <h2 className="mt-6 line-clamp-2 min-h-[72px] text-2xl font-black tracking-tighter text-jet">
                    {article?.title}
                  </h2>
                  {withExtras && (
                    <h4 className="text-sm text-dim-gray lg:mt-4">
                      April 22, 2022
                    </h4>
                  )}
                  <h4
                    className="line-clamp-2 text-lg tracking-tight text-dim-gray  lg:mt-4 lg:text-xl"
                    style={{ wordBreak: "break-all" }}
                  >
                    {extractedDescription}
                  </h4>
                  {withExtras && (
                    <div className="mb-6 mt-12">
                      <BorderButton
                        buttonText="Read More"
                        textColor="dark-cornflower-blue"
                        borderColor="dark-cornflower-blue"
                        isAlt
                      />
                    </div>
                  )}
                </Link>{" "}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="mt-8 flex items-center justify-center md:hidden">
        <div className="flex gap-6 md:gap-[43rem]">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_3px_60px_rgba(0,0,0,0.5)]"
            // @ts-expect-error
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft color="#000000" />
          </div>
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full shadow-[0_3px_60px_rgba(0,0,0,0.5)]"
            // @ts-expect-error
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight color="#000000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticles;
