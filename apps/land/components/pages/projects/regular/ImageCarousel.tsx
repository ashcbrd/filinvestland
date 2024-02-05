"use client";

import ChevronCircleLeft from "@/components/svg/ChevronCircleLeft";
import ChevronCircleRight from "@/components/svg/ChevronCircleRight";
import { defaultCoverImage } from "@/helpers/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Project } from "shared-types";

const ImageCarousel = ({ project }: { project: Project }) => {
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    setSelected(0);
  }, []);

  return (
    <div className="carousel w-full">
      <input
        id="slider-0"
        className="hidden"
        type="radio"
        name="project-carousel"
        checked={selected === 0}
        onChange={(e) => e.target.checked && setSelected(0)}
      />
      {project?.imageGallery?.map((item, index) => {
        if (index > 0) {
          return (
            <input
              id={`slider-${index}`}
              className="hidden"
              type="radio"
              name="project-carousel"
              checked={selected === index}
              onChange={(e) => e.target.checked && setSelected(index)}
            />
          );
        }
      })}

      <div
        className="carousel-view relative flex w-full"
        style={{ margin: 0, padding: 0 }}
      >
        <div
          className="carousel-item w-full"
          style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
        >
          <Image
            src={project?.imageGallery?.[0]?.image?.url || ""}
            width={project?.imageGallery?.[0]?.image?.width || 0}
            height={project?.imageGallery?.[0]?.image?.height || 0}
            alt={project?.imageGallery?.[0]?.image?.alt || ""}
            className="object-fit block w-full"
          />
          <div className="carousel-arrows absolute flex space-x-4">
            <label
              htmlFor={`slider-${project?.imageGallery?.length || 1 - 1}`}
              className="h-12 w-12 cursor-pointer drop-shadow-md"
            >
              <ChevronCircleLeft color="white" />
            </label>
            <label
              htmlFor="slider-1"
              className="h-12 w-12 cursor-pointer drop-shadow-md"
            >
              <ChevronCircleRight color="white" />
            </label>
          </div>
        </div>

        {project?.imageGallery?.map((item, index) => {
          if (index > 0) {
            return (
              <div className="carousel-item w-full">
                <Image
                  key={index.toString()}
                  src={item.image?.url ? item.image?.url : defaultCoverImage}
                  width={item.image?.width}
                  height={item.image?.height}
                  alt={item.image?.alt ? item.image?.alt : ""}
                  className="w-full object-contain lg:object-cover"
                />
                <div className="carousel-arrows absolute flex space-x-4">
                  <label
                    htmlFor={"slider-" + (index - 1).toString()}
                    className="h-12 w-12 cursor-pointer drop-shadow-md"
                  >
                    <ChevronCircleLeft color="white" />
                  </label>
                  <label
                    htmlFor={
                      index === (project?.imageGallery?.length || 1) - 1
                        ? "slider-0"
                        : "slider-" + (index + 1).toString()
                    }
                    className="h-12 w-12 cursor-pointer drop-shadow-md"
                  >
                    <ChevronCircleRight color="white" />
                  </label>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="carousel-selector flex w-full space-x-4">
        <label htmlFor="slider-0" className="max-w-[20rem] flex-1">
          <Image
            src={project?.imageGallery?.[0]?.image?.url || defaultCoverImage}
            width={project?.imageGallery?.[0]?.image?.width || 0}
            height={project?.imageGallery?.[0]?.image?.height || 0}
            alt={project?.imageGallery?.[0]?.image?.alt || ""}
            className="h-40 cursor-pointer lg:object-cover"
          />
        </label>
        {project?.imageGallery?.map((item, index) => {
          if (index > 0) {
            return (
              <label
                htmlFor={`slider-${index}`}
                className="max-w-[20rem] flex-1"
              >
                <Image
                  key={index.toString()}
                  src={item.image?.url || ""}
                  width={item.image?.width || 500}
                  height={item.image?.height || 500}
                  alt={item.image?.alt || ""}
                  className="h-40 cursor-pointer object-cover"
                />
              </label>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ImageCarousel;
