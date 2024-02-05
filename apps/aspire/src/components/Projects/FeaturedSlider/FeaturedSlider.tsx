"use client";

import React, { useEffect, useState } from "react";
import Slider from "@/components/Slider/Slider";
import Button from "@/components/Button/Button";
import { getters, setters } from "@/context/Projects";
import ReactSlider from "react-slick";
import { serializeRichText } from "@/utils/serializeRichText";

const FeaturedSlider = ({ projects = [] }: { projects: any }) => {
  const methods = setters();
  const get = getters();
  const [selected, setSelected] = useState(
    projects.length > 0 ? projects[0].Project : null
  );

  useEffect(() => {
    if (get.featuredSelected) {
      setSelected(get.featuredSelected);
    }
  }, [get.featuredSelected]);

  if (!selected) return null;

  return (
    <div className="relative w-full">
      {projects.filter((p: any) => p.Project && p.Project?.id !== selected.id)
        .length > 1 && (
        <ReactSlider
          {...{
            dots: true,
            arrows: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            pauseOnHover: false,
          }}
        >
          {projects.map((p: any) => (
            <div>
              <div className="flex bg-white md:flex-col-reverse tablet:flex-col">
                <div className="relative flex w-full max-w-[935px] bg-black/30 tablet:!w-full smd:w-3/6 smd:max-w-full">
                  <div className="absolute right-[21px] top-[21px] z-10 flex h-[50px] items-center bg-aqua-blue px-[18px]">
                    <p className="flex items-center">
                      <svg
                        className="mr-[14px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_341_493)">
                          <path
                            d="M9.72291 16.9964L7.17467 19.5446C6.11822 20.601 4.40738 20.601 3.35182 19.5448C2.29605 18.489 2.29605 16.778 3.35161 15.7225L8.44898 10.6251C9.50454 9.56948 11.2156 9.56948 12.2711 10.6251C12.623 10.977 13.1935 10.977 13.5454 10.6251C13.8973 10.2732 13.8973 9.70266 13.5454 9.35078C11.7861 7.59141 8.93404 7.59141 7.17467 9.35078L2.07734 14.4481C0.31797 16.2075 0.31797 19.0595 2.07734 20.8189C3.8365 22.5792 6.68873 22.5792 8.44902 20.8189L10.9973 18.2706C11.3491 17.9187 11.3491 17.3482 10.9973 16.9963C10.6454 16.6444 10.0748 16.6445 9.72291 16.9964Z"
                            fill="#4CA4D8"
                          />
                          <path
                            d="M21.0634 1.83302C19.304 0.0736465 16.4511 0.0736465 14.6917 1.83302L11.6344 4.89035C11.2825 5.24223 11.2825 5.81278 11.6344 6.16466C11.9863 6.51654 12.5568 6.51654 12.9087 6.16466L15.966 3.10733C17.0216 2.05172 18.7335 2.05172 19.7891 3.10733C20.8446 4.16289 20.8446 5.8739 19.7891 6.92946L14.1826 12.536C13.127 13.5916 11.4161 13.5916 10.3605 12.536C10.0086 12.1841 9.43806 12.1841 9.08618 12.536C8.7343 12.8878 8.7343 13.4584 9.08618 13.8103C10.8455 15.5696 13.6976 15.5696 15.4569 13.8103L21.0634 8.20381C22.8228 6.44444 22.8228 3.59239 21.0634 1.83302Z"
                            fill="#4CA4D8"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_341_493">
                            <rect
                              width="21.6256"
                              height="21.6256"
                              fill="white"
                              transform="translate(0.757812 0.513512)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      {p.Project?.propertyType.title}
                    </p>
                  </div>
                  <Slider
                    className="w-full"
                    slides={p.Project?.PropertyImages.map((img: any) => ({
                      image: img.image.url,
                    }))}
                    // autoPlay
                    // autoPlaySpeed={3000}
                    prevArrowClassName="left-[40px] md:!left-[20px]"
                    nextArrowClassName="right-[40px] md:!right-[20px]"
                    slideClassName="h-[703px] md:!h-[300px]"
                  />
                  <span className="absolute bottom-[19px] left-[29px] text-[16px] font-[500] text-white">
                    Artist Illustration
                  </span>
                </div>
                <div className="ml-[-1px] w-full max-w-[481px] bg-white px-[48px] pb-[52px] pt-[30px] text-charcoal md:!p-[20px] tablet:!w-full smd:w-3/6 smd:max-w-full">
                  <div className="featured-logo flex justify-center">
                    <a href={`/project/${p.Project?.slug}`}>
                      <img src={p.Project?.logo?.url} width={250} />
                    </a>
                  </div>
                  <div className="featured-content leading-[28px]">
                    <label className="leading-0 pb-[10px] text-custom-gray-4">
                      Location:
                    </label>
                    <h5 className="pb-[12px] text-[22px] font-[500] text-black">
                      {p.Project?.subLocationTwo?.title
                        ? `${p.Project?.subLocationTwo?.title}, `
                        : ""}
                      {p.Project?.location?.title}
                    </h5>
                    <p>
                      {p?.Project?.description?.[0]?.children?.[0]?.text
                        .split(".")
                        .slice(0, 2)
                        .join(".") + "..."}
                    </p>
                    <Button
                      onClick={() => methods.setInquireTo(p.Project)}
                      className="mt-[27px] flex h-[52px] w-full max-w-[199px] items-center justify-center !py-0 text-[17px] font-[500]"
                    >
                      Inquire Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ReactSlider>
      )}
    </div>
  );
};

export default FeaturedSlider;
