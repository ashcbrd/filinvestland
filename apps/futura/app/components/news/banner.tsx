"use client";

import React from "react";
import Link from "next/link";
import ReactSlider from "react-slick";

const NewsBanner = ({
  title,
  featured,
  newsType,
}: {
  title?: any;
  featured?: any;
  newsType?: any;
}) => {
  const NextArrow = (props: any) => {
    return (
      <div className="absolute right-[22px] bottom-[32px]">
        <button
          className={`flex-shrink-0 pointer-events-auto transition-all duration-[0.3s] ease-in-out hover:opacity-50 w-[39px] h-[39px] bg-[#E12827] rounded-[100%] flex items-center justify-center pt-[3px]`}
          onClick={props.onClick}
        >
          <svg
            width="24"
            height="24"
            className="translate-y-[-1px] translate-x-[1px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 6L15 12L9 18" stroke="#fff" stroke-width="2" />
          </svg>
        </button>
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <div className="absolute right-[68px] bottom-[32px] z-[1]">
        <button
          className={`flex-shrink-0 pointer-events-auto transition-all duration-[0.3s] ease-in-out hover:opacity-50 w-[39px] h-[39px] bg-[#E12827] rounded-[100%] flex items-center justify-center pt-[2px] mr-[13px] md:mr-[0]`}
          onClick={props.onClick}
        >
          <svg
            width="9"
            height="14"
            className="translate-y-[-1px] translate-x-[-1px]"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 1L2 7L8 13" stroke="#fff" stroke-width="2" />
          </svg>
        </button>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoPlaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const rooturl = newsType === "blogs" ? "/blog" : "/news";

  return (
    <div className="max-w-[1223px] bg-black mx-auto rounded-[20px] overflow-hidden mt-[128px] md:mt-14">
      {featured?.length > 0 && (
        <ReactSlider {...settings} className="w-full">
          {featured?.map((n: any) => (
            <div key={`new_${n.id}`}>
              <div
                className="px-[77px] min-h-[457px] max-md:!min-h-[350px] bg-black relative flex items-end justify-center bg-cover bg-center pb-[69px] pt-[40px] max-md:px-[30px]"
                style={{ backgroundImage: `url(${n.Project.coverImage.url})` }}
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40"></div>
                <div className="relative w-full items-end">
                  <div className="text-white">
                    <h1 className="pb-[20px] text-[30px] font-[700] leading-[1.2] text-white md:text-[36px] md:leading-[1.2]">
                      {n.Project.title}
                    </h1>
                    <div className="pb-[35px] max-w-[507px]">
                      <p className="text-[15px] leading-[28px]">
                        {n.Project.shortDescription
                          .split(" ")
                          .splice(0, 50)
                          .join(" ")}
                        {n.Project.shortDescription.split(" ").length > 50
                          ? "..."
                          : ""}
                      </p>
                    </div>
                    <Link
                      href={`${rooturl}/${n.Project.slug}`}
                      className="underline text-[15px] transition-all duration-[0.3s] ease-in-out hover:opacity-70"
                    >
                      Continue Reading
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ReactSlider>
      )}
      {featured?.length === 0 && (
        <div
          id="banner"
          className="virtual-tour-banner relative flex h-[568px] max-md:h-[300px] items-center justify-center text-center"
        >
          <div className="relative z-10 text-white">
            <h1 className="pb-[8px] text-[30px] font-[500] leading-[75px] text-white md:text-[38px] md:leading-[1.2]">
              {title}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsBanner;
