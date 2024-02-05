"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import "../../styles/header.css";
import FadeDown from "../animation/FadeDown";
import FadeUp from "../animation/FadeUp";

const MainHeader = ({
  title,
  breadcrumbs,
  tabs,
  bgUrl,
  isBgClipped = true,
  header,
}: {
  bgUrl?: string;
  title?: string;
  breadcrumbs?: string | ReactNode;
  tabs?: ReactNode;
  isBgClipped?: boolean;
  header?: any;
}) => {
  const bgUrlUpdated = bgUrl?.startsWith("http")
    ? bgUrl
    : bgUrl ?? "/blue-header-bg.png";

  return (
    <>
      <section className="w-full overflow-x-hidden">
        <div
          className={`relative flex min-h-[80vh] flex-col justify-center py-24 before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-neutral-800 before:opacity-30 ${
            isBgClipped ? "clip-header" : ""
          }`}
        >
          <Image
            className={`absolute left-0 top-0 h-full w-full object-cover ${
              isBgClipped ? "clip-header" : ""
            }`}
            src={bgUrlUpdated}
            width={1920}
            height={1080}
            alt={header?.coverImage?.alt ?? "bg"}
            priority
            style={{ filter: `brightness(${header?.brightness / 100})` }}
          />
          {title && (
            <div className="z-10 w-full text-center">
              <div className="mx-6 flex flex-col items-center justify-center">
                <FadeUp>
                  <h1
                    className={`z-10 mb-4 text-[4vh] font-extrabold text-white md:mt-0 lg:mb-4 lg:text-[8vh]`}
                  >
                    {title}
                  </h1>
                </FadeUp>
                <FadeDown>
                  {breadcrumbs && (
                    <h5 className="z-10 text-center text-sm text-white">
                      {breadcrumbs}
                    </h5>
                  )}
                </FadeDown>
                <FadeDown>{tabs}</FadeDown>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MainHeader;
