"use client";
import "swiper/swiper-bundle.css";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Project } from "shared-types";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ChevronCircleLeft from "../svg/ChevronCircleLeft";
import ChevronCircleRight from "../svg/ChevronCircleRight";
import useGetProjectsBySite from "./hooks/useGetProjectsBySite";
import ProjectCard from "./ProjectCard";

const Recommendation = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { data } = useGetProjectsBySite({
    site: "Futura",
  });

  return (
    <div className="flex w-full flex-col items-center gap-12 px-4">
      <h5 className="text-2xl tracking-tight md:text-4xl">Recommendations</h5>
      <div className="flex flex-col items-center gap-4">
        <Image
          src={"/futura-logo.png"}
          alt="futura-logo"
          width={200}
          height={100}
        />
        <p className="text-dim-gray max-w-4xl text-center text-lg md:text-2xl">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
        </p>
      </div>
      <div className="flex w-full gap-8 px-8 py-4">
        <button onClick={() => swiperRef.current?.slidePrev()}>
          <ChevronCircleLeft />
        </button>
        <Swiper
          loop
          slidesPerView={1}
          spaceBetween={10}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          centeredSlides
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            960: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {data?.map((d: Project) => {
            return (
              <SwiperSlide key={d.id}>
                <Link
                  href={`/projects/${d.slug}`}
                  className="group relative flex h-auto shadow-[0_3px_60px_rgba(0,0,0,0.10)]"
                >
                  <ProjectCard project={d} />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button onClick={() => swiperRef.current?.slideNext()}>
          <ChevronCircleRight />
        </button>
      </div>
    </div>
  );
};

export default Recommendation;
