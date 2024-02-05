"use client";
import "swiper/swiper-bundle.css";
import React, { useRef, useState } from "react";
import { getBrandHexColor } from "@/helpers/getBrandHexColor";
import Image, { ImageProps } from "next/image";
import { File, Project } from "shared-types";
import Flag from "../svg/Flag";
import Peso from "../svg/Peso";
import SizeBox from "../svg/SizeBox";
import { T_Brands } from "@/types/global";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ChevronCircleLeft from "@/components/svg/ChevronCircleLeft";
import ChevronCircleRight from "@/components/svg/ChevronCircleRight";

const FALLBACK_IMG_SRC = "/office-parks-small.png";

const ImageWithFallback = ({ src, alt, ...props }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "alt"}
      onError={() => {
        setImgSrc(FALLBACK_IMG_SRC);
      }}
    />
  );
};

type ImageSliderProps = {
  imageGallery: {
    image?: File;
    id?: string;
  }[];
};

const ImageSlider = ({ imageGallery }: ImageSliderProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="h-full w-full">
      <Swiper
        loop
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        centeredSlides
        className="h-full"
      >
        <div className="absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-between px-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              swiperRef.current?.slidePrev();
            }}
          >
            <ChevronCircleLeft color="white" fill="rgba(0,0,0,0.5)" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              swiperRef.current?.slideNext();
            }}
          >
            <ChevronCircleRight color="white" fill="rgba(0,0,0,0.5)" />
          </button>
        </div>
        {imageGallery.map(({ image, id }) => {
          return (
            <SwiperSlide key={id!} className="h-full">
              <ImageWithFallback
                src={image?.url || "/filinvest-cover.png"}
                alt={image?.alt || "alt"}
                width={520}
                height={375}
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const formattedPrice = formatter.format(project?.price || 0);

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="relative flex items-center justify-center">
          <div className="relative h-[20rem] w-full">
            {project?.imageGallery?.length &&
            project?.imageGallery?.length > 1 ? (
              <ImageSlider imageGallery={project?.imageGallery || []} />
            ) : (
              <ImageWithFallback
                src={project?.coverImage?.url || ""}
                alt={project?.coverImage?.alt || ""}
                width={520}
                height={375}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="absolute -bottom-11 right-5 z-20 rounded-full bg-gray-200 ">
            <ImageWithFallback
              className="h-[6rem] w-[6rem] object-contain"
              style={{ clipPath: "circle()" }}
              width={200}
              height={200}
              src={project?.logo?.url || "/filinvest-cover.png"}
              alt={project?.logo?.alt || "alt"}
            />
          </div>
        </div>
        <div className="flex flex-col px-9">
          <div className="flex flex-col border-b py-4 lg:py-6 xl:py-8">
            <h5 className="line-clamp-2 h-[2rem] font-black tracking-tighter md:text-base lg:h-[4rem] lg:text-lg xl:text-xl 2xl:h-[5rem] 2xl:text-3xl">
              {project.title}
            </h5>
            <p className="line-clamp-2">
              {project.description ??
                project.shortDescription ??
                "No description"}
            </p>
          </div>
          <div className="flex gap-5 py-4 text-sm md:py-8 md:text-base">
            <div className="flex items-center justify-center gap-3">
              <Peso
                color={getBrandHexColor(project?.site?.title as T_Brands)}
                classes="h-4 w-4 md:h-5 md:w-5"
              />
              <p className="font-bold">{formattedPrice}</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Flag
                color={getBrandHexColor(project.site?.title as T_Brands)}
                classes="h-4 w-4 md:h-5 md:w-5"
              />
              <p className="font-bold">{project.location?.title}</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <SizeBox
                color={getBrandHexColor(project?.site?.title as T_Brands)}
                classes="h-4 w-4 md:h-5 md:w-5"
              />
              <p className="font-bold">{project.size} sqm</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
