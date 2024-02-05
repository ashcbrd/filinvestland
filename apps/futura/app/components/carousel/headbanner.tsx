"use client";

import React from "react";
import Button from "../button";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  imageUrl: string;
  title?: string;
  description?: React.ReactNode;
  opacity?: string;
  imageClassName?: string;
  callToActionText?: string;
  callToActionLink?: string;
}

const HeaderBanner = ({
  imageUrl,
  title,
  description,
  opacity,
  imageClassName,
  callToActionText,
  callToActionLink,
}: Props) => {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative rounded-3xl mx-auto container md:overflow-hidden 
      !mt-[320px] md:!mt-12"
    >
      <img
        src={imageUrl}
        alt="Banner"
        className={
          imageClassName || "w-full h-64 md:h-96 lg:h-[80%] object-cover"
        }
      />
      {opacity && <div className={`absolute inset-0 ${opacity}`}></div>}
      {title && (
        <div className="absolute md:left-20 -top-[220px] md:top-0 md:w-[38%] h-full flex flex-col items-start justify-center p-4">
          <h1 className="text-[26px] text-center md:text-start md:text-[32px] lg:text-[50px] md:leading-[32px] lg:leading-[52px] font-quicksand font-bold text-[#060606]">
            {title}
          </h1>
          {description && (
            <span className="text-[10px] md:text-base text-center md:text-start">
              {description}
            </span>
          )}

          <div className="-mb-20 lg:mb-0 mt-20 lg:mt-10 w-full flex justify-center md:justify-start items-center ">
            <Link
              href={callToActionLink || "/"}
              className="bg-[#E02926] rounded-[100px] text-white font-normal hover:bg-red-400 transition-all px-14 py-4"
            >
              {callToActionText}
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HeaderBanner;
