"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const nextIcon = (
  <div className="flex items-center">
    <svg
      width="120"
      height="120"
      viewBox="0 0 137 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_77_2268)">
        <path
          d="M42.9127 63.7809C42.9127 50.0632 54.4309 38.9134 68.6761 38.9134C82.9213 38.9134 94.4395 50.0632 94.4395 63.7809C94.4395 77.4987 82.9213 88.6484 68.6761 88.6484C54.4309 88.6484 42.9127 77.4987 42.9127 63.7809Z"
          stroke="white"
          shape-rendering="crispEdges"
        />
      </g>
      <path
        d="M65.7578 69.418L72.3237 63.0761L65.7578 56.7342"
        stroke="white"
      />
      <defs>
        <filter
          id="filter0_d_77_2268"
          x="0.412598"
          y="0.413391"
          width="136.527"
          height="134.735"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="2"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_77_2268"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="20" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_77_2268"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_77_2268"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
);

interface Props {
  data: any;
  motionSettings: any;
}

type ComponentType = {
  imgSrc: string;
  heading: string;
  desc: string;
  href: string;
};

const Component: React.FC<ComponentType> = ({
  imgSrc,
  heading,
  desc,
  href,
}) => {
  return (
    <Link
      href={href}
      className="group relative col-span-1 cursor-pointer px-4 md:px-0"
    >
      <div className="relative h-min overflow-hidden rounded-3xl from-black/60 via-black/40 to-transparent after:absolute after:bottom-0 after:h-[50%] after:w-full after:rounded-b-3xl after:bg-gradient-to-t after:content-['']">
        <img
          src={imgSrc}
          alt="Image 2"
          className="transition-all md:group-hover:scale-110 lg:w-full"
        />
      </div>
      <div className="absolute bottom-6 left-4 flex items-center p-4">
        <div className="flex-1">
          <h3 className="mb-2 font-quicksand text-[18px] font-bold text-white md:text-[25px]">
            {heading}
          </h3>
          <p className="text-[10px] font-normal text-white md:w-[80%] md:text-[14px] md:text-base">
            {desc}
          </p>
        </div>
        <button
          className="ml-4 text-white transition-all group-hover:scale-125"
          aria-label="Next"
        >
          {nextIcon}
        </button>
      </div>
    </Link>
  );
};

interface PropertyType {
  id: string;
}

function MotionCard({ data, motionSettings }: Props) {
  async function getData() {
    const page = fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/futura-navigation`,
      { cache: "no-store" }
    );

    const req = await Promise.all([page]);

    return {
      page: (await req[0].json()) as any,
    };
  }

  const [browseByPropertyType, setBrowseByPropertyType] = useState<
    PropertyType[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        const projectsMegaMenu = data.page.projectsMegaMenu;

        const browseByPropertyType = projectsMegaMenu.browseByPropertyType;

        setBrowseByPropertyType(browseByPropertyType);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col justify-center gap-4 gap-y-6 md:flex-row">
        {browseByPropertyType.slice(0, 2).map((m, i) => (
          <motion.div
            {...motionSettings}
            className="flex w-full justify-center gap-14"
            style={{ flexWrap: "nowrap !important" }}
          >
            <Component
              href={`/${data[i].propertyTypeName.slug}`}
              imgSrc={`/assets/images/home/choice${i + 1}.png`}
              heading={data[i]?.label}
              desc={data[i]?.description}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MotionCard;
