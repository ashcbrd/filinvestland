"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ImageCarousel from "../slider";
import moment from "moment";

interface Props {
  imageUrl?: string;
  title?: string;
  description?: string;
  headerline?: boolean;
  date?: string;
}

const Banner = ({ imageUrl, title, description, headerline, date }: Props) => {
  const pathname = usePathname();

  const overlay = pathname === "/about" || pathname.includes("/project");
  const virtual = pathname.includes("/virtual-tour");
  const dateDisplay = moment(date).format("DD MMMM, YYYY");

  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`container relative mx-auto mt-32 h-64 min-h-[457px] overflow-hidden rounded-3xl bg-[#FFF8F8] object-cover  max-md:!min-h-[350px] md:w-full md:!mt-14`}
    >
      {imageUrl && (
        <div className="relative h-full w-full">
          {!overlay && <div className="absolute left-0 top-0 h-full w-full bg-black/50" />}
          <img src={imageUrl} className="h-full w-full object-cover" />
        </div>
      )}

      {title && (
        <div className="absolute left-0 top-0 z-30 flex h-full w-full flex-col items-center justify-center px-5 md:px-20">
          <div className="block text-center md:px-20">
            <h1 className={`font-quicksand text-lg font-bold text-[#fff] md:text-3xl`}>{title}</h1>
            {date && <p className="text-[#fff] text-sm mt-2">{dateDisplay}</p>}
            {headerline && <img src="/assets/images/underline.png" />}
            {description && (
              <p
                className={`mt-4 text-sm font-normal
                  text-[#fff] md:text-lg`}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Banner;
