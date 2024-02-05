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
  bgUrl = "blue-header-bg.png",
  isBlueHeader = false,
  otherUrl,
  isBgClipped = true,
  isLargeBlueHeader = false,
}: {
  bgUrl?: string;
  bgUrlSmall?: string;
  title?: string;
  breadcrumbs?: string | ReactNode;
  tabs?: ReactNode;
  isBlueHeader?: boolean;
  isTitleSmall?: boolean;
  otherUrl?: string;
  isBgClipped?: boolean;
  isLargeBlueHeader?: boolean;
}) => {
  const bgUrlUpdated = bgUrl.includes("/files") ? `${bgUrl}` : `/${bgUrl}`;
  // const bgUrlSmallUpdated = bgUrlSmall.includes("/files")
  //   ? `${bgUrlSmall}`
  //   : `/${bgUrlSmall}`;

  return (
    <>
      {isBlueHeader ? (
        <section
          style={{
            backgroundImage: `url(${otherUrl ? otherUrl : bgUrlUpdated})`,
          }}
          className={
            "relative z-0 flex items-center justify-center bg-cover bg-center bg-no-repeat " +
            (isLargeBlueHeader ? "h-[80vh] pb-[30vh]" : "h-[65vh]")
          }
        >
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
        </section>
      ) : (
        <section className={"z-0"}>
          <div className="z-1 absolute hidden w-full lg:block">
            <div
              className={`flex flex-col items-center justify-center md:mt-0 ${
                //@ts-expect-error
                tabs?.props?.items?.length > 0
                  ? "mt-6 py-0 md:py-28"
                  : "mt-16 py-32 "
              }  md:py-24 lg:py-44 2xl:py-60`}
            >
              <FadeUp>
                <h1
                  className={`mb-2 text-center ${
                    //@ts-expect-error
                    tabs?.props?.items?.length > 0 ? "mt-4" : "-mt-4"
                  }  text-4xl font-extrabold text-white md:mt-0 md:text-[4vh] lg:mb-4 lg:text-[8vh]`}
                >
                  {title}
                </h1>
              </FadeUp>
              <FadeDown>
                {breadcrumbs && (
                  <h5 className="mt-[2vh] text-center text-[2vh] text-xs text-white lg:text-sm">
                    {breadcrumbs}
                  </h5>
                )}
              </FadeDown>
              <FadeDown>
                {/*@ts-expect-error*/}
                {tabs?.props?.items?.length > 0 ? tabs : ""}
              </FadeDown>
            </div>
          </div>

          <div className="z-0 hidden lg:block">
            <Image
              className={
                "h-[85vh] object-cover 2xl:h-[65vh] " +
                (isBgClipped && "clip-header")
              }
              src={otherUrl ? otherUrl : bgUrlUpdated}
              width={3844}
              height={2312}
              alt="bg"
              priority
            />
          </div>
          <div
            className="block w-full bg-cover bg-center bg-no-repeat py-28 lg:hidden "
            // style={{
            //   backgroundImage: `url(${
            //     otherUrl ? otherUrl : bgUrlSmallUpdated
            //   })`,
            // }}
          >
            <Image
              className={
                "absolute top-0 h-[60vh] w-full object-cover " +
                (isBgClipped && "clip-header")
              }
              src={otherUrl ? otherUrl : bgUrlUpdated}
              width={3844}
              height={2312}
              alt="bg"
              priority
            />
            <div
              className={`mb-44 flex flex-col items-center justify-center md:mt-0 ${
                //@ts-expect-error
                tabs?.props?.items?.length > 0 ? " py-0 md:py-28" : "mt-16  "
              }  md:py-24 lg:py-44 2xl:py-60`}
            >
              <FadeUp>
                <h1
                  className={`mb-2 text-center ${
                    //@ts-expect-error
                    tabs?.props?.items?.length > 0 ? "mt-4" : "-mt-4"
                  }  text-4xl font-extrabold text-white md:mt-0 md:text-[4vh] lg:mb-4 lg:text-[8vh]`}
                >
                  {title}
                </h1>
              </FadeUp>
              <FadeDown>
                {breadcrumbs && (
                  <h5 className="text-center text-xs text-white lg:text-sm">
                    {breadcrumbs}
                  </h5>
                )}
              </FadeDown>
              <FadeDown>
                {/*@ts-expect-error*/}
                {tabs?.props?.items?.length > 0 ? tabs : ""}
              </FadeDown>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MainHeader;
